/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.css';
import { getTabbableChildren } from '@/utils/client';
import CancelIcon from '@svgs/close-svgrepo-com.svg';

export interface DialogProps {
  /**
   * dimmed 처리를 결정합니다.
   */
  modal: boolean;
  /**
   * 다이얼로그를 여는 버튼에 대한 참조입니다.
   * 다이얼로그가 닫힐 경우 해당 버튼으로 포커스가 이동합니다.
   */
  opener?: HTMLElement;
  /**
   * 다이얼로그를 닫는 함수입니다.
   */
  onClose: () => void;
  children: React.ReactNode;
  restprops?: unknown[];
}

const defaultProps = {
  modal: false,
};

export const Dialog = ({
  modal,
  opener,
  onClose,
  children,
  ...restprops
}: DialogProps) => {
  const dialogRef = useRef<HTMLElement>(null);

  const portalContainer = document.getElementById(
    'portal-dialog'
  ) as HTMLDivElement;
  const { documentElement } = document;
  const reactRootContainer = document.getElementById('__next');

  useEffect(() => {
    const { current: dialogElement } = dialogRef;
    if (dialogElement) {
      setKeyboardTrap(dialogElement);
    }

    documentElement.style.overflowY = 'hidden';
    reactRootContainer?.setAttribute('aria-hidden', 'true');
    document.addEventListener('keyup', escKeyHandler);

    return () => {
      documentElement.style.overflowY = 'visible';
      reactRootContainer?.setAttribute('aria-hidden', 'false');
      document.removeEventListener('keyup', escKeyHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const escKeyHandler = useCallback((e: KeyboardEvent) => {
    if (e.key.toLowerCase().includes('escape')) {
      handleClose();
    }
  }, []);

  const setKeyboardTrap = (container: HTMLElement) => {
    const tabbableElements = getTabbableChildren(container);
    if (tabbableElements.length === 0) return;

    const firstTabbable = tabbableElements[0];
    const lastTabbable = tabbableElements[tabbableElements.length - 1];

    firstTabbable.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase().includes('tab')) {
        e.preventDefault();
        lastTabbable.focus();
      }
    });
    lastTabbable.addEventListener('keydown', (e: KeyboardEvent) => {
      if (!e.shiftKey && e.key.toLowerCase().includes('tab')) {
        e.preventDefault();
        firstTabbable.focus();
      }
    });

    firstTabbable.focus();
  };

  const handleClose = () => {
    onClose && onClose();
    opener?.focus();
  };

  return createPortal(
    <>
      <article
        ref={dialogRef}
        role="dialog"
        aria-modal={modal}
        tabIndex={-1}
        className={styles.container}
        {...restprops}
      >
        {children}
      </article>
      {modal ? <div className={styles.dim} onClick={handleClose} /> : null}
    </>,
    portalContainer
  );
};

Dialog.defaultProps = defaultProps;

interface HeaderProps {
  children: React.ReactNode;
}
Dialog.Header = function DialogHeader({ children }: HeaderProps) {
  return <header className={styles.header}>{children}</header>;
};

interface BodyProps {
  children: React.ReactNode;
}
Dialog.Body = function DialogBody({ children }: BodyProps) {
  return <div className={styles.body}>{children}</div>;
};

interface FooterProps {
  children?: React.ReactNode;
  onClose: () => void;
}
Dialog.Footer = function DialogFooter({ children, onClose }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <button
        type="button"
        className={styles.closeButton}
        aria-label="모달 다이얼로그 닫기"
        title="모달 다이얼로그 닫기"
        onClick={onClose}
      >
        <CancelIcon />
      </button>
      {children}
    </footer>
  );
};
