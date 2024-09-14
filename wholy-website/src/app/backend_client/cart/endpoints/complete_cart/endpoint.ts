import { HttpError } from "@/app/backend_client/errors/HttpError";
import { mapOrderApiResponseToModel, Order } from "../../../order/models/order";

export class CompleteCartEndpoint {
    constructor(private readonly url: string) {}
    
    async perform(cartId: string): Promise<Order> {
        const response: Response = await fetch(`${this.url}/store/carts/${cartId}/complete`, {method: 'POST'}); 
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json(); 
        return mapOrderApiResponseToModel(responseBody['data']);
    }
}