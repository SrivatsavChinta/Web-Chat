import styles from "./ChatMessages.module.scss";
import { useStore } from "../../store/Store";
import { ChatBubble } from "../ChatBubble/ChatBubble";
import { IMessage } from "../../store/IStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { IoArrowDown } from "react-icons/io5";
import { STRINGS } from "@shared/constants/strings";

export const ChatMessages = () => {
  const messages = useStore((state) => state.messages);
  const setMessages = useStore((state) => state.setMessages);
  const credentials = useStore((state) => state.credentials);
  const conversation = useStore((state) => state.conversation);
  const socket = useStore((state) => state.socket);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  const isAtBottom = () => {
    const el = containerRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  const scrollToBottom = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setShowScroll(false);
  };

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }, [conversation?.conversationId]);

  useEffect(() => {
    if (!socket || !conversation || !credentials) return;

    const onMessage = (newMessage: IMessage) => {
      if (
        newMessage.conversationId !== conversation.conversationId ||
        newMessage.receiverId !== credentials.sub
      ) {
        return;
      }

      const shouldStickToBottom = isAtBottom();
      setMessages([...messages, newMessage]);

      requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;
        if (shouldStickToBottom) {
          el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        } else {
          setShowScroll(true);
        }
      });
    };

    socket.on("getMessage", onMessage);
    return () => {
      socket.off("getMessage", onMessage);
    };
  }, [socket, conversation, credentials, messages, setMessages]);

  return (
    <div className={styles.messageWrapper} ref={containerRef}>
      <div className={styles.topSpacer} />

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

      {showScroll && (
        <div className={styles.newMessageIndicator} onClick={scrollToBottom}>
          {STRINGS.newMessagesIndicator} <IoArrowDown />
        </div>
      )}
    </div>
  );
};
