"use client"
import {Heading} from "@/components/ui/Typography/Heading";
import {Button, ButtonType} from "@/components/ui/Button";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter()

    return (
        <main
            className="flex min-h-screen flex-col items-center h-screen w-screen bg-white flex flex-col justify-end items-end">
            <div className=" bg-blue-500 bottom-0 h-full w-full p-6 flex items-center justify-center">
                <div className="flex flex-row justify-between w-full ">
                    <div
                        className="w-1/2 flex flex-col space-y-2 bg-blue-200 items-between justify-between rounded-xl p-2 text-black m-2">
                        <div className="flex flex-col p-6 space-y-8">

                            <div className="flex px-6  flex-col space-y-2 items-center justify-center text-center">
                                <Heading type="h3">Begin met trainen</Heading>
                                <p>Om te beginnen met de training moet je aanmelden met de gegeven trainingscode.</p>
                            </div>
                            <Button onClick={() => router.push("/register/")}>Meld je aan</Button>
                        </div>
                    </div>
                    <div
                        className="w-1/2 flex flex-col space-y-2 bg-blue-200 items-between justify-between rounded-xl p-2 text-black m-2">
                        <div className="flex flex-col p-6 space-y-8">

                            <div className="flex px-6  flex-col space-y-2  text-center">
                                <Heading type="h3">Open smartboard versie</Heading>
                                <p>Start een nieuwe trainings sessie</p>
                            </div>
                            <Button onClick={() => router.push("/session")} buttonType={ButtonType.PRIMARY}>Open
                                kaart</Button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
