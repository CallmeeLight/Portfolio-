import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glow = useRef();

  useEffect(() => {
    const move = (e) => {
      if (!glow.current) return;

      glow.current.style.transform =
        `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return <div ref={glow} className="cursor-glow" />;
}