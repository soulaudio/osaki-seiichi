import React from 'react';
import styles from './image-modal.module.css';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div className={styles.imageModal}>
      <img
        src={src}
        alt={alt}
        className={styles.imageModalImg}
        draggable={false}
      />
    </div>
  );
};