import { HttpMethod, IApiService } from "./IApiService";

export class ApiService implements IApiService {
  private async handleResponse<T>(response: Response): Promise<T> {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = null;
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return data as T;
  }

  public async get<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url);
    return this.handleResponse<TResponse>(response);
  }

  public async post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: HttpMethod.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResponse>(response);
  }

  public async put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<TResponse> {
    const response = await fetch(url, {
      method: HttpMethod.PUT,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return this.handleResponse<TResponse>(response);
  }

  public async delete<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url, {
      method: HttpMethod.DELETE,
    });

    return this.handleResponse<TResponse>(response);
  }
}
