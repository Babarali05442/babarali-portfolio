import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaDownload, FaArrowRight, FaBriefcase } from 'react-icons/fa';
import { profile, socialLinks } from '../data/profile';
import useTypingAnimation from '../hooks/useTypingAnimation';

const iconMap = { FaGithub, FaLinkedin, FaEnvelope, FaPhone };

export default function Hero() {
  const typedText = useTypingAnimation(profile.subHeadlines, 100, 50, 2000);
  const containerRef = useRef(null);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ========== PROFILE IMAGE — BETTER ADJUSTED ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-[340px] lg:h-[340px]">
              {/* Outer glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl animate-pulse-glow opacity-60" />

              {/* Dashed rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border border-dashed border-primary/20"
              />

              {/* Gradient border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-primary p-[4px] shadow-2xl shadow-primary/20">
                {/* Inner circle with bg */}
                <div className="w-full h-full rounded-full overflow-hidden bg-dark">
                  <img
                    src={profile.profileImage}
                    alt={`${profile.name} - Full Stack Web Developer`}
                    className="w-full h-full object-cover object-[center_25%] rounded-full"
                    loading="eager"
                    style={{ transform: 'scale(1.08)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.classList.add(
                        'flex', 'items-center', 'justify-center', 'text-6xl', 'font-bold'
                      );
                      e.target.parentElement.innerHTML =
                        '<span style="background:linear-gradient(135deg,#3B82F6,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent">B</span>';
                    }}
                  />
                </div>
              </div>

              {/* Small decorative dot */}
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary shadow-lg shadow-primary/50" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-secondary shadow-lg shadow-secondary/50" />
            </div>
          </motion.div>

          {/* ========== TEXT CONTENT ========== */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 tracking-tight"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-300 mb-4 h-10 sm:h-12"
            >
              <span>{typedText}</span>
              <span className="inline-block w-[2px] h-8 sm:h-10 bg-primary ml-1 align-middle animate-blink" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {profile.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8"
            >
              <a href={profile.resumeUrl} download className="btn-primary">
                <FaDownload size={14} />
                Download Resume
              </a>
              <button onClick={() => handleScroll('#projects')} className="btn-secondary">
                <FaBriefcase size={14} />
                View Projects
              </button>
              <button onClick={() => handleScroll('#contact')} className="btn-secondary">
                <FaArrowRight size={14} />
                Hire Me
              </button>
            </motion.div>

            {/* ========== SOCIAL ICONS — FIXED EMAIL LINK ========== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                const isExternalLink = !link.url.startsWith('mailto:') && !link.url.startsWith('tel:');

                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={isExternalLink ? '_blank' : undefined}
                    rel={isExternalLink ? 'noopener noreferrer' : undefined}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
                    aria-label={link.name}
                    title={link.name === 'Email' ? 'Click to send email' : link.name === 'Phone' ? 'Click to call' : link.name}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
        >
          <motion.div className="w-1 h-2 rounded-full bg-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
