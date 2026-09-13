const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".nav-links a");
const projectList = document.querySelector("[data-project-list]");
const projectToggle = document.querySelector("[data-project-toggle]");
const projectPreview = document.querySelector("[data-project-preview]");
const projectPreviewImage = document.querySelector("[data-project-preview-image]");
const projectModal = document.querySelector("[data-project-modal]");
const projectModalContent = document.querySelector("[data-project-modal-content]");
const projectModalClose = document.querySelector("[data-project-modal-close]");
const imageLightbox = document.querySelector("[data-image-lightbox]");
const imageLightboxImage = document.querySelector("[data-lightbox-image]");
const imageLightboxStage = document.querySelector("[data-lightbox-stage]");
const imageLightboxClose = document.querySelector("[data-lightbox-close]");
const skillsSection = document.querySelector("[data-skills-section]");
const skillGroupsMount = document.querySelector("[data-skill-groups]");
const skillColorLegend = document.querySelector("[data-skill-color-legend]");
const starLayer = document.querySelector("[data-star-layer]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const canHoverProjectPreview = window.matchMedia("(hover: hover) and (pointer: fine)");
const pronunciationAudioCache = new Map();
const visitReportSessionKey = "portfolioVisitReported";
const portfolioEventSessionPrefix = "portfolioEvent";
const portfolioEventTypes = new Set([
  "project_opened",
  "resume_opened",
  "linkedin_clicked",
  "email_clicked",
  "document_opened",
]);

const projects = [
  {
    id: "llm-debate-thesis",
    number: "01",
    title: "LLM Debate Thesis",
    shortDescription:
      "Exploring whether LLM judges can distinguish truthful and deceptive behavior in multi-turn AI debates.",
    description:
      "A university thesis project investigating how language model judges behave in multi-turn debate settings, and whether they can reliably separate truthful arguments from deceptive ones.",
    category: "UNIVERSITY",
    technologies: ["LLMs", "RAG", "Evaluation", "Python"],
    previewImage: "assets/projects/llm-debate-1.png",
    images: [
      "assets/projects/llm-debate-1.png",
      "assets/projects/llm-debate-2.png",
      "assets/projects/llm-debate-3.png",
      "assets/projects/llm-debate-4.png",
      "assets/projects/llm-debate-5.png",
      "assets/projects/llm-debate-6.png",
    ],
    pdfUrl: "assets/thesis-rares-stana.pdf",
    pdfLabel: "Read Thesis",
    expandedAbout: {
      title: "About the thesis",
      toggleLabel: "Read more",
      paragraphs: [
        [
          {
            text: "For my Bachelor’s thesis, I investigated whether large language models can reliably judge debates between other language models, especially when one participant is intentionally deceptive.",
          },
        ],
        [
          {
            text: "I built a multi-turn debate system around the FEVER fact-verification dataset, where different LLM agents were instructed to argue truthfully or deceptively while a separate LLM acted as the judge. The judge had to determine the correct factual label, assess the quality of the arguments, and identify behaviours such as unsupported claims, contradictions, cherry-picking, overconfidence, and deliberate deception.",
          },
        ],
        [
          {
            text: "I compared two main setups: one where the agents relied only on prompting and another where they were given retrieved evidence through a RAG pipeline. This allowed me to study not only whether access to evidence improved the debate itself, but also whether it made deceptive behaviour easier for the judge to detect.",
          },
        ],
        [
          {
            text: "The results showed that retrieval generally improved factual accuracy and grounding. However, detecting deception was much harder. The judge often trusted convincing or well-supported arguments even when they came from an agent that had been explicitly instructed to mislead it. Cases where the available evidence was insufficient were particularly difficult, highlighting how easily confidence and presentation can influence an automated evaluator.",
          },
        ],
        [
          {
            text: "The project combined local LLM inference, retrieval-augmented generation, automated experimentation, behavioural evaluation, and result analysis. Beyond the final thesis, I also built an interactive interface for exploring debates and their evaluations.",
          },
        ],
        [
          {
            text: "This project became the main research project of my Bachelor’s degree and gave me the opportunity to explore a question I find especially interesting: as AI systems increasingly evaluate other AI systems, how much can we actually trust the judge?",
          },
        ],
      ],
    },
    status: "Research project",
  },
  {
    id: "meetmiddle",
    number: "02",
    title: "MeetMiddle",
    shortDescription:
      "Finding the best place for groups to meet using real travel times, preferences, location data, and AI.",
    description:
      "A personal mobile app concept for coordinating group meetups by combining location data, realistic travel times, user preferences, and AI-assisted recommendations.",
    category: "PERSONAL",
    technologies: ["React Native", "Expo", "TypeScript", "FastAPI", "Supabase", "OpenStreetMap", "Ollama"],
    previewImage: "assets/projects/meetmiddle.png",
    images: ["assets/projects/meetmiddle.png"],
    expandedAbout: {
      title: "MeetMiddle",
      paragraphs: [
        [
          { text: "MeetMiddle", strong: true },
          {
            text: " is a mobile app that helps groups find the fairest and most convenient place to meet. Instead of choosing a geographic midpoint, it considers each person's ",
          },
          {
            text: "real-time location, transport preferences, travel times, weather, opening hours, and hangout preferences",
            strong: true,
          },
          { text: " to recommend places everyone can reach fairly." },
        ],
        [
          {
            text: "Users can create friend groups, plan hangouts, choose an arrival time and activity, and receive ranked recommendations with route information, fairness scores, explanations, and interactive maps.",
          },
        ],
      ],
      features: [
        "Fair meeting-point recommendations based on actual travel time",
        "Real-time participant locations with privacy controls",
        "Walking, cycling, driving, and public transport routing",
        "Group and friend management",
        "Hangout planning by category, date, time, and transport preference",
        "Weather-aware and opening-hours-aware recommendations",
        "Interactive maps with routes and participant locations",
        "Swipeable place recommendations with fairness explanations",
        "Saved places and hangout history",
        "AI-generated recommendation explanations using a local Ollama model",
      ],
    },
  },
  {
    id: "bunq-splitsmart",
    number: "03",
    title: "Bunq SplitSmart",
    shortDescription:
      "A multimodal AI application for understanding expenses and intelligently splitting shared payments.",
    description:
      "A hackathon project exploring how multimodal AI can understand receipts, expenses, and shared payment situations, then help split costs more intelligently.",
    category: "HACKATHON",
    technologies: ["Multimodal AI", "React", "FastAPI", "OpenAI API"],
    previewImage: "assets/projects/bunq-splitsmart.png",
    images: [
      "assets/projects/bunq-splitsmart.png",
      "assets/projects/bunq-history.png",
      "assets/projects/bunq-people.png",
      "assets/projects/bunq-compare.png",
      "assets/projects/bunq-stats.png",
    ],
    expandedAbout: {
      title: "About SplitSmart",
      toggleLabel: "Read more",
      paragraphs: [
        [
          {
            text: "SplitSmart was built during a bunq hackathon as a smarter way to manage shared expenses between groups of people.",
          },
        ],
        [
          {
            text: "The idea came from a common problem with expense-splitting apps: they usually assume that every purchase should be divided equally or that users already know exactly how each transaction should be assigned. SplitSmart instead tries to understand the expense itself and help users decide how it should be split.",
          },
        ],
        [
          {
            text: "The application allows users to upload receipts, extract their contents using OCR, and separate items into shared and personal expenses. From there, users can review the detected products, decide who participated in each expense, and calculate a more accurate split instead of simply dividing the entire bill evenly.",
          },
        ],
        [
          {
            text: "We built the project with a React frontend and a FastAPI backend, while also integrating the bunq sandbox environment to connect the concept to real banking workflows. AI was used to help interpret receipt data and turn messy purchase information into structured expenses that could be edited and reviewed by the user.",
          },
        ],
        [
          {
            text: "A large part of the challenge was designing something that felt useful rather than adding AI simply for the sake of it. The goal was to reduce the manual work involved in splitting a bill while still keeping the user in control of the final result.",
          },
        ],
        [
          {
            text: "The hackathon was also one of my first experiences building a complete product under significant time pressure. We had to move quickly from idea to interface, backend, integrations, and a working demo while continuously adjusting the scope based on what we could realistically finish.",
          },
        ],
        [
          {
            text: "More than anything, I enjoyed the experience because it showed me how much can be built in a very short period of time when a small team is focused on one clear problem.",
          },
        ],
      ],
    },
  },
  {
    id: "snias",
    number: "04",
    title: "ANPIS Virtual Assistant",
    shortDescription:
      "A bilingual web chatbot for navigating Romanian social assistance information through guided and open-ended conversation.",
    description:
      "A bilingual web chatbot built for the ANPIS website, combining guided support flows with open-ended AI assistance for public-service information.",
    category: "PROFESSIONAL",
    technologies: ["Typebot", "AI Chatbot", "Bilingual UX", "File Uploads", "Markdown"],
    previewImage: "assets/projects/anpis-virtual-assistant.png",
    images: ["assets/projects/anpis-virtual-assistant.png"],
    expandedAbout: {
      title: "ANPIS Virtual Assistant",
      paragraphs: [
        [
          { text: "ANPIS Virtual Assistant", strong: true },
          {
            text: " is a bilingual web chatbot developed for the Romanian National Agency for Payments and Social Inspection. It provides users with an accessible way to navigate social assistance information directly from the ANPIS website through a guided conversational interface.",
          },
        ],
        [
          {
            text: "The assistant combines structured conversation flows with open-ended chat, allowing users to select topics, ask questions, upload documents, switch between Romanian and English, and navigate complex public-service information without leaving the website.",
          },
        ],
      ],
      features: [
        "Romanian and English conversational support",
        "Guided support flows powered by Typebot",
        "Open-ended chatbot mode for additional questions",
        "Streaming AI responses with typing indicators",
        "File upload support directly inside the conversation",
        "Dynamic buttons and dropdowns for guided navigation",
        "Rich text and Markdown response rendering",
        "Conversation navigation, restart, and return-to-flow controls",
        "Automatic transcript handling",
        "Persistent language preferences",
        "Responsive floating chat widget for desktop and mobile",
        "Error handling and external redirect support",
      ],
    },
    status: "Professional project",
  },
  {
    id: "hangmanai",
    number: "05",
    title: "HangmanAI",
    subtitle: "What strategy would a computer come up with for playing Hangman?",
    shortDescription:
      "An interactive research project that builds word-length-specific decision trees to discover how a computer would choose to play Hangman.",
    description:
      "I built HangmanAI because I wanted to see what strategy a computer would come up with if it had to learn how to play Hangman systematically. Instead of using one fixed rule for every game, the system builds a different decision tree for each word length and determines which letter to guess at every possible state.",
    category: "PERSONAL",
    technologies: ["Decision Trees", "Algorithms", "Python", "Data Analysis", "Research"],
    previewImage: "assets/projects/hangmanai-title-card.png",
    images: [
      "assets/projects/hangmanai-game.png",
      "assets/projects/hangmanai-win-rate.png",
      "assets/projects/hangmanai-mistakes.png",
      "assets/projects/hangmanai-tree-size.png",
      "assets/projects/hangmanai-vocabulary-size.png",
    ],
    mediaStyle: "clean",
    pdfUrl: "assets/hangmanai-research-report.pdf",
    pdfLabel: "Read Research Paper",
    expandedAbout: {
      title: "HangmanAI",
      paragraphs: [
        [
          { text: "I started this project because of a pretty simple question: " },
          { text: "what strategy would a computer come up with for playing Hangman?", strong: true },
        ],
        [
          {
            text: "Everyone knows the usual advice, like starting with E or guessing vowels first, but I wanted to see what would happen if I stopped relying on those assumptions and let the computer work out its own strategy from the vocabulary itself.",
          },
        ],
        [
          {
            text: "The idea eventually became HangmanAI. Instead of using one universal strategy, the system creates a separate decision tree for each word length. A three-letter word and an eight-letter word are therefore treated as completely different problems. At every point in the game, the tree decides which letter to guess next based on the possible words that are still compatible with everything revealed so far.",
          },
        ],
        [
          {
            text: "Each guess can create several branches depending on where that letter appears in the hidden word. The model follows the corresponding branch and continues until the word is solved or the player runs out of lives.",
          },
        ],
        [
          {
            text: "What I liked most about the project was that I did not really know what the result would be when I started. I just wanted to know what strategy the computer would come up with by playing the game.",
          },
        ],
        [
          {
            text: "And some of the results turned out to be surprisingly unintuitive. The preferred opening letter changes depending on word length, short words can actually be much harder than long ones, and the strategy changes again when common English words are considered more likely than obscure ones.",
          },
        ],
        [
          { text: "If you want to know more about the methodology, experiments, results and limitations, " },
          { text: "I wrote a full research paper about the project", strong: true },
          { text: ", which you can easily access." },
        ],
      ],
    },
    status: "Research project",
  },
  {
    id: "bayonetta-pci-project",
    number: "06",
    title: "Bayonetta: Predator & Prey",
    shortDescription:
      "Simulating how environmental shocks reshape predator-prey dynamics.",
    description:
      "An agent-based simulation of a predator-prey ecosystem featuring foxes, rabbits, and grass. The project investigates how temporary resource shortages disrupt ecosystem balance and how predator and prey populations respond and recover over time.",
    category: "UNIVERSITY",
    technologies: ["Agent-Based Simulation", "Python", "Pandas", "NumPy", "Matplotlib"],
    previewImage: "assets/projects/bayonetta-banner.png",
    images: ["assets/projects/bayonetta-banner.png", "assets/projects/bayonetta-graph.png"],
    mediaStyle: "clean",
    pdfUrl: "assets/bayonetta-final-report.pdf",
    pdfLabel: "Read Report",
    videoUrl: "assets/projects/bayonetta-demo-compressed.mp4",
    expandedAbout: {
      title: "Bayonetta: Predator & Prey",
      paragraphs: [
        [
          { text: "The simulation was built using the " },
          { text: "Violet Simulator", strong: true },
          {
            text: ", a Python-based framework for modelling individual agents and their interactions. The ecosystem was inspired by classic ",
          },
          { text: "Lotka-Volterra predator-prey dynamics", strong: true },
          {
            text: ", but used an agent-based approach so that behaviour could emerge from local interactions between individual foxes, rabbits, and grass resources.",
          },
        ],
        [
          {
            text: "Each animal was given an energy level that decreased over time. Rabbits restored energy by consuming grass, while foxes gained energy by hunting rabbits. Reproduction, starvation, death, resource consumption, and grass regrowth were all incorporated into the simulation, allowing population patterns to emerge from relatively simple behavioural rules.",
          },
        ],
        [
          {
            text: "To test the resilience of the ecosystem, we introduced a temporary ",
          },
          { text: "environmental crisis", strong: true },
          {
            text: " in which grass stopped regrowing for a period of time, representing events such as a drought or wildfire. We compared ",
          },
          { text: "five crisis simulations with five control simulations", strong: true },
          { text: ", with each run lasting " },
          { text: "25,000 simulation steps", strong: true },
          {
            text: ". Population counts were recorded throughout and analysed using metrics such as mean population size, cumulative abundance, extinction frequency, and phase-space dynamics. Python libraries including ",
          },
          { text: "Pandas, NumPy, and Matplotlib", strong: true },
          { text: " were used for analysis and visualisation." },
        ],
        [
          {
            text: "The results produced an interesting and somewhat counterintuitive effect. During the environmental crisis, the average rabbit population was approximately ",
          },
          { text: "29% higher", strong: true },
          { text: ", while the average fox population fell by roughly " },
          { text: "50%", strong: true },
          {
            text: ". The reduction in predators lowered predation pressure enough for rabbits to become more abundant despite the temporary shortage of grass. Both changes were statistically significant.",
          },
        ],
        [
          {
            text: "Overall, the project demonstrated how a temporary disruption at the bottom of a food chain can propagate through an ecosystem in unexpected ways. Rather than simply reducing every population, the crisis changed the balance between species, highlighting how individual behaviour, resource availability, and predator-prey interactions can produce complex ecosystem-level outcomes.",
          },
        ],
      ],
    },
    status: "University project",
  },
  {
    id: "muscle-matrix",
    number: "07",
    title: "Muscle Matrix",
    shortDescription:
      "My first real university software project, built to turn personal fitness goals into customized workout and calorie recommendations.",
    description:
      "Muscle Matrix was the first real software project I built at university, created while I was still at the beginning of my studies and learning how complete web applications are structured. The goal was to build a fitness platform that could generate personalized workout routines and estimate daily calorie requirements based on a user's physical characteristics and fitness goals.",
    category: "UNIVERSITY",
    technologies: ["Python", "Flask", "HTML / CSS", "NoSQL", "REST API", "External API Integration"],
    previewImage: "assets/projects/muscle-matrix-home.png",
    images: [
      "assets/projects/muscle-matrix-home.png",
      "assets/projects/muscle-matrix-profile.png",
      "assets/projects/muscle-matrix-workout-form.png",
      "assets/projects/muscle-matrix-calories.png",
      "assets/projects/muscle-matrix-workout-results.png",
      "assets/projects/muscle-matrix-team.png",
    ],
    expandedAbout: {
      title: "Muscle Matrix",
      paragraphs: [
        [
          {
            text: "The application followed a RESTful architecture with a separate frontend and backend. The interface was built with HTML and CSS, while the backend used Python and Flask to handle application logic, routing, user data, calorie calculations, and communication with external fitness APIs. A NoSQL database was used to persist user profiles, workout plans, and related information.",
          },
        ],
        [
          {
            text: "Users could enter their personal information and fitness objectives, after which the application processed the data and returned a tailored workout routine alongside an estimated daily calorie intake. The backend also handled CRUD operations and enriched user data with workout information retrieved from an external fitness API before presenting the results through the frontend.",
          },
        ],
        [
          {
            text: "Although the project was relatively simple compared with the systems I would build later, it was an important starting point for me. It was my first experience working on a complete application with a frontend, backend, database, external API integration, and a shared codebase within a team. It gave me an early understanding of how the different parts of a web application communicate and laid the foundation for many of the projects I worked on afterwards.",
          },
        ],
      ],
    },
    status: "University project",
  },
  {
    id: "this-portfolio",
    number: "08",
    title: "This Portfolio",
    subtitle: "The project that brings everything else together.",
    shortDescription:
      "The project that brings everything else together.",
    description:
      "The site you are currently exploring, designed as a minimal but interactive home for projects, skills, contact details, and playful visual details.",
    category: "PERSONAL",
    technologies: ["HTML", "CSS", "JavaScript", "Responsive Design", "Interaction Design"],
    previewImage: "assets/projects/portfolio-home.png",
    images: [
      "assets/projects/portfolio-home.png",
      "assets/projects/portfolio-about.png",
      "assets/projects/portfolio-projects.png",
      "assets/projects/portfolio-skills.png",
      "assets/projects/portfolio-contact.png",
    ],
    aboutIntro: [
      [
        {
          text: "I built this portfolio as more than just a place to list projects. I wanted it to reflect how I actually work: ",
        },
        {
          text: "I get curious about something, ask myself if I can build it, and then try to find out.",
          strong: true,
        },
      ],
      [
        {
          text: "That is where most of my projects come from. Sometimes it is a practical problem, sometimes a university assignment, and sometimes just a question I want to answer by building something around it.",
        },
      ],
    ],
    expandedAbout: {
      title: "This Portfolio",
      toggleLabel: "Read more",
      paragraphs: [
        [
          { text: "A few projects mean more to me personally. My " },
          { text: "LLM Debate Thesis", strong: true },
          {
            text: " is probably the most important because it is the project I graduated university with. ",
          },
          { text: "MeetMiddle", strong: true },
          {
            text: " is one I would genuinely love to publish one day because I think it could become a very wholesome app for helping groups of friends meet somewhere that is fair for everyone. ",
          },
          { text: "SplitSmart", strong: true },
          { text: " represents my hackathon experience, while " },
          { text: "Muscle Matrix", strong: true },
          {
            text: " was my first real university software project and, in a way, where all of this started.",
          },
        ],
        [
          {
            text: "I am also very grateful for the professional experience I have had. It gave me the opportunity to work on projects such as ",
          },
          { text: "Exammy", strong: true },
          {
            text: ", which unfortunately is not shown here because I no longer have access to the original platform after losing the credentials, but it was still an important part of learning how software is built outside university.",
          },
        ],
        [{ text: "About the website", heading: "h4" }],
        [
          { text: "The portfolio itself is built with " },
          { text: "HTML, CSS, and JavaScript", strong: true },
          {
            text: ", and I spent a lot of time on small details rather than making it a simple project grid.",
          },
        ],
        [
          {
            text: "There are interactive project previews, animated project pages, image carousels, zoomable screenshots, keyboard controls, scroll animations, subtle magnetic button effects, falling stars, and even phonetic pronunciation and audio for my name. The animations also respect reduced-motion settings, and interactions adapt depending on whether the user is on a mouse or touch device.",
          },
        ],
        [
          {
            text: "The Skills section is also designed around what I have actually used. Technologies are grouped by area and connected to personal, university, hackathon, and professional work instead of being shown as one large list.",
          },
        ],
        [
          { text: "Across my projects I have worked with technologies such as " },
          {
            text: "Python, JavaScript, TypeScript, React, React Native, Expo, FastAPI, Flask, Supabase, PostgreSQL, Docker, PyTorch, TensorFlow, LLMs, RAG, NLP, Ollama, LangChain, REST APIs, and cloud services",
            strong: true,
          },
          { text: "." },
        ],
        [{ text: "Why screenshots?", heading: "h4" }],
        [
          {
            text: "Many of these projects have their own backends, databases, AI models, APIs, or local services. I do not currently have my own server infrastructure to keep every backend running permanently, so some projects are represented through screenshots, videos, reports, and results instead.",
          },
        ],
        [
          { text: "If you are interested in one of them, " },
          { text: "I can always run it and give you a proper demo.", strong: true },
        ],
        [{ text: "What's next?", heading: "h4" }],
        [
          {
            text: "This portfolio will keep growing with the projects I build.",
          },
        ],
        [
          { text: "One of my main future goals is to " },
          { text: "build my own language model", strong: true },
          {
            text: " so I can understand the process beyond simply using existing APIs. Once that is working, I want to use it to create ",
          },
          { text: "my own chatbot for this portfolio", strong: true },
          {
            text: ", allowing visitors to ask questions about me, my work, and my experience directly.",
          },
        ],
        [
          {
            text: "Eventually, instead of reading through everything, you could simply ask:",
          },
        ],
        [{ text: "\"Who is Rareș?\"", strong: true }],
        [{ text: "P.S. I am not a graphic designer, so some of the visuals used throughout the portfolio are AI-generated."}],
      ],
    },
  },
];

const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@13/icons/${slug}.svg`;

const colorPalette = {
  dark: "#341c1c",
  surface: "#2a1a1f",
  light: "#f3f7f0",
  muted: "#6b8f71",
  accent: "#764134",
};

const projectCategoryColors = {
  PERSONAL: "#9d6dff",
  UNIVERSITY: "#6f9eff",
  HACKATHON: "#ff9a5f",
  PROFESSIONAL: "#79c995",
};

const projectCategoryLabels = {
  PERSONAL: "Personal projects",
  PROFESSIONAL: "Work experience",
  HACKATHON: "Events",
  UNIVERSITY: "University",
};

const projectCategoryLegendOrder = ["PERSONAL", "PROFESSIONAL", "HACKATHON", "UNIVERSITY"];

const skillGroups = [
  {
    title: "AI & Machine Learning",
    description: "Models, retrieval, language systems, and ML experiments.",
    accent: colorPalette.muted,
    skills: [
      {
        name: "Python",
        icon: simpleIcon("python"),
        brandColor: colorPalette.muted,
        description: "Programming language",
        projects: "Used across AI, backend, data, and university projects",
        usage: ["PERSONAL", "PROFESSIONAL", "HACKATHON", "UNIVERSITY"],
        website: "https://www.python.org/",
      },
      {
        name: "PyTorch",
        icon: simpleIcon("pytorch"),
        brandColor: colorPalette.muted,
        description: "Deep learning framework",
        projects: "Used in AI / ML projects and research experiments",
        usage: ["PERSONAL", "UNIVERSITY"],
        website: "https://pytorch.org/",
      },
      {
        name: "TensorFlow / Keras",
        icon: simpleIcon("tensorflow"),
        brandColor: colorPalette.muted,
        description: "Machine learning",
        projects: "Used in computer vision and university AI projects",
        usage: ["UNIVERSITY"],
        website: "https://www.tensorflow.org/",
      },
      {
        name: "LLMs",
        symbol: "LLM",
        brandColor: colorPalette.muted,
        description: "Language models and AI applications",
        projects: "Used in: Thesis, AI Form Assistant, MeetMiddle",
        usage: ["PERSONAL", "PROFESSIONAL", "HACKATHON", "UNIVERSITY"],
      },
      {
        name: "RAG",
        symbol: "RAG",
        brandColor: colorPalette.muted,
        description: "Retrieval-Augmented Generation",
        projects: "Used in: LLM Debate Thesis",
        usage: ["PROFESSIONAL", "UNIVERSITY"],
      },
      {
        name: "NLP",
        symbol: "NLP",
        brandColor: colorPalette.muted,
        description: "Natural language processing",
        projects: "Used in language understanding and university AI projects",
        usage: ["PROFESSIONAL", "UNIVERSITY"],
      },
      {
        name: "LangChain",
        icon: simpleIcon("langchain"),
        brandColor: colorPalette.muted,
        description: "LLM application framework",
        projects: "Used for retrieval and agent-style AI workflows",
        usage: ["PROFESSIONAL"],
        website: "https://www.langchain.com/",
      },
      {
        name: "Claude",
        icon: simpleIcon("claude"),
        brandColor: colorPalette.muted,
        description: "AI assistant and model platform",
        projects: "Used in AI application prototyping and workflows",
        usage: ["HACKATHON"],
        website: "https://claude.ai/",
      },
      {
        name: "OpenAI API",
        icon: simpleIcon("openai"),
        brandColor: colorPalette.muted,
        description: "AI model API",
        projects: "Used in AI Form Assistant and LLM-powered product experiments",
        usage: ["PROFESSIONAL"],
        website: "https://platform.openai.com/",
      },
      {
        name: "AWS Bedrock",
        symbol: "BR",
        brandColor: colorPalette.muted,
        description: "Managed foundation model platform",
        projects: "Used for cloud AI architecture exploration",
        usage: ["HACKATHON"],
        website: "https://aws.amazon.com/bedrock/",
      },
      {
        name: "Ollama",
        icon: simpleIcon("ollama"),
        brandColor: colorPalette.muted,
        description: "Local model runtime",
        projects: "Used for local LLM testing and experimentation",
        usage: ["PERSONAL", "UNIVERSITY"],
        website: "https://ollama.com/",
      },
    ],
  },
  {
    title: "Backend & Data",
    description: "APIs, storage, search, data formats, and product infrastructure.",
    accent: colorPalette.muted,
    skills: [
      {
        name: "FastAPI",
        icon: simpleIcon("fastapi"),
        brandColor: colorPalette.muted,
        description: "Backend framework",
        projects: "Used in: MeetMiddle, bunq Hackathon, AI Form Assistant",
        usage: ["PERSONAL", "HACKATHON"],
        website: "https://fastapi.tiangolo.com/",
      },
      {
        name: "Flask",
        icon: simpleIcon("flask"),
        brandColor: colorPalette.muted,
        description: "Python web framework",
        projects: "Used in backend prototypes and university software projects",
        usage: ["PROFESSIONAL"],
        website: "https://flask.palletsprojects.com/",
      },
      {
        name: "PostgreSQL",
        icon: simpleIcon("postgresql"),
        brandColor: colorPalette.muted,
        description: "Relational database",
        projects: "Used for structured product data and backend persistence",
        usage: ["PERSONAL", "PROFESSIONAL"],
        website: "https://www.postgresql.org/",
      },
      {
        name: "SQL",
        symbol: "SQL",
        brandColor: colorPalette.muted,
        description: "Database querying",
        projects: "Used in data analysis, backend services, and university projects",
        usage: ["PERSONAL", "PROFESSIONAL", "UNIVERSITY"],
      },
      {
        name: "Supabase",
        icon: simpleIcon("supabase"),
        brandColor: colorPalette.muted,
        description: "Backend platform",
        projects: "Used for app prototypes, authentication, and database-backed products",
        usage: ["PERSONAL"],
        website: "https://supabase.com/",
      },
      {
        name: "Elasticsearch",
        icon: simpleIcon("elasticsearch"),
        brandColor: colorPalette.muted,
        description: "Search and analytics engine",
        projects: "Used for searchable data and log-style exploration",
        usage: ["PROFESSIONAL"],
        website: "https://www.elastic.co/elasticsearch",
      },
      {
        name: "Kibana",
        icon: simpleIcon("kibana"),
        brandColor: colorPalette.muted,
        description: "Data visualization and observability",
        projects: "Used with Elasticsearch for inspection and dashboards",
        usage: ["PROFESSIONAL"],
        website: "https://www.elastic.co/kibana",
      },
      {
        name: "JSON",
        symbol: "{ }",
        brandColor: colorPalette.muted,
        description: "Structured data format",
        projects: "Used across APIs, AI responses, configuration, and integrations",
        usage: ["PERSONAL", "PROFESSIONAL", "HACKATHON", "UNIVERSITY"],
      },
      {
        name: "REST APIs",
        symbol: "</>",
        brandColor: colorPalette.muted,
        description: "API design and integration",
        projects: "Used in MeetMiddle, bunq Hackathon, and full-stack projects",
        usage: ["PERSONAL", "PROFESSIONAL", "HACKATHON"],
      },
    ],
  },
  {
    title: "Frontend & Interfaces",
    description: "Web, mobile, dashboards, and interfaces people can actually use.",
    accent: colorPalette.muted,
    skills: [
      {
        name: "React",
        icon: simpleIcon("react"),
        brandColor: colorPalette.muted,
        description: "Frontend UI library",
        projects: "Used in: bunq Hackathon, This Portfolio, AI product interfaces",
        usage: ["PERSONAL", "HACKATHON"],
        website: "https://react.dev/",
      },
      {
        name: "Angular",
        icon: simpleIcon("angular"),
        brandColor: colorPalette.muted,
        description: "Frontend framework",
        projects: "Used in structured frontend applications and coursework",
        usage: ["PROFESSIONAL"],
        website: "https://angular.dev/",
      },
      {
        name: "React Native",
        icon: simpleIcon("react"),
        brandColor: colorPalette.muted,
        description: "Mobile development",
        projects: "Used in: MeetMiddle",
        usage: ["PERSONAL"],
        website: "https://reactnative.dev/",
      },
      {
        name: "Expo",
        icon: simpleIcon("expo"),
        brandColor: colorPalette.muted,
        description: "React Native platform",
        projects: "Used for mobile app development and fast iteration",
        usage: ["PERSONAL"],
        website: "https://expo.dev/",
      },
      {
        name: "Streamlit",
        icon: simpleIcon("streamlit"),
        brandColor: colorPalette.muted,
        description: "Data and AI app interfaces",
        projects: "Used for quick AI and data product prototypes",
        usage: ["PROFESSIONAL", "UNIVERSITY"],
        website: "https://streamlit.io/",
      },
      {
        name: "JavaScript",
        icon: simpleIcon("javascript"),
        brandColor: colorPalette.muted,
        description: "Web programming language",
        projects: "Used across web interfaces, interactions, and integrations",
        usage: ["PERSONAL", "PROFESSIONAL", "HACKATHON"],
        website: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      },
      {
        name: "TypeScript",
        icon: simpleIcon("typescript"),
        brandColor: colorPalette.muted,
        description: "Typed JavaScript",
        projects: "Used in: This Portfolio and scalable frontend projects",
        usage: ["PERSONAL"],
        website: "https://www.typescriptlang.org/",
      },
      {
        name: "Vite",
        icon: simpleIcon("vite"),
        brandColor: colorPalette.muted,
        description: "Frontend build tool",
        projects: "Used for fast local frontend development",
        usage: ["PERSONAL", "HACKATHON"],
        website: "https://vite.dev/",
      },
      {
        name: "HTML",
        icon: simpleIcon("html5"),
        brandColor: colorPalette.muted,
        description: "Web markup",
        projects: "Used in: This Portfolio and web interfaces",
        usage: ["PERSONAL", "PROFESSIONAL"],
      },
      {
        name: "CSS",
        icon: simpleIcon("css3"),
        brandColor: colorPalette.muted,
        description: "Interface styling",
        projects: "Used in: This Portfolio and web interfaces",
        usage: ["PERSONAL", "PROFESSIONAL"],
      },
    ],
  },
  {
    title: "Cloud & Tools",
    description: "Deployment, automation, versioning, and the tools around delivery.",
    accent: colorPalette.muted,
    skills: [
      {
        name: "AWS",
        icon: simpleIcon("amazonwebservices"),
        brandColor: colorPalette.muted,
        description: "Cloud platform",
        projects: "Used for cloud architecture, deployment, and service exploration",
        usage: ["HACKATHON"],
        website: "https://aws.amazon.com/",
      },
      {
        name: "Docker",
        icon: simpleIcon("docker"),
        brandColor: colorPalette.muted,
        description: "Containers and local services",
        projects: "Used for development environments, routing services, and deployment workflows",
        usage: ["PERSONAL"],
        website: "https://www.docker.com/",
      },
      {
        name: "CI/CD",
        symbol: "CI",
        brandColor: colorPalette.muted,
        description: "Build and deployment workflows",
        projects: "Used for automated checks, releases, and deployment pipelines",
        usage: [],
      },
      {
        name: "n8n",
        icon: simpleIcon("n8n"),
        brandColor: colorPalette.muted,
        description: "Workflow automation",
        projects: "Used for automation experiments and integration workflows",
        usage: ["PROFESSIONAL"],
        website: "https://n8n.io/",
      },
      {
        name: "Typebot",
        symbol: "TB",
        brandColor: colorPalette.muted,
        description: "Conversational interface builder",
        projects: "Used for chatbot and automation interface exploration",
        usage: ["PROFESSIONAL"],
        website: "https://typebot.io/",
      },
      {
        name: "Protégé",
        symbol: "P",
        brandColor: colorPalette.muted,
        description: "Ontology editor",
        projects: "Used for semantic web and ontology coursework",
        usage: ["UNIVERSITY"],
        website: "https://protege.stanford.edu/",
      },
      {
        name: "OWL Reasoner",
        symbol: "OWL",
        brandColor: colorPalette.muted,
        description: "Ontology reasoning",
        projects: "Used in semantic web and knowledge representation projects",
        usage: ["UNIVERSITY"],
      },
    ],
  },
];

let projectsExpanded = false;
let revealObserver;
let scrollMotionQueued = false;
let activeProjectId = null;
let lastFocusedElement = null;
let previewAnimationFrame = null;
let previewTargetX = 0;
let previewTargetY = 0;
let previewCurrentX = 0;
let previewCurrentY = 0;
let modalAnimationTimer = null;
const modalOpenDuration = 1650;
const modalCloseDuration = 820;
let lightboxScale = 1;
let lightboxX = 0;
let lightboxY = 0;
let lightboxIsPanning = false;
let lightboxStartX = 0;
let lightboxStartY = 0;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

function getProjectById(projectId) {
  return projects.find((project) => project.id === projectId);
}

function getProjectAccent(category) {
  return projectCategoryColors[category] || projectCategoryColors.PERSONAL;
}

function getPaletteAccent(index = 0) {
  const accents = [colorPalette.muted, colorPalette.accent, colorPalette.light, colorPalette.surface];
  return accents[index % accents.length];
}

function reportPortfolioVisit() {
  let sessionStorageAvailable = false;

  try {
    sessionStorageAvailable = Boolean(window.sessionStorage);

    if (sessionStorageAvailable && window.sessionStorage.getItem(visitReportSessionKey) === "true") {
      return;
    }

    if (sessionStorageAvailable) {
      window.sessionStorage.setItem(visitReportSessionKey, "true");
    }
  } catch {
    return;
  }

  if (!sessionStorageAvailable) {
    return;
  }

  const payload = {
    page: window.location.pathname || "/",
    referrer: document.referrer || "",
    screen: {
      width: window.screen?.width || window.innerWidth || null,
      height: window.screen?.height || window.innerHeight || null,
    },
    language: navigator.language || "",
  };

  fetch("/api/visit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Notification failures should never affect the portfolio experience.
  });
}

function normalizePortfolioEventScope(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function getPortfolioEventSessionKey(type, data = {}) {
  const scope = normalizePortfolioEventScope(data.projectId || data.documentId || data.name || "");
  return scope ? `${portfolioEventSessionPrefix}:${type}:${scope}` : `${portfolioEventSessionPrefix}:${type}`;
}

function reportPortfolioEvent(type, data = {}) {
  if (!portfolioEventTypes.has(type)) {
    return;
  }

  const sessionKey = getPortfolioEventSessionKey(type, data);

  try {
    if (window.sessionStorage.getItem(sessionKey) === "true") {
      return;
    }

    window.sessionStorage.setItem(sessionKey, "true");
  } catch {
    return;
  }

  fetch("/api/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, data }),
    keepalive: true,
  }).catch(() => {
    // Interaction notifications should never affect navigation or clicks.
  });
}

function setupPortfolioEventTracking() {
  const emailLink = document.querySelector('.contact-links a[href^="mailto:"]');
  const linkedinLink = document.querySelector('.contact-links a[href*="linkedin.com"]');
  const resumeLink = document.querySelector('.contact-links a[href*="resume-rares-andrei-stana.pdf"]');

  emailLink?.addEventListener("click", () => reportPortfolioEvent("email_clicked"));
  linkedinLink?.addEventListener("click", () => reportPortfolioEvent("linkedin_clicked"));
  resumeLink?.addEventListener("click", () => reportPortfolioEvent("resume_opened"));
}

function syncHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 20);
}

function syncScrollMotion() {
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty("--grid-shift", "0px");
    document.documentElement.style.setProperty("--line-shift", "0px");
    return;
  }

  document.documentElement.style.setProperty("--grid-shift", `${window.scrollY * -0.018}px`);
  document.documentElement.style.setProperty("--line-shift", `${window.scrollY * -0.045}px`);
}

function queueScrollMotion() {
  if (scrollMotionQueued) {
    return;
  }

  scrollMotionQueued = true;
  requestAnimationFrame(() => {
    syncHeader();
    syncScrollMotion();
    scrollMotionQueued = false;
  });
}

function setupHeroLetters() {
  const accentWord = document.querySelector(".hero-accent");

  if (!accentWord || accentWord.dataset.lettersReady === "true") {
    return;
  }

  const text = accentWord.textContent.trim();
  accentWord.setAttribute("aria-label", text);
  accentWord.dataset.lettersReady = "true";
  accentWord.innerHTML = [...text]
    .map(
      (letter, index) =>
        `<span class="hero-letter" aria-hidden="true" style="--letter-delay: ${index * 58}ms">${escapeHtml(letter)}</span>`
    )
    .join("");
}

function spawnFallingStar() {
  if (!starLayer || prefersReducedMotion.matches || document.hidden) {
    return;
  }

  if (starLayer.children.length >= 3) {
    return;
  }

  const star = document.createElement("span");
  star.className = "falling-star";
  star.style.setProperty("--star-left", `${12 + Math.random() * 76}%`);
  star.style.setProperty("--star-length", `${48 + Math.random() * 54}px`);
  star.style.setProperty("--star-duration", `${1250 + Math.random() * 650}ms`);
  star.style.setProperty("--star-drift-x", `${-120 - Math.random() * 160}px`);
  star.style.setProperty("--star-drift-y", `${210 + Math.random() * 180}px`);
  star.style.setProperty("--star-angle", `${126 + Math.random() * 16}deg`);
  star.addEventListener("animationend", () => star.remove(), { once: true });
  starLayer.appendChild(star);
}

function startFallingStars() {
  if (!starLayer || prefersReducedMotion.matches) {
    return;
  }

  const scheduleNextStar = () => {
    const delay = 3600 + Math.random() * 5200;
    window.setTimeout(() => {
      spawnFallingStar();
      scheduleNextStar();
    }, delay);
  };

  window.setTimeout(() => {
    spawnFallingStar();
    scheduleNextStar();
  }, 1800);
}

function playPronunciation(audioPath) {
  if (!audioPath) {
    return;
  }

  if (!pronunciationAudioCache.has(audioPath)) {
    pronunciationAudioCache.set(audioPath, new Audio(audioPath));
  }

  const audio = pronunciationAudioCache.get(audioPath);
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function setupPronunciationTriggers() {
  document.querySelectorAll(".phonetic-name").forEach((name) => {
    name.addEventListener("click", () => playPronunciation(name.dataset.audio));

    if (name.tagName === "A") {
      return;
    }

    name.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      event.preventDefault();
      playPronunciation(name.dataset.audio);
    });
  });
}

function setupMagneticTargets() {
  if (prefersReducedMotion.matches) {
    return;
  }

  const targets = document.querySelectorAll(
    ".project-toggle, .contact-links a, .skill-button, .scroll-cue, .project-action, .project-modal-close"
  );

  targets.forEach((target) => {
    if (target.dataset.magneticReady === "true") {
      return;
    }

    target.dataset.magneticReady = "true";
    target.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const rect = target.getBoundingClientRect();
      const strength = target.classList.contains("skill-button") ? 7 : 10;
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
      target.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      target.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    });

    target.addEventListener("pointerleave", () => {
      target.style.setProperty("--magnetic-x", "0px");
      target.style.setProperty("--magnetic-y", "0px");
    });
  });
}

function renderProjects() {
  if (!projectList || !projectToggle) {
    return;
  }

  projectList.innerHTML = projects
    .map((project, index) => {
      const isExtra = index >= 3;
      const hiddenClass = isExtra && !projectsExpanded ? " is-hidden" : "";
      const extraClass = isExtra ? " is-extra" : "";
      const delay = isExtra ? ` style="--row-delay: ${(index - 3) * 55}ms"` : "";
      const technologies = project.technologies.join(" / ");

      return `
        <a
          class="project-item${extraClass}${hiddenClass}"
          href="#project-${escapeHtml(project.id)}"
          data-project-id="${escapeHtml(project.id)}"
          data-category="${project.category.toLowerCase()}"
          aria-label="${escapeHtml(`${project.title}. Open project details.`)}"
          ${delay}
        >
          <span class="project-number">${escapeHtml(project.number)}</span>
          <div class="project-main">
            <span class="project-category">
              <span class="category-dot" aria-hidden="true"></span>
              ${escapeHtml(project.category)}
            </span>
            <h2>${escapeHtml(project.title)}</h2>
          </div>
          <p class="project-tech">${escapeHtml(technologies)}</p>
          <span class="project-arrow" aria-hidden="true">&#8599;</span>
        </a>
      `;
    })
    .join("");

  projectToggle.textContent = projectsExpanded ? "\u2212 Show less" : "+ Show more projects";
  projectToggle.setAttribute("aria-expanded", String(projectsExpanded));
  requestAnimationFrame(() => {
    setupScrollReveals();
    setupMagneticTargets();
  });
}

function clampProjectPreviewPosition(x, y) {
  if (!projectPreview) {
    return { x, y };
  }

  const margin = 16;
  const width = projectPreview.offsetWidth || 400;
  const height = projectPreview.offsetHeight || 250;
  let nextX = x;
  let nextY = y;

  return {
    x: Math.min(Math.max(margin, nextX), window.innerWidth - width - margin),
    y: Math.min(Math.max(margin, nextY), window.innerHeight - height - margin),
  };
}

function moveProjectPreview(event) {
  if (!projectPreview) {
    return;
  }

  const width = projectPreview.offsetWidth || 400;
  const height = projectPreview.offsetHeight || 250;
  const position = clampProjectPreviewPosition(event.clientX - width / 2, event.clientY - height / 2);
  previewTargetX = position.x;
  previewTargetY = position.y;
}

function animateProjectPreview() {
  if (!projectPreview) {
    return;
  }

  previewCurrentX += (previewTargetX - previewCurrentX) * 0.18;
  previewCurrentY += (previewTargetY - previewCurrentY) * 0.18;
  const scale = projectPreview.classList.contains("is-visible") ? 1 : 0.96;

  projectPreview.style.transform = `translate3d(${previewCurrentX}px, ${previewCurrentY}px, 0) scale(${scale})`;

  if (activeProjectId) {
    previewAnimationFrame = requestAnimationFrame(animateProjectPreview);
  } else {
    previewAnimationFrame = null;
  }
}

function showProjectPreview(project, event) {
  if (
    !projectPreview ||
    !projectPreviewImage ||
    !project.previewImage ||
    !canHoverProjectPreview.matches ||
    prefersReducedMotion.matches
  ) {
    return;
  }

  activeProjectId = project.id;
  moveProjectPreview(event);

  if (!previewAnimationFrame) {
    previewCurrentX = previewCurrentX || previewTargetX;
    previewCurrentY = previewCurrentY || previewTargetY;
    previewAnimationFrame = requestAnimationFrame(animateProjectPreview);
  }

  if (!projectPreviewImage.src.endsWith(project.previewImage)) {
    projectPreviewImage.src = project.previewImage;
  }

  projectPreviewImage.alt = "";
  projectPreview.classList.add("is-visible");
}

function hideProjectPreview() {
  activeProjectId = null;
  projectPreview?.classList.remove("is-visible");
}

function buildProjectActions(project) {
  const actions = [];

  if (project.liveUrl) {
    actions.push(
      `<a class="project-action" href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noreferrer">Try Project &#8599;</a>`
    );
  }

  if (project.pdfUrl) {
    const pdfLabel = project.pdfLabel || "Read Report";
    actions.push(
      `<a class="project-action" href="${escapeHtml(project.pdfUrl)}" target="_blank" rel="noreferrer" data-document-link data-event-document-id="${escapeHtml(project.id)}" data-event-document-name="${escapeHtml(project.title)}">${escapeHtml(pdfLabel)} &#8599;</a>`
    );
  }

  if (project.status) {
    actions.unshift(`<span class="project-status">${escapeHtml(project.status)}</span>`);
  }

  return actions.join("");
}

function buildProjectImages(project) {
  const images = project.images?.length ? project.images : [project.previewImage].filter(Boolean);
  const media = [
    ...images.map((image) => ({ type: "image", src: image })),
    ...(project.videoUrl
      ? [
          {
            type: "video",
            src: project.videoUrl,
          },
        ]
      : []),
  ];
  const [mainMedia] = media;

  if (!mainMedia) {
    return "";
  }

  const buildMediaElement = (item, index) => {
    if (item.type === "video") {
      return `
        <video
          controls
          playsinline
          preload="metadata"
          src="${escapeHtml(item.src)}"
          data-speed-video
          data-default-rate="12"
          data-hold-rate="2"
        ></video>
      `;
    }

    const alt = `${project.title} media ${index + 1}`;
    return `
      <button
        class="project-image-expand"
        type="button"
        data-image-expand
        data-image-src="${escapeHtml(item.src)}"
        data-image-alt="${escapeHtml(alt)}"
        aria-label="${escapeHtml(`Expand ${alt}`)}"
      >
        <img src="${escapeHtml(item.src)}" alt="${escapeHtml(alt)}" />
      </button>
    `;
  };

  if (media.length === 1) {
    return `
      <figure class="project-modal-image project-modal-image-large">
        ${buildMediaElement(mainMedia, 0)}
      </figure>
    `;
  }

  const buildSlide = (item, index, isClone = false) => `
    <figure
      class="project-carousel-slide${isClone ? " is-clone" : ""}"
      data-carousel-slide
      ${isClone ? "" : `data-slide-index="${index}"`}
      aria-hidden="${isClone || index !== 0 ? "true" : "false"}"
    >
      ${buildMediaElement(item, index)}
    </figure>
  `;

  const slides = [
    buildSlide(media[media.length - 1], media.length - 1, true),
    ...media.map((item, index) => buildSlide(item, index)),
    buildSlide(media[0], 0, true),
  ].join("");

  const dots = media
    .map(
      (_, index) => `
        <button
          class="project-carousel-dot${index === 0 ? " is-active" : ""}"
          type="button"
          data-carousel-index="${index}"
          aria-label="${escapeHtml(`Show media ${index + 1}`)}"
          aria-pressed="${index === 0 ? "true" : "false"}"
        ></button>
      `
    )
    .join("");

  return `
    <section class="project-carousel${project.mediaStyle === "clean" ? " project-carousel-clean" : ""}" data-project-carousel data-carousel-index="0" style="--carousel-offset: -100%" aria-label="${escapeHtml(`${project.title} media`)}">
      <div class="project-carousel-frame">
        <div class="project-carousel-track" data-carousel-track>
          ${slides}
        </div>
        <button class="project-carousel-button project-carousel-button-prev" type="button" data-carousel-direction="-1" aria-label="Previous screenshot">
          &#8249;
        </button>
        <button class="project-carousel-button project-carousel-button-next" type="button" data-carousel-direction="1" aria-label="Next screenshot">
          &#8250;
        </button>
      </div>
      <div class="project-carousel-meta">
        <span class="project-carousel-count" data-carousel-count>01 / ${String(media.length).padStart(2, "0")}</span>
        <div class="project-carousel-dots" aria-hidden="false">
          ${dots}
        </div>
      </div>
    </section>
  `;
}

function renderTextSegments(segments = []) {
  return segments
    .map((segment) => {
      const text = escapeHtml(segment.text || "");
      return segment.strong ? `<strong>${text}</strong>` : text;
    })
    .join("");
}

function renderAboutParagraphs(paragraphs = []) {
  return paragraphs
    .map((paragraph) => {
      if (paragraph.length === 1 && paragraph[0].heading) {
        const level = paragraph[0].heading === "h3" ? "h3" : "h4";
        return `<${level}>${escapeHtml(paragraph[0].text || "")}</${level}>`;
      }

      return `<p>${renderTextSegments(paragraph)}</p>`;
    })
    .join("");
}

function buildProjectAboutIntro(project) {
  const paragraphs = project.aboutIntro || [
    [{ text: project.description || project.shortDescription || "" }],
  ];

  return renderAboutParagraphs(paragraphs);
}

function buildExpandedAbout(project) {
  if (!project.expandedAbout) {
    return "";
  }

  const { title, paragraphs = [], features = [], stack = [] } = project.expandedAbout;
  const intro = renderAboutParagraphs(paragraphs);
  const featureList = features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
  const stackList = stack
    .map(
      (item) => `
        <li>
          <strong>${escapeHtml(item.label)}:</strong>
          <span>${escapeHtml(item.value)}</span>
        </li>
      `
    )
    .join("");

  return `
    <button class="project-read-more" type="button" data-about-toggle aria-expanded="false" data-toggle-label="${escapeHtml(project.expandedAbout.toggleLabel || "Read more")}" data-collapse-label="Show less">
      ${escapeHtml(project.expandedAbout.toggleLabel || "Read more")}
    </button>
    <div class="project-about-more" data-about-more hidden>
      <h3>${escapeHtml(title)}</h3>
      ${intro}
      ${
        featureList
          ? `
            <h4>Key Features</h4>
            <ul class="project-feature-list">
              ${featureList}
            </ul>
          `
          : ""
      }
      ${
        stackList
          ? `
            <h4>Tech Stack</h4>
            <ul class="project-stack-list">
              ${stackList}
            </ul>
          `
          : ""
      }
    </div>
  `;
}

function renderProjectModal(project) {
  if (!projectModalContent || !projectModal) {
    return;
  }

  const accent = getProjectAccent(project.category);
  const technologies = project.technologies
    .map((technology) => `<li>${escapeHtml(technology)}</li>`)
    .join("");

  projectModal.style.setProperty("--modal-color", accent);
  projectModalContent.innerHTML = `
    <header class="project-modal-header">
      <div>
        <span class="project-modal-category">
          <span class="category-dot" aria-hidden="true"></span>
          ${escapeHtml(project.category)}
        </span>
        <h2 id="project-modal-title">${escapeHtml(project.title)}</h2>
        <p>${escapeHtml(project.subtitle || project.shortDescription)}</p>
      </div>
      <div class="project-modal-actions">
        ${buildProjectActions(project)}
      </div>
    </header>

    <div class="project-modal-grid">
      <section>
        <p class="project-modal-label">About</p>
        <div class="project-about" data-project-about>
          ${buildProjectAboutIntro(project)}
          ${buildExpandedAbout(project)}
        </div>
      </section>
      <section>
        <p class="project-modal-label">Technologies</p>
        <ul class="project-modal-tech">
          ${technologies}
        </ul>
      </section>
    </div>

    ${buildProjectImages(project)}
  `;

  initializeProjectVideos(projectModalContent);
}

function initializeProjectVideos(root) {
  const videos = [...(root?.querySelectorAll("[data-speed-video]") || [])];

  videos.forEach((video) => {
    const defaultRate = Number(video.dataset.defaultRate || 10);
    const holdRate = Number(video.dataset.holdRate || 2);
    let isPressing = false;
    const applyRate = () => {
      video.playbackRate = isPressing ? holdRate : defaultRate;
    };
    const slowWhilePressed = (event) => {
      isPressing = true;
      video.setPointerCapture?.(event.pointerId);
      applyRate();
    };
    const resumeFastPreview = (event) => {
      isPressing = false;
      if (event?.pointerId !== undefined) {
        video.releasePointerCapture?.(event.pointerId);
      }
      applyRate();
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);
    video.addEventListener("pointerdown", slowWhilePressed);
    video.addEventListener("pointerup", resumeFastPreview);
    video.addEventListener("pointerleave", resumeFastPreview);
    video.addEventListener("pointercancel", resumeFastPreview);
  });
}

function applyLightboxTransform() {
  if (!imageLightboxImage) {
    return;
  }

  imageLightboxImage.style.transform = `translate3d(${lightboxX}px, ${lightboxY}px, 0) scale(${lightboxScale})`;
}

function resetLightboxZoom() {
  lightboxScale = 1;
  lightboxX = 0;
  lightboxY = 0;
  applyLightboxTransform();
}

function zoomLightbox(step) {
  const nextScale = Math.min(5, Math.max(0.75, lightboxScale + step * 0.35));

  if (nextScale <= 1) {
    lightboxScale = 1;
    lightboxX = 0;
    lightboxY = 0;
  } else {
    lightboxScale = nextScale;
  }

  applyLightboxTransform();
}

function openImageLightbox(src, alt = "") {
  if (!imageLightbox || !imageLightboxImage) {
    return;
  }

  imageLightboxImage.src = src;
  imageLightboxImage.alt = alt;
  resetLightboxZoom();
  imageLightbox.classList.add("is-open");
  imageLightbox.setAttribute("aria-hidden", "false");
  imageLightboxClose?.focus();
}

function closeImageLightbox() {
  if (!imageLightbox || !imageLightboxImage) {
    return;
  }

  imageLightbox.classList.remove("is-open", "is-panning");
  imageLightbox.setAttribute("aria-hidden", "true");
  imageLightboxImage.src = "";
  lightboxIsPanning = false;
  resetLightboxZoom();
}

function syncProjectCarousel(carousel, nextIndex) {
  const slides = [...carousel.querySelectorAll("[data-carousel-slide][data-slide-index]")];
  const dots = [...carousel.querySelectorAll("[data-carousel-index]")];
  const count = carousel.querySelector("[data-carousel-count]");
  const total = slides.length;

  if (!total) {
    return;
  }

  const index = ((nextIndex % total) + total) % total;
  carousel.dataset.carouselIndex = String(index);
  carousel.style.setProperty("--carousel-offset", `-${(index + 1) * 100}%`);

  slides.forEach((slide, slideIndex) => {
    const isHidden = slideIndex !== index;
    slide.setAttribute("aria-hidden", String(isHidden));

    if (isHidden) {
      slide.querySelector("video")?.pause();
    }
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === index;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-pressed", String(isActive));
  });

  if (count) {
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  }
}

function snapProjectCarousel(carousel, index) {
  carousel.classList.add("is-jumping");
  carousel.style.setProperty("--carousel-offset", `-${(index + 1) * 100}%`);
  carousel.getBoundingClientRect();
  requestAnimationFrame(() => {
    carousel.classList.remove("is-jumping", "is-wrapping");
  });
}

function moveProjectCarousel(carousel, step) {
  if (carousel.classList.contains("is-wrapping")) {
    return;
  }

  const slides = [...carousel.querySelectorAll("[data-carousel-slide][data-slide-index]")];
  const total = slides.length;

  if (!total) {
    return;
  }

  const currentIndex = Number(carousel.dataset.carouselIndex || 0);
  const nextIndex = ((currentIndex + step) % total + total) % total;
  const wrapsForward = currentIndex === total - 1 && step > 0;
  const wrapsBackward = currentIndex === 0 && step < 0;

  if (!wrapsForward && !wrapsBackward) {
    syncProjectCarousel(carousel, nextIndex);
    return;
  }

  syncProjectCarousel(carousel, nextIndex);
  carousel.classList.add("is-wrapping");
  carousel.style.setProperty("--carousel-offset", wrapsForward ? `-${(total + 1) * 100}%` : "0%");

  const track = carousel.querySelector("[data-carousel-track]");
  track?.addEventListener(
    "transitionend",
    () => {
      snapProjectCarousel(carousel, nextIndex);
    },
    { once: true }
  );
}

function openProjectModal(projectId) {
  const project = getProjectById(projectId);

  if (!project || !projectModal) {
    return false;
  }

  hideProjectPreview();
  window.clearTimeout(modalAnimationTimer);
  lastFocusedElement = document.activeElement;
  renderProjectModal(project);
  document.body.classList.add("modal-open");
  projectModal.setAttribute("aria-hidden", "false");
  projectModalClose?.removeAttribute("tabindex");
  projectModal.classList.remove("is-open", "is-closing", "is-opening");
  projectModal.getBoundingClientRect();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      projectModal.classList.add("is-opening");
      setupMagneticTargets();
    });
  });

  modalAnimationTimer = window.setTimeout(
    () => {
      projectModal.classList.remove("is-opening");
      projectModal.classList.add("is-open");
      projectModalClose?.focus();
    },
    prefersReducedMotion.matches ? 1 : modalOpenDuration
  );

  return true;
}

function closeProjectModal() {
  if (
    !projectModal ||
    (!projectModal.classList.contains("is-open") && !projectModal.classList.contains("is-opening"))
  ) {
    return;
  }

  window.clearTimeout(modalAnimationTimer);
  closeImageLightbox();
  projectModal.classList.remove("is-open", "is-opening");
  projectModal.classList.add("is-closing");
  projectModalClose?.setAttribute("tabindex", "-1");

  modalAnimationTimer = window.setTimeout(
    () => {
      document.body.classList.remove("modal-open");
      projectModal.classList.remove("is-closing");
      projectModal.setAttribute("aria-hidden", "true");
      lastFocusedElement?.focus?.();
    },
    prefersReducedMotion.matches ? 1 : modalCloseDuration
  );
}

function buildUsageStrip(categories = []) {
  const uniqueCategories = [...new Set(categories)].filter((category) => projectCategoryColors[category]);

  if (uniqueCategories.length === 0) {
    return "linear-gradient(90deg, rgba(107, 143, 113, 0.38), rgba(107, 143, 113, 0.38))";
  }

  const segmentSize = 100 / uniqueCategories.length;
  const segments = uniqueCategories.map((category, index) => {
    const start = index * segmentSize;
    const end = (index + 1) * segmentSize;
    return `${projectCategoryColors[category]} ${start}% ${end}%`;
  });

  return `linear-gradient(90deg, ${segments.join(", ")})`;
}

function getUsageLabel(categories = []) {
  const uniqueCategories = [...new Set(categories)];

  if (uniqueCategories.length === 0) {
    return "not categorized yet";
  }

  return uniqueCategories.join(", ").toLowerCase();
}

function renderSkillColorLegend() {
  if (!skillColorLegend) {
    return;
  }

  const legendItems = projectCategoryLegendOrder
    .filter((category) => projectCategoryColors[category])
    .map(
      (category) => `
        <li class="skill-color-legend-item">
          <span class="skill-color-swatch" style="--swatch-color: ${projectCategoryColors[category]}" aria-hidden="true"></span>
          <span>${escapeHtml(projectCategoryLabels[category] || category.toLowerCase())}</span>
        </li>
      `
    )
    .join("");

  skillColorLegend.innerHTML = `
    <h3 id="skill-color-legend-title">What does each color mean</h3>
    <ul>
      ${legendItems}
    </ul>
  `;
}

function renderSkills() {
  if (!skillGroupsMount) {
    return;
  }

  skillGroupsMount.innerHTML = skillGroups
    .map((group, groupIndex) => {
      const skills = group.skills
        .map((skill, skillIndex) => {
          const icon = skill.icon
            ? `<span class="skill-icon-mask" style="--icon-url: url('${escapeHtml(skill.icon)}')"></span>`
            : `<span class="skill-symbol">${escapeHtml(skill.symbol || skill.name.slice(0, 3))}</span>`;
          const delay = 260 + groupIndex * 95 + skillIndex * 24;
          const usageStrip = buildUsageStrip(skill.usage);
          const usageLabel = getUsageLabel(skill.usage);
          const label = `${skill.name}. Project categories: ${usageLabel}.`;

          return `
            <button
              class="skill-button"
              type="button"
              data-group-index="${groupIndex}"
              data-skill-index="${skillIndex}"
              style="--brand-color: ${getPaletteAccent(groupIndex + skillIndex)}; --usage-strip: ${escapeHtml(usageStrip)}; --icon-delay: ${delay}ms"
              aria-label="${escapeHtml(label)}"
              aria-pressed="false"
            >
              <span class="skill-icon-frame" aria-hidden="true">${icon}</span>
              <span class="skill-name" aria-hidden="true">${escapeHtml(skill.name)}</span>
            </button>
          `;
        })
        .join("");

      return `
        <article
          class="skill-group"
          style="--skill-color: ${getPaletteAccent(groupIndex)}; --group-delay: ${120 + groupIndex * 90}ms"
        >
          <div class="skill-group-heading">
            <span class="skill-dot" aria-hidden="true"></span>
            <div>
              <h3>${escapeHtml(group.title)}</h3>
            </div>
          </div>

          <div class="skill-icon-grid" aria-label="${escapeHtml(`${group.title} technologies`)}">
            ${skills}
          </div>
        </article>
      `;
    })
    .join("");
}

function setActiveSkill(button) {
  const groupElement = button.closest(".skill-group");

  if (!groupElement) {
    return;
  }

  groupElement.classList.add("has-active-skill");
  groupElement.querySelectorAll(".skill-button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
    item.setAttribute("aria-pressed", String(item === button));
  });
}

function clearSkillGroup(groupElement) {
  groupElement.classList.remove("has-active-skill");
  groupElement.querySelectorAll(".skill-button").forEach((button) => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
}

function hideSkillColorLegend() {
  skillColorLegend?.classList.remove("is-visible");
}

function bindSkillInteractions() {
  if (!skillGroupsMount) {
    return;
  }

  skillGroupsMount.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const button = event.target.closest(".skill-button");

    if (button) {
      skillColorLegend?.classList.add("is-visible");
      setActiveSkill(button);
    }
  });

  skillGroupsMount.addEventListener("click", (event) => {
    const button = event.target.closest(".skill-button");

    if (button) {
      setActiveSkill(button);
    }
  });

  skillGroupsMount.addEventListener("focusin", (event) => {
    const button = event.target.closest(".skill-button");

    if (button) {
      setActiveSkill(button);
    }
  });

  skillGroupsMount.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "mouse") {
      return;
    }

    const groupElement = event.target.closest(".skill-group");

    if (groupElement && !groupElement.contains(event.relatedTarget)) {
      clearSkillGroup(groupElement);
    }

    if (!skillGroupsMount.contains(event.relatedTarget)) {
      hideSkillColorLegend();
    }
  });

  skillGroupsMount.addEventListener("focusout", (event) => {
    const groupElement = event.target.closest(".skill-group");

    if (groupElement && !groupElement.contains(event.relatedTarget)) {
      clearSkillGroup(groupElement);
    }

    if (!skillGroupsMount.contains(event.relatedTarget)) {
      hideSkillColorLegend();
    }
  });
}

function observeSkills() {
  if (!skillsSection) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    skillsSection.classList.add("is-visible");
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        skillsSection.classList.add("is-visible");
      } else {
        skillsSection.classList.remove("is-visible");
      }
    },
    { threshold: 0.18 }
  );

  observer.observe(skillsSection);
}

function getRevealElements() {
  return [
    ...document.querySelectorAll(".section-label"),
    ...document.querySelectorAll(".about .section-content h2, .about .section-content p"),
    ...document.querySelectorAll(".project-item, .project-toggle"),
    ...document.querySelectorAll(".contact-content > *"),
  ];
}

function setupScrollReveals() {
  const revealElements = [...new Set(getRevealElements())];

  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => {
      element.classList.add("scroll-reveal", "is-visible");
      element.style.removeProperty("--reveal-delay");
    });
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.14,
      }
    );
  }

  revealElements.forEach((element) => {
    element.classList.add("scroll-reveal");

    if (element.classList.contains("project-item")) {
      const rowIndex = [...document.querySelectorAll(".project-item")].indexOf(element);
      element.style.setProperty("--reveal-delay", `${Math.min(rowIndex * 70, 360)}ms`);
    } else if (element.closest(".contact-content")) {
      const contactIndex = [...document.querySelectorAll(".contact-content > *")].indexOf(element);
      element.style.setProperty("--reveal-delay", `${contactIndex * 75}ms`);
    } else if (element.matches(".about .section-content p")) {
      element.style.setProperty("--reveal-delay", "100ms");
    } else {
      element.style.removeProperty("--reveal-delay");
    }

    if (!element.classList.contains("is-visible")) {
      revealObserver.observe(element);
    }
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-label", "Open navigation");
  });
});

window.addEventListener("scroll", queueScrollMotion, { passive: true });

projectToggle?.addEventListener("click", () => {
  const wasExpanded = projectsExpanded;
  const toggleTopBeforeRender = projectToggle.getBoundingClientRect().top;

  projectsExpanded = !projectsExpanded;
  hideProjectPreview();
  renderProjects();

  if (wasExpanded && !projectsExpanded) {
    const toggleTopAfterRender = projectToggle.getBoundingClientRect().top;
    window.scrollBy({
      top: toggleTopAfterRender - toggleTopBeforeRender,
      behavior: "auto",
    });
  }
});

projectList?.addEventListener("click", (event) => {
  const projectLink = event.target.closest(".project-item");

  if (!projectLink) {
    return;
  }

  event.preventDefault();
  const project = getProjectById(projectLink.dataset.projectId);

  if (openProjectModal(projectLink.dataset.projectId) && project) {
    reportPortfolioEvent("project_opened", {
      projectId: project.id,
      projectName: project.title,
    });
  }
});

projectList?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  const projectLink = event.target.closest(".project-item");

  if (!projectLink) {
    return;
  }

  event.preventDefault();
  const project = getProjectById(projectLink.dataset.projectId);

  if (openProjectModal(projectLink.dataset.projectId) && project) {
    reportPortfolioEvent("project_opened", {
      projectId: project.id,
      projectName: project.title,
    });
  }
});

projectList?.addEventListener("pointerover", (event) => {
  const projectLink = event.target.closest(".project-item");

  if (!projectLink || projectLink.classList.contains("is-hidden")) {
    return;
  }

  const project = getProjectById(projectLink.dataset.projectId);

  if (project) {
    showProjectPreview(project, event);
  }
});

projectList?.addEventListener("pointermove", (event) => {
  const projectLink = event.target.closest(".project-item");

  if (projectLink && activeProjectId === projectLink.dataset.projectId) {
    moveProjectPreview(event);
  }
});

projectList?.addEventListener("pointerout", (event) => {
  const projectLink = event.target.closest(".project-item");

  if (projectLink && !projectLink.contains(event.relatedTarget)) {
    hideProjectPreview();
  }
});

projectModalClose?.addEventListener("click", closeProjectModal);

projectModal?.addEventListener("click", (event) => {
  if (event.target === imageLightbox) {
    closeImageLightbox();
    return;
  }

  if (event.target === projectModal) {
    closeProjectModal();
  }
});

projectModalContent?.addEventListener("click", (event) => {
  const documentLink = event.target.closest("[data-document-link]");

  if (documentLink) {
    reportPortfolioEvent("document_opened", {
      documentId: documentLink.dataset.eventDocumentId,
      documentName: documentLink.dataset.eventDocumentName,
    });
    return;
  }

  const imageExpand = event.target.closest("[data-image-expand]");

  if (imageExpand) {
    openImageLightbox(imageExpand.dataset.imageSrc, imageExpand.dataset.imageAlt);
    return;
  }

  const aboutToggle = event.target.closest("[data-about-toggle]");

  if (aboutToggle) {
    const aboutSection = aboutToggle.closest("[data-project-about]");
    const expandedContent = aboutSection?.querySelector("[data-about-more]");
    const isExpanded = aboutToggle.getAttribute("aria-expanded") === "true";

    if (expandedContent) {
      expandedContent.hidden = isExpanded;
      aboutToggle.setAttribute("aria-expanded", String(!isExpanded));
      aboutToggle.textContent = isExpanded
        ? aboutToggle.dataset.toggleLabel || "Read more"
        : aboutToggle.dataset.collapseLabel || "Show less";
    }

    return;
  }

  const control = event.target.closest("[data-carousel-direction], [data-carousel-index]");

  if (!control) {
    return;
  }

  const carousel = control.closest("[data-project-carousel]");

  if (!carousel) {
    return;
  }

  if (control.dataset.carouselDirection) {
    moveProjectCarousel(carousel, Number(control.dataset.carouselDirection));
    return;
  }

  syncProjectCarousel(carousel, Number(control.dataset.carouselIndex));
});

imageLightboxClose?.addEventListener("click", closeImageLightbox);

imageLightbox?.querySelector("[data-lightbox-reset]")?.addEventListener("click", resetLightboxZoom);

imageLightbox?.querySelectorAll("[data-lightbox-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    zoomLightbox(Number(button.dataset.lightboxZoom));
  });
});

imageLightboxStage?.addEventListener(
  "wheel",
  (event) => {
    if (!imageLightbox?.classList.contains("is-open")) {
      return;
    }

    event.preventDefault();
    zoomLightbox(event.deltaY < 0 ? 1 : -1);
  },
  { passive: false }
);

imageLightboxStage?.addEventListener("pointerdown", (event) => {
  if (!imageLightbox?.classList.contains("is-open") || lightboxScale <= 1) {
    return;
  }

  lightboxIsPanning = true;
  lightboxStartX = event.clientX - lightboxX;
  lightboxStartY = event.clientY - lightboxY;
  imageLightbox.classList.add("is-panning");
  imageLightboxStage.setPointerCapture?.(event.pointerId);
});

imageLightboxStage?.addEventListener("pointermove", (event) => {
  if (!lightboxIsPanning) {
    return;
  }

  lightboxX = event.clientX - lightboxStartX;
  lightboxY = event.clientY - lightboxStartY;
  applyLightboxTransform();
});

["pointerup", "pointerleave", "pointercancel"].forEach((eventName) => {
  imageLightboxStage?.addEventListener(eventName, (event) => {
    if (!lightboxIsPanning) {
      return;
    }

    lightboxIsPanning = false;
    imageLightbox?.classList.remove("is-panning");
    imageLightboxStage.releasePointerCapture?.(event.pointerId);
  });
});

projectModalContent?.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }

  const carousel = event.target.closest("[data-project-carousel]");

  if (!carousel) {
    return;
  }

  event.preventDefault();
  moveProjectCarousel(carousel, event.key === "ArrowRight" ? 1 : -1);
});

document.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return;
  }

  if (event.key === "Escape" && imageLightbox?.classList.contains("is-open")) {
    closeImageLightbox();
    return;
  }

  if (event.key === "Escape" && projectModal?.classList.contains("is-open")) {
    closeProjectModal();
    return;
  }

  if (
    (event.key === "ArrowLeft" || event.key === "ArrowRight") &&
    projectModal?.classList.contains("is-open")
  ) {
    const carousel = projectModal.querySelector("[data-project-carousel]");

    if (!carousel) {
      return;
    }

    event.preventDefault();
    moveProjectCarousel(carousel, event.key === "ArrowRight" ? 1 : -1);
  }
});

canHoverProjectPreview.addEventListener?.("change", hideProjectPreview);
window.addEventListener("resize", hideProjectPreview);

syncHeader();
syncScrollMotion();
reportPortfolioVisit();
setupHeroLetters();
renderProjects();
renderSkillColorLegend();
renderSkills();
bindSkillInteractions();
observeSkills();
setupScrollReveals();
setupMagneticTargets();
setupPronunciationTriggers();
setupPortfolioEventTracking();
startFallingStars();
