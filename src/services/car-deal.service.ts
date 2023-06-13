import { AxiosResponse } from "axios";
import { ApiResponse, AppHttpService } from "./app-http.service";

export class CarDealService {
  private appHttpService: AppHttpService;
  constructor () {
    this.appHttpService = new AppHttpService();
  }

  public notifyAdmin({ carId, dealerId }: { carId: string, dealerId: string }): Promise<AxiosResponse<ApiResponse<unknown>, any>> {
    return this.appHttpService.post('/notify-admin', { carId, dealerId });
  }
}