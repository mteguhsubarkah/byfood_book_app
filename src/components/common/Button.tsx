"use client";

import React from "react";
import clsx from "clsx";


type ButtonProps ={
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    className?: string;
};


export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    }: ButtonProps){
    const baseStyles = "px-4 py-2 r ounded-md font-medium focus:outline-none focus:ring transition";

    const variantStyles = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
        secondary:
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(baseStyles, variantStyles[variant], className)}
        >
            {children}
        </button>
    );
}
