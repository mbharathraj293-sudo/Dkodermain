import { motion } from 'framer-motion';
import { ShieldCheck, Award, FileCode2, Users, Building2, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function ImpactTrustSection() {
  const benchmarks = [
    {
      metric: '45+ Blueprints',
      title: 'Company Recruitment Patterns',
      desc: 'Accurately modeled around recruitment rounds of Amazon, Google, Zoho, TCS, and Tier-1 product firms.',
      tag: 'Curated Pattern Archive'
    },
    {
      metric: '1,800+ MCQs',
      title: 'Cognitive & Technical Questions',
      desc: 'Quants, logical deductions, verbal, and technical CS outputs calibrated for Round 1 shortlisting.',
      tag: 'Screening Database'
    },
    {
      metric: '450+ DSA Problems',
      title: 'In-Browser Coding Problems',
      desc: 'Pattern-based problem sets in Python, Java, C++, and SQL with multi-testcase evaluation.',
      tag: 'Online Assessment Bank'
    },
    {
      metric: '100% Proctored',
      title: 'Company-Timed Mock Tests',
      desc: 'Exact sectional time limits, webcam proctoring simulation, and negative marking constraints.',
      tag: 'Simulation Engine'
    }
  ];

  return (
    <section className="relative py-20 bg-[#0A0C10] border-b border-white/[0.06] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="PLATFORM RIGOR"
          title="BUILT FOR OUTCOMES."
          highlight="BACKED BY DATA."
          subtitle="Curated problem banks, real recruitment round patterns, and standardized evaluations engineered for maximum student placement readiness."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benchmarks.map((item, idx) => (
            <div
              key={idx}
              className="tech-card rounded-2xl p-6 border border-white/10 hover:border-dkoder-yellow/40 transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[10px] font-mono uppercase text-dkoder-yellow font-bold block mb-1">
                  {item.tag}
                </span>
                <p className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-1">
                  {item.metric}
                </p>
                <h4 className="text-sm font-semibold text-slate-200 mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] text-[10px] font-mono text-slate-500">
                Verified Platform Standard
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Data Declaration */}
        <div className="mt-8 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center text-[11px] font-mono text-slate-500">
          Note: Benchmark numbers represent DKoder's curated technical curriculum coverage and platform assessment capabilities.
        </div>
      </div>
    </section>
  );
}
