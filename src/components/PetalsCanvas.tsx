import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  tilt: number;
  tiltSpeed: number;
  color: string;
  type: 'petal' | 'star';
}

export const PetalsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const petalColors = [
      'rgba(251, 207, 232, 0.75)',
      'rgba(244, 114, 182, 0.65)',
      'rgba(253, 164, 175, 0.7)',
      'rgba(254, 205, 211, 0.8)',
      'rgba(249, 168, 212, 0.6)',
    ];

    const starColors = [
      'rgba(245, 208, 115, 0.7)',
      'rgba(253, 230, 138, 0.8)',
      'rgba(255, 255, 255, 0.85)',
    ];

    const count = Math.min(Math.floor(width / 34), 42);
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      const isStar = Math.random() < 0.2;
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isStar ? Math.random() * 2.5 + 1.5 : Math.random() * 11 + 9,
        speedY: isStar ? Math.random() * 0.4 + 0.2 : Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.5 - 0.25,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() * 1.5 - 0.75) * 0.02,
        tilt: Math.random() * Math.PI,
        tiltSpeed: Math.random() * 0.03 + 0.01,
        color: isStar
          ? starColors[Math.floor(Math.random() * starColors.length)]
          : petalColors[Math.floor(Math.random() * petalColors.length)],
        type: isStar ? 'star' : 'petal',
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(Math.cos(p.tilt), 1);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 3, -p.size / 2, p.size / 2, 0, p.size);
      ctx.bezierCurveTo(p.size / 2, p.size / 2, p.size / 2, -p.size / 3, 0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 245, 230, 0.3)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawStar = (s: Petal) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'rgba(245, 208, 115, 0.6)';

      ctx.beginPath();
      const spikes = 4;
      const outerRadius = s.size;
      const innerRadius = s.size / 2.5;
      let rot = (Math.PI / 2) * 3;
      let x = 0;
      let y = 0;
      const step = Math.PI / spikes;

      ctx.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.tilt) * 0.6;
        p.rotation += p.rotationSpeed;
        p.tilt += p.tiltSpeed;

        if (p.type === 'petal') {
          drawPetal(p);
        } else {
          drawStar(p);
        }

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 opacity-80"
      aria-hidden="true"
    />
  );
};
