/**
 * @file ProjectModal.tsx
 * @description Deep-dive modal component displaying architectural details, system trade-offs,
 * performance metrics, and interactive simulated demo for a selected portfolio project.
 */

import React, { useEffect, useState } from 'react';
import { X, CheckCircle2, Cpu, Zap, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types/portfolio';
import { playClickSound, playSuccessChime } from '../utils/audio';

interface ProjectModalProps {
  /** The selected project or null if closed */
  project: Project | null;
  /** Callback to close the modal */
  onClose: () => void;
}

/**
 * Detailed project inspect modal component.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [simulatedLoadState, setSimulatedLoadState] = useState<'idle' | 'running' | 'success'>('idle');
  const [simulatedOutput, setSimulatedOutput] = useState<string>('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  /**
   * Runs an interactive sandbox simulation for the project to demonstrate functionality.
   */
  const handleRunSimulation = () => {
    playClickSound();
    setSimulatedLoadState('running');
    setSimulatedOutput('Initializing edge node worker pool...');

    setTimeout(() => {
      setSimulatedOutput('Executing Zero-Trust payload validation... ✓ Passed');
    }, 600);

    setTimeout(() => {
      setSimulatedOutput('Streaming telemetry packets over WebSockets... 60 FPS locked.');
      setSimulatedLoadState('success');
      playSuccessChime();
    }, 1400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span className="capitalize">{project.category} Architecture</span>
            </div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {project.title}
            </h2>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              System Architecture & Purpose
            </h3>
            <p className="leading-relaxed text-slate-200">{project.description}</p>
          </div>

          {/* Key Metrics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Performance & SLA Metrics
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-lg font-bold text-cyan-400 block">{metric.value}</span>
                  <span className="text-[11px] text-slate-400 font-medium">{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Highlights */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Engineering Highlights
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                Live Architecture Sandbox
              </span>
              <button
                onClick={handleRunSimulation}
                disabled={simulatedLoadState === 'running'}
                className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5" />
                {simulatedLoadState === 'running' ? 'Simulating...' : 'Run Diagnostics'}
              </button>
            </div>
            {simulatedOutput && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                &gt; {simulatedOutput}
              </div>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-mono border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            onClick={playClickSound}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <GithubIcon size={16} />
            View Repository
          </a>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};
