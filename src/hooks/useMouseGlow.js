import { useEffect, useRef } from 'react';

export default function useMouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      glow.style.background = `radial-gradient(600px circle at ${clientX}px ${clientY}px, rgba(59, 130, 246, 0.06), transparent 80%)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return glowRef;
}
