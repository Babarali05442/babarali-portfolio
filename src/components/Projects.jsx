import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolderOpen } from 'react-icons/fa';
import { projects } from '../data/projects';
import useScrollReveal from '../hooks/useScrollReveal';

function ProjectPlaceholder({ title, color }) {
  return (
    <div
      className="h-48 flex items-center justify-center rounded-t-2xl"
      style={{
        background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      }}
    >
      <FaFolderOpen size={48} style={{ color: `${color}40` }} />
      <span
        className="ml-4 text-lg font-semibold"
        style={{ color: `${color}60` }}
      >
        {title}
      </span>
    </div>
  );
}

export default function Projects() {
  const [ref, isVisible] = useScrollReveal(0.05);

  return (
    <section id="projects" className="relative py-24 px-4" aria-label="Featured projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A showcase of my best work — built with passion and precision.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="glass-card overflow-hidden group cursor-default"
            >
              {project.image ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ) : (
                <ProjectPlaceholder title={project.title} color={project.color} />
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary !py-2 !px-4 text-sm"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2 !px-4 text-sm"
                      aria-label={`View ${project.title} live demo`}
                    >
                      <FaExternalLinkAlt size={12} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
