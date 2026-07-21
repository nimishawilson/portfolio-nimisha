export type SkillLevel = 'advanced' | 'intermediate' | 'beginner';

export interface Skill {
  name: string;
  level: SkillLevel;
  desc: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend Development',
    skills: [
      {
        name: 'Angular',
        level: 'advanced',
        desc: 'Extensive experience building scalable, production-grade applications using modern Angular. Strong focus on component architecture, modular design, and maintainability.',
      },
      {
        name: 'RxJS & State Management',
        level: 'advanced',
        desc: 'Experienced in handling complex asynchronous data flows, reactive programming, and optimizing performance in data-heavy applications.',
      },
      {
        name: 'HTML, CSS, JavaScript',
        level: 'advanced',
        desc: 'Strong foundation in core web technologies with a focus on responsive design, accessibility, and cross-browser compatibility.',
      },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      {
        name: 'NestJS',
        level: 'intermediate',
        desc: 'Building RESTful APIs, handling authentication, and structuring backend systems to support scalable frontend applications.',
      },
      {
        name: 'API Design & Integration',
        level: 'advanced',
        desc: 'Designing and consuming APIs with proper error handling, retry mechanisms, and performance considerations.',
      },
    ],
  },
  {
    title: 'System Design & Architecture',
    skills: [
      {
        name: 'Frontend Architecture',
        level: 'advanced',
        desc: 'Designing scalable and maintainable UI architectures for large applications, including modular structure and separation of concerns.',
      },
      {
        name: 'Performance Optimization',
        level: 'advanced',
        desc: 'Optimizing rendering, minimizing API calls, and improving application responsiveness in complex UIs.',
      },
      {
        name: 'Real-Time & Auto-Save Systems',
        level: 'intermediate',
        desc: 'Designing systems that handle frequent updates efficiently, ensuring data consistency and good user experience.',
      },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      {
        name: 'Git & Version Control',
        level: 'advanced',
        desc: 'Experience with collaborative workflows, code reviews, and maintaining clean version history.',
      },
      // {
      //   name: 'CI/CD & Build Tools',
      //   level: 'intermediate',
      //   desc: 'Familiar with build pipelines, deployment workflows, and maintaining code quality.',
      // },
      {
        name: 'AI Tools & Developer Productivity',
        level: 'beginner',
        desc: 'Actively exploring AI tools to improve development workflows, debugging, and productivity.',
      },
    ],
  },
  {
    title: 'Leadership & Collaboration',
    skills: [
      {
        name: 'Mentorship',
        level: 'intermediate',
        desc: 'Guiding junior developers, conducting code reviews, and helping improve coding standards and problem-solving skills.',
      },
      {
        name: 'Code Quality & Best Practices',
        level: 'advanced',
        desc: 'Advocating clean code, reusable components, and maintainable architecture across projects.',
      },
      {
        name: 'Communication & Team Collaboration',
        level: 'advanced',
        desc: 'Working closely with cross-functional teams to deliver high-quality products efficiently.',
      },
    ],
  },
];