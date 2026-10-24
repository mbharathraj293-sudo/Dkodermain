import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, FolderGit2, Landmark, Sliders, Sparkles } from 'lucide-react';

const NODES_DATA = [
  { id: 'learn', name: 'LEARN', angle: 0, dist: 135, icon: BookOpen, color: '#A855F7', target: '#learn', tag: 'Stage 01-05' },
  { id: 'tracks', name: 'CAREERS', angle: 60, dist: 145, icon: Sliders, color: '#38BDF8', target: '#tracks', tag: '6 Tracks' },
  { id: 'hackathons', name: 'HACKATHONS', angle: 120, dist: 135, icon: Trophy, color: '#FACC15', target: '#hackathons', tag: '$150k Pools' },
  { id: 'projects', name: 'PROJECTS', angle: 180, dist: 145, icon: FolderGit2, color: '#34D399', target: '#projects', tag: 'Open Source' },
  { id: 'colleges', name: 'COLLEGES', angle: 240, dist: 135, icon: Landmark, color: '#FB7185', target: '#colleges', tag: 'Constellation' },
  { id: 'pathfinder', name: 'PATHFINDER', angle: 300, dist: 145, icon: Sparkles, color: '#FDE047', target: '#pathfinder', tag: 'Smart Engine' },
];

export default function Universe2DFallback({ onNodeSelect }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeClick = (target) => {
    if (onNodeSelect) {
      onNodeSelect(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] flex items-center justify-center select-none overflow-hidden">
      {/* Orbital Ring Background SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="6 6" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="rgba(126,58,242,0.15)" />
        
        {/* Connection rays from center to nodes */}
        {NODES_DATA.map((node) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = 200 + Math.cos(rad) * node.dist;
          const y = 200 + Math.sin(rad) * node.dist;
          const isHovered = hoveredNode === node.id;
          return (
            <line
              key={node.id}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke={isHovered ? node.color : 'rgba(255, 255, 255, 0.12)'}
              strokeWidth={isHovered ? '2' : '1'}
              strokeDasharray={isHovered ? 'none' : '4 4'}
              className="transition-colors duration-300"
            />
          );
        })}
      </svg>

      {/* Central DKoder Core */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], rotate: [0, 360] }}
        transition={{ scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 40, repeat: Infinity, ease: 'linear' } }}
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-dkoder-purple-700 via-dkoder-darker to-dkoder-yellow/20 p-1 flex items-center justify-center shadow-glow-purple"
      >
        <div className="w-full h-full rounded-full bg-dkoder-darker flex flex-col items-center justify-center border border-white/20">
          <span className="font-display font-black text-xl text-dkoder-yellow">DK</span>
          <span className="text-[8px] font-mono tracking-widest text-slate-400">CORE</span>
        </div>
      </motion.div>

      {/* Orbital Interactive Nodes */}
      {NODES_DATA.map((node) => {
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * node.dist;
        const y = Math.sin(rad) * node.dist;
        const Icon = node.icon;
        const isHovered = hoveredNode === node.id;

        return (
          <motion.div
            key={node.id}
            onClick={() => handleNodeClick(node.target)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="absolute z-20 cursor-pointer flex flex-col items-center group"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md shadow-lg"
              style={{
                backgroundColor: isHovered ? 'rgba(20, 10, 35, 0.9)' : 'rgba(10, 5, 20, 0.75)',
                borderColor: isHovered ? node.color : 'rgba(255, 255, 255, 0.15)',
                boxShadow: isHovered ? `0 0 20px ${node.color}55` : 'none',
              }}
            >
              <Icon className="w-5 h-5 transition-transform group-hover:scale-110" style={{ color: node.color }} />
            </div>

            <div className="mt-1.5 flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold tracking-wider text-slate-200 group-hover:text-white transition-colors bg-dkoder-darker/80 px-2 py-0.5 rounded border border-white/10">
                {node.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
