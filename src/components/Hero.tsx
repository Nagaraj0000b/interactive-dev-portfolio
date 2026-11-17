/**
 * @file Hero.tsx
 * @description Hero section featuring dynamic typewriter role cycler, bio overview,
 * quick action triggers, and live performance metrics ticker.
 */

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Terminal,
  Mail,
  Zap,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { playClickSound } from '../utils/audio';

interface HeroProps {
  /** Callback to trigger interactive terminal modal */
  onOpenTerminal: () => void;
}

/**
 * Hero section presentation component.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Dynamic Typewriter Effect
  useEffect(() => {
    const currentRole = DEVELOPER_PROFILE.roles[roleIndex];
    const typingSpeed = isDeleting ? 35 : 75;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % DEVELOPER_PROFILE.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  const scrollToSection = (id: string) => {
    playClickSound();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden z-10"
      aria-label="Introduction and Overview"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-cyan-300">v2.5.0 Production Ready</span>
            <span className="text-slate-500">•</span>
            <span>{DEVELOPER_PROFILE.location}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Building Resilient Systems &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              Intelligent Agent Apps
            </span>
          </h1>

          {/* Typewriter Dynamic Role */}
          <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
            <span className="font-mono text-lg sm:text-2xl text-cyan-400 font-semibold">
              &gt; {displayedText}
              <span className="animate-pulse ml-0.5 text-white">_</span>
            </span>
          </div>

          {/* Bio paragraph */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
            {DEVELOPER_PROFILE.bio}
          </p>

          {/* Call to action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Explore Projects
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                playClickSound();
                onOpenTerminal();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              Launch CLI Console
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-300 font-medium text-sm transition-all cursor-pointer"
            >
              Get In Touch
            </button>
          </div>

          {/* Social Links Bar */}
          <div className="flex items-center gap-4 mb-16 text-slate-400">
            <a
              href={DEVELOPER_PROFILE.socials.github}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={DEVELOPER_PROFILE.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={`mailto:${DEVELOPER_PROFILE.socials.email}`}
              onClick={playClickSound}
              className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              aria-label="Send direct email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Highlights / Features Banner */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            {DEVELOPER_PROFILE.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-3 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-6">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Sub-50ms Latency</h2>
                <p className="text-xs text-slate-400 mt-0.5">Optimized for high-frequency edge execution and streaming responses.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Zero-Trust Security</h2>
                <p className="text-xs text-slate-400 mt-0.5">Strict schema validation at all network boundaries using Zod & OIDC.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-left flex items-start gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Agentic Systems</h2>
                <p className="text-xs text-slate-400 mt-0.5">Autonomous tool-calling agents with self-healing feedback loops.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
