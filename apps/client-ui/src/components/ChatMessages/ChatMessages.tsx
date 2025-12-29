import styles from "./ChatMessages.module.scss";
import { useStore } from "../../store/Store";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { IMessage } from "../../store/IStore";
import { useState, useEffect } from "react";

export const ChatMessages = () => {
  const messages = useStore((state) => state.messages);
  const [newMessage, setNewMessage] = useState<IMessage>();
  const setMessages = useStore((state) => state.setMessages);
  const credentials = useStore((state) => state.credentials);
  const conversation = useStore((state) => state.conversation);
  const socket = useStore((state) => state.socket);

  useEffect(() => {
    socket?.on("getMessage", (data: IMessage) => {
      setNewMessage(data);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (data: IMessage) => {
      if (
        data.receiverId === credentials?.sub &&
        conversation?.conversationId === data.conversationId
      ) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("getMessage", handleMessage);

    return () => {
      socket.off("getMessage", handleMessage);
    };
  }, [setMessages]);

  return (
    <div className={styles.messageWrapper}>
      {messages.map((message, index) => (
        <>
          {message.senderId === credentials?.sub ? (
            <div className={styles.sent} key={index}>
              <ChatBubble type="SENT" message={message} />
            </div>
          ) : (
            <div className={styles.received} key={index}>
              <ChatBubble type="RECEIVED" message={message} />
            </div>
          )}
        </>
      ))}
    </div>
  );
};
