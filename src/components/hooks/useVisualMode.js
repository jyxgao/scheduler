import { useState } from "react";

export function useVisualMode(initialmode) {
  const [history, setHistory] = useState([initialmode]);

  const transition = function (newmode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newmode]);
    } else {
      setHistory((prev) => [...prev, newmode]);
    }
  };

  const back = function () {
    if (history.length > 1) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  };

  return {
    mode: history[history.length - 1],
    transition,
    back,
  };
}
