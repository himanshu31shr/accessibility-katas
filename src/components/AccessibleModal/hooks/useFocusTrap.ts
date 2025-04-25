import { useEffect, useRef, useCallback } from 'react';

interface UseFocusTrapProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const useFocusTrap = ({ isOpen, onClose }: UseFocusTrapProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const setInitialFocus = useCallback(() => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements?.length) {
      focusableElements[0].focus();
    }
  }, []);

  const restoreFocus = useCallback(() => {
    if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setInitialFocus();

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && onClose) {
          onClose();
          return;
        }

        if (event.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

          if (!focusableElements?.length) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          const activeElement = document.activeElement;

          if (event.shiftKey && activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (!event.shiftKey && activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      };

      const modal = modalRef.current;
      modal?.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        modal?.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      restoreFocus();
    }
  }, [isOpen, onClose, setInitialFocus, restoreFocus]);

  return modalRef;
};