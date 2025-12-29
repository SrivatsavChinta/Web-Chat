import styles from "./ChatHeader.module.scss";
import ProfileFallBack from "../../assets/ProfileFallback.png";
import { useStore } from "../../store/Store";
import { STRINGS } from "@shared/constants/strings";

export const ChatHeader = () => {
  const selectedChat = useStore((state) => state.selectedChat);
  const activeUsers = useStore((state) => state.activeUsers);
  const userOnline =
    selectedChat && activeUsers.some((user) => user.sub === selectedChat.sub);

  console.log("selectedChat.sub", selectedChat?.sub);
  console.log("activeUsers", activeUsers);
  console.log("user online", userOnline);

  return (
    <header className={styles.header}>
      <div className={styles.imageContainer}>
        <img
          src={selectedChat?.picture || ProfileFallBack}
          alt={STRINGS.profileImageAlt}
          onError={(e) => {
            e.currentTarget.src = ProfileFallBack;
          }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.nameWrapper}>
          <span className={styles.name}>{selectedChat?.given_name}</span>
          <span
            className={`${styles.statusDot} ${
              userOnline ? styles.online : styles.offline
            }`}
          />
        </div>
      </div>
    </header>
  );
};
