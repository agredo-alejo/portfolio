import React, { useEffect, useRef } from "react";
import {
   startAnimation,
   animation,
   background,
   stopAnimation,
} from "@apjs/dynamic";
import { Particle } from "./particle";

function Canvas() {
   const canvasRef = useRef<HTMLCanvasElement>(null);

   useEffect(() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;

      let particles: Particle[] = [];
      let numParticles = 25;

      for (let i = 0; i < numParticles; i++) {
         particles.push(new Particle());
      }

      animation.animate(() => {
         if (!ctx) return;

         background(ctx, "#333");

         for (let particle of particles) {
            particle.update(ctx, particles);
         }
      });
      startAnimation();

      function resize() {
         if (!ctx) return;

         ctx.canvas.width = window.innerWidth + 1;
         ctx.canvas.height = window.innerHeight + 1;

         particles = [];
         for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
         }
      }
      resize();

      addEventListener("resize", resize);
      return () => {
         stopAnimation();
         removeEventListener("resize", resize);
      };
   }, []);

   return (
      <canvas ref={canvasRef} className="fixed min-w-full min-h-screen -z-10" />
   );
}

export default Canvas;
