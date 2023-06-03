"use client"
import Image from 'next/image'
import {Heading} from "@/components/ui/Heading";
import {Button, ButtonType} from "@/components/ui/Button";
import {OTPForm} from "@/components/ui/OTPForm";
import {useEffect, useRef, useState} from "react";
import {AuthCodeRef} from "react-auth-code-input";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter()
    return (
        <div className=" bg-blue-500 bottom-0 h-[65vh] w-full rounded-t-[5vh] p-6 flex items-center justify-center">
            <div className="flex items-center flex-col justify-between py-8 w-full h-full">
                <div className="flex flex-col items-center w-full space-y-2">
                    <Heading type={"h2"}>Voer namen agenten in</Heading>
                    <p className="font-xs">Voer de namen in van de agenten in de eenheid.</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {/*todo: Create component for names list*/}
                    <Heading type={"h2"}>component for names list</Heading>

                </div>
                <div className="flex flex-col space-y-2">
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        onClick={async (e) => {
                            e.preventDefault()

                            // window.alert(`Code: ${otp}`)
                            await router.push('/register-unit')
                        }}
                    >Volgende</Button>
                    <p className="font-xs">Geen code zichtbaar? Vraag de trainer om assistentie.</p>
                </div>
            </div>
        </div>
    )
}