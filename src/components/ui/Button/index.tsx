"use client"
import {ButtonHTMLAttributes, FC, ReactNode} from "react";
import {classNames} from "@/utils/classNames";

export enum ButtonType {
    PRIMARY,
    SECONDARY,
    ROUNDED,
    OUTLINE,
    REVERSED,
    DISABLED
}

// todo: Update styles
const buttonClassesMap = {
    [ButtonType.PRIMARY]: "w-full bg-blue-300 rounded-lg text-white font-semibold p-2 h-16" + " transition duration-[600ms] ease-in-out"+ " hover:bg-blue-600",
    [ButtonType.SECONDARY]: "w-full bg-blue-500 rounded-lg text-white font-semibold p-2 h-16",
    [ButtonType.OUTLINE]: "w-full bg-blue-500 rounded-lg text-white font-semibold p-2 h-16",
    [ButtonType.REVERSED]: "w-full bg-blue-500 rounded-lg text-white font-semibold p-2 h-16",
    [ButtonType.ROUNDED]: "bg-blue-300 rounded-full text-white font-semibold p-2 w-12 h-12",
    [ButtonType.DISABLED]: "w-full bg-gray-300 rounded-lg text-white font-semibold p-2 h-16",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonType?: ButtonType;
    children?: ReactNode;
}

export const Button: FC<Partial<ButtonProps>> = ({buttonType= ButtonType.PRIMARY, children, ...props}) => {
    const buttonClass = buttonClassesMap[buttonType] ?? ButtonType.PRIMARY;

    // Render the button with the appropriate CSS class
    return (
        <button
            {...props}
            className={classNames(buttonClass, props.className ?? "")}>
            {children && <span>{children}</span>}
        </button>
    );
};