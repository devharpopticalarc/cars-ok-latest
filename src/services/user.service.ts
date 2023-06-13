import { AxiosResponse } from "axios";
import { ApiResponse, AppHttpService } from "./app-http.service";

export class UserService {
  private appHttpService: AppHttpService;
  constructor () {
    this.appHttpService = new AppHttpService();
  }

  public forgotPassword({ token, password }: { token: string | null, password: string }): Promise<AxiosResponse<ApiResponse<unknown>, any>> | null {
  // public forgotPassword({ token, password }: { token: string | null, password: string }) {
    if(!token || !password) return null;
    console.log({ token, password });
    return this.appHttpService.post('/reset-password', { token, password });
  }
}