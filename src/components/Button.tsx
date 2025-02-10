import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = "button",
    bgColor = "blue",
    textColor = "text-white",
    className = "",
    ...props
}) => {
    return (
        <button
            type={type}
            className={`${className} ${bgColor} ${textColor} hover:scale-110 duration-100 ease-in`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;

