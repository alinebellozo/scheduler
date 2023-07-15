import { useState } from "react";

export default function useVisualMode(initial) {
  
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  // history array will always need to have a length that is greater than or equal to 1.

  function transition(newMode, replace = false) {

    if(!replace) {
      setMode(newMode);
      history.push(newMode);
    } else {
      setMode(newMode);
    }

    return {};
  }

  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    } else {
      setHistory(history);
    }
  }

  return { mode, transition, back };
}