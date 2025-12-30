import styles from "./ChatList.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { GetUserService } from "../../services/userService/GetUserService";
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

  async function getUsers(): Promise<void> {
    const getUsersService = new GetUserService();
    try {
      const users = await getUsersService.getUsers();
      setUsers(users);
    } catch (error) {
      console.error("error in getting users", error);
    }
  }

  async function getAllConversations(): Promise<IConversationResponse[]> {
    try {
      if (!credentials?.sub) {
        return [];
      }

      const conversations = await conversationService.getAllConversations({
        senderId: credentials?.sub,
        receiverId: credentials?.sub,
      });
      setAllConversations([...conversations]);
      console.log(conversations);
      return conversations;
    } catch (error) {
      console.log("error in getting all conversations", error);
      throw error;
    }
  }

  const handleChatClick = async (user: ICredentials, e?: React.MouseEvent) => {
    e?.stopPropagation();

    if (!credentials?.sub) {
      console.log("User not authenticated");
      return;
    }

    try {
      const payload = {
        senderId: credentials.sub,
        receiverId: user.sub,
      };

      const conversation = await conversationService.getConversation(payload);

      if (!conversation || !conversation._id) {
        console.log("No conversation found, creating one...");

        const createdConversation =
          await conversationService.createConversation(payload);

        setConversation({
          senderId: payload.senderId,
          receiverId: payload.receiverId,
          conversationId: createdConversation._id,
        });
      } else {
        setConversation({
          senderId: payload.senderId,
          receiverId: payload.receiverId,
          conversationId: conversation._id,
        });
      }

      setSelectedChat(user);
    } catch (error) {
      console.error("Failed to open conversation", error);
      throw error;
    }
  };

  useEffect(() => {
    if (!socket) return;

    const refreshUsers = () => {
      getUsers();
      getAllConversations();
    };

    socket.on("getUsers", refreshUsers);

    return () => {
      socket.off("getUsers", refreshUsers);
    };
  }, [socket]);

  return (
    <div className={styles.chatListWrapper}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>

      <div className={styles.conversationContainer}>
        {users
          .filter((user) => user.sub !== credentials?.sub)
          .map((user) => {
            const latestConversation = allConversations.find(
              (conversation) =>
                conversation.members.includes(credentials!.sub) &&
                conversation.members.includes(user.sub)
            );

            return (
              <ConversationCard
                key={user.sub}
                displayPicture={user.picture}
                name={user.given_name}
                latestMessage={latestConversation?.message || "Start chatting"}
                isSelected={user.sub === selectedChat?.sub}
                onClick={(e) => handleChatClick(user, e)}
              />
            );
          })}
      </div>
    </div>
  );
};
