const MAX_BODY_BYTES = 4096;
const UNKNOWN = "Unknown";

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

const cleanPage = (value) => {
  const page = cleanText(value, 160);
  return page.startsWith("/") ? page : "/";
};

const cleanLanguage = (value) => {
  const language = cleanText(value, 40);

  if (!/^[a-z]{2,3}(?:-[a-z0-9]{2,8})*$/i.test(language)) {
    return UNKNOWN;
  }

  return language;
};

const cleanScreen = (screen) => {
  if (!screen || typeof screen !== "object") {
    return UNKNOWN;
  }

  const width = Number(screen.width);
  const height = Number(screen.height);

  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    width < 1 ||
    height < 1 ||
    width > 10000 ||
    height > 10000
  ) {
    return UNKNOWN;
  }

  return `${Math.round(width)}x${Math.round(height)}`;
};

const cleanReferrer = (value) => {
  const referrer = cleanText(value, 220);

  if (!referrer) {
    return "Direct";
  }

  try {
    const { hostname } = new URL(referrer);
    const host = hostname.replace(/^www\./i, "");

    if (/(^|\.)linkedin\.com$/i.test(host) || /(^|\.)lnkd\.in$/i.test(host)) {
      return "LinkedIn";
    }

    return cleanText(host, 80) || "External";
  } catch {
    return "External";
  }
};

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

const buildMessage = ({ location, page, referrer, screen, language }) =>
  [
    "👀 Portfolio Visitor",
    "",
    `📍 ${location}`,
    `📄 ${page}`,
    `🔗 ${referrer}`,
    `🖥 ${screen}`,
    `🌐 ${language}`,
  ].join("\n");

export default async (request, context) => {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, error: "method_not_allowed" }, 405, {
      Allow: "POST",
    });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);

  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse({ ok: false, error: "payload_too_large" }, 413);
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: "invalid_json" }, 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return jsonResponse({ ok: false, error: "invalid_payload" }, 400);
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return jsonResponse({ ok: false, error: "notifications_unconfigured" }, 500);
  }

  const message = buildMessage({
    location: getLocation(context?.geo),
    page: cleanPage(payload.page),
    referrer: cleanReferrer(payload.referrer),
    screen: cleanScreen(payload.screen),
    language: cleanLanguage(payload.language),
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
  path: "/api/visit",
};
