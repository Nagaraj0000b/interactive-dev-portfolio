/**
 * @file App.tsx
 * @description Main application component orchestrating global theme state,
 * modal dialogs, interactive particle canvas background, and portfolio sections.
 */

import { useState, useEffect } from 'react';
import type { AccentColor } from './types/portfolio';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { TerminalModal } from './components/TerminalModal';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';

/**
 * Root Portfolio Application Component.
 */
export function App() {
  const [accent, setAccent] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-accent') as AccentColor;
      if (['cyan', 'emerald', 'violet', 'amber'].includes(saved)) {
        return saved;
      }
    }
    return 'cyan';
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Sync accent attribute to root HTML document element
  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    localStorage.setItem('portfolio-accent', accent);
  }, [accent]);

  // Global keyboard shortcuts (Ctrl+K / Cmd+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Optional: Backtick shortcut to quickly open terminal
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Interactive 60fps Constellation Canvas Background */}
      <ParticleBackground accent={accent} />

      {/* Global Navigation Bar */}
      <Navbar
        accent={accent}
        onSelectAccent={setAccent}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content Landmarks */}
      <main className="relative z-10 flex flex-col">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceTimeline />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Retro-Futuristic CLI Terminal Modal */}
      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        accent={accent}
        onSelectAccent={setAccent}
      />

      {/* Quick Command & Fuzzy Search Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAccent={setAccent}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />
    </div>
  );
}

export default App;
