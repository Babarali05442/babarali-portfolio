import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaRocket, FaGraduationCap } from 'react-icons/fa';
import { aboutBio, stats } from '../data/profile';
import useScrollReveal from '../hooks/useScrollReveal';

const statIcons = [FaCode, FaRocket, FaLaptopCode, FaGraduationCap];

export default function About() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="about" className="relative py-24 px-4" aria-label="About section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="section-subtitle">
            A passionate developer crafting modern digital experiences with cutting-edge technologies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {aboutBio.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-gray-300 leading-relaxed text-base sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, idx) => {
              const Icon = statIcons[idx];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="glass-card p-6 text-center group cursor-default"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} />
                  </div>
                  <div className="text-3xl font-extrabold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
