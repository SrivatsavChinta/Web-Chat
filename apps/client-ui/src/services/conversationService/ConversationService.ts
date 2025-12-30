import { ApiService } from "@shared/services/ApiService";
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
  createConversation(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse | string> {
    return this.post<
      { data: { senderId: string; receiverId: string } },
      IConversationResponse | string
    >(`${URL}/conversation/add`, {
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
    });
  }

  getConversation(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse | null> {
    return this.post<
      { data: { senderId: string; receiverId: string } },
      IConversationResponse | null
    >(`${URL}/conversation/get`, {
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
      },
    });
  }

  getAllConversations(data: {
    senderId: string;
    receiverId?: string;
  }): Promise<IConversationResponse[]> {
    return this.post<
      { data: { senderId: string; receiverId?: string } },
      IConversationResponse[]
    >(`${URL}/conversation/all`, {
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId, // backend ignores this safely
      },
    });
  }

  addNewMessage(message: IMessage): Promise<IMessage> {
    return this.post<{ message: IMessage }, IMessage>(`${URL}/message/add`, {
      message,
    });
  }

  getMessages(conversationId: string): Promise<IMessage[]> {
    return this.get<IMessage[]>(`${URL}/message/${conversationId}`);
  }
}

const conversationService = new ConversationService();
export { conversationService };
