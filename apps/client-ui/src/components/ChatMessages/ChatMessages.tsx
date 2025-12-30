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

  const containerReference = useRef<HTMLDivElement | null>(null);
  const [showScroll, setShowScroll] = useState(false);

  const isAtBottom = () => {
    const el = containerReference.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 60;
  };

  const scrollToBottom = () => {
    const el = containerReference.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    setShowScroll(false);
  };

  useLayoutEffect(() => {
    const el = containerReference.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [conversation?.conversationId, messages.length]);

  useEffect(() => {
    const el = containerReference.current;
    if (!el) return;
    const onScroll = () => {
      setShowScroll(!isAtBottom());
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!socket || !conversation || !credentials) return;
    const onMessage = (incoming: IMessage) => {
      if (incoming.conversationId !== conversation.conversationId) return;
      const sender = incoming.senderId === credentials.sub;
      const stickToBottom = sender || isAtBottom();
      setMessages((prev) => [...prev, incoming]);
      requestAnimationFrame(() => {
        if (stickToBottom) {
          scrollToBottom();
        } else {
          setShowScroll(true);
        }
      });
    };

    socket.on("getMessage", onMessage);
    return () => {
      socket.off("getMessage", onMessage);
    };
  }, [socket, conversation, credentials, setMessages]);

  return (
    <div className={styles.messageWrapper} ref={containerReference}>
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
