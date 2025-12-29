import styles from "./ChatBubble.module.scss";
import { IChatBubbleProps } from "./IChatBubble";

export const ChatBubble = ({ message, type }: IChatBubbleProps) => {
  return (
    <div className={styles.messagesContainer}>
      <div
        className={
          type === "SENT" ? styles.sentMessage : styles.receivedMessage
        }
      >
        {message.text}
      </div>
    </div>
  );
};
