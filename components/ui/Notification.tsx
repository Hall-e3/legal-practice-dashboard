"use client";
import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { twMerge } from "tailwind-merge";
import { ResponseStatus } from "@/enums";
import { useNotification } from "@/hooks/useNotification";

const Notification = ({ outlined = false }: { outlined?: boolean }) => {
  const { message, type, isVisible, hideAlert } = useNotification();
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isRendered) return null;

  const baseStyles = `
    fixed z-9999 pointer-events-auto
    max-w-[calc(100vw-2rem)] w-[448px]
    p-4 rounded-lg shadow-lg
    flex items-center gap-3
    transition-transform duration-300 ease-linear transform
    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`;

  const positionStyles = `bottom-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0`;

  const getAlertClass = () => {
    return twMerge(
      baseStyles,
      type === ResponseStatus.success
        ? twMerge(
            "text-white",
            outlined ? "border border-green-900" : "bg-green-300"
          )
        : type === ResponseStatus.error
        ? twMerge(
            "text-white",
            outlined ? "border border-red-900" : "bg-red-300"
          )
        : twMerge(
            "text-white",
            outlined ? "border border-blue-900" : "bg-blue-300"
          ),
      "bg-black/60 shadow-2xl drop-shadow-md",
      positionStyles
    );
  };

  const handleClear = () => {
    hideAlert();
  };

  const displayIcon = () => {
    if (type === ResponseStatus.success) {
      return <InformationCircleIcon className="w-6 h-6 text-text_green/60" />;
    } else if (type === ResponseStatus.error) {
      return <ExclamationCircleIcon className="w-6 h-6 text-text_red/60" />;
    } else {
      return <ExclamationCircleIcon className="w-6 h-6 text-white" />;
    }
  };

  const displayColor = () => {
    if (type === ResponseStatus.success) {
      return "text-text_green/60";
    } else if (type === ResponseStatus.error) {
      return "text-text_red/60";
    } else {
      return "text-white";
    }
  };

  return (
    <div className={getAlertClass()}>
      <div className="">{displayIcon()}</div>
      <div className="flex-grow overflow-hidden">
        {message && (
          <p
            className={twMerge(
              "text-sm whitespace-pre-wrap break-words",
              displayColor()
            )}
          >
            {message}
          </p>
        )}
      </div>
      <div
        onClick={handleClear}
        className="hover:bg-itemhover/30 p-1 rounded-full cursor-pointer flex-shrink-0"
      >
        <XMarkIcon className={`w-4 h-4 ${displayColor()}`} />
      </div>
    </div>
  );
};

export default Notification;
