import { Socket } from "socket.io-client";

export interface ICredentials {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}

export interface IStore {
  credentials: ICredentials | null;
  setCredentials: (newCredentials: ICredentials | null) => void;

  profileView: boolean;
  setProfileView: (profileView: boolean) => void;

  users: ICredentials[];
  setUsers: (users: ICredentials[]) => void;

  selectedChat: ICredentials | null;
  setSelectedChat: (selectedChat: ICredentials | null) => void;

  conversation: IConversation | null;
  setConversation: (conversation: IConversation | null) => void;

  messages: IMessage[];
  setMessages: (messages: IMessage[]) => void;

  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;

  activeUsers: ICredentials[];
  setActiveUsers: (activeUsers: ICredentials[]) => void;
}

export interface IConversation {
  senderId: string;
  receiverId: string;
  conversationId: string | null;
}

export interface IMessage {
  senderId: string;
  receiverId: string;
  conversationId: string;
  text: string;
  type: string;
  createdAt?: string;
}
