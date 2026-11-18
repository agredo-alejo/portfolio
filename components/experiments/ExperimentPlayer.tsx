import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Experiment } from "./catalog";
import Icon from "../shared/Icon";
export default function ExperimentPlayer({
  experiment,
}: {
  experiment: Experiment;
}) {
  const frame = useRef<HTMLIFrameElement>(null),
    container = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false),
    [playing, setPlaying] = useState(false),
    [ready, setReady] = useState(false),
    [failed, setFailed] = useState(false),
    [revision, setRevision] = useState(0);
  const visible = useRef(false);
  const send = useCallback(
    (active: boolean) =>
      frame.current?.contentWindow?.postMessage(
        { type: "portfolio-player", action: active ? "play" : "pause" },
        "*",
      ),
    [],
  );
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0].isIntersecting;
        send(visible.current && playing && !document.hidden);
      },
      { threshold: 0.1 },
    );
    if (container.current) observer.observe(container.current);
    const onVisibility = () =>
      send(playing && visible.current && !document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [playing, send]);
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
        send(playing && visible.current && !document.hidden);
      }
      if (event.data.type === "portfolio-player-error") {
        setFailed(true);
        setPlaying(false);
        send(false);
      }
    }
    window.addEventListener("message", message);
    return () => window.removeEventListener("message", message);
  }, [playing, send]);
  useEffect(() => {
    if (!loaded || ready || failed) return;
    const timer = window.setTimeout(() => {
      setFailed(true);
      setPlaying(false);
    }, 10000);
    return () => window.clearTimeout(timer);
  }, [loaded, ready, failed, revision]);
  function play() {
    if (!loaded) {
      setLoaded(true);
      setPlaying(true);
    } else {
      setPlaying(!playing);
      send(!playing && visible.current && !document.hidden);
    }
  }
  function reset() {
    setFailed(false);
    setReady(false);
    setRevision((value) => value + 1);
  }
  return (
    <div
      className="experiment-player"
      ref={container}
      aria-busy={loaded && !ready && !failed}
    >
      <div className="player-header">
        <h3>{experiment.title}</h3>
        <span role="status">
          {failed
            ? "Unavailable"
            : !loaded
              ? "Ready to play"
              : !ready
                ? "Loading…"
                : playing
                  ? "Playing here"
                  : "Paused"}
        </span>
      </div>
      <div className="experiment-stage">
        {!loaded && (
          <>
            <Image
              src={experiment.preview}
              alt={experiment.title + " preview"}
              fill
              sizes="(max-width: 760px) 88vw, 65vw"
              className="experiment-poster"
            />
            <button className="player-start" type="button" onClick={play}>
              <Icon name="play" />
              <span>Play experiment</span>
            </button>
          </>
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
            <button className="text-button" type="button" onClick={reset}>
              Try again
            </button>
          </div>
        )}
      </div>
      <div className="player-controls">
        <button
          className="icon-button"
          type="button"
          onClick={play}
          disabled={failed}
          aria-label={(playing ? "Pause " : "Play ") + experiment.title}
          title={playing ? "Pause" : "Play"}
        >
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <button
          className="icon-button"
          type="button"
          onClick={reset}
          disabled={!loaded}
          aria-label={"Reset " + experiment.title}
          title="Reset"
        >
          <Icon name="reset" />
        </button>
        <span>Runs on this page</span>
      </div>
      <p className="experiment-description">{experiment.description}</p>
    </div>
  );
}
