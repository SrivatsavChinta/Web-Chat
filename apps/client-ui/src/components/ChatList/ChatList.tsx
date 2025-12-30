import styles from "./ChatList.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { getUserService } from "../../services/userService/GetUserService";
import { useStore } from "../../store/Store";
import { ConversationCard } from "../ConversationCard/ConversationCard";
import { ICredentials } from "../../store/IStore";
import {
  conversationService,
  IConversationResponse,
} from "../../services/conversationService/ConversationService";

export const ChatList = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  const [allConversations, setAllConversations] = useState<
    IConversationResponse[]
  >([]);

  const selectedChat = useStore((state) => state.selectedChat);
  const setSelectedChat = useStore((state) => state.setSelectedChat);
  const credentials = useStore((state) => state.credentials);
  const setConversation = useStore((state) => state.setConversation);
  const socket = useStore((state) => state.socket);

  const getUsers = async () => {
    try {
      const users = await getUserService.getUsers();
      setUsers(users);
    } catch (error) {
      console.error("error in getting users", error);
    }
  };

  const getAllConversations = async (): Promise<IConversationResponse[]> => {
    if (!credentials?.sub) return [];

    try {
      const conversations = await conversationService.getAllConversations({
        senderId: credentials.sub,
        receiverId: credentials.sub,
      });

      setAllConversations(conversations);
      return conversations;
    } catch (error) {
      console.error("error in getting all conversations", error);
      return [];
    }
  };

  const handleChatClick = async (user: ICredentials, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!credentials?.sub) return;

    const payload = {
      senderId: credentials.sub,
      receiverId: user.sub,
    };

    try {
      let conversation: IConversationResponse | undefined =
        (await conversationService.getConversation(payload)) ?? undefined;

      if (!conversation || !conversation._id) {
        await conversationService.createConversation(payload);

        const conversations = await getAllConversations();

        conversation = conversations.find(
          (c) =>
            c.members.includes(payload.senderId) &&
            c.members.includes(payload.receiverId)
        );
      }

      if (!conversation?._id) {
        console.error("Conversation not found");
        return;
      }

      setConversation({
        senderId: payload.senderId,
        receiverId: payload.receiverId,
        conversationId: conversation._id,
      });

      setSelectedChat(user);
    } catch (error) {
      console.error("Failed to open conversation", error);
    }
  };

  const chatUsers = users.filter((user) => user.sub !== credentials?.sub);

  useEffect(() => {
    if (!credentials?.sub) return;

    const wrapper = async () => {
      await getUsers();
      await getAllConversations();
    };

    wrapper();
  }, [credentials?.sub]);

  console.log("CURRENT USER:", credentials?.sub);
  console.log("USERS:", users);
  console.log("CHAT USERS:", chatUsers);
  console.log("CONVERSATIONS:", allConversations);
  console.table(users.map((u) => u.email));
  console.log("Logged in user:", credentials?.sub);

  return (
    <div className={styles.chatListWrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>

      <div className={styles.conversationContainer}>
        {chatUsers.map((user) => {
          const conversation = allConversations.find(
            (c) =>
              c.members.includes(credentials!.sub) &&
              c.members.includes(user.sub)
          );

          return (
            <ConversationCard
              key={user.sub}
              displayPicture={user.picture}
              name={user.given_name}
              latestMessage={
                conversation ? conversation.message : "Start chatting"
              }
              isSelected={user.sub === selectedChat?.sub}
              onClick={(e) => handleChatClick(user, e)}
            />
          );
        })}
      </div>
    </div>
  );
};
