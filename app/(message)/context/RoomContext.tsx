// app/context/RoomContext.tsx
import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext<{ roomName: string; setRoomName: React.Dispatch<React.SetStateAction<string>> } | null>(null);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [roomName, setRoomName] = useState('チャットルーム名');

  return (
    <RoomContext.Provider value={{ roomName, setRoomName }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => useContext(RoomContext);