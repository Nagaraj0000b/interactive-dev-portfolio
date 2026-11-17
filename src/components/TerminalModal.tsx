/**
 * @file TerminalModal.tsx
 * @description Interactive Retro-Futuristic CLI developer console modal.
 * Implements a command processor, history navigation, theme switching commands,
 * and easter eggs with strict Zero-Trust input validation.
 */

import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Trash2 } from 'lucide-react';
import type { AccentColor, TerminalLine } from '../types/portfolio';
import { SKILLS_DATA, PROJECTS_DATA, DEVELOPER_PROFILE } from '../data/portfolioData';
import { playTerminalBlip, playSuccessChime } from '../utils/audio';
import { terminalCommandSchema } from '../utils/validation';

interface TerminalModalProps {
  /** Modal open state */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Active accent theme */
  accent: AccentColor;
  /** Callback to switch accent color from terminal */
  onSelectAccent: (accent: AccentColor) => void;
}

const INITIAL_LINES: TerminalLine[] = [
  { id: '1', type: 'info', content: 'SYSTEM: Alex Rivera Developer Console [Version 2.5.0-edge]' },
  { id: '2', type: 'info', content: 'Type "help" to list available commands. Try "skills", "projects", or "theme emerald".' },
];

/**
 * Interactive Terminal Modal component.
 */
export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  accent,
  onSelectAccent,
}) => {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  if (!isOpen) return null;

  /**
   * Processes the entered CLI command with Zero-Trust validation.
   *
   * @param rawCmd - The raw command string entered by the user.
   */
  const executeCommand = (rawCmd: string) => {
    const parseResult = terminalCommandSchema.safeParse(rawCmd);
    if (!parseResult.success) {
      setLines((prev) => [
        ...prev,
        { id: String(Date.now()), type: 'input', content: `$ ${rawCmd}` },
        { id: String(Date.now() + 1), type: 'error', content: 'Error: Command input exceeds safe buffer size.' },
      ]);
      return;
    }

    const commandStr = parseResult.data.trim();
    if (!commandStr) return;

    // Record in history
    setHistory((prev) => [...prev, commandStr]);
    setHistoryIndex(-1);

    const parts = commandStr.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const inputLine: TerminalLine = { id: String(Date.now()), type: 'input', content: `$ ${commandStr}` };
    const outputLines: TerminalLine[] = [];

    switch (cmd) {
      case 'help':
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          content: `Available Commands:
  • help                 - Displays this command reference
  • bio                  - Outputs developer background and philosophy
  • skills [category]    - Lists verified skills (frontend, backend, cloud, ai, security)
  • projects             - Summarizes featured production architectures
  • theme <name>         - Switch accent: cyan | emerald | violet | amber
  • contact              - Displays direct contact channels
  • cat resume.txt       - Dumps high-level career summary
  • matrix               - Activates matrix emerald mode
  • clear                - Wipes the console screen
  • sudo <any>           - Administrative authorization test`,
        });
        break;

      case 'bio':
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          content: `${DEVELOPER_PROFILE.name} - ${DEVELOPER_PROFILE.title}
Location: ${DEVELOPER_PROFILE.location}
Years Active: ${DEVELOPER_PROFILE.experienceYears}+ years
Philosophy: ${DEVELOPER_PROFILE.bio}`,
        });
        break;

      case 'skills': {
        const catFilter = args[0]?.toLowerCase();
        const filtered = catFilter
          ? SKILLS_DATA.filter((s) => s.category === catFilter)
          : SKILLS_DATA.slice(0, 10);

        if (filtered.length === 0) {
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'error',
            content: `No skills found for category "${catFilter}". Valid categories: frontend, backend, cloud, ai, security.`,
          });
        } else {
          const listText = filtered
            .map((s) => `  [${s.level.padEnd(9)}] ${s.name.padEnd(28)} ${s.proficiency}% (${s.yearsOfExp} yrs)`)
            .join('\n');
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'output',
            content: `Verified Skills:\n${listText}`,
          });
        }
        break;
      }

      case 'projects': {
        const summary = PROJECTS_DATA.map(
          (p) => `  • ${p.title} (${p.category.toUpperCase()}): ${p.tagline}\n    Tech: ${p.techStack.join(', ')}`
        ).join('\n\n');
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          content: `Featured Production Projects:\n${summary}`,
        });
        break;
      }

      case 'theme': {
        const requested = args[0]?.toLowerCase() as AccentColor;
        if (['cyan', 'emerald', 'violet', 'amber'].includes(requested)) {
          onSelectAccent(requested);
          playSuccessChime();
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'success',
            content: `Theme accent updated to "${requested}".`,
          });
        } else {
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'error',
            content: 'Invalid theme. Choose: cyan, emerald, violet, amber.',
          });
        }
        break;
      }

      case 'matrix':
        onSelectAccent('emerald');
        playSuccessChime();
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'success',
          content: 'Wake up, Neo... Matrix theme initialized.',
        });
        break;

      case 'contact':
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'output',
          content: `Direct Channels:
  Email:    ${DEVELOPER_PROFILE.socials.email}
  GitHub:   ${DEVELOPER_PROFILE.socials.github}
  LinkedIn: ${DEVELOPER_PROFILE.socials.linkedin}`,
        });
        break;

      case 'cat':
        if (args[0] === 'resume.txt') {
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'output',
            content: `=== RESUME OVERVIEW ===
Name: ${DEVELOPER_PROFILE.name}
Title: Staff Platform Architect
Metrics: 120M+ requests/day, 99.995% Uptime, 35+ projects delivered.
Primary Stack: React 19, TypeScript, Node.js, Go, Python, Gemini API, Docker, Kubernetes.`,
          });
        } else {
          outputLines.push({
            id: String(Date.now() + 1),
            type: 'error',
            content: `File not found: "${args[0] || ''}". Did you mean "cat resume.txt"?`,
          });
        }
        break;

      case 'sudo':
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'error',
          content: 'Permission denied: User "visitor" is not in the sudoers file. This incident will be reported to Santa Claus.',
        });
        break;

      case 'clear':
        setLines([]);
        setInputVal('');
        return;

      default:
        outputLines.push({
          id: String(Date.now() + 1),
          type: 'error',
          content: `Command not recognized: "${cmd}". Type "help" for a list of commands.`,
        });
    }

    setLines((prev) => [...prev, inputLine, ...outputLines]);
    setInputVal('');
  };

  /**
   * Handles keyboard navigation for command history and enter key execution.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playTerminalBlip();

    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(history[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length === 0 || historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= history.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(history[nextIdx] || '');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Developer Console"
    >
      <div className="w-full max-w-3xl h-[560px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Header */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-2 text-slate-400 text-xs font-semibold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              bash - alex@dev-terminal:~ [{accent}]
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLines([])}
              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              title="Clear Terminal Output"
              aria-label="Clear Terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Console (Esc)"
              aria-label="Close Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 text-slate-200">
          {lines.map((line) => {
            if (line.type === 'input') {
              return (
                <div key={line.id} className="text-cyan-400 font-semibold">
                  {line.content}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={line.id} className="text-red-400 bg-red-950/20 px-2 py-1 rounded">
                  {line.content}
                </div>
              );
            }
            if (line.type === 'success') {
              return (
                <div key={line.id} className="text-emerald-400 bg-emerald-950/20 px-2 py-1 rounded">
                  {line.content}
                </div>
              );
            }
            if (line.type === 'info') {
              return (
                <div key={line.id} className="text-slate-400 text-xs italic">
                  {line.content}
                </div>
              );
            }
            return (
              <pre key={line.id} className="whitespace-pre-wrap text-slate-300 font-mono leading-relaxed">
                {line.content}
              </pre>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2">
          <span className="text-cyan-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' for commands..."
            className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs sm:text-sm placeholder:text-slate-600"
            aria-label="CLI Command Input"
          />
          <button
            onClick={() => executeCommand(inputVal)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs flex items-center gap-1 cursor-pointer"
            aria-label="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
