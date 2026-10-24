import { motion } from 'framer-motion';

export default function SectionHeading({
  tag,
  title,
  highlight,
  subtitle,
  align = 'center',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'} ${className}`}>
      {tag && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest border border-dkoder-yellow/30 bg-dkoder-yellow/5 text-dkoder-yellow mb-4 shadow-[0_0_15px_rgba(250,204,21,0.15)]`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-dkoder-yellow animate-pulse" />
          {tag}
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-white mb-4 leading-tight"
      >
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-dkoder-yellow via-amber-300 to-dkoder-purple-300 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 font-normal leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
