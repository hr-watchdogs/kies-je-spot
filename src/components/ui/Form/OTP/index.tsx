"use client"
import {Dispatch, FC, MutableRefObject} from "react";
import AuthCode from 'react-auth-code-input';
import {AuthCodeRef} from "react-auth-code-input";
import {classNames} from "@/utils/classNames";
import { Transition } from "@headlessui/react";


interface OTPFormProps extends HTMLFormElement {
    value: string
    setValue: Dispatch<string>
    setInvalid: Dispatch<boolean>
    invalid: boolean
}

export const OTPForm: FC<Partial<OTPFormProps>> = ({setInvalid, setValue, invalid}) => {

    const handleOnChange = (res: string) => {
        if (setInvalid) {
            setInvalid(false)
        }
        if (typeof setValue !== 'undefined') setValue(res)
    };
    return (
        <div className={"flex flex-col justify-center items-center"}>
            <AuthCode
                allowedCharacters={"numeric"}
                containerClassName={"w-full flex flex-row items-between"}
                inputClassName={classNames("w-10 h-10 sm:max-xl:h-16 sm:max-xl:w-16 xl:w-20 xl:h-20 max-w-16 transition-color ease-out duration-[900ms] m-2 sm:max-xl:m-4 rounded-lg text-black text-center font-semibold grow text-xl group group-invalid", invalid ? "border-[#FF0000] bg-[#FFD3D3] border-2" : "")}
                length={5}
                onChange={(res) => handleOnChange(res)}
            />
            <Transition
                show={invalid}
                enter="transition-opacity duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-out duration-800"
                leaveFrom="opacity-100 transition-opacity ease-out duration-800"
                leaveTo="opacity-0 transition-opacity ease-out duration-800"
            >
                <p className="text-[#FF0000] transition-opacity ease-in-out duration-[900ms] text-sm">Ingevoerde
                    code is incorrect of niet meer geldig</p>
            </Transition>

        </div>
    );
}


