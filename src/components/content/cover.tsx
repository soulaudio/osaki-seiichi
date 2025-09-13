// Cover.tsx
import { useState, useCallback } from "react";
import styles from "./cover.module.css";

type CoverProps = {
  srcSmall: string;
  src: string;
  alt: string;
};

const Cover: React.FC<CoverProps> = ({ srcSmall, src, alt }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenModal(false);
      setIsClosing(false);
    }, 300);
  }, []);

  return (
    <div className={styles.container}>
      <img
        draggable={false}
        src={srcSmall}
        alt={alt}
        height="100%"
        width="100%"
        onClick={() => setOpenModal(true)}
        className={styles.coverImage}
      />

      {openModal && (
        <div
          className={`${styles.modalOverlay} ${
            isClosing ? styles.fadeOut : ""
          }`}
          onClick={handleClose}
        >
          <div className={styles.modalContent}>
            <img
              draggable={false}
              src={src}
              alt={alt}
              className={styles.modalImage}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cover;
