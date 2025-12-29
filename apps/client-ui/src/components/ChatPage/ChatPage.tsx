import styles from "./ChatPage.module.scss";
import { IStore } from "../../store/IStore";
import { useStore } from "../../store/Store";
import { SelectedChat } from "../SelectedChat/SelectedChat";
import { ChatPageDefault } from "./ChatPageDefault";

export const ChatPage = () => {
  const selectedChat = useStore((state: IStore) => state.selectedChat);
  return (
    <div className={styles.chatPageWrapper}>
      {selectedChat ? <SelectedChat /> : <ChatPageDefault />}
    </div>
  );
};
