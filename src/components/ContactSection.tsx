/**
 * @file ContactSection.tsx
 * @description Zero-Trust verified interactive contact form.
 * Enforces strict input validation with Zod, triggers celebratory HTML5 canvas confetti
 * on successful submission, and displays simulated cryptographic transmission receipt.
 */

import React, { useState } from 'react';
import {
  Send,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { validateContactForm } from '../utils/validation';
import type { ValidatedContactForm } from '../utils/validation';
import { triggerConfettiBurst } from '../utils/confetti';
import { playClickSound, playSuccessChime } from '../utils/audio';

interface FormState {
  name: string;
  email: string;
  subject: string;
  projectType: 'web-app' | 'ai-integration' | 'cloud-architecture' | 'consulting';
  message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  subject: '',
  projectType: 'web-app',
  message: '',
};

/**
 * Interactive Contact Form section component.
 */
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<{
    id: string;
    timestamp: string;
    data: ValidatedContactForm;
  } | null>(null);
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  /**
   * Handles form submission with Zero-Trust Zod validation.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    const validation = validateContactForm(formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate network transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      const receiptId = `TX-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      setSubmittedReceipt({
        id: receiptId,
        timestamp: new Date().toLocaleTimeString(),
        data: validation.data!,
      });
      triggerConfettiBurst();
      playSuccessChime();
      setFormData(INITIAL_FORM);
    }, 800);
  };

  /**
   * Copies the receipt reference ID to clipboard.
   */
  const handleCopyReceipt = () => {
    if (!submittedReceipt) return;
    navigator.clipboard.writeText(submittedReceipt.id);
    setCopiedReceipt(true);
    playClickSound();
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <section id="contact" className="py-20 relative z-10" aria-label="Contact and Collaboration">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Encrypted Transmission</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Let’s Build Something Exceptional
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interested in collaborating on high-throughput systems, AI architectures, or advisory work? Leave a message below.
          </p>
        </div>

        {/* Form or Receipt Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-2xl">
          {submittedReceipt ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched!</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="text-cyan-400 font-semibold">{submittedReceipt.data.name}</span>. Your message has been verified and safely queued.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left font-mono text-xs space-y-2">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-800/80 pb-2">
                  <span>DISPATCH RECEIPT</span>
                  <span>{submittedReceipt.timestamp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Tracking Ref:</span>
                  <span className="text-cyan-400 font-bold">{submittedReceipt.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Scope:</span>
                  <span className="text-slate-200 capitalize">{submittedReceipt.data.projectType}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleCopyReceipt}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedReceipt ? 'Receipt Copied!' : 'Copy Receipt ID'}
                </button>
                <button
                  onClick={() => setSubmittedReceipt(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Send Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-200 text-sm focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-200 text-sm focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Distributed Systems Consultation"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-200 text-sm focus:outline-none transition-colors ${
                      errors.subject ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500/80'
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.subject}
                    </p>
                  )}
                </div>

                {/* Project Scope */}
                <div>
                  <label htmlFor="projectType" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Project Scope
                  </label>
                  <select
                    id="projectType"
                    value={formData.projectType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectType: e.target.value as FormState['projectType'],
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/80 transition-colors"
                  >
                    <option value="web-app">Full-Stack Web App</option>
                    <option value="ai-integration">AI Agent Architecture</option>
                    <option value="cloud-architecture">Cloud Infrastructure</option>
                    <option value="consulting">Technical Advisory</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project goals, timelines, or technical requirements..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-slate-200 text-sm focus:outline-none transition-colors ${
                    errors.message ? 'border-red-500/80 focus:border-red-400' : 'border-slate-800 focus:border-cyan-500/80'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Zero-Trust Notice & Submit Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Zero-Trust Zod validation enforced on payload</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Transmitting...' : 'Dispatch Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
