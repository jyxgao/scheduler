import { useState } from 'react';

export function useVisualMode (initialmode) {
  // const [mode, setMode] = useState(initialmode);
  //store history of modes so we can go backwards
  const [history, setHistory] = useState([initialmode])

  const transition = function (newmode, replace = false) {
    if (replace) {
      // setMode(newmode)
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newmode])
    } else {
      // setMode(newmode);
      setHistory((prev) => [...prev, newmode]);
    }
  }

  const back = function () {
    // const newHistory = [...history];
    if (history.length > 1) {
      //remove the last state
      // newHistory.pop()
      //set mode to the previous
      // setMode(newHistory[newHistory.length-1])
      setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    }
  }

  return { 
    mode: history[history.length - 1],
    transition,
    back
  }
}