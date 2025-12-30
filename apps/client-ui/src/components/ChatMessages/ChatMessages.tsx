import styles from "./ChatMessages.module.scss";
import { useStore } from "../../store/Store";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { IMessage } from "../../store/IStore";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { IoArrowDown } from "react-icons/io5";
import { STRINGS } from "@shared/constants/strings";

export const ChatMessages = () => {
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const credentials = useStore((state) => state.credentials);
  const conversation = useStore((state) => state.conversation);
  const socket = useStore((state) => state.socket);

  const containerReference = useRef<HTMLDivElement | null>(null);
  const [messageIndicator, setMessageIndicator] = useState(false);

  const bottomTrue = () => {
    const el = containerReference.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  const scrollToBottom = () => {
    const el = containerReference.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setMessageIndicator(false);
  };

  useLayoutEffect(() => {
    const el = containerReference.current;
    if (!el) return;

    el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }, [conversation?.conversationId, messages.length]);

  useEffect(() => {
    if (!socket || !conversation || !credentials) return;

    const onMessage = (data: IMessage) => {
      if (
        data.conversationId !== conversation.conversationId ||
        data.receiverId !== credentials.sub
      ) {
        return;
      }

      setMessages([...messages, data]);

      const el = containerReference.current;
      if (!el) return;

      if (bottomTrue()) {
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      } else {
        setMessageIndicator(true);
      }
    };

    socket.on("getMessage", onMessage);

    return () => {
      socket.off("getMessage", onMessage);
    };
  }, [socket, conversation, credentials, messages, setMessages]);

  return (
    <div className={styles.messageWrapper} ref={containerReference}>
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

      {messageIndicator && (
        <div className={styles.newMessageIndicator} onClick={scrollToBottom}>
          {STRINGS.newMessagesIndicator} <IoArrowDown />
        </div>
      )}
    </div>
  );
};
