import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, ExternalLink, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import { projects, projectCategories } from '../../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-dkoder-darker/95 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute bottom-1/4 right-1/3 w-[600px] h-[600px] bg-dkoder-purple-900/10 blur-[160px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="04 • SHIPPED CODE"
          title="BUILD SOMETHING"
          highlight="REAL"
          subtitle="Explore open-source production projects engineered by students and deployed to thousands of global users."
        />

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {projectCategories.map((category) => {
            const isSelected = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-dkoder-yellow text-black font-bold shadow-glow-yellow'
                    : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-dkoder-yellow/40 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 text-dkoder-yellow">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                    {project.summary}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span className="truncate max-w-[180px]">{project.college}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-dkoder-yellow" />
                        <span>{project.stars}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        <span>{project.forks}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-slate-500">
                      By {project.author}
                    </span>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-dkoder-yellow hover:text-white transition-colors"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
