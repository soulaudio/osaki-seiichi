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
  offsetTop?: string;
  offsetBottom?: string;
}

interface BackgroundGradientProps {
  sections?: Section[];
  transitions?: Transition[];
  enableGrain?: boolean;
}

const GRAIN_CONFIG = {
  opacity: 0.09,         
  size: 200,             
  animationDuration: 120,
  textureSize: 128,      
  coverage: 150,         
  enabled: true          
};

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
  enableGrain = GRAIN_CONFIG.enabled
}) => {
  // Generate proper noise texture using canvas
  const [grainTexture, setGrainTexture] = React.useState('');
  
  React.useEffect(() => {
    if (!enableGrain) return;
    
    // Create a canvas to generate high-quality noise
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = GRAIN_CONFIG.textureSize;
    
    canvas.width = size;
    canvas.height = size;
    
    // Generate true random noise with slight bias toward mid-tones
    const imageData = ctx!.createImageData(size, size);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Generate noise with subtle variation
      const base = 128; // Mid-gray
      const variation = 60; // ±60 from mid-gray for subtlety
      const noise = Math.floor(base + (Math.random() - 0.5) * variation * 2);
      
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255;   // A (full opacity, controlled transparency with CSS)
    }
    
    ctx!.putImageData(imageData, 0, 0);
    
    // Convert to base64 data URL
    const dataURL = canvas.toDataURL('image/png');
    setGrainTexture(dataURL);
  }, [enableGrain]);

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
     
      {enableGrain && grainTexture && (
        <div 
          className={styles.grainOverlay}
          style={{
            backgroundImage: `url("${grainTexture}")`,
            backgroundSize: `${GRAIN_CONFIG.size}px ${GRAIN_CONFIG.size}px`,
            opacity: GRAIN_CONFIG.opacity,
            mixBlendMode: 'multiply',
            animationDuration: `${GRAIN_CONFIG.animationDuration}s`,
            // Ensure full screen coverage
            width: `${GRAIN_CONFIG.coverage}%`,
            height: `${GRAIN_CONFIG.coverage}%`,
            top: `-${(GRAIN_CONFIG.coverage - 100) / 2}%`,
            left: `-${(GRAIN_CONFIG.coverage - 100) / 2}%`,
          }}
        />
      )}
    </div>
  );
};

export default BackgroundGradient;