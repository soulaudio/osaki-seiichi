import React, { ReactNode } from 'react';
import styles from '../contexts/modal.module.css';

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
  title?: string;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  showCloseButton = true,
  title,
  className = '',
}) => {
  return (
    <div className={`${styles.modalContainer} ${className}`}>
      {(title || showCloseButton) && (
        <div className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          {showCloseButton && onClose && (
            <button
              className={styles.modalCloseButton}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          )}
        </div>
      )}
      <div className={styles.modalBody}>
        {children}
      </div>
    </div>
  );
};