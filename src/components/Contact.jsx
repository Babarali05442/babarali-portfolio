import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import { profile } from '../data/profile';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const [ref, isVisible] = useScrollReveal(0.05);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const { sendEmail } = await import('../utils/emailjs');
      const result = await sendEmail(formData);

      if (result && result.success) {
        setStatus({
          type: 'success',
          message: `✅ Message sent successfully! I'll get back to you within 24 hours at ${formData.email}.`,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        fallbackToGmail(formData);
      }
    } catch {
      fallbackToGmail(formData);
    }

    setLoading(false);
  };

  const fallbackToGmail = (data) => {
    const subject = encodeURIComponent(`Portfolio Contact: ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${subject}&body=${body}`,
      '_blank'
    );

    setStatus({
      type: 'info',
      message: `📧 Gmail has been opened in a new tab with your message pre-filled. If it didn't open, you can email me directly at ${profile.email}`,
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: FaEnvelope, label: 'Email', value: profile.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}` },
    { icon: FaPhone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: profile.location, href: null },
  ];

  return (
    <section id="contact" className="relative py-24 px-4" aria-label="Contact section">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Fill the form below or contact me directly — I&apos;ll respond within 24 hours.
          </p>
        </motion.div>

        {/* ========== HOW IT WORKS — INFO STRIP ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-8 p-4 rounded-2xl bg-primary/5 border border-primary/15 flex items-start gap-3"
        >
          <FaInfoCircle className="text-primary mt-0.5 flex-shrink-0" size={18} />
          <div className="text-sm text-gray-300">
            <strong className="text-primary">How this form works:</strong> When you submit this form, it first tries to send your message directly to my inbox via EmailJS (instant, no extra steps). If EmailJS isn&apos;t configured yet, Gmail will automatically open in a new tab with your message pre-filled — you just need to click Send.
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* ========== CONTACT INFO CARDS ========== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const Comp = item.href ? 'a' : 'div';
              const isEmailLink = item.label === 'Email';
              const props = item.href
                ? {
                    href: item.href,
                    ...(isEmailLink ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
                  }
                : {};
              return (
                <Comp
                  key={item.label}
                  {...props}
                  className="glass-card p-5 flex items-center gap-4 group cursor-pointer hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-medium text-sm sm:text-base break-all group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </Comp>
              );
            })}

            {/* Quick action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
              >
                <FaEnvelope size={14} />
                Email Me
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium hover:bg-secondary/20 transition-all"
              >
                <FaPhone size={14} />
                Call Me
              </a>
            </div>
          </motion.div>

          {/* ========== CONTACT FORM ========== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Ahmed Khan"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="e.g. ahmed@example.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Your Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                />
              </div>

              {/* Status message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : status.type === 'info'
                      ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                      : 'bg-red-500/10 border border-red-500/20 text-red-400'
                  }`}
                >
                  {status.type === 'success' ? (
                    <FaCheckCircle size={16} />
                  ) : status.type === 'info' ? (
                    <FaInfoCircle size={16} />
                  ) : (
                    <FaTimesCircle size={16} />
                  )}
                  {status.message}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center !py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending...
                  </span>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-xs">
                Or email me directly at{' '}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile.email}
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
