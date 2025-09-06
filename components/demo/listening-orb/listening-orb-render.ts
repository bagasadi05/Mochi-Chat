/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

type ListeningOrbProps = {
  ctx: CanvasRenderingContext2D;
  color?: string;
  volume: number;
};

// State untuk animasi yang mulus
let smoothedVolume = 0;
let baseRadiusScale = 0.9;
let pulseScale = 1;
let rotation = 0;

export function renderListeningOrb(props: ListeningOrbProps) {
  const { ctx, color = '#a142f4', volume } = props;
  const { width, height } = ctx.canvas;
  const center = { x: width / 2, y: height / 2 };
  const maxRadius = Math.min(width, height) / 2.5;

  // Smooth the volume changes for a more fluid animation
  smoothedVolume += (volume - smoothedVolume) * 0.1;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // --- Animation Logic ---
  const pulseIntensity = smoothedVolume * 1.5;
  pulseScale = 1 + pulseIntensity * 0.1;
  rotation += 0.001;

  // --- Draw Outer Glow ---
  const glowRadius = maxRadius * (baseRadiusScale + 0.1) * pulseScale;
  const glowGradient = ctx.createRadialGradient(
    center.x,
    center.y,
    glowRadius * 0.7,
    center.x,
    center.y,
    glowRadius
  );
  glowGradient.addColorStop(0, `${color}33`); // Inner glow
  glowGradient.addColorStop(1, `${color}00`); // Outer transparent
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, width, height);

  // --- Draw Main Orb ---
  const orbRadius = maxRadius * baseRadiusScale * pulseScale;
  const orbGradient = ctx.createRadialGradient(
    center.x,
    center.y,
    0,
    center.x,
    center.y,
    orbRadius
  );
  orbGradient.addColorStop(0, `${color}FF`);
  orbGradient.addColorStop(0.8, `${color}CC`);
  orbGradient.addColorStop(1, `${color}88`);

  ctx.fillStyle = orbGradient;
  ctx.beginPath();
  ctx.arc(center.x, center.y, orbRadius, 0, Math.PI * 2);
  ctx.fill();

  // --- Draw Subtle Inner Rings for texture ---
  ctx.save();
  ctx.translate(center.x, center.y);
  ctx.rotate(rotation);
  ctx.strokeStyle = `${color}44`;
  ctx.lineWidth = 1;

  for (let i = 1; i <= 3; i++) {
    ctx.beginPath();
    ctx.arc(0, 0, (orbRadius / 4) * i, 0, Math.PI * 1.5);
    ctx.stroke();
  }

  ctx.restore();
}