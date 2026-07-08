export const personal = {
  name: 'Babu Kaliyamoorthy',
  role: 'Senior Android Engineer',
  experienceLabel: '13+ Years Experience',
  tagline:
    'Building secure, scalable and high-performance Android applications for Banking, FinTech and Enterprise products.',
  location: 'Dubai, UAE',
  email: 'babukb12@gmail.com',
  phone: '+971 553181568',
  linkedin: 'https://www.linkedin.com/in/babu-kaliyamoorthy/',
  github: 'https://github.com/babu-kaliyamoorthy',
  resumeFile: '/resume.pdf',
  roles: ['Senior Android Engineer', 'Kotlin Developer', 'Jetpack Compose Specialist', 'Android Architect'],
};

export const about = {
  title: 'About Me',
  paragraphs: [
    'Senior Android Engineer with over 13 years of experience building enterprise-grade Android applications across Banking, FinTech and E-Commerce.',
    'I specialize in Kotlin, MVVM, Clean Architecture, Jetpack Compose, Coroutines, Flow and modern Android development.',
    'I have successfully delivered business-critical mobile applications for Emirates NBD, Rabobank Netherlands, TSB Bank UK, Mamas & Papas Middle East and other enterprise organizations.',
    'I enjoy solving performance challenges, modularizing large applications and mentoring engineers.',
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
  { category: 'Architecture', skills: ['MVVM', 'Clean Architecture', 'Repository Pattern', 'Modularization'] },
  { category: 'Jetpack', skills: ['Compose', 'Navigation', 'ViewModel', 'LiveData', 'Room'] },
  { category: 'Networking', skills: ['Retrofit', 'REST', 'JSON', 'OkHttp'] },
  { category: 'Async', skills: ['Coroutines', 'Flow', 'RxJava'] },
  { category: 'Dependency Injection', skills: ['Hilt', 'Dagger'] },
  { category: 'Testing', skills: ['JUnit', 'Espresso'] },
  { category: 'CI/CD', skills: ['Jenkins', 'Git', 'SonarQube'] },
  { category: 'Tools', skills: ['Jira', 'Postman', 'Firebase', 'Android Studio'] },
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
    role: 'Senior Software Engineer',
    company: 'Emirates NBD (via Servion Global Solutions)',
    location: 'Dubai',
    period: 'Sep 2022 - Present',
    highlights: [
      'Designed and developed Kotlin-based features for the ENBD X mobile banking application supporting a large active user base.',
      'Built modern UI components using Jetpack Compose following MVVM and Clean Architecture principles.',
      'Implemented reactive and asynchronous flows using Kotlin Coroutines and Flow.',
      'Integrated backend services via secure REST APIs using Retrofit.',
      'Applied Hilt dependency injection to enhance modularity and maintainability.',
      'Improved application stability through memory management and lifecycle optimizations.',
      'Conducted peer code reviews ensuring adherence to banking security and quality standards.',
      'Collaborated with cross-functional teams and stakeholders for feature delivery and urgent issue resolution.',
      'Mentored junior engineers, improving development efficiency and code quality.',
      'Contributed to CI/CD workflows and automated testing strategies.',
    ],
    tech: ['Kotlin', 'Compose', 'MVVM', 'Hilt', 'Coroutines', 'Flow', 'Retrofit'],
  },
  {
    role: 'Senior Android Consultant - Mobility',
    company: 'Wipro Technologies (MindPool Tech)',
    client: 'Mamas & Papas Middle East',
    location: 'Dubai',
    period: 'Nov 2021 - Aug 2022',
    highlights: [
      'Developed and maintained Android applications using Kotlin and Android SDK.',
      'Delivered production enhancements and resolved critical defects for enterprise mobile platforms.',
      'Performed unit testing to ensure functional correctness and reliability.',
      'Collaborated directly with clients for requirement analysis and technical clarifications.',
      'Conducted code reviews and promoted best engineering practices.',
      'Guided junior developers on debugging, architecture, and performance considerations.',
    ],
    tech: ['Kotlin', 'Android SDK', 'Unit Testing'],
  },
  {
    role: 'Advisory System Analyst - Mobility',
    company: 'IBM India Pvt Ltd',
    client: 'TSB Bank (UK)',
    location: 'Chennai',
    period: 'Oct 2020 - Jul 2021',
    highlights: [
      'Contributed to the TSB UK mobile banking application delivering feature enhancements.',
      'Implemented secure login and biometric authentication mechanisms.',
      'Utilized Kotlin, RxJava, Retrofit, REST APIs, and XML UI.',
      'Ensured code quality via SonarQube, Lint, and comprehensive unit testing.',
      'Collaborated with distributed Agile teams and global stakeholders.',
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
      'Led Android development initiatives for international banking clients including Rabobank Netherlands.',
      'Designed scalable mobile solutions using Kotlin, RxJava, MVVM, and RESTful integrations.',
      'Optimized API communication through efficient Retrofit implementations.',
      'Improved application performance and responsiveness.',
      'Mentored developers and enforced architectural and code quality standards.',
      'Coordinated cross-functional teams within Agile delivery environments.',
    ],
    tech: ['Kotlin', 'RxJava', 'MVVM', 'Retrofit'],
  },
];

export type EducationEntry = {
  degree: string;
};

export const education: EducationEntry[] = [
  { degree: 'Master of Computer Applications' },
  { degree: 'Bachelor of Science' },
];

export type Achievement = {
  title: string;
  description: string;
  icon: 'trend' | 'feature' | 'modularization' | 'mentor';
};

export const achievements: Achievement[] = [
  {
    title: 'Increased Crash-Free Users',
    description: 'Improved crash-free user rate from 95% to 98% through rigorous RCA and performance optimization.',
    icon: 'trend',
  },
  {
    title: 'Owned End-to-End Features',
    description: 'Owned business-critical banking flows end-to-end, from design through production rollout.',
    icon: 'feature',
  },
  {
    title: 'Led Modularization',
    description: 'Led modularization of a large-scale Cards module to improve build times and team velocity.',
    icon: 'modularization',
  },
  {
    title: 'Mentored Developers',
    description: 'Mentored junior and mid-level engineers on Android architecture and best practices.',
    icon: 'mentor',
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
  { name: 'ENBD X', description: 'Emirates NBD Mobile Banking Application' },
  { name: 'TSB Bank UK', description: 'Mobile Banking Platform' },
  { name: 'Rabobank Netherlands', description: 'Digital Banking App' },
  { name: 'British Gas UK', description: 'Enterprise Mobile App' },
  { name: 'Mamas & Papas Middle East', description: 'E-commerce App' },
  { name: 'Pearson eText', description: 'Education Platform' },
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
