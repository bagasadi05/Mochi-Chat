/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { RefObject, useEffect, useState, useRef } from 'react';

import { renderBasicFace } from './basic-face-render';

import useFace from '../../../hooks/demo/use-face';
import useHover from '../../../hooks/demo/use-hover';
import useTilt from '../../../hooks/demo/use-tilt';
import { useLiveAPIContext } from '../../../contexts/LiveAPIContext';

// Minimum volume level that indicates audio output is occurring
const AUDIO_OUTPUT_DETECTION_THRESHOLD = 0.05;

// Amount of delay between end of audio output and setting talking state to false
const TALKING_STATE_COOLDOWN_MS = 2000;

type BasicFaceProps = {
  /** The canvas element on which to render the face. */
  canvasRef: RefObject<HTMLCanvasElement | null>;
  /** The radius of the face. */
  radius?: number;
  /** The color of the face. */
  color?: string;
};

export default function BasicFace({
  canvasRef,
  radius = 250,
  color,
}: BasicFaceProps) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationFrameId = useRef(0);

  const { volume } = useLiveAPIContext();
  const [isTalking, setIsTalking] = useState(false);
  const [scale, setScale] = useState(0.1);

  const { eyeScale, mouthScale } = useFace();
  const hoverPosition = useHover();
  const tiltAngle = useTilt({
    maxAngle: 5,
    speed: 0.075,
    isActive: isTalking,
  });

  // Gunakan ref untuk menyimpan nilai animasi terbaru. Hal ini memungkinkan loop animasi
  // untuk mengaksesnya tanpa perlu menjadi dependensi dari useEffect yang
  // mengatur loop, sehingga mencegah loop dihentikan dan dibuat ulang pada setiap frame.
  const animationState = useRef({ eyeScale, mouthScale, color });
  useEffect(() => {
    animationState.current = { eyeScale, mouthScale, color };
  }, [eyeScale, mouthScale, color]);

  useEffect(() => {
    function calculateScale() {
      setScale(Math.min(window.innerWidth, window.innerHeight) / 1000);
    }
    window.addEventListener('resize', calculateScale);
    calculateScale();
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    if (volume > AUDIO_OUTPUT_DETECTION_THRESHOLD) {
      setIsTalking(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setIsTalking(false),
        TALKING_STATE_COOLDOWN_MS
      );
    }
  }, [volume]);

  // Loop rendering yang terpisah untuk animasi kanvas.
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const renderLoop = () => {
      // Akses state terbaru dari ref.
      const { eyeScale, mouthScale, color } = animationState.current;
      renderBasicFace({ ctx, mouthScale, eyeScale, color });
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    // Mulai loop.
    animationFrameId.current = requestAnimationFrame(renderLoop);

    // Bersihkan dengan membatalkan frame animasi saat komponen dilepas.
    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [canvasRef]); // Efek ini hanya berjalan sekali saat kanvas tersedia.

  return (
    <canvas
      className="basic-face"
      ref={canvasRef}
      width={radius * 2 * scale}
      height={radius * 2 * scale}
      style={{
        display: 'block',
        borderRadius: '50%',
        transform: `translateY(${hoverPosition}px) rotate(${tiltAngle}deg)`,
      }}
    />
  );
}
