import { ButtonType } from "@/enums";
import React, { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text?: string | ReactNode;
  icon?: React.ReactNode;
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  buttonStyle?: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  leftIcon?: ReactElement;
  href?: string;
  el?: string;
}

export default function Button({
  text,
  buttonStyle,
  onClick,
  icon,
  type = ButtonType.button,
  disabled = false,
  outline = false,
  small = false,
  leftIcon,
}: ButtonProps) {
  const baseStyles = twMerge(
    "inline-block text-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition duration-300 ease-in-out ",
    outline && "bg-white ring-2",
    small ? "py-1 text-sm border-2" : "py-3 text-md font-semibold",
    buttonStyle
  );
  return (
    <button
      data-twe-ripple-init
      data-twe-ripple-color="light"
      disabled={disabled}
      type={type}
      className={baseStyles}
      onClick={onClick}
    >
      <div className="flex items-center space-x-2 justify-center">
        {leftIcon && <div>{leftIcon}</div>}
        {text && <div>{text}</div>}
        {icon && <div>{icon}</div>}
      </div>
    </button>
  );
}
