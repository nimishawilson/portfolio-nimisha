export interface Experience {
  role: string;
  company: string;
  duration: string;
  current: boolean;
  bullets: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Consultant',
    company: 'Capgemini',
    duration: 'Mar 2023 – Present',
    current: true,
    bullets: [
      'Designed and developed modern Angular interfaces, improving usability across enterprise-scale applications.',
      'Built and integrated backend APIs using NestJS, ensuring efficient data flow and system reliability.',
      'Contributed to frontend architecture decisions with a focus on scalability and long-term maintainability.',
      'Mentored junior developers on best practices, code quality, and structured problem-solving.',
    ],
  },
  {
    role: 'Angular Developer',
    company: 'Infospica',
    duration: 'Sep 2021 – Mar 2023',
    current: false,
    bullets: [
      'Developed and maintained scalable web applications tailored to complex client-specific requirements.',
      'Built reusable component libraries with custom form validations to ensure data integrity.',
      'Managed complex application state using RxJS-based patterns across data-heavy feature areas.',
      'Participated in system design discussions and drove improvements to overall application architecture.',
      'Led code reviews and mentored team members, raising the quality bar across the development workflow.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Abeyaantrix Solutions',
    duration: 'Nov 2020 – Aug 2021',
    current: false,
    bullets: [
      'Developed multiple web applications with an emphasis on reusable, well-structured component architecture.',
      'Integrated backend APIs using the Facade pattern, improving code maintainability and testability.',
      'Optimised UI rendering and state handling to deliver a smoother, more responsive user experience.',
      'Collaborated cross-functionally to maintain code consistency and quality across concurrent projects.',
    ],
  },
  {
    role: 'Angular Developer',
    company: 'Galtech Technologies',
    duration: 'Apr 2019 – Aug 2019',
    current: false,
    bullets: [
      'Contributed to an inventory management system for a Dubai-based client, delivering on tight timelines.',
      'Developed authentication modules and material management features end-to-end.',
      'Integrated Firebase for real-time database operations, improving system responsiveness.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Annvision Solutions',
    duration: 'Oct 2017 – Mar 2019',
    current: false,
    bullets: [
      'Built multiple web applications including job portals and admin dashboards from the ground up.',
      'Implemented user authentication and payment gateway integrations for production workloads.',
      'Developed scalable backend systems using CodeIgniter and core PHP with secure data handling.',
    ],
  },
];
