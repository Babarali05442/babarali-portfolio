import { motion } from 'framer-motion';

const shapes = [
  { type: 'circle', size: 300, x: '5%', y: '15%', delay: 0, color: 'rgba(59,130,246,0.03)' },
  { type: 'circle', size: 200, x: '80%', y: '10%', delay: 1, color: 'rgba(139,92,246,0.04)' },
  { type: 'circle', size: 250, x: '60%', y: '60%', delay: 0.5, color: 'rgba(59,130,246,0.02)' },
  { type: 'circle', size: 180, x: '20%', y: '75%', delay: 1.5, color: 'rgba(139,92,246,0.03)' },
  { type: 'diamond', size: 60, x: '90%', y: '30%', delay: 0.8, color: 'rgba(59,130,246,0.06)' },
  { type: 'diamond', size: 40, x: '10%', y: '50%', delay: 2, color: 'rgba(139,92,246,0.05)' },
];

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.type === 'circle' ? shape.size : shape.size,
            borderRadius: shape.type === 'circle' ? '50%' : '8px',
            background: shape.color,
            transform: shape.type === 'diamond' ? 'rotate(45deg)' : 'none',
          }}
          animate={{
            y: [0, -30, 0],
            rotate: shape.type === 'diamond' ? [45, 90, 45] : [0, 0, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: shape.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
