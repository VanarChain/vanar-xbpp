import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Category } from '@/lib/types';

interface CategoryIconProps {
  category: Category;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export function CategoryIcon({ category, size = 'md', animated = true, className }: CategoryIconProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const sizes = {
    sm: 40,
    md: 64,
    lg: 96,
  };

  const dimension = sizes[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, dimension, dimension);
      const centerX = dimension / 2;
      const centerY = dimension / 2;

      if (category === 'SPEND') {
        // Flowing particles representing value transfer
        const particleCount = 8;
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2 + frame * 0.02;
          const radius = dimension * 0.25 + Math.sin(frame * 0.05 + i) * 5;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const size = 2 + Math.sin(frame * 0.1 + i) * 1;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(217, 91%, 68%, ${0.4 + Math.sin(frame * 0.05 + i) * 0.3})`;
          ctx.fill();
        }
        
        // Central glow
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, dimension * 0.2);
        gradient.addColorStop(0, 'hsla(217, 91%, 68%, 0.3)');
        gradient.addColorStop(1, 'hsla(217, 91%, 68%, 0)');
        ctx.beginPath();
        ctx.arc(centerX, centerY, dimension * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      } else if (category === 'SIGN') {
        // Waveform signature animation
        ctx.beginPath();
        ctx.strokeStyle = 'hsla(43, 96%, 56%, 0.6)';
        ctx.lineWidth = 2;
        
        for (let x = dimension * 0.15; x < dimension * 0.85; x++) {
          const progress = (x - dimension * 0.15) / (dimension * 0.7);
          const wave = Math.sin(progress * Math.PI * 3 + frame * 0.1) * 8;
          const envelope = Math.sin(progress * Math.PI);
          const y = centerY + wave * envelope;
          
          if (x === dimension * 0.15) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        
        // Pen dot
        const dotX = dimension * 0.15 + ((frame * 2) % (dimension * 0.7));
        const dotProgress = (dotX - dimension * 0.15) / (dimension * 0.7);
        const dotWave = Math.sin(dotProgress * Math.PI * 3 + frame * 0.1) * 8;
        const dotEnvelope = Math.sin(dotProgress * Math.PI);
        const dotY = centerY + dotWave * dotEnvelope;
        
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'hsla(43, 96%, 56%, 0.8)';
        ctx.fill();
      } else if (category === 'DEFENSE') {
        // Shield with radar pulse
        const pulseRadius = ((frame * 0.5) % 30) + 10;
        const pulseOpacity = 1 - (pulseRadius - 10) / 30;
        
        // Radar rings
        for (let i = 0; i < 3; i++) {
          const ringRadius = ((frame * 0.5 + i * 10) % 30) + 10;
          const ringOpacity = (1 - (ringRadius - 10) / 30) * 0.5;
          
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `hsla(0, 91%, 71%, ${ringOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        // Shield shape
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - dimension * 0.25);
        ctx.lineTo(centerX + dimension * 0.2, centerY - dimension * 0.1);
        ctx.lineTo(centerX + dimension * 0.2, centerY + dimension * 0.1);
        ctx.lineTo(centerX, centerY + dimension * 0.25);
        ctx.lineTo(centerX - dimension * 0.2, centerY + dimension * 0.1);
        ctx.lineTo(centerX - dimension * 0.2, centerY - dimension * 0.1);
        ctx.closePath();
        ctx.strokeStyle = 'hsla(0, 91%, 71%, 0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = 'hsla(0, 91%, 71%, 0.1)';
        ctx.fill();
      }

      frame++;
      if (animated) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [category, dimension, animated]);

  return (
    <canvas
      ref={canvasRef}
      width={dimension}
      height={dimension}
      className={cn("pointer-events-none", className)}
    />
  );
}
