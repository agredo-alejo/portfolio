import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { allExperiments } from "../components/experiments/catalog";
const publicRoot = path.resolve("public");
const output = path.join(publicRoot, "experiments/runtime");
await mkdir(output, { recursive: true });
const bridge = `(()=>{const raf=window.requestAnimationFrame.bind(window);let running=false,id=0;const queue=new Map();function schedule(key){if(!running)return;raf(time=>{if(!running||!queue.has(key))return;const callback=queue.get(key);queue.delete(key);callback(time);});}window.requestAnimationFrame=callback=>{const key=++id;queue.set(key,callback);schedule(key);return key;};window.cancelAnimationFrame=key=>queue.delete(key);window.addEventListener('message',event=>{if(event.source!==parent||event.data?.type!=='portfolio-player')return;const next=event.data.action==='play';if(next===running)return;running=next;if(running)for(const key of queue.keys())schedule(key);});window.addEventListener('load',()=>parent.postMessage({type:'portfolio-player-ready'},'*'));window.addEventListener('error',()=>parent.postMessage({type:'portfolio-player-error'},'*'));})();`;
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
