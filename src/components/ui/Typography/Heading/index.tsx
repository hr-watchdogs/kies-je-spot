"use client"
import {createElement, FC, PropsWithChildren} from "react";
import {classNames} from "@/utils/classNames";

interface HeadingProps extends PropsWithChildren {
    type: string
    color?: string
    className?: string
}

interface HeadingClasses {
    [key: string]: string;
}

// todo: update styles
const headingClasses: HeadingClasses = {
    h1: "text-5xl font-semibold",
    h2: "text-4xl font-semibold ",
    h3: "text-xl font-semibold",
    h4: "text-lg font-semibold",
    h5: "text-md font-semibold",
    h6: "text-md font-semibold",
};

export const Heading: FC<HeadingProps> = ({children, type, color = "text-white", className, ...props}) => {
    const elementType = type.toLowerCase();
    const size = headingClasses[elementType] || "font-semibold text-white";

    return createElement(
        elementType,
        {className: classNames(size, color as string, className ?? ""), ...props},
        children
    );
}