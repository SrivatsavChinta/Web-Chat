export interface IConversationCardProps {
  name: string;
  displayPicture: string;
  date: string;
  latestMessage: string;
  isSelected: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
