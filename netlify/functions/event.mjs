const MAX_BODY_BYTES = 4096;
const UNKNOWN = "Unknown";

const eventFormats = {
  project_opened: {
    icon: "⭐",
    requiredNameField: "projectName",
    getLine: (data) => `📁 Opened project: ${data.projectName}`,
  },
  resume_opened: {
    icon: "📄",
    getLine: () => "Opened Resume",
  },
  linkedin_clicked: {
    icon: "🔗",
    getLine: () => "Clicked LinkedIn",
  },
  email_clicked: {
    icon: "✉️",
    getLine: () => "Clicked Email",
  },
  document_opened: {
    icon: "📚",
    requiredNameField: "documentName",
    getLine: (data) => `Opened document: ${data.documentName}`,
  },
};

const jsonResponse = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      ...headers,
    },
  });

const cleanText = (value, maxLength = 160) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
};

const cleanType = (value) => cleanText(value, 80);

const getCountryName = (country) => {
  if (!country) {
    return "";
  }

  if (typeof country === "string") {
    return cleanText(country, 80);
  }

  if (typeof country === "object") {
    return cleanText(country.name || country.code || "", 80);
  }

  return "";
};

const getLocation = (geo = {}) => {
  const city = cleanText(geo.city || "", 80);
  const country = getCountryName(geo.country);

  if (city && country) {
    return `${city}, ${country}`;
  }

  return country || city || UNKNOWN;
};

const cleanEventData = (type, data) => {
  const format = eventFormats[type];

  if (!format) {
    return null;
  }

  if (!format.requiredNameField) {
    return {};
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  const name = cleanText(data[format.requiredNameField], 100);

  if (!name) {
    return null;
  }

  return {
    [format.requiredNameField]: name,
  };
};

const buildMessage = ({ type, data, location }) => {
  const format = eventFormats[type];

  return [`${format.icon} Portfolio Interaction`, "", format.getLine(data), `📍 ${location}`].join("\n");
};

const readJsonPayload = async (request) => {
  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_BODY_BYTES) {
    return { error: "payload_too_large" };
  }

  const rawBody = await request.text();

  if (new TextEncoder().encode(rawBody).length > MAX_BODY_BYTES) {
    return { error: "payload_too_large" };
  }

  try {
    return { payload: JSON.parse(rawBody) };
  } catch {
    return { error: "invalid_json" };
  }
};

export default async (request, context) => {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, {
      Allow: "POST",
    });
  }

  const { payload, error } = await readJsonPayload(request);

  if (error) {
    return jsonResponse({ ok: false, error }, error === "payload_too_large" ? 413 : 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "invalid_payload" }, 400);
  }

  const type = cleanType(payload.type);
  const format = eventFormats[type];

  if (!format) {
    return jsonResponse({ ok: false, error: "invalid_event_type" }, 400);
  }

  const data = cleanEventData(type, payload.data);

  if (!data) {
    return jsonResponse({ ok: false, error: "invalid_event_data" }, 400);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return jsonResponse({ ok: false, error: "notifications_unconfigured" }, 500);
  }

  const message = buildMessage({
    type,
    data,
    location: getLocation(context?.geo),
  });

  try {
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
    });

    if (!telegramResponse.ok) {
      return jsonResponse({ ok: false, error: "notification_failed" }, 502);
    }

    return jsonResponse({ ok: true });
  } catch {
    return jsonResponse({ ok: false, error: "notification_failed" }, 502);
  }
};

export const config = {
  path: "/api/event",
};
