export interface Project {
  slug: string;
  icon: string;
  title: string;
  shortDesc: string;
  status: 'in-progress' | 'completed';
  stack: string[];
  problemStatement: string;
  role: string[];
  techStack: { label: string; value: string }[];
  challenges: string[];
  architecturalDecisions: string[];
  outcomes: string[];
  statusNote: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'ai-chat-autosave',
    icon: '⚡',
    title: 'AI-Powered Chat with Auto-Save',
    shortDesc:
      'Real-time chat application with intelligent auto-save, debounced API calls, and resilient state management under unstable network conditions.',
    status: 'in-progress',
    stack: ['Angular', 'RxJS', 'NestJS'],
    problemStatement:
      'Modern chat applications require real-time updates, reliable message persistence, and a smooth user experience even under unstable network conditions. The challenge is to design a system that ensures data consistency while handling frequent user interactions efficiently.',
    role: [
      'Designed and developed the frontend architecture using Angular',
      'Built backend APIs using NestJS',
      'Implemented real-time data handling and auto-save mechanisms',
      'Made key decisions around performance optimization and state management',
    ],
    techStack: [
      { label: 'Frontend', value: 'Angular, RxJS' },
      { label: 'Backend', value: 'NestJS' },
      { label: 'Communication', value: 'REST APIs (extendable to WebSockets)' },
      { label: 'Tools', value: 'Git' },
    ],
    challenges: [
      'Handling frequent input changes without overwhelming the backend',
      'Ensuring data consistency during network failures',
      'Managing state efficiently in a real-time environment',
      'Preventing performance issues due to excessive API calls',
    ],
    architecturalDecisions: [
      'Implemented debouncing and batching for API calls to reduce load',
      'Designed a modular frontend architecture for scalability',
      'Used reactive programming (RxJS) to handle real-time updates',
      'Structured backend APIs to support incremental updates instead of full payloads',
    ],
    outcomes: [
      'Improved performance by reducing unnecessary API calls',
      'Created a scalable foundation for real-time features',
      'Delivered a smooth and responsive user experience',
      'Established reusable patterns for similar data-heavy applications',
    ],
    statusNote: '🚧 In Progress – Currently working on real-time sync improvements',
  },
  {
    slug: 'data-grid-platform',
    icon: '📊',
    title: 'High-Performance Data Grid Platform',
    shortDesc:
      'Scalable grid-based interface handling thousands of rows with virtual scrolling, inline editing, and real-time data sync.',
    status: 'completed',
    stack: ['Angular', 'RxJS', 'REST APIs'],
    problemStatement:
      'Enterprise users needed to view, edit, and interact with datasets containing tens of thousands of rows without performance degradation. The existing table implementation caused significant lag on large datasets and did not support inline editing or live updates.',
    role: [
      'Architected the grid component with virtual scrolling for performance',
      'Built inline editing with optimistic UI updates and rollback on failure',
      'Integrated real-time data sync using polling and RxJS streams',
      'Established a reusable grid abstraction consumed across multiple features',
    ],
    techStack: [
      { label: 'Frontend', value: 'Angular, RxJS' },
      { label: 'Backend', value: 'REST APIs' },
      { label: 'Rendering', value: 'Virtual DOM / CDK Virtual Scroll' },
      { label: 'Tools', value: 'Git, CI/CD' },
    ],
    challenges: [
      'Rendering thousands of rows without freezing the browser',
      'Keeping inline edits consistent with server state',
      'Debouncing live search and filter inputs across a large dataset',
      'Maintaining accessibility (keyboard navigation) in a custom grid',
    ],
    architecturalDecisions: [
      'Used Angular CDK Virtual Scroll to render only visible rows',
      'Implemented optimistic updates with a revert queue for failed saves',
      'Centralised grid state in a dedicated service using BehaviorSubjects',
      'Abstracted grid configuration into a declarative schema for reuse',
    ],
    outcomes: [
      'Reduced initial render time by ~80% compared to the previous table',
      'Zero reported data-loss incidents after inline edit rollback was introduced',
      'Grid abstraction reused across 6 separate feature modules',
      'Positive feedback from users on responsiveness and edit experience',
    ],
    statusNote: '✅ Completed',
  },
  {
    slug: 'frontend-architecture',
    icon: '🏗️',
    title: 'Modular Frontend Architecture Redesign',
    shortDesc:
      'Led a full architectural overhaul of a legacy Angular app — introducing feature modules, lazy loading, and a shared design system.',
    status: 'completed',
    stack: ['Angular', 'Lazy Loading', 'Design System'],
    problemStatement:
      'A growing Angular application had accumulated years of technical debt: monolithic modules, duplicated components, no shared design language, and build times that slowed developer productivity. The application needed a full architectural reset without disrupting active feature development.',
    role: [
      'Audited the existing codebase and produced a migration plan',
      'Introduced feature-based module structure and lazy loading',
      'Built a shared component library and design token system',
      'Mentored team members through the migration and new patterns',
    ],
    techStack: [
      { label: 'Frontend', value: 'Angular (latest), SCSS' },
      { label: 'Architecture', value: 'Feature modules, Lazy loading' },
      { label: 'Design System', value: 'Custom component library, Design tokens' },
      { label: 'Tools', value: 'Git, Angular CLI' },
    ],
    challenges: [
      'Migrating incrementally without blocking ongoing feature work',
      'Aligning the team on new patterns and conventions',
      'Establishing a design system with no prior visual language',
      'Reducing bundle size without breaking existing functionality',
    ],
    architecturalDecisions: [
      'Adopted a vertical slice architecture — one folder per feature with its own module, routes, and components',
      'Used lazy-loaded routes to split the bundle by feature',
      'Introduced a shared library module with strictly no feature-specific logic',
      'Documented all patterns in an internal ADR (Architecture Decision Record)',
    ],
    outcomes: [
      'Initial bundle size reduced by 40% through lazy loading',
      'Build times cut from 4 minutes to under 90 seconds',
      'New features delivered 30% faster due to reusable shared components',
      'Onboarding time for new developers significantly reduced',
    ],
    statusNote: '✅ Completed',
  },
  {
    slug: 'nestjs-api',
    icon: '🔌',
    title: 'RESTful API Platform with NestJS',
    shortDesc:
      'Backend API layer with authentication, role-based access control, and structured endpoints designed to support scalable frontend consumption.',
    status: 'in-progress',
    stack: ['NestJS', 'REST', 'Auth'],
    problemStatement:
      'The frontend applications lacked a consistent, well-structured backend layer. Each service had ad-hoc endpoints with inconsistent error handling, no standardised authentication, and no access control — creating security and maintainability risks as the product scaled.',
    role: [
      'Designed the overall API architecture and module structure using NestJS',
      'Implemented JWT-based authentication and role-based access control',
      'Standardised request/response shapes and error handling across all endpoints',
      'Collaborated closely with the frontend team to design consumer-friendly APIs',
    ],
    techStack: [
      { label: 'Backend', value: 'NestJS, TypeScript' },
      { label: 'Auth', value: 'JWT, Guards, Role decorators' },
      { label: 'Database', value: 'PostgreSQL (via TypeORM)' },
      { label: 'Tools', value: 'Git, Postman' },
    ],
    challenges: [
      'Designing a consistent API contract across heterogeneous data sources',
      'Implementing fine-grained role-based access without over-engineering',
      'Handling authentication edge cases — token expiry, refresh, revocation',
      'Keeping the backend aligned with rapidly changing frontend requirements',
    ],
    architecturalDecisions: [
      'Used NestJS modules to mirror the frontend feature structure for alignment',
      'Implemented a global exception filter for consistent error response shapes',
      'Chose JWT with short-lived access tokens and a refresh token rotation strategy',
      'Defined API contracts as shared TypeScript interfaces consumed by both sides',
    ],
    outcomes: [
      'Unified authentication across all services — zero auth-related incidents post-launch',
      'API response consistency reduced frontend error-handling boilerplate by ~60%',
      'Role-based access rolled out to 5 user tiers with no rework',
      'Shared TypeScript contracts eliminated a whole class of frontend/backend type mismatches',
    ],
    statusNote: '🚧 In Progress – Currently working on refresh token rotation',
  },
];