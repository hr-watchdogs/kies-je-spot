"use client"
import {ReactNode, useEffect} from "react";
import {useSocket} from "@/context/socket";

export default function RootLayout(props: {
    children: ReactNode;
}) {
    const socket = useSocket()

    useEffect(()=>{
        socket?.on("response", (e)=>console.log(e))
        socket?.emit("join", {room: 12322})
    },[])
    return (
        <main className="flex min-h-screen flex-col items-center h-screen w-screen bg-white flex flex-col justify-end items-end">
                {props.children}
        </main>
    )
}
