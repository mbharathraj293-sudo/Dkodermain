import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Trophy, Landmark, GitCommit, Briefcase } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

function Counter({ target, suffix = '', prefix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(target, 10);
    const stepTime = Math.abs(Math.floor((duration * 1000) / 60));
    const stepVal = Math.ceil(end / 60);

    const timer = setInterval(() => {
      start += stepVal;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-display font-extrabold">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactStats() {
  const stats = [
    {
      label: 'Active Student Engineers',
      num: 54000,
      suffix: '+',
      icon: Users,
      color: '#A855F7',
      subtext: 'Across 450+ colleges globally'
    },
    {
      label: 'Mission Prize Bounties',
      num: 180,
      prefix: '$',
      suffix: 'k+',
      icon: Trophy,
      color: '#FACC15',
      subtext: 'Distributed directly to student squads'
    },
    {
      label: 'Campus Chapters & Hubs',
      num: 450,
      suffix: '+',
      icon: Landmark,
      color: '#38BDF8',
      subtext: 'Operating on-ground incubation labs'
    },
    {
      label: 'Production Repos Shipped',
      num: 1200,
      suffix: '+',
      icon: GitCommit,
      color: '#34D399',
      subtext: 'Open source builds with active users'
    },
    {
      label: 'Engineering Placement Rate',
      num: 98,
      suffix: '.4%',
      icon: Briefcase,
      color: '#FB7185',
      subtext: 'Top tech & funded startup offers'
    }
  ];

  return (
    <section id="stats" className="relative py-24 bg-dkoder-darker/90 border-y border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-dots-pattern opacity-40" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-dkoder-purple-900/10 blur-[130px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="07 • ECOSYSTEM SCALE"
          title="MEASURABLE IMPACT &"
          highlight="METRICS"
          subtitle="Real outcomes generated across the DKoder student opportunity network."
        />

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-dkoder-yellow/40 transition-colors shadow-lg"
              >
                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                    style={{
                      backgroundColor: `${item.color}15`,
                      borderColor: `${item.color}40`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>

                  <p className="text-2xl sm:text-3xl text-white mb-1">
                    <Counter target={item.num} prefix={item.prefix} suffix={item.suffix} />
                  </p>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                    {item.label}
                  </h4>
                </div>

                <div className="pt-3 border-t border-white/[0.06] mt-4">
                  <span className="text-[10px] font-mono text-slate-400 block">
                    {item.subtext}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
