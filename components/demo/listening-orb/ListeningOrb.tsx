/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useRef } from 'react';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';
import { renderListeningOrb } from './listening-orb-render';

type ListeningOrbProps = {
  /** The color of the orb. */
  color?: string;
};

export default function ListeningOrb({ color }: ListeningOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { volume } = useLiveAPIContext();
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let scale = 1;
    function calculateScale() {
      const size = Math.min(window.innerWidth, window.innerHeight);
      scale = size / 1000;
      canvas!.width = Math.min(600, size * 0.8);
      canvas!.height = Math.min(600, size * 0.8);
    }

    window.addEventListener('resize', calculateScale);
    calculateScale();

    const renderLoop = () => {
      renderListeningOrb({ ctx, color, volume });
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', calculateScale);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [color, volume]);

  return <canvas className="listening-orb" ref={canvasRef} />;
}