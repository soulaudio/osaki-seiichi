import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from '../components/modal.module.css';

interface ModalContextType {
  openModal: (content: ReactNode, options?: ModalOptions) => void;
  closeModal: () => void;
  isOpen: boolean;
}

interface ModalOptions {
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  overlayClassName?: string;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ReactNode>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({
    closeOnOverlayClick: true,
    closeOnEscape: true,
  });

  const openModal = useCallback((modalContent: ReactNode, modalOptions?: ModalOptions) => {
    setContent(modalContent);
    setOptions({ ...options, ...modalOptions });
    setIsOpen(true);
    setIsClosing(false);
  }, [options]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      setContent(null);
    }, 300);
  }, []);

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && options.closeOnEscape) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, options.closeOnEscape, closeModal]);

  const modalRoot = document.getElementById('modal-root') || document.body;

  return (
    <ModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      {isOpen &&
        createPortal(
          <div
            className={`${styles.modalOverlay} ${
              isClosing ? styles.modalFadeOut : ''
            } ${options.overlayClassName || ''}`}
            onClick={options.closeOnOverlayClick ? closeModal : undefined}
          >
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              {content}
            </div>
          </div>,
          modalRoot
        )}
    </ModalContext.Provider>
  );
};