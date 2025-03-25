import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  styles?: string;
  disabled?: boolean;
  onFocus?: VoidFunction;
  inputStyles?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  type,
  name,
  placeholder,
  value,
  onChange,
  iconLeft,
  iconRight,
  styles,
  disabled,
  onFocus,
  inputStyles,
  onKeyDown,
}: Props) {
  const inputBaseStyles = twMerge(
    "h-full outline-none rounded-full text-gray-900 text-sm",
    iconLeft && "ml-0",
    "block w-full",
    inputStyles
  );
  return (
    <div className={`flex items-center space-x-2 ${styles} `}>
      {iconLeft && iconLeft}
      <input
        type={type}
        name={name}
        value={value}
        onFocus={onFocus}
        className={inputBaseStyles}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {iconRight && iconRight}
    </div>
  );
}
