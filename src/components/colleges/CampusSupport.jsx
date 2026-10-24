import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, AlertCircle, TrendingUp, CheckCircle2, Award, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function CampusSupport() {
  const batchReadiness = [
    { subject: 'Coding Practice', percentage: 76, color: '#10B981', note: 'Higher than national college avg (68%)' },
    { subject: 'Aptitude & Verbal', percentage: 71, color: '#38BDF8', note: 'Solid performance across Quants and Logic' },
    { subject: 'Data Structures (DSA)', percentage: 68, color: '#FACC15', note: 'Strong in Arrays/Strings; Graphs need attention' },
    { subject: 'Proctored Mock OAs', percentage: 54, color: '#EF4444', note: 'Time-management bottleneck under exam conditions' }
  ];

  return (
    <section id="campus-support" className="relative py-24 sm:py-28 bg-[#0F1117] border-b border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="CAMPUS & INSTITUTIONAL PARTNERSHIP"
          title="POWERING COLLEGES WITH"
          highlight="HIRING INTELLIGENCE"
          subtitle="Explore how DKoder equips Heads of Department and Training & Placement Cells with real-time academic batch telemetry."
        />

        {/* Institutional Concept Frame */}
        <div className="tech-card rounded-2xl p-6 sm:p-10 border border-white/10 shadow-editorial space-y-8">
          
          {/* Top Row: Institutional Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Students Practicing</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-white">480 Active</p>
              <span className="text-[10px] font-mono text-emerald-400 block">92.4% Batch Participation</span>
            </div>

            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Top Performed Skill</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-emerald-400">Arrays & Strings</p>
              <span className="text-[10px] font-mono text-slate-400 block">84% Success Rate</span>
            </div>

            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 block">Weakest Skill Area</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-rose-400">Mock Assessments</p>
              <span className="text-[10px] font-mono text-rose-300 block">54% Sectional Average</span>
            </div>

            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Active Campus Challenges</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-dkoder-yellow">14 Live Sprints</p>
              <span className="text-[10px] font-mono text-slate-400 block">Departmental Hackathons</span>
            </div>

            <div className="p-4 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1 col-span-2 lg:col-span-1">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Overall Batch Readiness</span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-white">71.8% Index</p>
              <span className="text-[10px] font-mono text-emerald-400 block">Eligible for Campus Drives</span>
            </div>
          </div>

          {/* Main Content Split: BATCH READINESS Breakdown vs College T&P Value */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            
            {/* Left Column: BATCH READINESS Meters (6 Cols) */}
            <div className="lg:col-span-6 bg-[#161922] p-6 rounded-2xl border border-white/[0.06] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>BATCH READINESS (CLASS OF 2026 PREVIEW)</span>
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Live Telemetry</span>
              </div>

              <div className="space-y-3.5">
                {batchReadiness.map((b, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">{b.subject}</span>
                      <span className="font-mono font-bold text-white">{b.percentage}%</span>
                    </div>

                    <div className="w-full h-2 bg-white/[0.08] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${b.percentage}%`, backgroundColor: b.color }}
                      />
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 block">
                      {b.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Institutional Benefits (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-dkoder-yellow block mb-1">
                  Product Concept Preview
                </span>
                <h3 className="text-2xl font-display font-bold text-white">
                  Early Interventions Before Placement Season Starts
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                  HODs identify at-risk students 90 days before company visits. Placement cells automate 1-click candidate shortlists matching exact recruiter cutoffs (e.g. &gt;80% in Java OA, 0 backlogs).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h5 className="text-xs font-bold text-white">At-Risk Student Alerts</h5>
                  <p className="text-[11px] text-slate-400 leading-snug">Flags students falling behind in aptitude before screening exams.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#161922] border border-white/[0.06] space-y-1">
                  <CheckCircle2 className="w-4 h-4 text-dkoder-yellow" />
                  <h5 className="text-xs font-bold text-white">Recruiter Alignment</h5>
                  <p className="text-[11px] text-slate-400 leading-snug">Custom mock tests formatted to visiting company question patterns.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center text-[11px] font-mono text-slate-500">
            Concept demonstration illustrating institutional dashboard integrations for colleges and placement departments.
          </div>
        </div>
      </div>
    </section>
  );
}
