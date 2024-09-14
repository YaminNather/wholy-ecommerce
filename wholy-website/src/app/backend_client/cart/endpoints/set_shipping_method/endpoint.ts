import { HttpError } from "@/app/backend_client/errors/HttpError";
import { Cart } from "../../models";
import { mapCartApiResponseToModel } from "../../models/cart";
import URI from "urijs";

export class SetShippingMethodEndpoint {
    constructor(private readonly url: string) {}

    async perform(cartId: string, shippingOption: string): Promise<Cart> {
        const requestBody: any = { 'option_id': shippingOption };
        const response: Response = await fetch(
            `${this.url}/store/carts/${cartId}/shipping-methods`, 
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