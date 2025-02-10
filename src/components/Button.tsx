import { motion } from "framer-motion";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    variant?: "primary" | "secondary" | "danger";
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = "button",
    variant = "primary",
    bgColor,
    textColor,
    className = "",
    ...props
}) => {
    // Define variant styles
    const variantClasses: Record<string, string> = {
        primary: "bg-purple-600 text-white hover:bg-purple-700",
        secondary: "bg-gray-300 text-gray-800 hover:bg-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <motion.button
            type={type}
            className={`rounded-lg px-5 py-2 font-semibold cursor-pointer shadow-md transition duration-200 ease-out
                ${variantClasses[variant]} ${bgColor || ""} ${textColor || ""} ${className}`.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
