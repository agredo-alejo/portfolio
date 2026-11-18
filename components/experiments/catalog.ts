export interface Experiment {
  id: string;
  title: string;
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
        title: "circular",
        preview: "/particle/circular/circular.png",
        source: "/particle/circular/index.html",
      },
      {
        id: "boids",
        title: "boids",
        preview: "/particle/boids/boids.png",
        source: "/particle/boids/index.html",
      },
      {
        id: "waves",
        title: "waves",
        preview: "/math/sineWave/waves.png",
        source: "/math/sineWave/index.html",
      },
      {
        id: "gravity",
        title: "gravity",
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
        title: "tesseract",
        preview: "/render/tesseract/tesseract.png",
        source: "/render/tesseract/index.html",
      },
      {
        id: "ray-casting",
        title: "ray casting",
        preview: "/render/rayCasting/rayCasting.png",
        source: "/render/rayCasting/index.html",
      },
      {
        id: "ray-marching",
        title: "ray marching",
        preview: "/render/rayMarching/rayMarching.png",
        source: "/render/rayMarching/index.html",
      },
      {
        id: "cylinder",
        title: "3d cylinder",
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
        title: "Game Of Life",
        preview: "/genetic/gameOfLife/gameOfLife.png",
        source: "/genetic/gameOfLife/index.html",
      },
      {
        id: "evolving-agents",
        title: "visualize health",
        preview: "/genetic/GA_VisualizeHealth/GA_VisualizeHealth.png",
        source: "/genetic/GA_VisualizeHealth/index.html",
      },
      {
        id: "learning-to-fly",
        title: "NEAT Flappy Bird",
        preview: "/genetic/NEAT_FlappyBird/NEAT_FlappyBird.png",
        source: "/genetic/NEAT_FlappyBird/index.html",
      },
      {
        id: "relationships",
        title: "visualize relationship",
        preview:
          "/genetic/GA_VisualizeRelationship/GA_VisualizeRelationship.png",
        source: "/genetic/GA_VisualizeRelationship/index.html",
      },
    ],
  },
] as const satisfies readonly ExperimentCategory[];
export const allExperiments: readonly Experiment[] =
  experimentCategories.flatMap((category) => [...category.experiments]);
