import { createPortal } from "react-dom";
import { useEffect } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}


export default function Modal({ children, onClose }: ModalProps){

    useEffect(() => {
  function handleEsc(evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  window.addEventListener("keydown", handleEsc);

  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    window.removeEventListener("keydown", handleEsc);
    document.body.style.overflow = originalOverflow;
  };
    }, [onClose]);

    return createPortal(
      <div className={css.backdrop} onClick={onClose} role="dialog" aria-modal="true">
        <div className={css.modal} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>,
      document.body
    );
}
