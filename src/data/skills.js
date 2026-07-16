import {
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaPython,
  FaPhp,
  FaGitAlt,
  FaGithub,
  FaDocker,
  FaLinux,
} from 'react-icons/fa';
import {
  SiTailwindcss,
  SiFastapi,
  SiMysql,
  SiVercel,
  SiNetlify,
  SiGithubactions,
} from 'react-icons/si';
import { TbApi, TbSql, TbBrain } from 'react-icons/tb';
import { VscAzure } from 'react-icons/vsc';

export const skillCategories = [
  {
    title: 'Frontend',
    icon: FaReact,
    color: '#3B82F6',
    skills: [
      { name: 'HTML', level: 90, icon: FaHtml5 },
      { name: 'CSS', level: 85, icon: FaCss3Alt },
      { name: 'JavaScript', level: 80, icon: FaJsSquare },
      { name: 'React', level: 82, icon: FaReact },
      { name: 'Tailwind', level: 88, icon: SiTailwindcss },
    ],
  },
  {
    title: 'Backend',
    icon: FaPython,
    color: '#8B5CF6',
    skills: [
      { name: 'Python', level: 85, icon: FaPython },
      { name: 'FastAPI', level: 75, icon: SiFastapi },
      { name: 'PHP', level: 70, icon: FaPhp },
      { name: 'REST APIs', level: 80, icon: TbApi },
    ],
  },
  {
    title: 'Database',
    icon: TbSql,
    color: '#10B981',
    skills: [
      { name: 'MySQL', level: 78, icon: SiMysql },
      { name: 'SQL', level: 80, icon: TbSql },
    ],
  },
  {
    title: 'AI',
    icon: TbBrain,
    color: '#F59E0B',
    skills: [
      { name: 'GenAI', level: 70, icon: TbBrain },
      { name: 'Prompt Engineering', level: 75, icon: TbBrain },
      { name: 'Playwright', level: 72, icon: TbApi },
      { name: 'Web Scraping', level: 78, icon: FaPython },
    ],
  },
  {
    title: 'DevOps',
    icon: FaDocker,
    color: '#EF4444',
    skills: [
      { name: 'Git', level: 85, icon: FaGitAlt },
      { name: 'GitHub', level: 88, icon: FaGithub },
      { name: 'Docker (Basic)', level: 50, icon: FaDocker },
      { name: 'Linux (Basic)', level: 55, icon: FaLinux },
      { name: 'GitHub Actions', level: 45, icon: SiGithubactions },
      { name: 'CI/CD Fundamentals', level: 50, icon: VscAzure },
    ],
  },
  {
    title: 'Deployment',
    icon: SiVercel,
    color: '#06B6D4',
    skills: [
      { name: 'Vercel', level: 82, icon: SiVercel },
      { name: 'Netlify', level: 78, icon: SiNetlify },
    ],
  },
];
