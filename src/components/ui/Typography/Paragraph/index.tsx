"use client"
import {createElement, FC, PropsWithChildren} from "react";
import {classNames} from "@/utils/classNames";

interface ParagraphProps extends PropsWithChildren{
    fontWeight?:string
    className?: string
}
interface ParagraphClasses {
    [key: string]: string;
}
// todo: update styles
const fontWeighClassest:ParagraphClasses = {
    bold: "font-bold text-white",
    semiBold: "font-semibold text-white",
    regular: "font-regular text-white",
    thin: "font-thin text-white",
    light: "font-light text-white",
};

export const Paragraph:FC<ParagraphProps> = ({children,fontWeight, className,...props} ) => {
    const weight = fontWeight?.toLowerCase();
    const size = fontWeighClassest[weight ?? fontWeighClassest.regular ] ?? "font-semibold";

    return createElement(
        "p",
        { className: classNames( size, className ??  "text-md"), ...props },
        children
    );
}