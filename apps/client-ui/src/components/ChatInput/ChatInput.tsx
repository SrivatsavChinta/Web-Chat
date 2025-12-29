import styles from "./ChatInput.module.scss";
import { Input, InputGroup } from "@chakra-ui/react";
import { VscSend } from "react-icons/vsc";
import { useState, ChangeEvent } from "react";
import { IMessage, IStore } from "../../store/IStore";
import { useStore } from "../../store/Store";
import { conversationService } from "../../services/conversationService/ConversationService";

export const ChatInput = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const validMessage = inputValue.trim().length > 0;

  const currentConversation = useStore((state: IStore) => state.conversation);
  const messages = useStore((state: IStore) => state.messages);
  const setMessages = useStore((state: IStore) => state.setMessages);
  const socket = useStore((state) => state.socket);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleSend = async () => {
    if (!validMessage || !currentConversation) return;
    console.log("input value", inputValue);

    const message: IMessage = {
      senderId: currentConversation.senderId,
      receiverId: currentConversation.receiverId,
      conversationId: currentConversation.conversationId!,
      text: inputValue.trim(),
      type: "text",
    };

    setMessages([...messages, message]);
    setInputValue("");

    try {
      socket?.emit("sendMessage", message);
      await conversationService.addNewMessage(message);
    } catch (error) {
      console.log("error in sending message", error);
      throw error;
    }
  };

  return (
    <div className={styles.messageWrapper}>
      <InputGroup
        className={styles.inputGroup}
        endElement={
          <span
            className={`${styles.iconWrapper} ${
              validMessage ? styles.enableSend : styles.disableSend
            }`}
            onClick={handleSend}
            role="button"
            tabIndex={0}
          >
            <VscSend className={styles.sendIcon} />
          </span>
        }
      >
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className={styles.messageInput}
        />
      </InputGroup>
    </div>
  );
};
