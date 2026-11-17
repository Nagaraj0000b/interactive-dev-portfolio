/**
 * @file portfolio.ts
 * @description Comprehensive TypeScript domain models and interfaces for the portfolio web application.
 * Defines strong types for projects, skills, timeline events, themes, and interactive terminal state.
 */

/** Available accent color themes for the portfolio. */
export type AccentColor = 'cyan' | 'emerald' | 'violet' | 'amber';

/** Skill categories for filtering. */
export type SkillCategory = 'all' | 'frontend' | 'backend' | 'cloud' | 'ai' | 'security';

/** Project categories for showcase filtering. */
export type ProjectCategory = 'all' | 'fullstack' | 'ai' | 'cloud' | 'realtime';

/**
 * Representation of a technical skill with proficiency and metadata.
 */
export interface Skill {
  /** Unique identifier for the skill */
  id: string;
  /** Display name of the technology or framework */
  name: string;
  /** Primary category grouping */
  category: Exclude<SkillCategory, 'all'>;
  /** Proficiency percentage from 0 to 100 */
  proficiency: number;
  /** Years of active experience using the technology */
  yearsOfExp: number;
  /** Level descriptor */
  level: 'Expert' | 'Advanced' | 'Proficient';
  /** Popular tags associated with this skill */
  tags: string[];
}

/**
 * Representation of a portfolio project with architectural details and metrics.
 */
export interface Project {
  /** Unique project identifier */
  id: string;
  /** Project title */
  title: string;
  /** High-level summary of the project */
  tagline: string;
  /** Comprehensive description explaining purpose and architectural impact */
  description: string;
  /** Primary category for filtering */
  category: Exclude<ProjectCategory, 'all'>;
  /** List of technologies utilized */
  techStack: string[];
  /** Key performance or business metrics achieved */
  metrics: {
    label: string;
    value: string;
  }[];
  /** Architecture and technical highlights */
  highlights: string[];
  /** Mock demo link or live URL */
  demoUrl: string;
  /** GitHub repository link */
  repoUrl: string;
  /** Featured badge flag */
  featured: boolean;
  /** Visual theme gradient classes */
  gradient: string;
}

/**
 * Career milestone or experience entry.
 */
export interface ExperienceItem {
  /** Unique milestone identifier */
  id: string;
  /** Role or job title */
  role: string;
  /** Organization or company name */
  company: string;
  /** Location or remote status */
  location: string;
  /** Time period formatted as string (e.g. '2023 - Present') */
  period: string;
  /** Core responsibilities and high-level accomplishments */
  description: string[];
  /** Primary technologies used */
  technologies: string[];
  /** Specific measurable impact metric */
  impact: string;
}

/**
 * Interactive terminal line entry.
 */
export interface TerminalLine {
  /** Unique id for React key */
  id: string;
  /** Type of entry determines styling */
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  /** Text content to display */
  content: string;
}

/**
 * Contact form data submission structure.
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: 'web-app' | 'ai-integration' | 'cloud-architecture' | 'consulting';
  message: string;
}
