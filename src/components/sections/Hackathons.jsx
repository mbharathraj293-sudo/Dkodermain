import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Users, ArrowRight, ShieldAlert, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import TiltCard from '../ui/TiltCard';
import Modal from '../ui/Modal';
import { hackathons } from '../../data/hackathons';

export default function Hackathons() {
  const [selectedMission, setSelectedMission] = useState(null);
  const [registeredMissions, setRegisteredMissions] = useState([]);

  const handleRegister = (missionId) => {
    if (!registeredMissions.includes(missionId)) {
      setRegisteredMissions((prev) => [...prev, missionId]);
    }
  };

  return (
    <section id="hackathons" className="relative py-24 sm:py-32 bg-dkoder-darker overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-dkoder-yellow/5 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="03 • COMPETITIVE ARENA"
          title="TURN IDEAS INTO"
          highlight="IMPACT"
          subtitle="Compete in high-stakes hackathon missions. Build with leading engineers, earn industry bounties, and get accelerated by top founders."
        />

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hackathons.map((mission) => {
            const isRegistered = registeredMissions.includes(mission.id);

            return (
              <TiltCard
                key={mission.id}
                maxRotation={6}
                className="glass-card rounded-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-dkoder-yellow/40 transition-all duration-300 group shadow-xl"
              >
                <div>
                  {/* Top Bar: Codename & Status */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-dkoder-yellow flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>{mission.codename}</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        mission.statusColor === 'emerald'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : mission.statusColor === 'amber'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      }`}>
                        {mission.status}
                      </span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white group-hover:text-dkoder-yellow transition-colors mb-2">
                    {mission.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">
                    {mission.category} • Organized by {mission.organizer}
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6 line-clamp-2">
                    {mission.description}
                  </p>

                  {/* Prize & Metadata Badges */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Prize Bounty Pool
                      </span>
                      <span className="text-base sm:text-lg font-bold font-display text-dkoder-yellow">
                        {mission.prizePool}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{mission.daysLeft}d left</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{mission.teamsRegistered} teams</span>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {mission.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Action Button */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400">
                    Difficulty: <span className="text-white font-medium">{mission.difficulty}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setSelectedMission(mission)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider bg-white/[0.06] hover:bg-dkoder-yellow hover:text-black text-white border border-white/10 hover:border-dkoder-yellow transition-all duration-200"
                  >
                    <span>{isRegistered ? 'View Brief (Joined)' : 'Mission Brief'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Mission Briefing Modal */}
      {selectedMission && (
        <Modal
          isOpen={!!selectedMission}
          onClose={() => setSelectedMission(null)}
          title={selectedMission.title}
          subtitle={`${selectedMission.codename} • ${selectedMission.category}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-dkoder-yellow/10 border border-dkoder-yellow/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Total Reward Pool</span>
                <span className="text-xl font-bold font-display text-dkoder-yellow">{selectedMission.prizePool}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">Registration Deadline</span>
                <span className="text-sm font-semibold text-white">{selectedMission.deadline}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Mission Objectives</h4>
              <p className="text-sm text-slate-200 leading-relaxed">{selectedMission.description}</p>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Challenge Tracks</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedMission.tracks.map((track, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs text-white flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-dkoder-yellow" />
                    <span>{track}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">Participant Perks & Grants</h4>
              <ul className="space-y-2">
                {selectedMission.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">{selectedMission.spotsLeft}</span>
              <button
                type="button"
                onClick={() => handleRegister(selectedMission.id)}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  registeredMissions.includes(selectedMission.id)
                    ? 'bg-emerald-500 text-black shadow-glow-emerald cursor-default'
                    : 'bg-dkoder-yellow text-black hover:bg-yellow-400 shadow-glow-yellow'
                }`}
              >
                {registeredMissions.includes(selectedMission.id) ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ENROLLED IN MISSION</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>DEPLOY SQUAD NOW</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
