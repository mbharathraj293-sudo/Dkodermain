import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ArrowRight, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import Modal from '../ui/Modal';
import { studentProjects, projectCategories } from '../../data/projects';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? studentProjects
    : studentProjects.filter((p) => p.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <section id="projects" className="relative py-24 sm:py-28 bg-[#0F1117] border-y border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="PORTFOLIO VALIDATION"
          title="BUILD PROOF,"
          highlight="NOT JUST SKILLS"
          subtitle="Top product engineering recruiters look for verifiable architectural proof. Ship projects solving real systems challenges."
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {projectCategories.map((cat) => {
            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium tracking-wider transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-dkoder-yellow text-black font-bold shadow-dkoder-yellow'
                    : 'bg-[#161922] text-slate-300 hover:text-white hover:bg-[#1E222D] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedProject(proj)}
                className="tech-card rounded-2xl p-6 border border-white/10 hover:border-dkoder-yellow/40 transition-all cursor-pointer group flex flex-col justify-between shadow-editorial"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-dkoder-yellow/10 text-dkoder-yellow border border-dkoder-yellow/20">
                      {proj.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {proj.difficulty}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {proj.tagline}
                  </p>

                  {/* Problem & Career Relevance Box */}
                  <div className="p-3 rounded-xl bg-[#161922] border border-white/[0.04] space-y-2 mb-4">
                    <div>
                      <span className="text-[9px] font-mono uppercase text-slate-500 block">The Core Problem:</span>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{proj.problem}</p>
                    </div>

                    <div className="pt-2 border-t border-white/[0.04]">
                      <span className="text-[9px] font-mono uppercase text-dkoder-yellow block">Career Relevance:</span>
                      <p className="text-[11px] text-slate-200 line-clamp-2">{proj.careerRelevance}</p>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {proj.technology.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-dkoder-yellow" />
                      <span>{proj.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      <span>{proj.forks}</span>
                    </span>
                  </div>

                  <span className="text-dkoder-yellow group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>Inspect Proof</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Drawer / Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={`Proof-of-Work Project • Category: ${selectedProject.category} • ${selectedProject.difficulty}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">Problem Statement</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#161922] p-3.5 rounded-xl border border-white/[0.06]">
                {selectedProject.problem}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-dkoder-yellow mb-1.5">Architecture & Key Implementation Notes</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
                {selectedProject.architectureNote}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Verified Skills Acquired</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProject.skillsGained.map((skill, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-[#161922] border border-white/[0.06] text-xs text-white flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-dkoder-yellow/5 border border-dkoder-yellow/20">
              <span className="text-[10px] font-mono uppercase text-dkoder-yellow font-bold block mb-1">Recruiter Placement Relevance:</span>
              <p className="text-xs text-white font-medium">{selectedProject.careerRelevance}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                ⭐ {selectedProject.stars} GitHub Community Stars
              </span>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-dkoder-yellow"
              >
                Close Project Preview
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
