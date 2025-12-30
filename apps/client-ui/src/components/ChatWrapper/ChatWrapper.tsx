import { useEffect } from "react";
import { useStore } from "../../store/Store";
import type { IStore } from "../../store/IStore";
import { Login } from "../Login/Login";
import { ChatContainer } from "../ChatContainer/ChatContainer";
import { io } from "socket.io-client";

const ChatWrapper = () => {
  const credentials = useStore((state: IStore) => state.credentials);
  const setSocket = useStore((state: IStore) => state.setSocket);
  const setActiveUsers = useStore((state: IStore) => state.setActiveUsers);

  useEffect(() => {
    if (!credentials?.sub) return;

    const socket = io("ws://localhost:9000");
    setSocket(socket);

    socket.on("connect", () => {
      socket.emit("addUser", {
        sub: credentials.sub,
        email: credentials.email,
      });
    });

    socket.on("getUsers", (users) => {
      setActiveUsers(users);
    });

    return () => {
      socket.disconnect();
      setSocket(null);
      setActiveUsers([]);
    };
  }, [credentials?.sub, credentials?.email, setActiveUsers, setSocket]);

  return <>{credentials ? <ChatContainer /> : <Login />}</>;
};

export default ChatWrapper;
