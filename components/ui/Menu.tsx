"use client";
import React, { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface MenuProps {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  className?: string;
  isReading?: boolean;
}

export default function Menu({
  open,
  close,
  children,
  className,
  isReading,
}: MenuProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleEvent = (event: MouseEvent | KeyboardEvent): void => {
      const isClickOutside =
        event instanceof MouseEvent &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node);

      const isEscapeKey =
        event instanceof KeyboardEvent && event.key === "Escape";

      if (open && (isClickOutside || isEscapeKey)) close();
    };

    document.addEventListener("click", handleEvent);
    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
      document.removeEventListener("keydown", handleEvent);
    };
  }, [close, open]);

  const menuDropDownStyles = twMerge(
    "absolute z-99 right-8 mt-1 bg-white rounded-lg shadow-lg border border-stroke",
    open
      ? "visible transform scale-100 ease-in duration-100 opacity-100"
      : "invisible transform scale-95 ease-out duration-100 opacity-0",
    className,
    isReading ? "right-0" : "right-8"
  );

  return (
    <div ref={dropdownRef} className={menuDropDownStyles}>
      {children}
    </div>
  );
}
