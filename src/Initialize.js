import { useEffect, useState, useRef } from "react";

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default function Initialize() {
  const [mode, setMode] = useState(window.innerHeight / window.innerWidth);
  const direction = useRef(mode < 0.6 ? "row" : "column");

  useEffect(() => {
    const cont = document.querySelector(".page-container");

    if (mode < 0.6) {
      cont.style.flexDirection = "row";
      direction.current = "row";
    }
    if (mode >= 0.6) {
      cont.style.flexDirection = "column";
      direction.current = "column";
    }

    const debounceHandler = debounce(function handlerFunction() {
      setMode(window.innerHeight / window.innerWidth);
    }, 400);

    window.addEventListener("resize", debounceHandler);
    return () => {
      window.removeEventListener("resize", debounceHandler);
    };
  }, [mode]);

  return direction.current;
}
