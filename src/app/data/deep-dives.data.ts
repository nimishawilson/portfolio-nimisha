export interface DeepDive {
  slug: string;
  icon: string;
  title: string;
  subtitle: string;
  readTime: string;
  tags: string[];
  intro: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
    code?: string;
  }[];
  keyTakeaways: string[];
}

export const DEEP_DIVES: DeepDive[] = [
  {
    slug: 'auto-save-angular',
    icon: '💾',
    title: 'Designing Auto-Save Systems in Angular',
    subtitle: 'A practical guide to building reliable, user-friendly auto-save with RxJS',
    readTime: '8 min read',
    tags: ['Angular', 'RxJS', 'UX Patterns'],
    intro:
      'Auto-save feels simple on the surface — save whatever the user typed. In practice, it involves a careful balance of debouncing, conflict resolution, optimistic UI, and graceful degradation under poor network conditions. This deep dive walks through the architecture decisions behind building a robust auto-save system in Angular.',
    sections: [
      {
        heading: 'The core problem with naive auto-save',
        body: 'A straightforward approach — save on every keystroke — quickly overwhelms the backend and creates a race condition where out-of-order responses corrupt the saved state. The challenge is to save frequently enough that no data feels lost, but efficiently enough that the system stays responsive.',
        bullets: [
          'Every keystroke triggering an API call floods the network',
          'Concurrent in-flight requests can arrive out of order',
          'Showing "Saving…" on every character creates visual noise',
          'Network failures with no retry leave users with stale data',
        ],
      },
      {
        heading: 'Debouncing with RxJS',
        body: 'The first layer of the solution is debouncing the input stream. Instead of reacting to each keystroke, we wait until the user pauses typing before firing the save. RxJS makes this declarative and easy to compose with other operators.',
        code: `// Debounce the form value changes before saving
this.form.valueChanges.pipe(
  debounceTime(600),
  distinctUntilChanged(),
  switchMap(value => this.saveService.save(value)),
  takeUntilDestroyed()
).subscribe();`,
      },
      {
        heading: 'Preventing race conditions with switchMap',
        body: '`switchMap` is the key operator here — it cancels any in-flight HTTP request when a new save is triggered. This guarantees that only the most recent save is active, eliminating the out-of-order response problem entirely.',
        bullets: [
          'switchMap cancels the previous observable when a new value arrives',
          'Only the latest save request completes — older ones are discarded',
          'Combine with retry() for automatic retry on transient failures',
          'Use exhaustMap instead if you want to ignore new saves until the current one finishes',
        ],
      },
      {
        heading: 'Showing save state to the user',
        body: 'Good auto-save UX requires clear feedback without being intrusive. A three-state indicator — Unsaved → Saving… → Saved — gives users confidence without demanding their attention. Drive this from a BehaviorSubject so the template reacts automatically.',
        code: `type SaveState = 'idle' | 'saving' | 'saved' | 'error';

readonly saveState = signal<SaveState>('idle');

private save(value: unknown) {
  this.saveState.set('saving');
  return this.api.save(value).pipe(
    tap(() => this.saveState.set('saved')),
    catchError(err => {
      this.saveState.set('error');
      return EMPTY;
    })
  );
}`,
      },
      {
        heading: 'Handling offline and network failures',
        body: 'Auto-save must degrade gracefully. When the network is unavailable, queue saves locally and flush when connectivity is restored. Angular\'s HttpClient combined with a retry strategy and a local queue covers most real-world failure scenarios.',
        bullets: [
          'Use retryWhen with exponential backoff for transient failures',
          'Persist unsaved changes to localStorage as a last-resort backup',
          'Listen to navigator.onLine events to pause/resume the save stream',
          'Show a clear "Unsaved changes" warning before the user navigates away',
        ],
      },
    ],
    keyTakeaways: [
      'Debounce with debounceTime(600ms) to reduce API call frequency',
      'Use switchMap to cancel in-flight saves and prevent race conditions',
      'Drive save state (idle / saving / saved / error) from a signal for reactive UI',
      'Queue saves locally and retry on reconnect for offline resilience',
      'Guard navigation with a "you have unsaved changes" prompt',
    ],
  },
  {
    slug: 'high-frequency-api-calls',
    icon: '⚡',
    title: 'Handling High-Frequency API Calls Efficiently',
    subtitle: 'Strategies for reducing backend load without compromising user experience',
    readTime: '7 min read',
    tags: ['Performance', 'RxJS', 'API Design'],
    intro:
      'Modern frontends often generate far more API calls than necessary — search inputs, filter panels, live counters, and auto-save all firing independently. This article covers the RxJS-based patterns that tame high-frequency call scenarios and keep your backend healthy.',
    sections: [
      {
        heading: 'Why high-frequency calls are a problem',
        body: 'Each redundant call adds latency, burns server resources, and risks overloading rate limits. In Angular apps, common sources include unguarded reactive form subscriptions, child components re-fetching the same data, and missing memoisation on computed values.',
        bullets: [
          'Search box firing on every character — 50+ calls per sentence typed',
          'Filter panels triggering independent fetches per toggle',
          'Polling intervals set too aggressively',
          'Multiple components subscribing to the same endpoint independently',
        ],
      },
      {
        heading: 'Debounce vs Throttle — choosing the right one',
        body: 'These two operators are often confused. Debounce waits for a pause in activity before emitting — ideal for search inputs. Throttle emits at most once per time window regardless of pauses — better for scroll events or live cursors where you need regular updates.',
        code: `// Search: wait for the user to stop typing
searchControl.valueChanges.pipe(
  debounceTime(400),
  distinctUntilChanged(),
  switchMap(query => this.search(query))
);

// Scroll position: update at most every 100ms
fromEvent(window, 'scroll').pipe(
  throttleTime(100),
  map(() => window.scrollY)
);`,
      },
      {
        heading: 'Batching requests',
        body: 'When multiple UI events should resolve to a single API call — for example, checking 10 rows in a table — batch the IDs and send one request instead of ten. A simple buffer window with bufferTime or a Subject acting as a queue makes this straightforward.',
        bullets: [
          'Use bufferTime(50) to collect IDs emitted within a 50ms window',
          'Flatten the buffer array and send one bulk API call',
          'Return a map of id → result so each caller gets its response',
          'Pair with a local cache to avoid re-fetching items already buffered',
        ],
      },
      {
        heading: 'Caching and shareReplay',
        body: 'The cheapest API call is the one you never make. shareReplay(1) turns a cold Observable into a hot one, sharing the last emission with any late subscriber and preventing duplicate HTTP requests when multiple components need the same data.',
        code: `// Shared cache — multiple components get the same response
readonly currentUser$ = this.http.get<User>('/api/me').pipe(
  shareReplay(1)
);

// Cache with expiry using a timer reset
private refreshTrigger = new Subject<void>();

readonly data$ = this.refreshTrigger.pipe(
  startWith(null),
  switchMap(() => this.http.get('/api/data').pipe(shareReplay(1)))
);`,
      },
      {
        heading: 'Polling efficiently',
        body: 'Polling is sometimes unavoidable. Key rules: poll only when the tab is visible, use a backoff strategy when errors occur, and cancel polling when the component is destroyed.',
        bullets: [
          'Use timer(0, intervalMs) rather than setInterval to keep it in RxJS',
          'Combine with document.visibilitychange to pause when tab is hidden',
          'Apply retryWhen with exponential backoff on polling errors',
          'Always unsubscribe with takeUntilDestroyed() or an async pipe',
        ],
      },
    ],
    keyTakeaways: [
      'Use debounceTime for input-driven calls, throttleTime for continuous events',
      'distinctUntilChanged prevents redundant calls when the value hasn\'t changed',
      'switchMap cancels the previous request — use it for search and filters',
      'shareReplay(1) caches responses and prevents duplicate HTTP calls',
      'Batch bulk lookups with bufferTime to consolidate N calls into one',
    ],
  },
  {
    slug: 'frontend-architecture-data-heavy',
    icon: '🏗️',
    title: 'Frontend Architecture for Data-Heavy Applications',
    subtitle: 'Patterns for building scalable Angular apps when data complexity is the constraint',
    readTime: '10 min read',
    tags: ['Architecture', 'Angular', 'Scalability'],
    intro:
      'Data-heavy applications — dashboards, data editors, reporting tools — impose unique architectural constraints. Raw performance, complex state, and deep component trees push generic approaches to their limits. This article covers the structural patterns that have worked best in production Angular applications with large, complex datasets.',
    sections: [
      {
        heading: 'Feature-based module structure',
        body: 'The most impactful architectural decision in a large Angular app is how you slice your modules. Organising by feature (not by type) keeps related code co-located, enables lazy loading, and makes it easy to reason about which code owns which domain.',
        bullets: [
          'One folder per feature: components, services, pipes, and routes together',
          'A single shared/ module for genuinely cross-cutting concerns only',
          'Lazy-load every feature route to keep the initial bundle small',
          'Use barrel files (index.ts) sparingly — they can hide coupling',
        ],
      },
      {
        heading: 'State management without over-engineering',
        body: 'Not every app needs NgRx. For most data-heavy Angular apps, a service-per-feature pattern using BehaviorSubjects (or Angular signals) provides all the reactivity you need with far less boilerplate. Reach for a global store only when cross-feature state sharing becomes painful.',
        code: `@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly _data = signal<Report[]>([]);
  private readonly _loading = signal(false);

  readonly data = this._data.asReadonly();
  readonly loading = this._loading.asReadonly();

  load(filters: Filters) {
    this._loading.set(true);
    this.http.get<Report[]>('/api/reports', { params: filters }).pipe(
      finalize(() => this._loading.set(false))
    ).subscribe(data => this._data.set(data));
  }
}`,
      },
      {
        heading: 'Virtual scrolling for large lists',
        body: 'Rendering thousands of DOM nodes is the fastest way to kill performance. Angular CDK\'s virtual scroll renders only the visible rows, keeping the DOM lean regardless of dataset size. The API is straightforward and integrates cleanly with async data.',
        bullets: [
          'cdk-virtual-scroll-viewport renders only the visible window of items',
          'itemSize (fixed) is faster than auto-sizing — use it when row height is predictable',
          'Combine with trackBy to prevent unnecessary re-renders on data updates',
          'For variable heights, CDK\'s AutoSizeVirtualScrollStrategy handles the measurement',
        ],
      },
      {
        heading: 'OnPush change detection everywhere',
        body: 'Switching all components to ChangeDetectionStrategy.OnPush is one of the highest-leverage performance wins in Angular. It tells the framework to skip change detection for a component unless one of its inputs changes or an event originates from it.',
        bullets: [
          'OnPush components only check when @Input references change (not deep mutations)',
          'Mutate data immutably — spread or Object.assign — to trigger updates correctly',
          'Use the async pipe or signals; they trigger CD automatically',
          'markForCheck() is the escape hatch when you need to trigger CD manually',
        ],
      },
      {
        heading: 'Pagination, filtering, and sorting at the API layer',
        body: 'For large datasets, doing pagination and filtering in the browser is a band-aid. Design your API to handle these server-side and pass parameters as query strings. This keeps the frontend light and the dataset manageable regardless of scale.',
        bullets: [
          'Always send limit + offset (or cursor-based pagination) to the API',
          'Filter and sort parameters should be serialisable to a URL for shareability',
          'Debounce filter inputs before sending to the API (see the previous article)',
          'Cache the last N pages locally to make backward navigation instant',
        ],
      },
    ],
    keyTakeaways: [
      'Organise by feature, not by type — co-locate everything a feature owns',
      'Service + signals/BehaviorSubject handles most state needs without a global store',
      'Virtual scrolling is non-negotiable for lists longer than a few hundred items',
      'OnPush change detection cuts unnecessary re-renders by up to 80% in complex trees',
      'Offload pagination, filtering, and sorting to the API — never load the full dataset',
    ],
  },
  {
    slug: 'ai-tools-developer-workflow',
    icon: '🤖',
    title: 'Integrating AI Tools in Developer Workflow',
    subtitle: 'Practical ways to use AI assistance without losing engineering judgment',
    readTime: '6 min read',
    tags: ['AI', 'Productivity', 'Developer Tools'],
    intro:
      'AI coding assistants have moved from novelty to everyday tool in a short time. The engineers getting the most value from them aren\'t the ones using them the most — they\'re the ones using them deliberately. This article covers the practical patterns I\'ve found effective for integrating AI tools into a frontend engineering workflow without letting them erode your own problem-solving ability.',
    sections: [
      {
        heading: 'Where AI genuinely accelerates the work',
        body: 'AI tools are most valuable for tasks that are well-defined but time-consuming — boilerplate generation, repetitive transformations, writing tests for known logic, and explaining unfamiliar code. These are the places where human judgment adds little and speed matters most.',
        bullets: [
          'Generating Angular component scaffolding, pipes, and service boilerplate',
          'Writing unit test cases for a function you\'ve already implemented',
          'Transforming data shapes — mapping API responses to UI models',
          'Explaining what an unfamiliar block of legacy code does',
          'Suggesting CSS for a layout you have in mind but can\'t immediately recall',
        ],
      },
      {
        heading: 'Where to keep full control',
        body: 'Architecture decisions, data modelling, and anything that touches security should stay firmly under your own judgment. AI tools are pattern matchers trained on past code — they will confidently generate plausible-looking solutions that miss your specific constraints.',
        bullets: [
          'API contract design — the AI doesn\'t know your backend constraints',
          'State management architecture — it will default to whatever was common in training data',
          'Security-sensitive code — always review auth logic line by line',
          'Performance-critical paths — generated code is rarely optimal without context',
        ],
      },
      {
        heading: 'Prompting as a skill',
        body: 'The quality of AI output scales directly with the quality of the prompt. Vague prompts produce generic code. Specific prompts — with constraints, context, and expected behaviour — produce code that\'s actually useful. Treat prompt writing as part of the engineering skill set.',
        code: `// Vague — produces generic boilerplate
"Write an Angular service for users"

// Specific — produces something useful
"Write an Angular injectable service that:
- Fetches /api/users with HttpClient
- Caches the result with shareReplay(1)
- Exposes a signal for the loading state
- Uses takeUntilDestroyed for cleanup
- Follows standalone component patterns (Angular 17+)"`,
      },
      {
        heading: 'Using AI for code review and rubber ducking',
        body: 'One underused workflow: paste your implementation and ask the AI what edge cases it would test, or what it would change. It\'s a fast way to catch blind spots before the code reaches a real reviewer. Treat it as a first pass, not a final sign-off.',
        bullets: [
          'Ask "what edge cases am I missing?" after writing complex logic',
          'Use it to check if your approach matches community best practices',
          'Ask for alternative implementations and compare trade-offs',
          'Generate PR description drafts from a diff to save time on documentation',
        ],
      },
      {
        heading: 'Avoiding over-reliance',
        body: 'The risk with AI tools isn\'t that they\'ll write bad code — it\'s that you\'ll stop developing the instinct to spot it. Deliberately solve problems without AI assistance regularly. The goal is to use AI to go faster at things you already understand, not as a substitute for understanding.',
        bullets: [
          'Solve at least one technical problem per week without AI assistance',
          'Always read and understand every line of AI-generated code before committing',
          'If you can\'t explain why the generated code works, don\'t use it',
          'Use AI for the first draft, your own judgment for the final version',
        ],
      },
    ],
    keyTakeaways: [
      'AI is most valuable for well-defined, time-consuming tasks — boilerplate, tests, transformations',
      'Keep architecture, security, and performance decisions under your own judgment',
      'Specific, constrained prompts produce far better output than vague ones',
      'Use AI as a rubber duck — ask it what edge cases you\'re missing',
      'Deliberately practice problem-solving without AI to preserve your own engineering instincts',
    ],
  },
];