"use client";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  styles?: string;
  disabled?: boolean;
  error?: string | null | boolean;
  onFocus?: VoidFunction;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function TextInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  iconRight,
  iconLeft,
  styles,
  disabled,
  error,
  onFocus,
  onKeyDown,
}: TextInputProps) {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    if (onFocus) {
      onFocus();
    } else {
      setFocus(true);
    }
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const baseInputStyles = twMerge(
    "flex items-center outline-none ring ring-stroke",
    error && "ring-danger_border",
    focus && "ring-primary_color opacity-75",
    styles
  );

  const inputStyles = twMerge(
    "h-full outline-none rounded text-gray-900 text-sm h-14 px-3 block w-full",
    iconLeft ? "ml-4" : "mr-4"
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <label
          className={`block mb-2 text-[13px] sm:text-[15px] text-gray-900`}
        >
          {label}
        </label>
      </div>
      <div className="flex flex-col">
        <div className={baseInputStyles}>
          {iconLeft && iconLeft}
          <input
            type={type}
            name={name}
            onKeyDown={onKeyDown}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={inputStyles}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
          />
          {iconRight && iconRight}
        </div>
        {error && <p className="text-danger text-[14px] mt-1">{error}</p>}
      </div>
    </div>
  );
}
