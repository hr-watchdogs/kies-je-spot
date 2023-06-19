"use client"
import socketio, {Socket} from "socket.io-client";
import {Context, createContext, FC, PropsWithChildren, useContext, useEffect} from "react";

export const socket: Socket = socketio.connect(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER);
export const SocketContext = createContext<undefined | Socket>(undefined);
export const SocketContextProvider: FC<PropsWithChildren> = ({children}) => {
    function handleResponse(e) {
        console.log(e)
    }

    useEffect(() => {
        console.log("layout", socket)
        // if (!socket.connected) {
        //     console.log(socket.connected)
        //     socket.connect()
        //     console.log("socket successfully connected!")
        // }
        socket.on("response", handleResponse);
        // subscribe to socket events
    }, [])
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}
export const useSocket = (): Socket | undefined => useContext(SocketContext)
