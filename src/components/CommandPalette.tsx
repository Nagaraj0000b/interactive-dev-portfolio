/**
 * @file CommandPalette.tsx
 * @description Accessible Command Palette (Ctrl+K / ⌘K) overlay.
 * Enables quick fuzzy navigation, quick theme switching, CLI terminal triggering,
 * and rapid developer actions.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Terminal,
  Paintbrush,
  Layers,
  Briefcase,
  Mail,
  Sparkles,
  Code,
  Copy,
} from 'lucide-react';
import type { AccentColor } from '../types/portfolio';
import { playClickSound, playSuccessChime } from '../utils/audio';
import { triggerConfettiBurst } from '../utils/confetti';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface CommandPaletteProps {
  /** Palette open state */
  isOpen: boolean;
  /** Callback to close palette */
  onClose: () => void;
  /** Callback to switch accent */
  onSelectAccent: (accent: AccentColor) => void;
  /** Callback to open interactive terminal */
  onOpenTerminal: () => void;
}

interface PaletteAction {
  id: string;
  title: string;
  category: 'Navigation' | 'Theme' | 'Actions';
  icon: React.ReactNode;
  perform: () => void;
}

/**
 * Global Command Palette modal component.
 */
export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectAccent,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const actions: PaletteAction[] = [
    {
      id: 'nav-skills',
      title: 'Navigate to Skills Matrix',
      category: 'Navigation',
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      perform: () => scrollTo('skills'),
    },
    {
      id: 'nav-projects',
      title: 'Navigate to Featured Projects',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-cyan-400" />,
      perform: () => scrollTo('projects'),
    },
    {
      id: 'nav-timeline',
      title: 'Navigate to Career Timeline',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-cyan-400" />,
      perform: () => scrollTo('experience'),
    },
    {
      id: 'nav-contact',
      title: 'Navigate to Contact Form',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-cyan-400" />,
      perform: () => scrollTo('contact'),
    },
    {
      id: 'act-terminal',
      title: 'Launch Interactive CLI Terminal',
      category: 'Actions',
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onClose();
        onOpenTerminal();
      },
    },
    {
      id: 'act-confetti',
      title: 'Trigger Celebratory Confetti Burst',
      category: 'Actions',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onClose();
        triggerConfettiBurst();
        playSuccessChime();
      },
    },
    {
      id: 'act-copy-email',
      title: 'Copy Developer Email to Clipboard',
      category: 'Actions',
      icon: <Copy className="w-4 h-4 text-slate-300" />,
      perform: () => {
        navigator.clipboard.writeText(DEVELOPER_PROFILE.socials.email);
        onClose();
        playSuccessChime();
      },
    },
    {
      id: 'theme-cyan',
      title: 'Set Theme: Cyan Neon',
      category: 'Theme',
      icon: <Paintbrush className="w-4 h-4 text-cyan-400" />,
      perform: () => {
        onSelectAccent('cyan');
        onClose();
      },
    },
    {
      id: 'theme-emerald',
      title: 'Set Theme: Emerald Matrix',
      category: 'Theme',
      icon: <Paintbrush className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onSelectAccent('emerald');
        onClose();
      },
    },
    {
      id: 'theme-violet',
      title: 'Set Theme: Cyber Violet',
      category: 'Theme',
      icon: <Paintbrush className="w-4 h-4 text-purple-400" />,
      perform: () => {
        onSelectAccent('violet');
        onClose();
      },
    },
    {
      id: 'theme-amber',
      title: 'Set Theme: Amber Flare',
      category: 'Theme',
      icon: <Paintbrush className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onSelectAccent('amber');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playClickSound();
        if (isOpen) onClose();
        else {
          // Trigger handled in parent or here
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = filtered[selectedIndex];
      if (target) {
        playClickSound();
        target.perform();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-white focus:outline-none text-sm placeholder:text-slate-500"
          />
          <kbd className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                playClickSound();
                item.perform();
              }}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs sm:text-sm transition-colors cursor-pointer ${
                selectedIndex === idx
                  ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="p-1 rounded-lg bg-slate-800">{item.icon}</span>
                <span className="font-medium">{item.title}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                {item.category}
              </span>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs">
              No matching commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
