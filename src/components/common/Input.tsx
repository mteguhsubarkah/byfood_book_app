"use client";

import React from "react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};

export default function Input({
  label,
  name,
  type = "text",
  value,
  placeholder = "",
  onChange,
  required = false,
  className = "",
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={clsx(
          "px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400",
          className
        )}
      />
    </div>
  );
}
