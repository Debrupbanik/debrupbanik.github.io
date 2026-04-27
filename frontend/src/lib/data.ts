export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  hash: string;
  date: string;
  message: string;
  org: string;
  description: string;
}

export interface Project {
  name: string;
  description: string;
  stack: string[];
  status: "RUNNING" | "ARCHIVED";
  github: string;
  stars?: number;
  lastUpdated?: string;
}

export const skills: Record<string, Skill[]> = {
  "ML & AI": [
    { name: "Machine Learning", level: 88 },
    { name: "Time Series Forecasting", level: 90 },
    { name: "LSTM", level: 85 },
    { name: "Anomaly Detection", level: 82 },
    { name: "A/B Testing", level: 70 },
  ],
  Tools: [
    { name: "Python", level: 90 },
    { name: "TensorFlow", level: 85 },
    { name: "Keras", level: 82 },
    { name: "Scikit-learn", level: 80 },
    { name: "Git/GitHub", level: 85 },
    { name: "Streamlit", level: 78 },
  ],
  Data: [
    { name: "Pandas", level: 88 },
    { name: "NumPy", level: 85 },
    { name: "Matplotlib", level: 75 },
    { name: "Seaborn", level: 72 },
    { name: "EDA", level: 85 },
  ],
  Languages: [
    { name: "English", level: 95 },
    { name: "Hindi", level: 90 },
    { name: "Bengali", level: 88 },
  ],
};

export const experience: Experience[] = [
  {
    hash: "e7f1a3b",
    date: "2025-12",
    message: "AI Intern @ One Aim IT Solutions",
    org: "One Aim IT Solutions",
    description:
      "Trained and optimized machine learning models for energy forecasting and anomaly detection. Improved model accuracy and training efficiency through feature engineering and hyperparameter tuning. Worked with LSTM, Random Forest, and Isolation Forest models in production-oriented pipelines. Assisted in benchmarking, evaluation, and deployment-ready model preparation.",
  },
  {
    hash: "c4d2e8f",
    date: "2023-09",
    message: "Web Developer @ The Speech Society",
    org: "The Speech Society",
    description:
      "Planned, developed, and maintained the official club website with 99% uptime, supporting 300+ students. Implemented 5+ feature enhancements and improved mobile responsiveness to boost engagement. Organized 10+ events, increasing student participation by 20% through digital communication.",
  },
];

export const education = {
  degree: "Bachelor of Technology",
  school: "University of Engineering & Management, Jaipur",
  period: "2023 – 2027",
  secondary: "Pranavananda Vidya Mandir",
  secondaryLevel: "Higher Secondary & Secondary",
};

export const projects: Project[] = [
  {
    name: "smart-energy-optimizer",
    description:
      "LSTM-based forecasting model achieving <5% MAE for hourly electricity consumption with Isolation Forest anomaly detection and Streamlit dashboard.",
    stack: ["Python", "TensorFlow", "LSTM", "Streamlit", "Pandas"],
    status: "RUNNING",
    github: "https://github.com/Debrupbanik/lstm_comparisons",
  },
  {
    name: "energy-consumption-forecasting",
    description:
      "Designed LSTM-based electricity consumption forecasting model using TensorFlow and Keras with <5% MAE on 1,000+ data points.",
    stack: ["Python", "TensorFlow", "Keras", "Pandas", "Matplotlib"],
    status: "RUNNING",
    github: "https://github.com/Debrupbanik/lstm_comparisons",
  },
  {
    name: "api-mesh-gateway",
    description:
      "AI-powered API gateway with intelligent request routing, circuit breaking, and smart caching using FastAPI and Redis.",
    stack: ["FastAPI", "Redis", "Python", "Docker"],
    status: "RUNNING",
    github: "https://github.com/Debrupbanik/api-mesh-gateway",
  },
  {
    name: "VaultDB",
    description:
      "CLI and web dashboard for database backup utility supporting MySQL, PostgreSQL, MongoDB, and SQLite with cloud storage integration.",
    stack: ["FastAPI", "Python", "MySQL", "PostgreSQL"],
    status: "RUNNING",
    github: "https://github.com/Debrupbanik/VaultDB",
  },
  {
    name: "DataForge",
    description:
      "All-in-one backend platform combining API gateway, energy forecasting, and database backup capabilities.",
    stack: ["Python", "FastAPI", "TensorFlow"],
    status: "RUNNING",
    github: "https://github.com/Debrupbanik/DataForge",
  },
  {
    name: "ai-trading-bot",
    description:
      "Cryptocurrency trading bot with predictive analytics and machine learning models.",
    stack: ["Python", "ML"],
    status: "ARCHIVED",
    github: "https://github.com/Debrupbanik/ai-trading-bot",
  },
];

export const contact = {
  email: "debrupbanik82@gmail.com",
  phone: "+91 6376935840",
  location: "Jaipur, India",
  dob: "09/08/2005",
  linkedin: "https://linkedin.com/in/debrup-banik-790662241",
  github: "https://github.com/Debrupbanik",
};

export const certifications = [
  { name: "IBM — Introduction to Machine Learning", issuer: "IBM" },
  { name: "NPTEL — The Joy of Computing Using Python", issuer: "NPTEL" },
];
