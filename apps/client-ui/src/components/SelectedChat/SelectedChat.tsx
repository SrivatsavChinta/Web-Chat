import styles from "./SelectedChat.module.scss";
import { useEffect } from "react";
import { ChatInput } from "../ChatInput/ChatInput";
import { ChatMessages } from "../ChatMessages/ChatMessages";
import { useStore } from "../../store/Store";
import { conversationService } from "../../services/conversationService/ConversationService";
import { ChatHeader } from "../ChatHeader/ChatHeader";

export const SelectedChat = () => {
  const currentConversation = useStore((state) => state.conversation);
  const setMessages = useStore((state) => state.setMessages);

  useEffect(() => {
    if (!currentConversation?.conversationId) return;

    const getMessages = async () => {
      const messages = await conversationService.getMessages(
        currentConversation.conversationId
      );
      setMessages(messages);
    };

    getMessages();
  }, [currentConversation?.conversationId, setMessages]);

  return (
    <div className={styles.selectedChat}>
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};
