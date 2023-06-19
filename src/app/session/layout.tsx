"use client"
import Image from "next/image";
import {ReactNode, useEffect} from "react";
import {useSocket} from "@/context/socket";

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Kies je spot',
//   description: 'Watchdogs',
//   robots: "no follow",
//   openGraph: {
//     description: "test og",
//     image:"/next.svg"
//   }
// }

export default function RootLayout(props: {
    children: ReactNode;
}) {
    const socket = useSocket()

    useEffect(()=>{
        socket?.on("response", (e)=>console.log(e))
        socket?.emit("join", {room: 12322})
        socket?.on("unit:coordinates", (e)=>console.log(e))
    },[])
    return (
        <main className="flex min-h-screen flex-col items-center h-screen w-screen bg-white flex flex-col justify-end items-end">
                {props.children}
        </main>
    )
}
