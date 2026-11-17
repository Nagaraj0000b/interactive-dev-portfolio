/**
 * @file SkillsSection.tsx
 * @description Interactive Technical Skills Matrix with category filtering,
 * real-time Zero-Trust search sanitization, proficiency gauges, and metadata tags.
 */

import React, { useState, useMemo } from 'react';
import { Search, Filter, CheckCircle2 } from 'lucide-react';
import { SKILLS_DATA } from '../data/portfolioData';
import type { SkillCategory } from '../types/portfolio';
import { sanitizeSearchQuery } from '../utils/validation';
import { playClickSound } from '../utils/audio';

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & APIs' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'AI & Data' },
  { id: 'security', label: 'Security & Infra' },
];

/**
 * Skills Matrix presentation and filtering component.
 */
export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filtered and sanitized skill list.
   */
  const filteredSkills = useMemo(() => {
    const cleanQuery = sanitizeSearchQuery(searchQuery).toLowerCase();

    return SKILLS_DATA.filter((skill) => {
      const matchesCategory =
        selectedCategory === 'all' || skill.category === selectedCategory;

      const matchesSearch =
        !cleanQuery ||
        skill.name.toLowerCase().includes(cleanQuery) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(cleanQuery));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="skills" className="py-20 relative z-10" aria-label="Technical Skills Matrix">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Filter className="w-3.5 h-3.5" />
            <span>Capability Index</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Technical Proficiency & Expertise
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Battle-tested technologies and architectural capabilities honed across high-load production distributed systems.
          </p>
        </div>

        {/* Controls: Search Bar & Category Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input with Zero-Trust Sanitization */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword (e.g. React, K8s)..."
              maxLength={40}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500/80 transition-colors placeholder:text-slate-600"
              aria-label="Filter skills"
            />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="group p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-base group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {skill.yearsOfExp} years production exp
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  {skill.level}
                </span>
              </div>

              {/* Proficiency Gauge */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Proficiency</span>
                  <span className="font-mono text-cyan-400 font-bold">{skill.proficiency}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50 font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800/50">
            <p className="text-slate-400 text-sm">No matching technical skills found.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
