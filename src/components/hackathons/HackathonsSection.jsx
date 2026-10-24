import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, ArrowRight, Bookmark, BookmarkCheck, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';
import Modal from '../ui/Modal';
import { hackathonOpportunities } from '../../data/hackathons';

export default function HackathonsSection() {
  const [savedHacks, setSavedHacks] = useState([]);
  const [selectedHack, setSelectedHack] = useState(null);
  const [joinedHacks, setJoinedHacks] = useState([]);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedHacks(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleJoin = (id) => {
    if (!joinedHacks.includes(id)) {
      setJoinedHacks(prev => [...prev, id]);
    }
  };

  return (
    <section id="hackathons" className="relative py-24 sm:py-28 bg-[#0A0C10] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="COMPETITIVE BOUNTIES"
          title="BUILD BEYOND"
          highlight="THE CLASSROOM"
          subtitle="Turn collegiate hackathons into placement accelerators. Compete in high-stakes sprints to win prize bounties and direct interview waivers."
        />

        {/* Opportunity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {hackathonOpportunities.map((hack) => {
            const isSaved = savedHacks.includes(hack.id);
            const isJoined = joinedHacks.includes(hack.id);

            return (
              <TiltCard
                key={hack.id}
                maxRotation={5}
                className="tech-card rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-dkoder-yellow/40 transition-all flex flex-col justify-between shadow-editorial group"
              >
                <div>
                  {/* Top Bar: Codename & Status & Bookmark */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-dkoder-yellow">
                      {hack.codename}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${
                        hack.statusType === 'live'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-dkoder-yellow/10 text-dkoder-yellow border-dkoder-yellow/30'
                      }`}>
                        {hack.status}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleSave(e, hack.id)}
                        aria-label={isSaved ? 'Unsave opportunity' : 'Save opportunity'}
                        className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4 text-dkoder-yellow fill-dkoder-yellow" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-2">
                    {hack.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">
                    {hack.category}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {hack.shortDesc}
                  </p>

                  {/* Bounty & Partner Perks */}
                  <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] mb-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                        Prize Bounty & Perks
                      </span>
                      <span className="text-sm sm:text-base font-bold font-display text-dkoder-yellow">
                        {hack.prizePool}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-white/[0.04] flex items-center gap-4 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{hack.daysLeft}d deadline</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-500" />
                        <span>{hack.teamSize}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {hack.techStack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Actions: SAVE, EXPLORE, JOIN */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedHack(hack)}
                    className="px-3.5 py-2 rounded-lg text-xs font-mono font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.08] transition-colors cursor-pointer"
                  >
                    Explore Brief
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => toggleSave(e, hack.id)}
                      className="hidden sm:inline-flex px-3 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {isSaved ? 'Saved' : 'Save'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleJoin(hack.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        isJoined
                          ? 'bg-emerald-500 text-black cursor-default'
                          : 'bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-dkoder-yellow'
                      }`}
                    >
                      {isJoined ? 'Registered' : 'Join Squad'}
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Opportunity Brief Modal */}
      {selectedHack && (
        <Modal
          isOpen={!!selectedHack}
          onClose={() => setSelectedHack(null)}
          title={selectedHack.title}
          subtitle={`${selectedHack.codename} • ${selectedHack.category}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Total Reward Pool</span>
                <span className="text-xl font-bold font-display text-dkoder-yellow">{selectedHack.prizePool}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Registration Deadline</span>
                <span className="text-sm font-semibold text-white">{selectedHack.deadline}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Recruitment Perks & Placement Waivers</h4>
              <ul className="space-y-2">
                {selectedHack.recruiterPartners.map((partner, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{partner}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Challenge Mission Brief</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedHack.shortDesc}</p>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">Team Format: {selectedHack.teamSize}</span>
              <button
                type="button"
                onClick={() => {
                  handleJoin(selectedHack.id);
                  setSelectedHack(null);
                }}
                className="px-5 py-2 rounded-lg text-xs font-mono font-bold uppercase bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-dkoder-yellow cursor-pointer"
              >
                {joinedHacks.includes(selectedHack.id) ? 'Already Registered' : 'Confirm Squad Registration'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
