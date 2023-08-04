import { useState } from "react";

export default function useVisualMode(initial) {
  
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // history array will always need to have a length that is greater than or equal to 1.

  function transition(newMode, replace = false) {

    setHistory((previous) => {

      const preFix = replace ? previous.slice(0, -1) : previous;

      return preFix.concat(newMode);
    })
  }

  function back() {
    if (history.length > 1) {
      setHistory((previous) => previous.slice(0, -1));
    }
  }

  return { mode: history[history.length - 1], transition, back };
}