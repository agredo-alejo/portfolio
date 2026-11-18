import { useState } from "react";
import Image from "next/image";
import { experimentCategories } from "./catalog";
import type { Experiment } from "./catalog";
import ExperimentPlayer from "./ExperimentPlayer";
export default function Experiments() {
  const [categoryId, setCategoryId] = useState<string>(
    experimentCategories[0].id,
  );
  const category =
    experimentCategories.find((item) => item.id === categoryId) ??
    experimentCategories[0];
  const [selection, setSelection] = useState<Record<string, string>>({});
  const current: Experiment =
    category.experiments.find((item) => item.id === selection[category.id]) ??
    category.experiments[0];
  function moveTab(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const count = experimentCategories.length;
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % count;
    else if (event.key === "ArrowLeft") next = (index + count - 1) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setCategoryId(experimentCategories[next].id);
    document
      .getElementById("category-" + experimentCategories[next].id)
      ?.focus();
  }
  return (
    <section
      id="experiments"
      className="section experiments-section"
      aria-labelledby="experiments-heading"
    >
      <div className="section-heading">
        <span className="eyebrow">Curiosity, in code</span>
        <h2 id="experiments-heading">Experiments</h2>
        <p>Play with an idea, right here.</p>
      </div>
      <div
        className="experiment-tabs"
        role="tablist"
        aria-label="Experiment categories"
      >
        {experimentCategories.map((item, index) => (
          <button
            type="button"
            role="tab"
            id={"category-" + item.id}
            key={item.id}
            aria-controls="experiment-panel"
            aria-selected={item.id === category.id}
            tabIndex={item.id === category.id ? 0 : -1}
            onKeyDown={(event) => moveTab(event, index)}
            onClick={() => setCategoryId(item.id)}
          >
            {item.title}
            <span>{item.experiments.length}</span>
          </button>
        ))}
      </div>
      <div
        className="experiment-layout"
        role="tabpanel"
        id="experiment-panel"
        aria-labelledby={"category-" + category.id}
      >
        <ExperimentPlayer key={current.id} experiment={current} />
        <div
          className="experiment-choices"
          role="group"
          aria-label="Choose an experiment"
        >
          {category.experiments.map((item) => (
            <button
              key={item.id}
              type="button"
              className="experiment-choice"
              aria-pressed={current.id === item.id}
              onClick={() =>
                setSelection((previous) => ({
                  ...previous,
                  [category.id]: item.id,
                }))
              }
            >
              <Image
                src={item.preview}
                alt=""
                width={76}
                height={54}
                sizes="76px"
              />
              <span>{item.title}</span>
            </button>
          ))}
          <p>
            Original JavaScript experiments.
            <br />
            One idea at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
