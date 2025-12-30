export interface IApiService {
  get<TResponse>(url: string): Promise<TResponse>;
  post<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;
  put<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse>;
  delete<TResponse>(url: string): Promise<TResponse>;
}

export const HttpMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
