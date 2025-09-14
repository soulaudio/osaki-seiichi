import BackIcon from "../../components/back-icon";
import styles from "./lost-book-detail.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";

const CONFIG = {
  BUSH_SOURCES: [
    "media/sunken-city-alga.png"
    // Add more sources here as needed:
    // "media/bush-variant-2.png",
    // "media/bush-variant-3.png",
    // "media/bush-variant-4.png"
  ],
  
  // Bush density per screen size (bushes per 1000px of perimeter)
  DENSITY: {
    mobile: 1.8,      // More bushes on mobile
    tablet: 1.6,      // More bushes on tablet
    desktop: 1.4,     // More bushes on desktop
    large: 1.2,       // Balanced on large screens
    ultrawide: 1.0    // Appropriate for ultra-wide
  },
  
  // Bush count ranges
  BUSH_COUNT: {
    mobile: { min: 35, max: 35 },
    tablet: { min: 35, max: 45 },
    desktop: { min: 35, max: 60 },
    large: { min: 45, max: 80 },
    ultrawide: { min: 60, max: 100 }
  },
  
  // Base bush sizes
  BASE_SIZE: {
    mobile: 100,
    tablet: 130,
    desktop: 180,
    large: 180,
    ultrawide: 200
  },
  
  // Size variation (±pixels)
  SIZE_VARIATION: 40,
  
  // Offset from screen edge (how hidden they are)
  OFFSET: {
    mobile: 35,
    tablet: 40,
    desktop: 50,
    large: 55,
    ultrawide: 60
  },
  
  // Animation settings
  ANIMATION: {
    fadeInDuration: 0.8,
    // Wiggle animation randomization ranges
    wiggle: {
      durationMin: 6,     // Minimum wiggle duration (seconds)
      durationMax: 12,    // Maximum wiggle duration (seconds)
      amountMin: 1,       // Minimum wiggle amount (degrees)
      amountMax: 4,       // Maximum wiggle amount (degrees)
    }
  },
  
  // Screen breakpoints
  BREAKPOINTS: {
    mobile: 480,
    tablet: 768,
    desktop: 1200,
    large: 1920
  }
} as const;

const LostBookDetail = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  // State
  const [bushCount, setBushCount] = useState(20);
  const [loadedBushes, setLoadedBushes] = useState<Set<number>>(new Set());
  const [screenDimensions, setScreenDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });

  // Get current screen category
  const getScreenCategory = useCallback((width: number) => {
    if (width < CONFIG.BREAKPOINTS.mobile) return 'mobile';
    if (width < CONFIG.BREAKPOINTS.tablet) return 'tablet';
    if (width < CONFIG.BREAKPOINTS.desktop) return 'desktop';
    if (width < CONFIG.BREAKPOINTS.large) return 'large';
    return 'ultrawide';
  }, []);

  // Calculate bush count based on screen proportions
  const calculateBushCount = useCallback((width: number, height: number) => {
    const category = getScreenCategory(width);
    
    // Calculate perimeter proportionally
    const topBottom = width * 2;
    const leftRight = height * 2;
    const totalPerimeter = topBottom + leftRight;
    
    // Calculate density-based bush count
    const density = CONFIG.DENSITY[category as keyof typeof CONFIG.DENSITY];
    const calculatedCount = Math.round((totalPerimeter / 1000) * density);
    
    // Apply min/max constraints
    const range = CONFIG.BUSH_COUNT[category as keyof typeof CONFIG.BUSH_COUNT];
    return Math.max(range.min, Math.min(range.max, calculatedCount));
  }, [getScreenCategory]);

  // Generate random value within range
  const randomBetween = useCallback((min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }, []);

  // Generate random wiggle properties for each bush
  const generateWiggleProperties = useCallback(() => {
    const { wiggle } = CONFIG.ANIMATION;
    return {
      duration: randomBetween(wiggle.durationMin, wiggle.durationMax),
      amount: randomBetween(wiggle.amountMin, wiggle.amountMax),
    };
  }, [randomBetween]);

  // Define position type
  interface BushPosition {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    rotation: number;
  }

  interface WiggleProperties {
    duration: number;
    amount: number;
  }

  interface BushData {
    position: BushPosition;
    size: number;
    source: string;
    wiggle: WiggleProperties;
  }

  // Generate random bush source
  const getRandomBushSource = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * CONFIG.BUSH_SOURCES.length);
    return CONFIG.BUSH_SOURCES[randomIndex];
  }, []);

  // Generate random size with ratio maintained
  const getRandomSize = useCallback((width: number) => {
    const category = getScreenCategory(width);
    const baseSize = CONFIG.BASE_SIZE[category as keyof typeof CONFIG.BASE_SIZE];
    
    const variation = CONFIG.SIZE_VARIATION;
    const size = baseSize + (Math.random() * variation * 2 - variation);
    return Math.max(baseSize - 30, Math.min(baseSize + 50, size));
  }, [getScreenCategory]);

  // Calculate rotation to point toward screen center
  const calculateRotationToCenter = useCallback((position: Omit<BushPosition, 'rotation'>) => {
    const centerX = 50;
    const centerY = 50;
    
    let bushX, bushY;
    
    if (position.left !== undefined) {
      bushX = parseFloat(position.left);
    } else if (position.right !== undefined) {
      bushX = 100 - parseFloat(position.right);
    } else {
      bushX = 50;
    }
    
    if (position.top !== undefined) {
      bushY = parseFloat(position.top) < 0 ? 0 : parseFloat(position.top);
    } else if (position.bottom !== undefined) {
      bushY = 100 - (parseFloat(position.bottom) < 0 ? 0 : parseFloat(position.bottom));
    } else {
      bushY = 50;
    }
    
    const deltaX = centerX - bushX;
    const deltaY = centerY - bushY;
    const angleRad = Math.atan2(deltaY, deltaX);
    const angleDeg = (angleRad * 180) / Math.PI;
    
    return angleDeg + 90;
  }, []);

  // Generate bush position based on proportional distribution
  const generateBushPosition = useCallback((index: number, total: number, width: number, height: number): BushPosition => {
    const category = getScreenCategory(width);
    const offset = CONFIG.OFFSET[category as keyof typeof CONFIG.OFFSET];
    
    // Calculate proportional distribution
    const topBottomLength = width * 2;
    const leftRightLength = height * 2;
    const totalPerimeter = topBottomLength + leftRightLength;
    
    // Calculate position along total perimeter
    const step = totalPerimeter / total;
    const currentPos = (step * index) % totalPerimeter;
    
    let bushPosition: Omit<BushPosition, 'rotation'>;
    
    if (currentPos < width) {
      // Top edge
      const percentage = (currentPos / width) * 100;
      bushPosition = {
        top: `-${offset}px`,
        left: `${percentage}%`
      };
    } else if (currentPos < width + height) {
      // Right edge
      const rightPos = currentPos - width;
      const percentage = (rightPos / height) * 100;
      bushPosition = {
        top: `${percentage}%`,
        right: `-${offset}px`
      };
    } else if (currentPos < width * 2 + height) {
      // Bottom edge (right to left)
      const bottomPos = currentPos - width - height;
      const percentage = 100 - (bottomPos / width) * 100;
      bushPosition = {
        bottom: `-${offset}px`,
        left: `${percentage}%`
      };
    } else {
      // Left edge (bottom to top)
      const leftPos = currentPos - width * 2 - height;
      const percentage = 100 - (leftPos / height) * 100;
      bushPosition = {
        top: `${percentage}%`,
        left: `-${offset}px`
      };
    }
    
    const rotation = calculateRotationToCenter(bushPosition);
    
    return {
      ...bushPosition,
      rotation
    };
  }, [getScreenCategory, calculateRotationToCenter]);

  // Pre-calculate all bush data to ensure consistent values
  const bushesData = useMemo(() => {
    const data: BushData[] = [];
    for (let i = 0; i < bushCount; i++) {
      data.push({
        position: generateBushPosition(i, bushCount, screenDimensions.width, screenDimensions.height),
        size: getRandomSize(screenDimensions.width),
        source: getRandomBushSource(),
        wiggle: generateWiggleProperties() // Generate random wiggle properties for each bush
      });
    }
    return data;
  }, [
    bushCount,
    screenDimensions.width,
    screenDimensions.height,
    generateBushPosition,
    generateWiggleProperties,
    getRandomBushSource,
    getRandomSize
  ]);

  // Handle resize with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        const newBushCount = calculateBushCount(newWidth, newHeight);
        
        setScreenDimensions({ width: newWidth, height: newHeight });
        setBushCount(newBushCount);
        // Don't reset loaded bushes - let them reload naturally
      }, 150); // Debounce resize events
    };

    // Set initial values
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    const initialBushCount = calculateBushCount(initialWidth, initialHeight);
    
    setScreenDimensions({ width: initialWidth, height: initialHeight });
    setBushCount(initialBushCount);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateBushCount]);

  // Handle bush load
  const handleBushLoad = (index: number) => {
    setLoadedBushes(prev => new Set(prev).add(index));
  };

  // Generate bushes array
  const generateBushes = () => {
    return bushesData.map((bushData, i) => {
      const isLoaded = loadedBushes.has(i);
      
      const style: React.CSSProperties = {
        position: 'absolute',
        top: bushData.position.top,
        left: bushData.position.left,
        right: bushData.position.right,
        bottom: bushData.position.bottom,
        width: `${bushData.size}px`,
        height: `${bushData.size}px`,
        ['--rotation' as any]: `${bushData.position.rotation}deg`,
        // RANDOMIZED WIGGLE ANIMATION PROPERTIES:
        // Each bush gets its own unique wiggle characteristics
        ['--wiggle-duration' as any]: `${bushData.wiggle.duration}s`,
        ['--wiggle-amount' as any]: `${bushData.wiggle.amount}deg`,
        animationDuration: `${bushData.wiggle.duration}s`, // Individual duration
        opacity: isLoaded ? 1 : 0,
        transition: `opacity ${CONFIG.ANIMATION.fadeInDuration}s ease-in-out`,
        transformOrigin: 'center',
        zIndex: 1
      };
      
      return (
        <img
          key={`bush-${i}-${screenDimensions.width}-${screenDimensions.height}`} // Force re-render on resize
          className={styles.bush}
          style={style}
          src={bushData.source}
          alt={`bush-${i + 1}`}
          onLoad={() => handleBushLoad(i)}
          onError={() => handleBushLoad(i)} // Also fade in on error to prevent hanging
        />
      );
    });
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.storyContainer}>
            <p>
              While countless stories could connect to the sunken city, this is the one that carries it forward. 
              After an old friend of the lost boy discovered the message near the shore, he chose to follow the footsteps of the ancient story.
            </p>
            <p>
              After a long rest, the old friend decided to get on the ship's deck. 
              The waves were quite strong that day. 
              If his older brother wasn't there to support him he would have fallen. 
              They were slowly heading away from the beaming sun towards the island. 
              They docked the ship and moved into the shade created by the massive tropical jungle leaves. 
              As they were carving a path through the thick jungle, they were welcomed by the various species living there. 
              After a long travel, they were very exhausted and thirsty. 
              In the distance they started to hear what sounded like a river. 
              Surrounded by mist they realized they were in front of a big waterfall. 
              The sun was setting quickly so they started to settle in for a rest.
            </p>
            <p>
              The men were having a calm conversation over the fire. 
              The night slowly started to get more eerie as they kept hearing distant noises getting closer. 
              They started to feel a presence of something - a big creature appeared. 
              Standing, so struck by fear that they couldn't move. 
              Amidst the silence, the brothers heared a bow being drawn. 
              The arrow struck the creature and it started running towards them. When they turned around, a human silhoutte appeared in the darkness, 
              indicating them to follow him. 
              After a long run, the men lost the creature as it was very wounded. 
              They thanked the man, but quickly realized that he does not understand them. 
              Either way, they somehow managed to show him where they are headed and the man agreed to guide them. 
              The men travelled for a couple of more hours and eventually just went to sleep under the night sky.
            </p>
            <p>
              The group woke up to a beautiful sunrise. 
              It was a very quiet morning, although they could hear some birds singing. 
              A long journey awaited them, but they were very exicted since the nature was so untouched. 
              Making their way alongside many shorelines with animals looking at them from the other side, 
              felt as if the wildlife knew something that they didn't. 
              The scenery changed from shorelines to hills and their destination started appearing in front of them. 
              As soon as they were in front of an old wooden rope bridge, the guide turned around and ran away in to the jungle.
            </p>
            <p>
              Confused by the sudden dissapearence of the guide, the brothers looked at the old, run-down swaying bridge. 
              There were monkeys jumping from rope to rope, which made it move more. 
              With no other way than to push forward they stepped on to the bridge. 
              Determined to make it across they took slow and steady steps. 
              Once their feet touched the ground on the other side a strange presence could be felt. 
              Cold air started to breeze through the open gate of an ancient temple. 
              Scared but eager to explore they walked in. 
              Navigating through so many corridors felt almost like a maze. 
              With the labyrinth finally resolving into a single path, they headed straight towards a big room. 
              It was a captivating, mostly preserved piece of art. 
              With small jade pillars standing on the floor, arranged in perfect symmetry and water flowing neatly from the top on to the walls. 
              There was an altar in the center of the room.  
              His brother accidently hit one of the jade pillars and it made a perfect bell-like tone. 
              Afterwards they've noticed that all the pillars produce different notes. 
              They spotted glyphs on the walls which depicted the pillars but couldn't make sense of it for a long time since some parts were so worn. 
              Randomly, after striking the pillars in the correct order (which made an enchanting melody) the altar slowly opened up. 
              Inside of it was an ancient book. 
              And then, they started going through the pages...     
            </p>
          </div>
          <div className={styles.albumTitleContainer}>
              <h1 className={styles.albumTitle}>
                密林にある神殿で隠れた本の足跡を辿り
              </h1>
            </div>
        </div>
      </div>
      <div className={styles.overlayContainer}>
        <div className={styles.backContainer} onClick={handleBack}>
          <BackIcon />
        </div>
        {generateBushes()}
      </div>
    </div>
  );
};

export default LostBookDetail;