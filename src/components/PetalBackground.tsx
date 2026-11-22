import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  colorType: number;
  flip: number;
  flipSpeed: number;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  alphaSpeed: number;
  color: string;
}

export const PetalBackground: React.FC = () => {
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

    // Color palettes for petals: soft blush, baby pink, dusty rose, creamy white
    const petalColors = [
      'rgba(252, 214, 223, ', // soft blush pink
      'rgba(244, 146, 167, ', // vibrant baby pink
      'rgba(222, 193, 200, ', // dusty rose
      'rgba(255, 240, 243, ', // creamy blush
      'rgba(255, 255, 255, ', // gentle white highlight
    ];

    const sparkleColors = ['#F6DF9C', '#FCE1E7', '#FFFFFF', '#E6C56E'];

    // Initialize petals
    const petalCount = window.innerWidth < 768 ? 24 : 45;
    const petals: Petal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height * 0.2,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 0.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      opacity: Math.random() * 0.5 + 0.35,
      colorType: Math.floor(Math.random() * petalColors.length),
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.02 + 0.01,
    }));

    // Initialize subtle floating sparkles
    const sparkleCount = window.innerWidth < 768 ? 20 : 35;
    const sparkles: Sparkle[] = Array.from({ length: sparkleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.2,
      alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
    }));

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      const scaleX = Math.cos(p.flip);
      ctx.scale(scaleX, 1);

      ctx.beginPath();
      // Organic petal shape using bezier curves
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(
        p.size * 0.8, -p.size * 0.7,
        p.size * 0.9, p.size * 0.5,
        0, p.size
      );
      ctx.bezierCurveTo(
        -p.size * 0.9, p.size * 0.5,
        -p.size * 0.8, -p.size * 0.7,
        0, -p.size
      );

      // Delicate radial gradient for 3D curved softness
      const gradient = ctx.createRadialGradient(
        0, -p.size * 0.3, p.size * 0.1,
        0, 0, p.size
      );
      gradient.addColorStop(0, `${petalColors[p.colorType]}${p.opacity * 0.95})`);
      gradient.addColorStop(1, `${petalColors[p.colorType]}${p.opacity * 0.4})`);

      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (s: Sparkle) => {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.fillStyle = s.color;
      ctx.globalAlpha = Math.max(0.05, Math.min(0.9, s.alpha));

      // 4-point star sparkle
      ctx.beginPath();
      const radius = s.size * 2;
      const inset = s.size * 0.4;
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.lineTo(Math.cos(angle + Math.PI / 4) * inset, Math.sin(angle + Math.PI / 4) * inset);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update sparkles
      sparkles.forEach((s) => {
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.85 || s.alpha < 0.15) {
          s.alphaSpeed = -s.alphaSpeed;
        }
        s.y -= 0.15;
        if (s.y < 0) s.y = height;
        drawSparkle(s);
      });

      // Render & update petals
      petals.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.005) * 0.4;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        drawPetal(p);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ mixBlendMode: 'normal' }}
    />
  );
};
