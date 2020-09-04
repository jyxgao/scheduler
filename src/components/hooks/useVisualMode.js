import { useState } from 'react';

export function useVisualMode (initialmode) {
  const [mode, setMode] = useState(initialmode);
  //store history of modes so we can go backwards
  const [history, setHistory] = useState([initialmode])

  const transition = function (newmode, replace = false) {
    if (replace) {
      setMode(newmode)
      setHistory([...history])
    } else {
      setMode(newmode);
      setHistory([...history, newmode]);
    }
  }

  const back = function () {
    const newHistory = [...history];
    if (newHistory.length > 1) {
      //remove the last state
      newHistory.pop()
      //set mode to the previous
      setMode(newHistory[newHistory.length-1])
      setHistory(newHistory);
    }
  }

  return { 
    mode: mode,
    transition,
    back
  }
}