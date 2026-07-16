import { motion } from 'framer-motion';
import { FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import { experience } from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Experience() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="experience" className="relative py-24 px-4" aria-label="Experience section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            My professional journey and internships.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />

          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative pl-12 sm:pl-20 pb-16 last:pb-0"
            >
              <div className="absolute left-0 sm:left-4 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                <FaBriefcase size={13} className="text-white" />
              </div>

              <div className="glass-card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {exp.duration}
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <FaCheckCircle className="text-primary mt-1 flex-shrink-0" size={14} />
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
