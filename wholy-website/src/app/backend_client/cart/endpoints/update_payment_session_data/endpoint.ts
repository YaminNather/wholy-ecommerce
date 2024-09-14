import { HttpError } from "@/app/backend_client/errors/HttpError";
import { Cart, mapCartApiResponseToModel } from "../../models/cart";
import URI from "urijs";

export class UpdatePaymentSessionMetadataEndpoint {
    constructor(private readonly url: string) {}
    
    async perform(cartId: string, providerId: string, data: any): Promise<Cart> {
        const requestBody: any = { data };
        const response: Response = await fetch(
            `${this.url}/store/carts/${cartId}/payment-sessions/${providerId}`, 
            {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            }
        );
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody = await response.json();
        return mapCartApiResponseToModel(responseBody['cart'], new URI(this.url));
    }
}