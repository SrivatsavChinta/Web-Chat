import styles from "./ChatPageDefault.module.scss";
import chatImage from "../../assets/ChatIcon.png";
import { STRINGS } from "@shared/constants/strings";

export const ChatPageDefault = () => {
  return (
    <div className={styles.defaultWrapper}>
      <img
        src={chatImage}
        alt={STRINGS.chatDefaultImageAlt}
        className={styles.chatImageDefault}
      />
      <h2 className={styles.defaultTitle}>{STRINGS.chatDefaultTitle}</h2>
    </div>
  );
};
