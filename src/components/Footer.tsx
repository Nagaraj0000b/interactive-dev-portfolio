/**
 * @file Footer.tsx
 * @description Accessible footer component with status badges, tech stack credits,
 * and quick navigation triggers.
 */

import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

/**
 * Footer presentation component.
 */
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          {/* Left Brand & Status */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-lg font-bold text-white tracking-tight">
              {DEVELOPER_PROFILE.name}
            </span>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              Crafting high-throughput distributed architectures, autonomous agent workflows, and fast frontend experiences.
            </p>
            <div className="inline-flex items-center gap-1.5 mt-3 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • Edge Verified</span>
            </div>
          </div>

          {/* Center Socials */}
          <div className="flex items-center gap-4 text-slate-400">
            <a
              href={DEVELOPER_PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={DEVELOPER_PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.socials.email}`}
              onClick={playClickSound}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Email Alex Rivera"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Right Back to Top */}
          <div>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Zero-Trust Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            Built with React 19, TypeScript, Vite, Tailwind CSS v4 & Zod Zero-Trust.
          </p>
          <p>© {new Date().getFullYear()} Alex Rivera. Engineered with high standards.</p>
        </div>
      </div>
    </footer>
  );
};
