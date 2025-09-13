// BackgroundGradient.tsx
import React from "react";
import styles from "./background-gradient.module.css";

interface Section {
  color: string;
  height: string;
  children?: React.ReactNode;
}

interface Transition {
  height: string;
  children?: React.ReactNode;
  offsetTop?: string; // e.g., "10%", "50px"
  offsetBottom?: string; // e.g., "20%", "100px"
}

interface BackgroundGradientProps {
  sections?: Section[];
  transitions?: Transition[];
}

const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  sections = [
    {
      color: "#c2d1d6",
      height: "120vh",
      children: null,
    },
    {
      color: "#91bd31",
      height: "100vh",
      children: null,
    },
  ],
  transitions = [],
}) => {
  return (
    <div className={styles.container}>
      {sections.map((section, index) => (
        <React.Fragment key={index}>
          {/* Main section */}
          <div
            className={styles.section}
            style={{
              minHeight: section.height,
              background: section.color,
            }}
          >
            <div className={styles.contentContainer}>{section.children}</div>
          </div>
          
          {/* Transition section (if exists and not the last section) */}
          {index < sections.length - 1 && transitions[index] && (
            <div
              className={`${styles.section} ${styles.transitionSection}`}
              style={{
                minHeight: transitions[index].height,
                background: (() => {
                  const transition = transitions[index];
                  const fromColor = section.color;
                  const toColor = sections[index + 1].color;
                  
                  // Calculate gradient positions based on offsets
                  let startPos = "0%";
                  let endPos = "100%";
                  
                  if (transition.offsetTop) {
                    startPos = transition.offsetTop;
                  }
                  
                  if (transition.offsetBottom) {
                    const offsetValue = parseFloat(transition.offsetBottom);
                    const unit = transition.offsetBottom.replace(/[\d.]/g, '');
                    endPos = `${100 - offsetValue}${unit}`;
                  }
                  
                  // If both offsets exist, create a more complex gradient
                  if (transition.offsetTop && transition.offsetBottom) {
                    return `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} ${startPos}, ${toColor} ${endPos}, ${toColor} 100%)`;
                  } else if (transition.offsetTop) {
                    return `linear-gradient(to bottom, ${fromColor} 0%, ${fromColor} ${startPos}, ${toColor} 100%)`;
                  } else if (transition.offsetBottom) {
                    return `linear-gradient(to bottom, ${fromColor} 0%, ${toColor} ${endPos}, ${toColor} 100%)`;
                  } else {
                    return `linear-gradient(${fromColor}, ${toColor})`;
                  }
                })(),
              }}
            >
              <div className={styles.contentContainer}>
                {transitions[index].children}
              </div>
            </div>
          )}
          
          {/* Default transition (if no custom transition defined) */}
          {index < sections.length - 1 && !transitions[index] && (
            <div
              className={`${styles.section} ${styles.defaultTransition}`}
              style={{
                height: "50vh",
                background: `linear-gradient(${section.color}, ${sections[index + 1].color})`,
              }}
            />
          )}
        </React.Fragment>
      ))}
      
      <div className={styles.grainOverlay}>
        <div className={styles.grainTexture} />
      </div>
    </div>
  );
};

export default BackgroundGradient;