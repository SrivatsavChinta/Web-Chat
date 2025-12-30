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
  }): Promise<void> {
    return this.post<{ data: { senderId: string; receiverId: string } }, void>(
      `${URL}/conversation/add`,
      { data }
    );
  }

  getConversation(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse> {
    return this.post<
      { data: { senderId: string; receiverId: string } },
      IConversationResponse
    >(`${URL}/conversation/get`, { data });
  }

  getAllConversations(data: {
    senderId: string;
    receiverId: string;
  }): Promise<IConversationResponse[]> {
    return this.post<
      { data: { senderId: string; receiverId: string } },
      IConversationResponse[]
    >(`${URL}/conversation/all`, { data });
  }

  addNewMessage(message: IMessage): Promise<IMessage> {
    return this.post<{ message: IMessage }, IMessage>(`${URL}/message/add`, {
      message,
    });
  }

  getMessages(conversationId: string): Promise<IMessage[]> {
    return this.post<{ conversationId: string }, IMessage[]>(
      `${URL}/message/${conversationId}`,
      { conversationId }
    );
  }
}

const conversationService = new ConversationService();
export { conversationService };
