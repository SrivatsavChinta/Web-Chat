import { ApiService } from "@shared/services/ApiService";
import type { ICredentials } from "../../store/IStore";

const URL = "http://localhost:8000";

export class GetUserService extends ApiService {
  getUsers(): Promise<ICredentials[]> {
    return this.get<ICredentials[]>(`${URL}/users`);
  }
}

const getUserService = new GetUserService();
export { getUserService };
