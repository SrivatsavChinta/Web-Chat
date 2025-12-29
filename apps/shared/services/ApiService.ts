import { HttpMethod, IApiService } from "./IApiService";

export class ApiService implements IApiService {
  async get<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url);
    return response.json() as Promise<TResponse>;
  }

  async post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    try {
      const response = await fetch(url, {
        method: HttpMethod.POST,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response.json() as Promise<TResponse>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    try {
      const response = await fetch(url, {
        method: HttpMethod.PUT,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      return response.json() as Promise<TResponse>;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url, {
      method: HttpMethod.DELETE,
    });

    return response.json() as Promise<TResponse>;
  }
}
