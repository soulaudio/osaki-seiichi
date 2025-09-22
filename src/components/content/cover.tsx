import React from "react";
import { useModal } from "../../contexts/modal-context";
import { ImageModal } from "../image-modal";
import imageModalStyles from "../image-modal.module.css";
import styles from "./cover.module.css";

type CoverProps = {
  srcSmall: string;
  src: string;
  alt: string;
};

const Cover: React.FC<CoverProps> = ({ srcSmall, src, alt }) => {
  const { openModal, closeModal } = useModal();

  const handleImageClick = () => {
    openModal(
      <ImageModal src={src} alt={alt} onClose={closeModal} />,
      {
        closeOnOverlayClick: true,
        closeOnEscape: true,
        overlayClassName: imageModalStyles.imageModalOverlay
      }
    );
  };

  return (
    <div className={styles.container}>
      <img
        draggable={false}
        src={srcSmall}
        alt={alt}
        height="100%"
        width="100%"
        onClick={handleImageClick}
        className={styles.coverImage}
      />
    </div>
  );
};

export default Cover;