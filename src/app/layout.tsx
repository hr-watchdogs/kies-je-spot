import './globals.css'
import {Inter} from 'next/font/google'
import {SocketContextProvider} from "@/context/socket";

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Kies je spot',
    description: 'Watchdogs prototype',
    robots: "no-follow",
    openGraph: {
        image: "/onboarding/police-car.png"
    }
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="nl">
        <body className={inter.className}>
        <SocketContextProvider>
            {children}
        </SocketContextProvider>
        </body>
        </html>
    )
}
