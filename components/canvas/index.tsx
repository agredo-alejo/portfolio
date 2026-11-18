import { useEffect, useRef } from "react";
import { Particle } from "./particle";
import { useReducedMotion } from "../shared/useReducedMotion";
export default function Canvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current,
      context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0,
      height = 0,
      particles: Particle[] = [],
      animation = 0,
      last = 0;
    function draw(delta: number) {
      if (!context) return;
      context.fillStyle = "#333";
      context.fillRect(0, 0, width, height);
      for (const particle of particles)
        particle.update(context, particles, width, height, delta);
    }
    function resize() {
      if (!canvas || !context) return;
      width = window.innerWidth + 1;
      height = window.innerHeight + 1;
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      particles = Array.from({ length: 25 }, () => new Particle(width, height));
      draw(0);
    }
    function tick(time: number) {
      const delta = last ? Math.min((time - last) / 16.667, 2) : 0;
      last = time;
      if (!document.hidden) draw(delta);
      animation = requestAnimationFrame(tick);
    }
    resize();
    window.addEventListener("resize", resize);
    if (!reduced) animation = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);
  return (
    <canvas ref={ref} className="particle-background" aria-hidden="true" />
  );
}
