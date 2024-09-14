import { HttpError } from "@/app/backend_client/errors/HttpError";
import { Cart, mapCartApiResponseToModel } from "../../models/cart";
import URI from "urijs";

export class SelectPaymentSessionEndpoint {
    constructor(private readonly url: string) {}
    
    async perform(cartId: string, providerId: string): Promise<Cart> {
        const requestBody: any = {
            'provider_id': providerId
        };

        const response: Response = await fetch(
            `${this.url}/store/carts/${cartId}/payment-sessions`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            }
        );

        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        return mapCartApiResponseToModel(responseBody['cart'], new URI(this.url));
    }
}