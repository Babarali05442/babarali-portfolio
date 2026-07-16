import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaGithub, FaStar, FaCodeBranch, FaBookOpen, FaExternalLinkAlt } from 'react-icons/fa';
import { profile } from '../data/profile';
import useScrollReveal from '../hooks/useScrollReveal';

export default function GitHubSection() {
  const [githubData, setGithubData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ref, isVisible] = useScrollReveal(0.05);

  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          axios.get(`https://api.github.com/users/${profile.githubUsername}`),
          axios.get(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`),
        ]);
        setGithubData(userRes.data);
        setRepos(reposRes.data);
        setLoading(false);
      } catch (err) {
        setError('Unable to load GitHub data');
        setLoading(false);
      }
    };
    fetchGitHub();
  }, []);

  return (
    <section className="relative py-24 px-4" aria-label="GitHub activity">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            <FaGithub className="inline-block mr-2 -mt-1" size={36} />
            <span className="gradient-text">GitHub</span> Activity
          </h2>
          <p className="section-subtitle">
            My open-source contributions and coding activity.
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-gray-500">{error}</p>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-4 inline-flex"
            >
              <FaGithub size={16} />
              Visit My GitHub
            </a>
          </div>
        )}

        {githubData && !loading && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Repositories', value: githubData.public_repos, icon: FaBookOpen },
                { label: 'Followers', value: githubData.followers, icon: FaStar },
                { label: 'Following', value: githubData.following, icon: FaCodeBranch },
                { label: 'Public Gists', value: githubData.public_gists, icon: FaCodeBranch },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass-card p-5 text-center"
                  >
                    <Icon className="mx-auto mb-2 text-primary" size={24} />
                    <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0B1120&title_color=3B82F6&icon_color=8B5CF6&text_color=E2E8F0&border_radius=12`}
                alt="GitHub Stats"
                className="max-w-full h-auto rounded-2xl"
                loading="lazy"
              />
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0B1120&title_color=3B82F6&text_color=E2E8F0&border_radius=12`}
                alt="Top Languages"
                className="max-w-full h-auto rounded-2xl"
                loading="lazy"
              />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, idx) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="glass-card p-5 group block"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-semibold group-hover:text-primary transition-colors truncate pr-2">
                      {repo.name}
                    </h4>
                    <FaExternalLinkAlt size={12} className="text-gray-600 mt-1 flex-shrink-0" />
                  </div>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            background: getLangColor(repo.language),
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaStar size={11} />
                      {repo.stargazers_count}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function getLangColor(lang) {
  const colors = {
    JavaScript: '#F7DF1E',
    Python: '#3776AB',
    HTML: '#E34F26',
    CSS: '#1572B6',
    PHP: '#777BB4',
    TypeScript: '#3178C6',
    Java: '#B07219',
    default: '#3B82F6',
  };
  return colors[lang] || colors.default;
}
