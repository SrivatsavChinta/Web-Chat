import type { ICredentials } from "../../store/IStore";

const URL = "http://localhost:8000";

export class GetUserService {
  async getUsers(): Promise<ICredentials[]> {
    try {
      const response = await fetch(`${URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.log("Cannot get users", error);
      throw error;
    }
  }
}
