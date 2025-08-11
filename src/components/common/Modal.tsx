"use client";

import React from "react";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // klik backdrop untuk close
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg w-full p-6 relative",
          sizeClasses[size]
        )}
        onClick={(e) => e.stopPropagation()} // biar klik isi modal nggak nutup
      >
        {/* Tombol close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
