"use client"
import {io, Socket} from "socket.io-client";
import { createContext, FC, PropsWithChildren, useContext, useEffect} from "react";

export const socket: Socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_SERVER ?? "http//:localhost:3001").connect();
export const SocketContext = createContext<undefined | Socket>(undefined);
export const SocketContextProvider: FC<PropsWithChildren> = ({children}) => {
    return <SocketContext.Provider value={socket}>
        {children}
    </SocketContext.Provider>
}
export const useSocket = (): Socket | undefined => useContext(SocketContext)
