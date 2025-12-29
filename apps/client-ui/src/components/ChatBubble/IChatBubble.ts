import { IMessage } from "src/store/IStore";

export interface IChatBubbleProps {
  message: IMessage;
  type: "SENT" | "RECEIVED";
}
