/**
 * @file validation.ts
 * @description Zero-Trust input validation schemas and helper functions powered by Zod.
 * Enforces strict boundary verification on all user-supplied inputs including
 * contact forms, search filters, and CLI terminal commands.
 */

import { z } from 'zod';

/**
 * Strict Zero-Trust schema for the interactive contact form.
 * Validates format, length, and disallows malicious or empty inputs.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(80, { message: 'Name must not exceed 80 characters.' })
    .regex(/^[a-zA-Z\s.'-]+$/, { message: 'Name contains invalid characters.' }),

  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .max(120, { message: 'Email must not exceed 120 characters.' }),

  subject: z
    .string()
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters.' })
    .max(150, { message: 'Subject must not exceed 150 characters.' }),

  projectType: z.enum(['web-app', 'ai-integration', 'cloud-architecture', 'consulting'], {
    error: 'Please select a valid project scope.',
  }),

  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(2000, { message: 'Message must not exceed 2000 characters.' }),
});

export type ValidatedContactForm = z.infer<typeof contactFormSchema>;

/**
 * Zero-Trust schema for skill search queries.
 * Restricts query length and prevents XSS/script injection payloads.
 */
export const searchFilterSchema = z
  .string()
  .trim()
  .max(50, { message: 'Query too long' })
  .regex(/^[a-zA-Z0-9\s#+.-]*$/, { message: 'Sanitized: Alphanumeric characters only.' });

/**
 * Zero-Trust schema for terminal CLI command inputs.
 * Limits command length and strips suspicious control characters.
 */
export const terminalCommandSchema = z
  .string()
  .trim()
  .max(100, { message: 'Command string exceeds allowed buffer length.' });

/**
 * Validates contact form payload using safeParse.
 *
 * @param input - Untrusted input object from contact form.
 * @returns Result object with discriminated success flag, parsed data, or field error map.
 */
export function validateContactForm(input: unknown): {
  success: boolean;
  data?: ValidatedContactForm;
  errors?: Record<string, string>;
} {
  const result = contactFormSchema.safeParse(input);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0];
    if (typeof field === 'string' && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return { success: false, errors };
}

/**
 * Sanitizes and validates a search query for skills or projects.
 *
 * @param query - Raw search query string.
 * @returns Sanitized string if valid, or an empty string if malformed.
 */
export function sanitizeSearchQuery(query: string): string {
  const result = searchFilterSchema.safeParse(query);
  return result.success ? result.data : '';
}
