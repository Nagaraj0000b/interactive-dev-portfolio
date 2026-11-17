/**
 * @file Navbar.tsx
 * @description Accessible, responsive fixed navigation bar.
 * Provides section links, accent theme picker, sound FX toggle, and command palette trigger.
 */

import React, { useState } from 'react';
import {
  Terminal,
  Search,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Code2,
} from 'lucide-react';
import type { AccentColor } from '../types/portfolio';
import { playClickSound, setSoundMuted, getSoundMuted } from '../utils/audio';

interface NavbarProps {
  /** Active accent color */
  accent: AccentColor;
  /** Function to update accent color */
  onSelectAccent: (accent: AccentColor) => void;
  /** Callback to trigger the interactive terminal modal */
  onOpenTerminal: () => void;
  /** Callback to trigger the command palette modal */
  onOpenCommandPalette: () => void;
}

const ACCENTS: { key: AccentColor; name: string; bgClass: string }[] = [
  { key: 'cyan', name: 'Cyan Neon', bgClass: 'bg-cyan-400' },
  { key: 'emerald', name: 'Emerald Matrix', bgClass: 'bg-emerald-400' },
  { key: 'violet', name: 'Cyber Violet', bgClass: 'bg-purple-400' },
  { key: 'amber', name: 'Amber Flare', bgClass: 'bg-amber-400' },
];

/**
 * Top navigation component with responsive mobile drawer and controls.
 */
export const Navbar: React.FC<NavbarProps> = ({
  accent,
  onSelectAccent,
  onOpenTerminal,
  onOpenCommandPalette,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getSoundMuted());

  /**
   * Toggles sound effects and updates local state.
   */
  const handleToggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setSoundMuted(nextState);
    if (!nextState) playClickSound();
  };

  /**
   * Smoothly navigates to a designated document section.
   *
   * @param sectionId - Target HTML element ID.
   */
  const handleNavClick = (sectionId: string) => {
    playClickSound();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="flex items-center gap-2.5 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="Alex Rivera Portfolio Home"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-tight text-base sm:text-lg flex items-center gap-2">
              Alex Rivera
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
                Available
              </span>
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Systems Architect</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {[
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'experience', label: 'Timeline' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={() => {
              playClickSound();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all text-xs cursor-pointer"
            title="Open Command Palette (Ctrl+K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Terminal Launcher */}
          <button
            onClick={() => {
              playClickSound();
              onOpenTerminal();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 transition-all cursor-pointer"
            title="Launch Interactive Terminal"
            aria-label="Launch Interactive Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Sound Mute/Unmute */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Theme Accent Switcher Dropdown/Pills */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {ACCENTS.map((acc) => (
              <button
                key={acc.key}
                onClick={() => {
                  playClickSound();
                  onSelectAccent(acc.key);
                }}
                className={`w-5 h-5 rounded-md ${acc.bgClass} transition-transform ${
                  accent === acc.key ? 'scale-110 ring-2 ring-white/60 shadow-md' : 'opacity-60 hover:opacity-100 hover:scale-105'
                }`}
                title={`Accent: ${acc.name}`}
                aria-label={`Select ${acc.name} accent`}
              />
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              playClickSound();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col gap-2">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'projects', label: 'Projects' },
              { id: 'experience', label: 'Timeline' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 px-3 rounded-lg text-slate-200 hover:bg-slate-900 font-medium text-sm transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Accent Color
            </span>
            <div className="flex items-center gap-1.5">
              {ACCENTS.map((acc) => (
                <button
                  key={acc.key}
                  onClick={() => {
                    playClickSound();
                    onSelectAccent(acc.key);
                  }}
                  className={`w-6 h-6 rounded-md ${acc.bgClass} ${
                    accent === acc.key ? 'ring-2 ring-white' : 'opacity-60'
                  }`}
                  aria-label={`Select ${acc.name} accent`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
