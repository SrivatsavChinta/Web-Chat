import { ApiService } from "@shared";
import { IMessage } from "../../store/IStore";
const URL = "http://localhost:8000";

export interface IConversationResponse {
  createdAt: string;
  updatedAt: string;
  __v: number;
  _id: string;
  members: string[];
  message: string;
}

class ConversationService extends ApiService {
  async createConversation(data: {
    senderId: string;
    receiverId: string;
  }): Promise<void> {
    try {
      const response = await fetch(`${URL}/conversation/add`, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to create conversation (${response.status})`);
      }
      return response.json();
    } catch (error) {
      console.log("error in creating conversation", error);
      throw error;
    }
  }

  async getConversation(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse> {
    try {
      const response = await fetch(`${URL}/conversation/get`, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to get conversation (${response.status})`);
      }
      return response.json();
    } catch (error) {
      console.log("error in getting conversation", error);
      throw error;
    }
  }

  async getAllConversations(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse[]> {
    try {
      const response = await fetch(`${URL}/conversation/all`, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to get all conversations (${response.status})`);
      }
      return response.json();
    } catch (error) {
      console.log("error in getting all conversations", error);
      throw error;
    }
  }

  async addNewMessage(message: IMessage): Promise<IMessage> {
    try {
      const response = await fetch(`${URL}/message/add`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to add new message (${response.status})`);
      }
      return response.json();
    } catch (error) {
      console.log("error in getting adding message", error);
      throw error;
    }
  }

  async getMessages(conversationId: string): Promise<IMessage[]> {
    try {
      const response = await fetch(`${URL}/message/${conversationId}`, {
        method: "POST",
        body: JSON.stringify({ conversationId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to get messages (${response.status})`);
      }
      return response.json();
    } catch (error) {
      console.log("error in getting messages", error);
      throw error;
    }
  }
}

const conversationService = new ConversationService();
export { conversationService };
