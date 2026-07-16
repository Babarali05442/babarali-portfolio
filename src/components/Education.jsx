import { motion } from 'framer-motion';
import { FaGraduationCap, FaCheckCircle } from 'react-icons/fa';
import { education } from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Education() {
  const [ref, isVisible] = useScrollReveal(0.1);

  return (
    <section id="education" className="relative py-24 px-4" aria-label="Education section">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="section-subtitle">
            Academic background and continuous learning journey.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/50 via-primary/50 to-transparent" />

          {education.map((edu, idx) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
              className="relative pl-12 sm:pl-20 pb-16 last:pb-0"
            >
              <div className="absolute left-0 sm:left-4 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center shadow-lg shadow-secondary/20">
                <FaGraduationCap size={14} className="text-white" />
              </div>

              <div className="glass-card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                    <p className="text-secondary font-medium">{edu.institution}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {edu.duration}
                  </span>
                </div>

                <p className="text-gray-400 leading-relaxed mb-4">{edu.description}</p>

                <ul className="space-y-2">
                  {edu.highlights.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <FaCheckCircle className="text-secondary mt-1 flex-shrink-0" size={14} />
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
