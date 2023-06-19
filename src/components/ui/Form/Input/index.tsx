import {FC, InputHTMLAttributes} from "react";
import {classNames} from "@/utils/classNames";
import {Simulate} from "react-dom/test-utils";
import invalid = Simulate.invalid;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    invalid: boolean
}

export const Input: FC<Partial<InputProps>> = ({className, invalid, ...props}) => {
    const defaultClasses = classNames("h-16 m-2 rounded-lg text-black text-center font-semibold grow text-xl group group-invalid", invalid ? "border-red-500 border-2 placeholder:text-red-800": "")
    return (<input className={classNames( defaultClasses,className ?? "")} {...props} />)
}