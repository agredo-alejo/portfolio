import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Experiment } from "./catalog";
import { useReducedMotion } from "../shared/useReducedMotion";

export default function ExperimentPlayer({
  experiment,
}: {
  experiment: Experiment;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const container = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [revision, setRevision] = useState(0);
  const reducedMotion = useReducedMotion();
  const loaded = entered && !reducedMotion;
  const active = visible && !hidden && !reducedMotion && !failed;
  const send = useCallback((running: boolean) => {
    frame.current?.contentWindow?.postMessage(
      { type: "portfolio-player", action: running ? "play" : "pause" },
      "*",
    );
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setEntered(true);
      },
      { threshold: 0.1 },
    );
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    function message(event: MessageEvent<unknown>) {
      if (
        event.source !== frame.current?.contentWindow ||
        typeof event.data !== "object" ||
        event.data === null ||
        !("type" in event.data)
      )
        return;
      if (event.data.type === "portfolio-player-ready") {
        setReady(true);
        send(active);
      }
      if (event.data.type === "portfolio-player-error") {
        setFailed(true);
        send(false);
      }
    }
    window.addEventListener("message", message);
    send(active);
    return () => window.removeEventListener("message", message);
  }, [active, ready, send, revision]);

  useEffect(() => {
    if (!loaded || ready || failed) return;
    const timer = window.setTimeout(() => {
      setFailed(true);
      send(false);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [loaded, ready, failed, revision, send]);

  function retry() {
    setFailed(false);
    setReady(false);
    setRevision((value) => value + 1);
  }
  return (
    <figure
      className="experiment-player"
      ref={container}
      aria-busy={loaded && !ready && !failed}
      data-playback={reducedMotion ? "reduced" : failed ? "failed" : !ready ? "loading" : active ? "playing" : "paused"}
    >
      <div className="experiment-stage">
        {!loaded && (
          <Image
            src={experiment.preview}
            alt={experiment.title + " preview"}
            fill
            sizes="(max-width: 760px) 88vw, 65vw"
            className="experiment-poster"
          />
        )}
        {loaded && !failed && (
          <iframe
            key={revision}
            ref={frame}
            src={"/experiments/runtime/" + experiment.id + ".html"}
            title={experiment.title + " interactive experiment"}
            sandbox="allow-scripts"
          />
        )}
        {failed && (
          <div className="experiment-failure">
            <p>This experiment could not start.</p>
            <button className="text-button" type="button" onClick={retry}>
              Try again
            </button>
          </div>
        )}
      </div>
      <figcaption className="experiment-title">{experiment.title}</figcaption>
    </figure>
  );
}
