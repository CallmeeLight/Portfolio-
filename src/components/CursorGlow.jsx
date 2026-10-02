import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const handleMove = (e) => {
      document.querySelectorAll(".magnetic").forEach((button) => {
        const rect = button.getBoundingClientRect();

        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        const distance = Math.sqrt(x * x + y * y);

        if (distance < 100) {
          button.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
        } else {
          button.style.transform = "translate(0, 0)";
        }
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <div className="cursor-glow" />;
}