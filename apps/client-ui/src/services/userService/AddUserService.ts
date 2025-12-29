import type { ICredentials } from "../../store/IStore";

const URL = "http://localhost:8000";

export class AddUserService {
  async addUser(user: ICredentials): Promise<ICredentials> {
    try {
      const response = await fetch(`${URL}/add`, {
        method: "POST",
        body: JSON.stringify({ user }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed ${response.status}`);
      }
      return response.json();
    } catch (error) {
      console.log("Cannot add user", error);
      throw error;
    }
  }
}
