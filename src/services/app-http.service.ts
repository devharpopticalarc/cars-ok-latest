import axios, { AxiosResponse } from 'axios';
import { SERVER_API } from '../constants/server-api.enum';

export interface ApiResponse<T> {
  data: T;
  status: number;
}

export class AppHttpService {

  private apiService = axios.create({
    baseURL: SERVER_API.BASE_URL, // Replace with your API base URL
    timeout: 5000, // Adjust the timeout value as needed
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.apiService.get(url);
      return response.data.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async post<T>(url: string, data: any): Promise<AxiosResponse<ApiResponse<T>>> {
    try {
      return this.apiService.post(url, data);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

}