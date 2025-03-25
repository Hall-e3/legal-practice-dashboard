"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  styles?: string;
  closeButtonStyles?: string;
  modalStyle?: string;
  isTop?: boolean;
  disableCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  styles,
  onClose,
  footer,
  body,
  disabled,
  leftIcon,
  closeButtonStyles,
  modalStyle,
  isTop,
  disableCloseButton,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled || disableCloseButton) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, disableCloseButton, onClose]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !disableCloseButton
      ) {
        handleClose();
      }
    },
    [handleClose, disableCloseButton]
  );

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, handleClickOutside]);

  if (!isOpen) {
    return null;
  }

  const modalStyles = twMerge(
    "translate duration-[800ms] h-full",
    showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
  );

  const closeButtonClasses = twMerge(
    closeButtonStyles,
    disableCloseButton && "opacity-50 cursor-not-allowed"
  );

  return (
    <div className="h-screen w-screen">
      <div
        ref={modalRef}
        className="w-full h-full justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-99 outline-none focus:outline-none bg-black/25 transition duration-[800ms] ease-in-out px-4 md:px-0"
      >
        {isTop ? (
          <div className={modalStyles}>
            <div className="translate h-full lg:h-auto md:h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div
                className={`flex items-center justify-end px-6 py-4 relative ${
                  leftIcon && "justify-between space-x-4"
                }`}
              >
                {leftIcon && leftIcon}
                <div
                  onClick={disableCloseButton ? undefined : handleClose}
                  className={closeButtonClasses}
                >
                  <XMarkIcon className="w-4 h-4" />
                </div>
              </div>
              <div className={`relative ${styles} flex-auto`}>{body}</div>
              <div className="flex flex-col gap-2 p-6">{footer}</div>
            </div>
          </div>
        ) : (
          <div className={modalStyle}>
            <div className={modalStyles}>
              <div className="translate h-full lg:h-auto md:h-auto rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div
                  className={`flex items-center justify-end px-6 py-4 relative ${
                    leftIcon && "justify-between space-x-4"
                  }`}
                >
                  {leftIcon && leftIcon}
                  <div
                    onClick={disableCloseButton ? undefined : handleClose}
                    className={closeButtonClasses}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </div>
                </div>
                <div className={`relative ${styles} flex-auto`}>{body}</div>
                <div className="flex flex-col gap-2 p-6">{footer}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
