export interface Experiment {
  id: string;
  title: string;
  description: string;
  preview: string;
  source: string;
}
export interface ExperimentCategory {
  id: string;
  title: string;
  experiments: readonly Experiment[];
}
// Add an entry here and its original files under public/. Build prepares its player.
export const experimentCategories = [
  {
    id: "motion",
    title: "Motion & physics",
    experiments: [
      {
        id: "circular",
        title: "Circular",
        description: "Particle motion drawn with trigonometry.",
        preview: "/particle/circular/circular.png",
        source: "/particle/circular/index.html",
      },
      {
        id: "boids",
        title: "Boids",
        description:
          "Simple steering rules create collective behavior. Move your pointer inside the stage.",
        preview: "/particle/boids/boids.png",
        source: "/particle/boids/index.html",
      },
      {
        id: "waves",
        title: "Waves",
        description: "Exploring repeating motion and sine waves.",
        preview: "/math/sineWave/waves.png",
        source: "/math/sineWave/index.html",
      },
      {
        id: "gravity",
        title: "Gravity",
        description: "Particles, acceleration, and motion.",
        preview: "/particle/gravity/gravity.png",
        source: "/particle/gravity/index.html",
      },
    ],
  },
  {
    id: "graphics",
    title: "Graphics & geometry",
    experiments: [
      {
        id: "tesseract",
        title: "Tesseract",
        description:
          "A rotating four-dimensional cube projected onto a canvas.",
        preview: "/render/tesseract/tesseract.png",
        source: "/render/tesseract/index.html",
      },
      {
        id: "ray-casting",
        title: "Ray casting",
        description: "Tracing sight lines through a two-dimensional scene.",
        preview: "/render/rayCasting/rayCasting.png",
        source: "/render/rayCasting/index.html",
      },
      {
        id: "ray-marching",
        title: "Ray marching",
        description: "Exploring distance-based rendering.",
        preview: "/render/rayMarching/rayMarching.png",
        source: "/render/rayMarching/index.html",
      },
      {
        id: "cylinder",
        title: "3D cylinder",
        description: "Projecting geometry onto a flat canvas.",
        preview: "/render/3dCylinder/3dCylinder.png",
        source: "/render/3dCylinder/index.html",
      },
    ],
  },
  {
    id: "simulation",
    title: "Simulation & evolution",
    experiments: [
      {
        id: "game-of-life",
        title: "Game of Life",
        description: "A changing world built from a few cellular rules.",
        preview: "/genetic/gameOfLife/gameOfLife.png",
        source: "/genetic/gameOfLife/index.html",
      },
      {
        id: "evolving-agents",
        title: "Visualize health",
        description:
          "An early experiment in selection and a changing population.",
        preview: "/genetic/GA_VisualizeHealth/GA_VisualizeHealth.png",
        source: "/genetic/GA_VisualizeHealth/index.html",
      },
      {
        id: "learning-to-fly",
        title: "NEAT Flappy Bird",
        description: "Neuroevolution in a small flying-agent environment.",
        preview: "/genetic/NEAT_FlappyBird/NEAT_FlappyBird.png",
        source: "/genetic/NEAT_FlappyBird/index.html",
      },
      {
        id: "relationships",
        title: "Visualize relationships",
        description: "Exploring interactions in an evolving system.",
        preview:
          "/genetic/GA_VisualizeRelationship/GA_VisualizeRelationship.png",
        source: "/genetic/GA_VisualizeRelationship/index.html",
      },
    ],
  },
] as const satisfies readonly ExperimentCategory[];
export const allExperiments: readonly Experiment[] =
  experimentCategories.flatMap((category) => [...category.experiments]);
