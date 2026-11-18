import { test } from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import {
  allExperiments,
  experimentCategories,
} from "../components/experiments/catalog";
import { projectsList } from "../components/projects/projectsList";
test("the experiment catalog is unique and preserves local original sources", async () => {
  const ids = new Set<string>();
  assert(experimentCategories.length >= 3);
  for (const experiment of allExperiments) {
    assert(!ids.has(experiment.id));
    ids.add(experiment.id);
    await access(path.join("public", experiment.source));
    await access(path.join("public", experiment.preview));
    const runtime = await readFile(
      "public/experiments/runtime/" + experiment.id + ".html",
      "utf8",
    );
    assert(runtime.includes("portfolio-player-ready"));
  }
  assert.equal(ids.size, 12);
});
test("all four projects have distinct real desktop and phone captures", async () => {
  assert.equal(projectsList.length, 4);
  assert.equal(
    projectsList.find((project) => project.id === "herencia")?.title,
    "Empanadas Herencia",
  );
  for (const project of projectsList) {
    assert.notEqual(project.desktop, project.phone);
    await access(path.join("public", project.desktop));
    await access(path.join("public", project.phone));
  }
});
