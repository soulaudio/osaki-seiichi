import { useEffect, useState } from "react";
import styles from "./prompt-scroll.module.css";

const PromptScroll = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const newOpacity = Math.max(
        0,
        Math.min(1, 1 - (scrollPosition - 150) / 300)
      );
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (opacity <= 0) return null;

  return (
    <div
      className={styles.container}
      style={{
        opacity,
        visibility: opacity === 0 ? "hidden" : "visible",
        transform: `  translateY(${(1 - opacity) * 20}px)`, // Optional: slight movement while fading
      }}
    >
      <div className={styles.content}>
        <div className={styles.icon}>↓</div>
        <span>Scroll to explore</span>
      </div>
    </div>
  );
};

export default PromptScroll;
