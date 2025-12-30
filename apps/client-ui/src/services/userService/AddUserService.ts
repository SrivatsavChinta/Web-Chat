import { ICredentials } from "../../store/IStore";
import { ApiService } from "@shared/services/ApiService";

const URL = "http://localhost:8000";

export class AddUserService extends ApiService {
  addUser(user: ICredentials): Promise<ICredentials> {
    return this.post<{ user: ICredentials }, ICredentials>(`${URL}/add`, {
      user,
    });
  }
}

const addUserService = new AddUserService();
export { addUserService };
