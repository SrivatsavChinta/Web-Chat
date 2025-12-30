import styles from "./ConversationCard.module.scss";
import { IConversationCardProps } from "./IConversationCard";
import ProfileFallBack from "../../assets/ProfileFallback.png";

export const ConversationCard = (props: IConversationCardProps) => {
  return (
    <div
      className={`${styles.cardContainer} ${
        props.isSelected ? styles.selected : ""
      }`}
      onClick={props.onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        <img
          src={props.displayPicture || ProfileFallBack}
          alt={props.name}
          onError={(e) => {
            e.currentTarget.src = ProfileFallBack;
          }}
        />
      </div>

      <div className={styles.detailsContainer}>
        <div className={styles.messagedetails}>
          <p className={styles.contactName}>{props.name}</p>
          <p className={styles.latestMessage}>{props.latestMessage}</p>
        </div>
      </div>
    </div>
  );
};
