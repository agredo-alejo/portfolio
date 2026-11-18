import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { allExperiments } from "../components/experiments/catalog";
const publicRoot = path.resolve("public");
const output = path.join(publicRoot, "experiments/runtime");
await mkdir(output, { recursive: true });
// Players mount in view. Wait for original setup to finish, then autoplay independently
// of message timing; the parent can still pause a player that loaded offscreen.
const bridge = `(() => {
  const nativeFrame = window.requestAnimationFrame.bind(window);
  const pending = new Map();
  let loaded = false, requested = true, running = false, sequence = 0;
  function schedule(id) {
    if (!running) return;
    nativeFrame(time => {
      if (!running || !pending.has(id)) return;
      const callback = pending.get(id);
      pending.delete(id);
      callback(time);
    });
  }
  function synchronize() {
    const next = loaded && requested;
    if (next === running) return;
    running = next;
    if (running) for (const id of pending.keys()) schedule(id);
  }
  window.requestAnimationFrame = callback => {
    const id = ++sequence;
    pending.set(id, callback);
    schedule(id);
    return id;
  };
  window.cancelAnimationFrame = id => pending.delete(id);
  window.addEventListener('message', event => {
    if (event.source !== parent || event.data?.type !== 'portfolio-player') return;
    requested = event.data.action === 'play';
    synchronize();
  });
  window.addEventListener('load', () => {
    nativeFrame(() => {
      window.dispatchEvent(new Event('resize'));
      loaded = true;
      synchronize();
      parent.postMessage({type: 'portfolio-player-ready'}, '*');
    });
  });
  window.addEventListener('error', () => parent.postMessage({type: 'portfolio-player-error'}, '*'));
})();`;
function resolvePublic(file: string) {
  const resolved = path.resolve(publicRoot, file.replace(/^\//, ""));
  if (!resolved.startsWith(publicRoot + path.sep))
    throw new Error("Experiment path must remain in public/");
  return resolved;
}
const ids = new Set<string>();
for (const experiment of allExperiments) {
  if (!/^[a-z0-9-]+$/.test(experiment.id) || ids.has(experiment.id))
    throw new Error("Experiment ids must be unique slugs");
  ids.add(experiment.id);
  await readFile(resolvePublic(experiment.preview));
  const sourceFile = resolvePublic(experiment.source);
  let html = await readFile(sourceFile, "utf8");
  const scripts = [
    ...html.matchAll(
      /<script\b([^>]*?)src=["']([^"']+)["']([^>]*)>\s*<\/script>/g,
    ),
  ];
  for (const script of scripts) {
    if (/^(https?:|\/\/)/.test(script[2]))
      throw new Error("Keep experiment scripts local: " + experiment.id);
    const file = path.resolve(path.dirname(sourceFile), script[2]);
    if (!file.startsWith(publicRoot + path.sep))
      throw new Error("Invalid script path");
    let javascript = await readFile(file, "utf8");
    // The self-contained player needs no Vite modulepreload network polyfill.
    javascript = javascript.replace(
      /const (\w+)=function\(\)\{[\s\S]*?modulepreload[\s\S]*?\};\1\(\);/,
      "",
    );
    // The archived boids bundle resizes its canvas but leaves its spatial grid
    // at the old viewport size. Rebuild that grid when the inline frame resizes.
    if (experiment.id === "boids") {
      if (!javascript.includes("Ft(O);"))
        throw new Error("Boids resize adapter no longer matches the archive");
      javascript = javascript.replace("Ft(O);", "Ft(O);addEventListener('resize',Y);");
    }
    html = html.replace(
      script[0],
      '<script type="module">' +
        javascript.replace(/<\/script/gi, "<\\/script") +
        "</script>",
    );
  }
  const base = path.posix.dirname(experiment.source) + "/";
  html = html.replace(
    /<head[^>]*>/i,
    (match) =>
      match + '<base href="' + base + '"><script>' + bridge + "</script>",
  );
  await writeFile(path.join(output, experiment.id + ".html"), html);
}
console.log(
  "Prepared " + ids.size + " original experiments for the inline player.",
);
