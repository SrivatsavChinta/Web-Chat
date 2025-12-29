import styles from "./ChatContainer.module.scss";
import { ChatList } from "../ChatList/ChatList";
import { ChatPage } from "../ChatPage/ChatPage";

export const ChatContainer = () => {
  return (
    <div className={styles.containerBackground}>
      <div className={styles.chatContainer}>
        <ChatList />
        <ChatPage />
      </div>
    </div>
  );
};
