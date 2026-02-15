export type PlacementCategory = "Marquee" | "Super Dream" | "Dream" | "Core" | "IT" | "Startup";

export interface HiringTrend {
  year: string;
  count: number;
}

export interface CompensationHistory {
  year: string;
  ctc: number;
}

export interface SelectionRound {
  title: string;
  mode: string;
  duration: string;
  description: string;
  focus?: string; // New: Focus of the round
  questions?: string[]; // New: Typical questions
}

export interface Skill {
  name: string;
  bloomLevel: "CU" | "AP" | "AN" | "EV" | "CR"; // Conceptual, Application, Analysis, Evaluation, Creation
  level: number; // 1-10
  proficiency: number; // 1-10
  topics: string[];
}

export interface InnovXProject {
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  skills: string[];
  relevance: string;
}

export interface Leader {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface Financials {
  revenueGrowth: string;
  profitMargin: string;
  rndIvestment: string;
}

export interface CultureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  descriptor: string;
  category: PlacementCategory;
  industry: string;
  type: string;
  founded: string;
  employees: string;
  compensationRange: string;
  ctcValue: number;
  fixedComponent: number;
  variableComponent: number;
  bonus: number;
  serviceAgreement: string;
  location: string;
  locations: string[];
  workMode: string;
  eligibility: string[];
  revenue: string;
  marketCap: string;
  globalPresence: string;
  hiringTrend: HiringTrend[];
  compensationHistory: CompensationHistory[];
  studentsSelected: number;
  highestPackage: string;
  averagePackage: string;
  departmentsSelected: string[];
  roleDescription: string;
  teamStructure: string;
  technologies: string[];
  department: string;
  employmentType: string;
  selectionProcess: SelectionRound[];
  skills?: Skill[];
  innovxProjects?: InnovXProject[];
  leadership?: Leader[];
  financials?: Financials;
  culture?: CultureItem[];
  about?: string;
  vision?: string;
  mission?: string;
}

export const companies: Company[] = [
  {
    id: "google",
    name: "Google",
    logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
    descriptor: "Global Technology & Search Company",
    category: "Marquee",
    industry: "Technology",
    type: "Public Company",
    founded: "1998",
    employees: "180,000+",
    compensationRange: "₹42L – ₹58L",
    ctcValue: 4800000,
    fixedComponent: 3200000,
    variableComponent: 1000000,
    bonus: 600000,
    serviceAgreement: "None",
    location: "Bangalore",
    locations: ["Bangalore", "Hyderabad", "Gurgaon"],
    workMode: "Hybrid",
    eligibility: ["CGPA ≥ 8.0", "CSE / IT / ECE", "No active backlogs"],
    revenue: "$307B",
    marketCap: "$2.1T",
    globalPresence: "50+ countries",
    hiringTrend: [
      { year: "2021", count: 12 },
      { year: "2022", count: 18 },
      { year: "2023", count: 15 },
      { year: "2024", count: 22 },
      { year: "2025", count: 20 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 38 },
      { year: "2022", ctc: 42 },
      { year: "2023", ctc: 45 },
      { year: "2024", ctc: 48 },
      { year: "2025", ctc: 52 },
    ],
    studentsSelected: 22,
    highestPackage: "₹58 LPA",
    averagePackage: "₹48 LPA",
    departmentsSelected: ["CSE", "IT", "ECE"],
    roleDescription: "As a Software Engineer at Google, you will design, develop, test, deploy, maintain, and improve software across Google's vast product ecosystem. You'll work on some of the most complex technical challenges in large-scale computing and information retrieval.",
    teamStructure: "Small, agile teams of 4-8 engineers working on focused product areas. Engineers are expected to contribute across the full stack and collaborate with cross-functional teams including product managers, designers, and researchers.",
    technologies: ["Python", "Go", "C++", "Java", "TensorFlow", "Kubernetes", "GCP"],
    department: "Engineering",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Assessment", mode: "Online", duration: "90 minutes", description: "Two coding problems focusing on data structures, algorithms, and problem-solving skills.", focus: "DSA & Problem Solving", questions: ["Dynamic Programming", "Graph Theory"] },
      { title: "Technical Interview Round 1", mode: "Virtual", duration: "45 minutes", description: "In-depth coding interview covering algorithms, system design fundamentals, and analytical thinking.", focus: "Algorithms & Clean Code", questions: ["Tree Traversal", "System Design Basics"] },
      { title: "Technical Interview Round 2", mode: "Virtual", duration: "45 minutes", description: "Advanced problem-solving with focus on scalable system design and optimization.", focus: "System Design & Scalability", questions: ["Distributed Caching", "Load Balancing"] },
      { title: "Googleyness & Leadership", mode: "Virtual", duration: "45 minutes", description: "Behavioral interview assessing cultural fit, collaboration, and leadership qualities.", focus: "Culture Fit", questions: ["Tell me about a time you failed", "Conflict Resolution"] },
    ],
    skills: [
      { name: "Algorithms", bloomLevel: "EV", level: 8, proficiency: 9, topics: ["Dynamic Programming", "Graph Theory", "Greedy Args"] },
      { name: "System Design", bloomLevel: "AN", level: 7, proficiency: 8, topics: ["Scalability", "Load Balancing", "Consistency Patterns"] },
      { name: "Data Structures", bloomLevel: "AP", level: 9, proficiency: 9, topics: ["Trees", "Graphs", "Heaps", "Tries"] },
    ],
    innovxProjects: [
      { title: "Distributed Search Engine", description: "Build a mini search engine that crawls, indexes, and serves queries.", difficulty: "Advanced", skills: ["Go", "Distributed Systems", "MapReduce"], relevance: "Core Search Infra" },
      { title: "AI Image Classifier", description: "Train a model to classify images using TensorFlow.", difficulty: "Intermediate", skills: ["Python", "TensorFlow", "ML"], relevance: "Google Photos / Lens" },
    ],
    leadership: [
      { name: "Sundar Pichai", role: "CEO", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_pichai.png/440px-Sundar_pichai.png" },
      { name: "Ruth Porat", role: "CFO", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ruth_Porat_2019.jpg/440px-Ruth_Porat_2019.jpg" },
    ],
    financials: {
      revenueGrowth: "15% YoY",
      profitMargin: "24%",
      rndIvestment: "$45B (2024)",
    },
    culture: [
      { title: "Innovation", description: "Encourages 20% time for personal projects." },
      { title: "Inclusivity", description: "Diverse workforce with global perspective." },
    ],
    about: "Google is not just a search engine; it's a global technology leader that organizes the world's information and makes it universally accessible and useful. From Search to Maps, Gmail to YouTube, Google's products are used by billions of people every day. The company fosters a culture of innovation, encouraging engineers to solve big problems.",
    vision: "To provide access to the world's information in one click.",
    mission: "To organize the world's information and make it universally accessible and useful.",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    descriptor: "Cloud Computing & Enterprise Software",
    category: "Marquee",
    industry: "Technology",
    type: "Public Company",
    founded: "1975",
    employees: "220,000+",
    compensationRange: "₹40L – ₹54L",
    ctcValue: 4400000,
    fixedComponent: 3000000,
    variableComponent: 900000,
    bonus: 500000,
    serviceAgreement: "None",
    location: "Hyderabad",
    locations: ["Hyderabad", "Bangalore", "Noida"],
    workMode: "Hybrid",
    eligibility: ["CGPA ≥ 7.5", "CSE / IT / ECE / EEE", "No active backlogs"],
    revenue: "$245B",
    marketCap: "$3.1T",
    globalPresence: "100+ countries",
    hiringTrend: [
      { year: "2021", count: 20 },
      { year: "2022", count: 25 },
      { year: "2023", count: 18 },
      { year: "2024", count: 28 },
      { year: "2025", count: 24 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 36 },
      { year: "2022", ctc: 40 },
      { year: "2023", ctc: 42 },
      { year: "2024", ctc: 44 },
      { year: "2025", ctc: 48 },
    ],
    studentsSelected: 28,
    highestPackage: "₹54 LPA",
    averagePackage: "₹44 LPA",
    departmentsSelected: ["CSE", "IT", "ECE", "EEE"],
    roleDescription: "As a Software Development Engineer at Microsoft, you'll build features used by millions of users worldwide. You'll work on Azure, Microsoft 365, or other product groups, contributing to cloud infrastructure, AI services, and developer tools.",
    teamStructure: "Teams of 5-10 engineers under an engineering manager, organized by product area. Strong emphasis on mentorship, code reviews, and knowledge sharing across teams.",
    technologies: ["C#", ".NET", "Azure", "TypeScript", "React", "Python", "Kubernetes"],
    department: "Engineering",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Coding Test", mode: "Online", duration: "75 minutes", description: "Three coding problems of increasing difficulty covering DS, algorithms, and logic." },
      { title: "Technical Round 1", mode: "Virtual", duration: "60 minutes", description: "Coding and problem-solving interview with focus on data structures and algorithms." },
      { title: "Technical Round 2", mode: "Virtual", duration: "60 minutes", description: "System design discussion and advanced coding problem-solving." },
      { title: "HR Round", mode: "Virtual", duration: "30 minutes", description: "Discussion about career goals, team fit, and alignment with Microsoft's mission." },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png",
    descriptor: "E-commerce & Cloud Infrastructure",
    category: "Super Dream",
    industry: "Technology / Retail",
    type: "Public Company",
    founded: "1994",
    employees: "1,500,000+",
    compensationRange: "₹32L – ₹45L",
    ctcValue: 3600000,
    fixedComponent: 2400000,
    variableComponent: 800000,
    bonus: 400000,
    serviceAgreement: "None",
    location: "Bangalore",
    locations: ["Bangalore", "Hyderabad", "Chennai"],
    workMode: "Onsite",
    eligibility: ["CGPA ≥ 7.0", "All branches", "No active backlogs"],
    revenue: "$620B",
    marketCap: "$2.0T",
    globalPresence: "30+ countries",
    hiringTrend: [
      { year: "2021", count: 30 },
      { year: "2022", count: 35 },
      { year: "2023", count: 25 },
      { year: "2024", count: 32 },
      { year: "2025", count: 28 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 28 },
      { year: "2022", ctc: 32 },
      { year: "2023", ctc: 34 },
      { year: "2024", ctc: 36 },
      { year: "2025", ctc: 40 },
    ],
    studentsSelected: 32,
    highestPackage: "₹45 LPA",
    averagePackage: "₹36 LPA",
    departmentsSelected: ["CSE", "IT", "ECE", "ME", "EEE"],
    roleDescription: "As an SDE at Amazon, you'll own the design, development, and maintenance of scalable systems that serve millions of customers. You'll work on distributed systems, microservices, and large-scale data processing.",
    teamStructure: "Two-pizza teams (6-10 engineers) with full ownership of their services. Strong ownership culture with engineers responsible for on-call, deployment, and customer impact.",
    technologies: ["Java", "Python", "AWS", "DynamoDB", "React", "TypeScript"],
    department: "Engineering",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Assessment", mode: "Online", duration: "120 minutes", description: "Two coding problems plus a work simulation focusing on Amazon Leadership Principles." },
      { title: "Technical Round 1", mode: "Virtual", duration: "60 minutes", description: "Data structures, algorithms, and behavioral questions based on Leadership Principles." },
      { title: "Technical Round 2", mode: "Virtual", duration: "60 minutes", description: "System design and coding with focus on scalability and real-world problem solving." },
      { title: "Bar Raiser Round", mode: "Virtual", duration: "60 minutes", description: "Cross-functional interview assessing overall engineering competence and cultural alignment." },
    ],
  },
  {
    id: "goldman-sachs",
    name: "Goldman Sachs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/200px-Goldman_Sachs.svg.png",
    descriptor: "Global Investment Banking & Financial Services",
    category: "Super Dream",
    industry: "Finance",
    type: "Public Company",
    founded: "1869",
    employees: "45,000+",
    compensationRange: "₹28L – ₹38L",
    ctcValue: 3200000,
    fixedComponent: 2200000,
    variableComponent: 700000,
    bonus: 300000,
    serviceAgreement: "2 years",
    location: "Bangalore",
    locations: ["Bangalore", "Hyderabad"],
    workMode: "Hybrid",
    eligibility: ["CGPA ≥ 7.5", "CSE / IT / Math", "No active backlogs"],
    revenue: "$51B",
    marketCap: "$175B",
    globalPresence: "40+ countries",
    hiringTrend: [
      { year: "2021", count: 15 },
      { year: "2022", count: 20 },
      { year: "2023", count: 14 },
      { year: "2024", count: 18 },
      { year: "2025", count: 16 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 24 },
      { year: "2022", ctc: 28 },
      { year: "2023", ctc: 30 },
      { year: "2024", ctc: 32 },
      { year: "2025", ctc: 35 },
    ],
    studentsSelected: 18,
    highestPackage: "₹38 LPA",
    averagePackage: "₹32 LPA",
    departmentsSelected: ["CSE", "IT", "Mathematics"],
    roleDescription: "As an Analyst in the Engineering Division, you will build platforms and tools for trading, risk management, and financial analytics. You'll work on high-performance systems that process real-time market data.",
    teamStructure: "Teams of 6-12 engineers organized by business function. Collaborative environment with strong mentorship from senior engineers and regular knowledge sharing sessions.",
    technologies: ["Java", "Python", "React", "SecDB", "Slang", "Cloud Infrastructure"],
    department: "Engineering Division",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Coding Assessment", mode: "Online", duration: "60 minutes", description: "Algorithmic coding problems and quantitative aptitude questions." },
      { title: "Technical Interview", mode: "Virtual", duration: "45 minutes", description: "Deep dive into CS fundamentals, OOP concepts, and problem solving." },
      { title: "System Design Round", mode: "Virtual", duration: "45 minutes", description: "Discussion on designing scalable financial systems and data pipelines." },
      { title: "Cultural Fit Interview", mode: "Virtual", duration: "30 minutes", description: "Assessment of teamwork, communication skills, and alignment with firm values." },
    ],
  },
  {
    id: "infosys",
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png",
    descriptor: "IT Consulting & Digital Services",
    category: "Core",
    industry: "IT Services",
    type: "Public Company",
    founded: "1981",
    employees: "340,000+",
    compensationRange: "₹3.6L – ₹6L",
    ctcValue: 450000,
    fixedComponent: 350000,
    variableComponent: 60000,
    bonus: 40000,
    serviceAgreement: "1 year",
    location: "Multiple cities",
    locations: ["Bangalore", "Pune", "Hyderabad", "Mysore", "Chennai"],
    workMode: "Onsite",
    eligibility: ["CGPA ≥ 6.0", "All branches", "No active backlogs"],
    revenue: "$19B",
    marketCap: "$95B",
    globalPresence: "50+ countries",
    hiringTrend: [
      { year: "2021", count: 80 },
      { year: "2022", count: 120 },
      { year: "2023", count: 60 },
      { year: "2024", count: 90 },
      { year: "2025", count: 85 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 3.6 },
      { year: "2022", ctc: 3.6 },
      { year: "2023", ctc: 4.0 },
      { year: "2024", ctc: 4.5 },
      { year: "2025", ctc: 5.0 },
    ],
    studentsSelected: 90,
    highestPackage: "₹6 LPA",
    averagePackage: "₹4.5 LPA",
    departmentsSelected: ["CSE", "IT", "ECE", "EEE", "ME", "CE"],
    roleDescription: "As a Systems Engineer at Infosys, you'll work on enterprise software development, maintenance, and digital transformation projects for global clients across various industries.",
    teamStructure: "Project-based teams of 10-20 members with project leads and delivery managers. Structured learning path through Infosys Global Education Center.",
    technologies: ["Java", "Python", "SQL", "SAP", "Salesforce", "Cloud"],
    department: "Digital Services",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Assessment", mode: "Online", duration: "90 minutes", description: "Aptitude, logical reasoning, and basic programming questions." },
      { title: "Technical Interview", mode: "Virtual", duration: "30 minutes", description: "Questions on programming fundamentals, DBMS, and basic CS concepts." },
      { title: "HR Interview", mode: "Virtual", duration: "20 minutes", description: "Discussion about background, interests, and willingness to relocate." },
    ],
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "https://razorpay.com/assets/razorpay-logo.svg",
    descriptor: "Digital Payments & Financial Infrastructure",
    category: "Dream",
    industry: "Fintech",
    type: "Private Company",
    founded: "2014",
    employees: "3,000+",
    compensationRange: "₹18L – ₹28L",
    ctcValue: 2200000,
    fixedComponent: 1600000,
    variableComponent: 400000,
    bonus: 200000,
    serviceAgreement: "None",
    location: "Bangalore",
    locations: ["Bangalore"],
    workMode: "Hybrid",
    eligibility: ["CGPA ≥ 7.0", "CSE / IT", "No active backlogs"],
    revenue: "Undisclosed",
    marketCap: "Valued at $7.5B",
    globalPresence: "India-focused",
    hiringTrend: [
      { year: "2021", count: 8 },
      { year: "2022", count: 12 },
      { year: "2023", count: 10 },
      { year: "2024", count: 14 },
      { year: "2025", count: 12 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 14 },
      { year: "2022", ctc: 18 },
      { year: "2023", ctc: 20 },
      { year: "2024", ctc: 22 },
      { year: "2025", ctc: 25 },
    ],
    studentsSelected: 14,
    highestPackage: "₹28 LPA",
    averagePackage: "₹22 LPA",
    departmentsSelected: ["CSE", "IT"],
    roleDescription: "As a Software Engineer at Razorpay, you'll build payment infrastructure that powers millions of businesses. You'll work on distributed systems, payment processing, and financial APIs at scale.",
    teamStructure: "Small, autonomous squads of 4-6 engineers owning specific product domains. Fast-paced startup culture with high ownership and direct impact on product direction.",
    technologies: ["Go", "Ruby", "React", "PostgreSQL", "Kubernetes", "AWS"],
    department: "Engineering",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Coding Challenge", mode: "Online", duration: "90 minutes", description: "Three algorithmic problems focusing on data structures and real-world problem-solving." },
      { title: "Technical Round 1", mode: "Virtual", duration: "60 minutes", description: "Deep dive into system design and coding with focus on distributed systems." },
      { title: "Technical Round 2", mode: "Virtual", duration: "45 minutes", description: "Advanced problem-solving and discussion on past projects and technical decisions." },
      { title: "Culture Fit Round", mode: "Virtual", duration: "30 minutes", description: "Discussion about startup mindset, ownership, and alignment with Razorpay's mission." },
    ],
  },
  {
    id: "tcs",
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/200px-Tata_Consultancy_Services_Logo.svg.png",
    descriptor: "IT Services & Business Solutions",
    category: "Core",
    industry: "IT Services",
    type: "Public Company",
    founded: "1968",
    employees: "600,000+",
    compensationRange: "₹3.5L – ₹7L",
    ctcValue: 500000,
    fixedComponent: 380000,
    variableComponent: 70000,
    bonus: 50000,
    serviceAgreement: "1 year",
    location: "Multiple cities",
    locations: ["Mumbai", "Chennai", "Bangalore", "Hyderabad", "Pune"],
    workMode: "Onsite",
    eligibility: ["CGPA ≥ 6.0", "All branches", "No active backlogs"],
    revenue: "$29B",
    marketCap: "$190B",
    globalPresence: "55+ countries",
    hiringTrend: [
      { year: "2021", count: 100 },
      { year: "2022", count: 140 },
      { year: "2023", count: 75 },
      { year: "2024", count: 95 },
      { year: "2025", count: 110 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 3.5 },
      { year: "2022", ctc: 3.5 },
      { year: "2023", ctc: 4.0 },
      { year: "2024", ctc: 4.5 },
      { year: "2025", ctc: 5.0 },
    ],
    studentsSelected: 110,
    highestPackage: "₹7 LPA",
    averagePackage: "₹5 LPA",
    departmentsSelected: ["CSE", "IT", "ECE", "EEE", "ME", "CE", "Chemical"],
    roleDescription: "As an Assistant Systems Engineer, you'll work on software development, testing, and maintenance for enterprise clients globally. Training provided through TCS Initial Learning Program.",
    teamStructure: "Large project teams of 15-30 members with clearly defined roles, working under project managers and delivery leads.",
    technologies: ["Java", ".NET", "Python", "SQL", "Angular", "Cloud"],
    department: "IT Services",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "TCS NQT", mode: "Online", duration: "120 minutes", description: "National Qualifier Test covering aptitude, programming logic, and coding." },
      { title: "Technical Interview", mode: "Virtual", duration: "30 minutes", description: "Questions on programming, DBMS, OS, and networking fundamentals." },
      { title: "HR Interview", mode: "Virtual", duration: "20 minutes", description: "General discussion about background, location preferences, and career goals." },
    ],
  },
  {
    id: "zeta",
    name: "Zeta",
    logo: "https://www.zeta.tech/in/themes/custom/flavor_starter/images/Logo.svg",
    descriptor: "Banking Technology Platform",
    category: "Startup",
    industry: "Fintech",
    type: "Private Company",
    founded: "2015",
    employees: "2,500+",
    compensationRange: "₹20L – ₹30L",
    ctcValue: 2400000,
    fixedComponent: 1800000,
    variableComponent: 400000,
    bonus: 200000,
    serviceAgreement: "None",
    location: "Hyderabad",
    locations: ["Hyderabad", "Bangalore"],
    workMode: "Hybrid",
    eligibility: ["CGPA ≥ 7.5", "CSE / IT", "No active backlogs"],
    revenue: "Undisclosed",
    marketCap: "Valued at $1.5B",
    globalPresence: "India, UAE, Philippines",
    hiringTrend: [
      { year: "2021", count: 5 },
      { year: "2022", count: 8 },
      { year: "2023", count: 6 },
      { year: "2024", count: 10 },
      { year: "2025", count: 8 },
    ],
    compensationHistory: [
      { year: "2021", ctc: 16 },
      { year: "2022", ctc: 20 },
      { year: "2023", ctc: 22 },
      { year: "2024", ctc: 24 },
      { year: "2025", ctc: 27 },
    ],
    studentsSelected: 10,
    highestPackage: "₹30 LPA",
    averagePackage: "₹24 LPA",
    departmentsSelected: ["CSE", "IT"],
    roleDescription: "As a Member of Technical Staff at Zeta, you'll build next-generation banking infrastructure powering issuing, processing, and core banking for financial institutions worldwide.",
    teamStructure: "Small, cross-functional pods of 3-5 engineers with high autonomy. Direct collaboration with founders and senior leadership on product vision.",
    technologies: ["Java", "Go", "React", "Kubernetes", "PostgreSQL", "gRPC"],
    department: "Engineering",
    employmentType: "Full-time",
    selectionProcess: [
      { title: "Online Test", mode: "Online", duration: "60 minutes", description: "Algorithmic coding problems with focus on efficiency and clean code." },
      { title: "Technical Round 1", mode: "Virtual", duration: "60 minutes", description: "Live coding and system design discussion on banking and payments systems." },
      { title: "Technical Round 2", mode: "Virtual", duration: "45 minutes", description: "Deep technical discussion on distributed systems and scalability." },
      { title: "Founder Round", mode: "Virtual", duration: "30 minutes", description: "Discussion with founding team about problem-solving approach and cultural fit." },
    ],
  },
];

export const categories: PlacementCategory[] = ["Marquee", "Super Dream", "Dream", "Core", "IT", "Startup"];

export const categoryColors: Record<PlacementCategory, string> = {
  "Marquee": "bg-badge-marquee/10 text-badge-marquee",
  "Super Dream": "bg-badge-super-dream/10 text-badge-super-dream",
  "Dream": "bg-badge-dream/10 text-badge-dream",
  "Core": "bg-badge-core/10 text-badge-core",
  "IT": "bg-badge-it/10 text-badge-it",
  "Startup": "bg-badge-startup/10 text-badge-startup",
};
