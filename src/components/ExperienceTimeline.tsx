/**
 * @file ExperienceTimeline.tsx
 * @description Career timeline component highlighting engineering leadership,
 * technical milestones, system architecture contributions, and quantified impact.
 */

import React from 'react';
import { Briefcase, Calendar, MapPin, Award, CheckCircle } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/portfolioData';

/**
 * Career Milestones Timeline presentation component.
 */
export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="experience" className="py-20 relative z-10" aria-label="Career Journey and Milestones">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Career Milestones & Impact
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            History of architecting systems, leading engineering initiatives, and scaling high-throughput distributed applications.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
          {EXPERIENCE_DATA.map((item) => (
            <div key={item.id} className="relative pl-6 sm:pl-10">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              </div>

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/30 transition-all shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="text-cyan-400 text-sm font-semibold mt-0.5">
                      {item.company}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Key Impact Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold mb-4">
                  <Award className="w-3.5 h-3.5" />
                  <span>Key Impact: {item.impact}</span>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-5">
                  {item.description.map((desc, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
