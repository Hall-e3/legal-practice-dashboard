import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={twMerge(
        "bg-white rounded-lg shadow-md overflow-hidden",
        className
      )}
    >
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
