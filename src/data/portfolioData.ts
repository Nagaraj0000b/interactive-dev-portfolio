/**
 * @file portfolioData.ts
 * @description Rich portfolio content including biographical profile, verified skills matrix,
 * featured engineering projects, career milestones, and terminal commands.
 */

import type { Skill, Project, ExperienceItem } from '../types/portfolio';

export const DEVELOPER_PROFILE = {
  name: 'Alex Rivera',
  title: 'Lead Full-Stack & AI Systems Architect',
  status: 'Open to High-Impact Opportunities',
  statusIndicator: 'online',
  location: 'San Francisco, CA / Remote',
  experienceYears: 6,
  bio: 'Specializing in resilient distributed architectures, AI agent orchestration, and ultra-performant React/TypeScript interfaces. Obsessed with sub-millisecond response times, zero-trust security, and delightful developer experiences.',
  roles: [
    'Lead Full-Stack Architect',
    'AI Agent System Designer',
    'Cloud-Native Infra Specialist',
    'TypeScript & React Artisan',
  ],
  stats: [
    { label: 'Years of Experience', value: '6+' },
    { label: 'Production Projects', value: '35+' },
    { label: 'Global API Requests/Day', value: '120M+' },
    { label: 'Lighthouse Performance Score', value: '100' },
  ],
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
    email: 'alex.rivera.dev@example.com',
  },
};

export const SKILLS_DATA: Skill[] = [
  // Frontend
  { id: 'react', name: 'React 19 & Next.js', category: 'frontend', proficiency: 98, yearsOfExp: 6, level: 'Expert', tags: ['Hooks', 'RSC', 'Hydration', 'Suspense'] },
  { id: 'typescript', name: 'TypeScript', category: 'frontend', proficiency: 96, yearsOfExp: 5, level: 'Expert', tags: ['Generics', 'Type-Level Programming', 'Strict Mode'] },
  { id: 'tailwind', name: 'Tailwind CSS v4', category: 'frontend', proficiency: 95, yearsOfExp: 4, level: 'Expert', tags: ['Responsive Design', 'CSS Theme Variables', 'Modern Layouts'] },
  { id: 'state-mgmt', name: 'Zustand & Redux Toolkit', category: 'frontend', proficiency: 92, yearsOfExp: 5, level: 'Expert', tags: ['State Optimization', 'Selectors', 'Persistence'] },
  { id: 'threejs', name: 'Three.js / WebGL Canvas', category: 'frontend', proficiency: 82, yearsOfExp: 3, level: 'Advanced', tags: ['Shaders', 'Particles', 'Interactive Graphics'] },

  // Backend
  { id: 'nodejs', name: 'Node.js & Bun Runtimes', category: 'backend', proficiency: 95, yearsOfExp: 6, level: 'Expert', tags: ['Event Loop', 'Async I/O', 'Worker Threads'] },
  { id: 'fastapi', name: 'FastAPI & Python 3.14', category: 'backend', proficiency: 90, yearsOfExp: 4, level: 'Expert', tags: ['AsyncIO', 'Pydantic v2', 'REST & GraphQL'] },
  { id: 'graphql', name: 'GraphQL & gRPC', category: 'backend', proficiency: 88, yearsOfExp: 4, level: 'Advanced', tags: ['Schema Stitching', 'Protobuf', 'Microservices'] },
  { id: 'postgres', name: 'PostgreSQL & Neon DB', category: 'backend', proficiency: 92, yearsOfExp: 5, level: 'Expert', tags: ['Indexing', 'Connection Pooling', 'JSONB', 'Prisma'] },
  { id: 'redis', name: 'Redis & Upstash', category: 'backend', proficiency: 90, yearsOfExp: 4, level: 'Expert', tags: ['Pub/Sub', 'Distributed Locks', 'Caching Hierarchies'] },

  // Cloud & DevOps
  { id: 'docker', name: 'Docker & MicroVMs', category: 'cloud', proficiency: 92, yearsOfExp: 5, level: 'Expert', tags: ['Multi-Stage Builds', 'Firecracker', 'OCI Images'] },
  { id: 'k8s', name: 'Kubernetes & Helm', category: 'cloud', proficiency: 84, yearsOfExp: 3, level: 'Advanced', tags: ['Ingress', 'HPA', 'ConfigMaps', 'Service Mesh'] },
  { id: 'vercel-aws', name: 'Vercel, AWS & Cloudflare', category: 'cloud', proficiency: 94, yearsOfExp: 5, level: 'Expert', tags: ['Edge Compute', 'Workers', 'S3', 'Lambda'] },
  { id: 'cicd', name: 'GitHub Actions CI/CD', category: 'cloud', proficiency: 91, yearsOfExp: 4, level: 'Expert', tags: ['Automated Testing', 'Docker Registry', 'Canary Rollouts'] },

  // AI & Data
  { id: 'ai-sdk', name: 'Vercel AI SDK & Gemini API', category: 'ai', proficiency: 94, yearsOfExp: 3, level: 'Expert', tags: ['Streaming', 'Tool Calling', 'Structured Outputs'] },
  { id: 'agents', name: 'Multi-Agent Autonomous Systems', category: 'ai', proficiency: 90, yearsOfExp: 2, level: 'Expert', tags: ['ReAct', 'Agent Swarms', 'Context Orchestration'] },
  { id: 'vector-db', name: 'Vector Databases (Pinecone/Qdrant)', category: 'ai', proficiency: 88, yearsOfExp: 3, level: 'Advanced', tags: ['Embeddings', 'Hybrid RAG', 'Cosine Similarity'] },
  { id: 'rag', name: 'RAG Pipeline Architecture', category: 'ai', proficiency: 91, yearsOfExp: 3, level: 'Expert', tags: ['Chunking', 'Reranking', 'Semantic Caching'] },

  // Security & Architecture
  { id: 'zero-trust', name: 'Zero-Trust Input Validation (Zod)', category: 'security', proficiency: 96, yearsOfExp: 4, level: 'Expert', tags: ['Type Safety', 'Sanitization', 'Schema Enforcement'] },
  { id: 'auth-sec', name: 'OAuth2, OIDC & JWT', category: 'security', proficiency: 93, yearsOfExp: 5, level: 'Expert', tags: ['RBAC', 'Session Security', 'CSRF/CORS Hardening'] },
  { id: 'observability', name: 'OpenTelemetry & Prometheus', category: 'security', proficiency: 86, yearsOfExp: 3, level: 'Advanced', tags: ['Distributed Tracing', 'SLOs', 'Grafana'] },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'omnimind-ai',
    title: 'OmniMind Autonomous Agent Mesh',
    tagline: 'Multi-agent orchestration platform with dynamic tool routing and self-healing memory.',
    description:
      'Engineered an enterprise-grade agent orchestration runtime powered by Gemini 2.5 and Vercel AI SDK. Features real-time state synchronization, multi-step tool verification, and semantic vector caching for instant query answers.',
    category: 'ai',
    techStack: ['React 19', 'TypeScript', 'Vercel AI SDK', 'Gemini API', 'Vector DB', 'Tailwind CSS'],
    metrics: [
      { label: 'Latency Reduction', value: '45%' },
      { label: 'Token Efficiency', value: '3.8x' },
      { label: 'Tool Accuracy', value: '99.4%' },
    ],
    highlights: [
      'Self-healing execution loop with automated fallback retry logic',
      'Zero-trust schema validation on all dynamic tool invocations',
      'Sub-50ms streaming token responses across edge nodes',
    ],
    demoUrl: '#demo-omnimind',
    repoUrl: 'https://github.com/example/omnimind',
    featured: true,
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
  },
  {
    id: 'hyperscale-mesh',
    title: 'HyperScale Edge CDN & Distributed Gateway',
    tagline: 'High-throughput edge routing layer servicing 120M+ API requests daily.',
    description:
      'Designed and deployed a globally distributed API gateway running on edge workers. Incorporated intelligent rate limiting, geographic load routing, and distributed Redis token buckets.',
    category: 'cloud',
    techStack: ['Node.js', 'Cloudflare Workers', 'Redis Upstash', 'TypeScript', 'Docker', 'Grafana'],
    metrics: [
      { label: 'Daily Requests', value: '120M+' },
      { label: 'P99 Latency', value: '< 18ms' },
      { label: 'Uptime SLA', value: '99.995%' },
    ],
    highlights: [
      'Distributed token-bucket rate limiting across 30+ regional POPs',
      'Real-time anomaly detection with automated IP quarantine',
      'Zero downtime rolling deployments via canary pipelines',
    ],
    demoUrl: '#demo-hyperscale',
    repoUrl: 'https://github.com/example/hyperscale-mesh',
    featured: true,
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
  },
  {
    id: 'quantum-stream',
    title: 'QuantumStream Real-Time Telemetry Dashboard',
    tagline: 'Sub-millisecond WebSocket streaming canvas for high-frequency infrastructure metrics.',
    description:
      'Created a responsive telemetry monitoring platform rendering 50,000+ real-time data points per second with zero UI frame drops utilizing WebGL/HTML5 Canvas and binary WebSockets.',
    category: 'realtime',
    techStack: ['React 19', 'WebGL Canvas', 'WebSockets', 'Go Microservices', 'Tailwind CSS v4'],
    metrics: [
      { label: 'Render Rate', value: '60 FPS' },
      { label: 'Data Points/Sec', value: '50K+' },
      { label: 'Memory Footprint', value: '< 45MB' },
    ],
    highlights: [
      'OffscreenCanvas rendering worker eliminating main-thread jank',
      'Binary Protobuf decoding over WebSockets for minimal payload overhead',
      'Dynamic threshold alerting with interactive zooming and pan controls',
    ],
    demoUrl: '#demo-quantum',
    repoUrl: 'https://github.com/example/quantumstream',
    featured: false,
    gradient: 'from-violet-500/20 via-purple-500/10 to-pink-500/20',
  },
  {
    id: 'aegis-auth',
    title: 'Aegis Zero-Trust Identity & Session Vault',
    tagline: 'Cryptographically audited authentication gateway with Passkeys and biometric SSO.',
    description:
      'Engineered an enterprise Zero-Trust authentication and session validation proxy featuring WebAuthn biometric passkeys, hardware key support, and rotating cryptographic session fingerprints.',
    category: 'fullstack',
    techStack: ['TypeScript', 'Next.js', 'PostgreSQL', 'WebAuthn', 'Zod', 'Tailwind CSS'],
    metrics: [
      { label: 'Auth Handshake', value: '< 35ms' },
      { label: 'Security Score', value: 'A+' },
      { label: 'Phishing Resistant', value: '100%' },
    ],
    highlights: [
      'Hardware-bound FIDO2/WebAuthn passwordless authentication',
      'Strict input validation pipeline blocking SQLi and prototype pollution',
      'Audit log hashing ensuring tamper-evident administrative histories',
    ],
    demoUrl: '#demo-aegis',
    repoUrl: 'https://github.com/example/aegis-vault',
    featured: false,
    gradient: 'from-amber-500/20 via-orange-500/10 to-red-500/20',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'lead-architect',
    role: 'Staff Platform Architect',
    company: 'Nexus Distributed Technologies',
    location: 'San Francisco, CA (Hybrid)',
    period: '2023 - Present',
    description: [
      'Spearheaded the migration of legacy monolith to edge-native microservices, slashing global compute costs by 38%.',
      'Architected multi-agent AI tooling framework integrated into developer workflow, reducing incident mean time to resolution (MTTR) by 52%.',
      'Mentored 14 senior and staff engineers in distributed systems design, zero-trust validation, and web performance optimization.',
    ],
    technologies: ['React 19', 'TypeScript', 'Gemini API', 'Kubernetes', 'Cloudflare Workers', 'Zod'],
    impact: 'Scaled platform to 120M+ requests/day at 99.995% availability',
  },
  {
    id: 'senior-fullstack',
    role: 'Senior Full-Stack Engineer',
    company: 'Aether Cloud Systems',
    location: 'Remote',
    period: '2021 - 2023',
    description: [
      'Built high-performance real-time telemetry analytics dashboards handling 50k events/sec using WebSockets and Canvas.',
      'Designed zero-trust REST and GraphQL APIs backed by PostgreSQL and Redis caching hierarchies.',
      'Achieved 100/100 Lighthouse performance across all consumer-facing portals.',
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
    impact: 'Increased customer onboarding conversion rate by 24%',
  },
  {
    id: 'frontend-engineer',
    role: 'Full-Stack Software Engineer',
    company: 'Vanguard Interactive',
    location: 'Austin, TX',
    period: '2019 - 2021',
    description: [
      'Developed responsive single-page web applications with accessible component libraries adhering to WCAG AAA guidelines.',
      'Implemented end-to-end integration test suites with 92% code coverage, cutting production regressions by 40%.',
    ],
    technologies: ['TypeScript', 'React', 'HTML5/CSS3', 'Jest', 'CI/CD Pipelines'],
    impact: 'Delivered 12 mission-critical client applications on schedule',
  },
];
