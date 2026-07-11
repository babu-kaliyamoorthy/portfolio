export const personal = {
  name: 'Babu Kaliyamoorthy',
  role: 'Senior Android Engineer',
  experienceLabel: '13+ Years Experience',
  tagline:
    'Building secure, scalable and high-performance Android applications for Banking, FinTech and Enterprise products.',
  location: 'Dubai, UAE',
  email: 'babukb12@gmail.com',
  phone: '+971 55 318 1568',
  linkedin: 'https://www.linkedin.com/in/babu-kaliyamoorthy/',
  github: 'https://github.com/babu-kaliyamoorthy',
  resumeFile: '/resume.docx',
  roles: ['Senior Android Engineer', 'Kotlin Developer', 'Jetpack Compose Specialist', 'Android Architect'],
};

export const about = {
  title: 'About Me',
  paragraphs: [
    'Senior Android Engineer with 13+ years of experience building secure, high-performance mobile banking applications, including 3+ years of hands-on UAE banking experience delivering the Emirates NBD (ENBD X) digital banking platform.',
    'Deep expertise in Kotlin, Jetpack Compose, MVVM, and Clean Architecture, with a track record of leading module modularization, improving app stability, and shipping critical banking journeys such as Credit Card Application and Credit Limit Increase.',
    'Combines strong individual-contributor engineering with technical leadership — mentoring developers, driving architecture decisions, and partnering with cross-functional teams — while consistently improving reliability, performance, and customer experience for large-scale digital banking platforms serving millions of users.',
    'Proven background across Emirates NBD (UAE), Rabobank (Netherlands), and TSB Bank (UK), with specialized focus on payments, authentication, biometrics, and secure banking transaction flows.',
  ],
};

export type Stat = {
  value: string;
  suffix?: string;
  label: string;
  isRange?: boolean;
  rangeFrom?: string;
  rangeTo?: string;
};

export const stats: Stat[] = [
  { value: '13', suffix: '+', label: 'Years Experience' },
  { value: '8', suffix: '+', label: 'Companies' },
  { value: 'Millions', label: 'Users Served' },
  { value: '95', suffix: '%', label: 'Crash Free Users', isRange: true, rangeFrom: '95%', rangeTo: '98%' },
  { value: '100', suffix: '+', label: 'Features Delivered' },
];

export type SkillCategory = {
  category: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  { category: 'Languages', skills: ['Kotlin', 'Java'] },
  {
    category: 'Android Development',
    skills: ['Android SDK', 'Jetpack Compose', 'XML UI', 'Material Design', 'Navigation Components', 'Android Lifecycle Components'],
  },
  {
    category: 'Architecture & Design',
    skills: ['MVVM', 'Clean Architecture', 'Repository Pattern', 'SOLID Principles', 'Modularization', 'Design Patterns'],
  },
  { category: 'Concurrency & Reactive Programming', skills: ['Kotlin Coroutines', 'Flow', 'StateFlow', 'RxJava'] },
  { category: 'Networking & Storage', skills: ['REST APIs', 'Retrofit', 'JSON', 'Room Database', 'SQLite', 'Local Caching'] },
  { category: 'Dependency Injection', skills: ['Hilt', 'Dagger'] },
  {
    category: 'Testing & Quality Engineering',
    skills: ['JUnit', 'Espresso', 'Firebase Crashlytics', 'SonarQube', 'Lint', 'Code Reviews'],
  },
  { category: 'DevOps & Tools', skills: ['CI/CD', 'Jenkins', 'Git', 'Jira', 'Postman', 'Agile / Scrum'] },
  {
    category: 'Domain Expertise',
    skills: ['Digital Banking', 'Payments', 'Authentication', 'Biometrics', 'Credit Card & Credit Limit Workflows', 'Enterprise Mobile Applications'],
  },
];

export type ExperienceEntry = {
  role: string;
  company: string;
  client?: string;
  location?: string;
  period?: string;
  highlights: string[];
  tech: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Software Engineer (Android)',
    company: 'Emirates NBD (via Servion Global Solutions)',
    location: 'Dubai, UAE',
    period: 'Sep 2022 - Present',
    highlights: [
      "Designed and delivered end-to-end Credit Card Application and Credit Limit Increase journeys using Kotlin, Jetpack Compose, and Clean Architecture, enabling customers to self-serve two of the bank's highest-traffic digital requests.",
      'Led the modularization of the Cards module within the ENBD X banking application, restructuring the codebase into independent modules that reduced build times and enabled multiple teams to develop features in parallel.',
      'Increased crash-free users from 95% to 98% by proactively debugging production issues, performing root cause analysis, and shipping targeted stability and performance fixes.',
      'Built asynchronous, reactive data flows using Kotlin Coroutines and Flow to handle real-time account, payment, and transaction data with improved responsiveness.',
      'Implemented Hilt-based dependency injection across feature modules, improving testability and reducing boilerplate for a growing engineering team.',
      'Delivered secure banking features covering payments, fund transfers, authentication, and account management in line with banking security and compliance standards.',
      'Owned production support for critical banking flows, performing RCA on live incidents and delivering hotfix releases with minimal customer disruption.',
      'Mentored junior and mid-level Android developers through code reviews and architecture discussions, raising overall code quality and consistency across the Cards team.',
    ],
    tech: ['Kotlin', 'Java', 'Jetpack Compose', 'MVVM', 'Clean Architecture', 'Hilt', 'Coroutines', 'Flow', 'Retrofit', 'Firebase Crashlytics', 'Jenkins', 'Git'],
  },
  {
    role: 'Senior Android Consultant',
    company: 'Wipro Technologies (MindPool Tech)',
    client: "Bloomingdale's Middle East",
    location: 'Dubai, UAE',
    period: 'Nov 2021 - Aug 2022',
    highlights: [
      "Built core commerce features — product catalogue, search, wishlist, cart, and secure checkout/payment flows — for Bloomingdale's Middle East, a high-traffic regional e-commerce application.",
      'Improved UI rendering performance and application responsiveness, reducing perceived load times across key shopping screens.',
      'Partnered with backend, product, and design teams to deliver features end-to-end within an Agile delivery model.',
    ],
    tech: ['Kotlin', 'Java', 'Android SDK', 'REST APIs', 'Agile', 'Git'],
  },
  {
    role: 'Advisory System Analyst - Mobility',
    company: 'IBM India Pvt Ltd',
    client: 'TSB Bank (UK)',
    location: 'Chennai',
    period: 'Oct 2020 - Jul 2021',
    highlights: [
      'Delivered mobile banking features for TSB Bank (UK), including account management, fund transfers, bill payments, and transaction tracking.',
      'Integrated biometric authentication to strengthen secure customer login and transaction approval flows.',
    ],
    tech: ['Kotlin', 'RxJava', 'Retrofit', 'REST', 'XML'],
  },
  {
    role: 'Technology Lead - Mobility',
    company: 'Cognizant Technology Solutions',
    client: 'Rabobank Netherlands',
    location: 'Chennai',
    period: 'Jan 2015 - Oct 2020',
    highlights: [
      "Led Android development for Rabobank's digital banking applications across Europe, owning the full feature lifecycle from requirements through production release.",
      'Delivered secure banking capabilities spanning payments, fund transfers, account management, and card services.',
      'Mentored developers and shaped technical decisions and coding standards across the mobile engineering team.',
    ],
    tech: ['Kotlin', 'RxJava', 'MVVM', 'Retrofit'],
  },
  {
    role: 'Android Developer',
    company: 'Suhasoft Pvt Ltd | LIV Pvt Ltd',
    location: 'Chennai',
    period: 'Feb 2013 - Dec 2014',
    highlights: [
      'Built native Android applications and reusable UI components across consumer-facing mobile products, establishing the engineering foundation for later banking and fintech work.',
    ],
    tech: ['Java', 'Android SDK', 'XML UI'],
  },
];

export type EducationEntry = {
  degree: string;
  institution?: string;
  year?: string;
};

export const education: EducationEntry[] = [
  { degree: 'Master of Computer Application (MCA)', institution: 'Anna University, Coimbatore', year: '2011' },
  { degree: 'Bachelor of Science (Physics)', institution: 'Bharathidasan University, Trichy', year: '2008' },
];

export type Achievement = {
  title: string;
  description: string;
  icon: 'trend' | 'feature' | 'modularization' | 'mentor' | 'recognition';
};

export const achievements: Achievement[] = [
  {
    title: 'Improved Crash-Free Users',
    description:
      'Improved crash-free user rate from 95% to 98% on a large-scale digital banking application through systematic production debugging and performance optimization.',
    icon: 'trend',
  },
  {
    title: 'Led Cards Modularization',
    description: 'Led Cards module modularization on ENBD X, improving scalability, build performance, and cross-team engineering velocity.',
    icon: 'modularization',
  },
  {
    title: 'Delivered Core Banking Journeys',
    description:
      "Delivered two of the bank's core digital self-service journeys — Credit Card Application and Credit Limit Increase — from design through production.",
    icon: 'feature',
  },
  {
    title: 'Recognized for Excellence',
    description: 'Recognized with multiple performance awards across Emirates NBD, Wipro, and Cognizant for technical contribution and delivery excellence.',
    icon: 'recognition',
  },
];

export type Award = {
  title: string;
  organization: string;
};

export const awards: Award[] = [
  { title: 'Excel Award', organization: 'Emirates NBD' },
  { title: 'Spot Award', organization: 'Wipro' },
  { title: 'Spotlight Award', organization: 'Cognizant' },
  { title: 'Extra Mile Award', organization: 'Cognizant' },
];

export type Project = {
  name: string;
  description: string;
};

export const projects: Project[] = [
  { name: 'ENBD X', description: 'Emirates NBD Digital Banking Application (UAE)' },
  { name: 'TSB Bank UK', description: 'Mobile Banking Platform' },
  { name: 'Rabobank Netherlands', description: 'Digital Banking Application' },
  { name: "Bloomingdale's Middle East", description: 'E-commerce Application' },
];

export type WhyHireMeItem = {
  title: string;
  description: string;
};

export const whyHireMe: WhyHireMeItem[] = [
  {
    title: 'Enterprise Banking Experience',
    description: 'Over a decade delivering secure, compliant mobile applications for major banks and fintechs.',
  },
  {
    title: 'Architecture Leadership',
    description: 'Designs scalable MVVM and Clean Architecture solutions for large, long-lived codebases.',
  },
  {
    title: 'Performance Optimization',
    description: 'Track record of measurably improving crash-free rates and app performance in production.',
  },
  {
    title: 'Clean Code',
    description: 'Champions maintainable, well-tested code that scales with growing engineering teams.',
  },
  {
    title: 'Scalable Solutions',
    description: 'Experienced in modularizing large applications to improve build times and team autonomy.',
  },
  {
    title: 'Problem Solver',
    description: 'Thrives on root-cause analysis and solving hard production issues under pressure.',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Awards', href: '#awards' },
  { label: 'Contact', href: '#contact' },
];
