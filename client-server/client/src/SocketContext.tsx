import React, { createContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
  socket: Socket | null;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
});

interface SocketProviderProps {
  url: string;
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  url,
  children,
}) => {
  const socket = io(url);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
