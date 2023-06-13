import { AxiosResponse } from "axios";
import { ApiResponse, AppHttpService } from "./app-http.service";

export class UserService {
  private appHttpService: AppHttpService;

  constructor () {
    this.appHttpService = new AppHttpService();
  }

  /**
   * Sends a request to reset the password using the provided token and new password.
   *
   * @param {Object} params - The parameters for resetting the password.
   * @param {string | null} params.token - The token associated with the password reset request.
   * @param {string} params.password - The new password for the user account.
   * @returns {Promise<AxiosResponse<ApiResponse<unknown>, any>>} A promise that resolves to the AxiosResponse containing the response data.
   * @throws {Error} If an error occurs during the request.
   */
  public resetPassword({ token, password }: { token: string | null, password: string }): Promise<AxiosResponse<ApiResponse<unknown>, any>> {
    return this.appHttpService.post('/reset-password', { token, password });
  }

  /**
   * Sends a request to initiate the password reset process for a given email address.
   *
   * @param {string} email - The email address associated with the user account.
   * @returns {Promise<AxiosResponse<ApiResponse<unknown>, any>>} A promise that resolves to the AxiosResponse containing the response data.
   * @throws {Error} If an error occurs during the request.
   */
  public forgotPassword(email: string): Promise<AxiosResponse<ApiResponse<unknown>, any>> {
    return this.appHttpService.post('/forgot-password', { email });
  }
}