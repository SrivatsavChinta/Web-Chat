import styles from "./ChatMessages.module.scss";
import { useStore } from "../../store/Store";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { IMessage } from "../../store/IStore";
import { useState, useEffect, useRef } from "react";

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
    if (!newMessage) return;
    if (!conversation) return;
    if (!credentials) return;

    if (
      newMessage.receiverId === credentials.sub &&
      newMessage.conversationId === conversation.conversationId
    ) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage, conversation, credentials, setMessages]);

  return (
    <div className={styles.messageWrapper}>
      <div className={styles.topSpacer}></div>
      {messages.map((message, index) => (
        <div
          key={`${message.senderId}-${index}`}
          className={
            message.senderId === credentials?.sub
              ? styles.sent
              : styles.received
          }
        >
          <ChatBubble
            type={message.senderId === credentials?.sub ? "SENT" : "RECEIVED"}
            message={message}
          />
        </div>
      ))}
    </div>
  );
};
