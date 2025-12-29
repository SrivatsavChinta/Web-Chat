import type { ICredentials } from "../../store/IStore";

const URL = "http://localhost:8000";

export class GetUserService {
  async getUsers(): Promise<ICredentials[]> {
    try {
      const response = await fetch(`${URL}/users`);
      if (!response.ok) {
        throw new Error(`Failed to fetch users (${response.status})`);
      }
      const res = await response.json();
      return res;
    } catch (error) {
      console.error("getUsers error:", error);
      throw error;
    }
  }
}
