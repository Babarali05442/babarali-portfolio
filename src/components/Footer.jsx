import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa';
import { profile } from '../data/profile';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-4 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="text-2xl font-extrabold gradient-text">
              {profile.shortName}
            </a>
            <p className="text-gray-500 text-sm mt-2">
              &copy; {currentYear} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="GitHub"
            >
              <FaGithub size={17} />
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={17} />
            </motion.a>
            <motion.a
              href={`mailto:${profile.email}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
              aria-label="Email"
            >
              <FaEnvelope size={17} />
            </motion.a>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={16} />
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-1.5 flex-wrap">
            Built with <FaHeart className="text-red-500" size={13} /> using React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
