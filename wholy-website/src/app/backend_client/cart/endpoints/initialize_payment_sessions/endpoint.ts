import { HttpError } from "@/app/backend_client/errors/HttpError";
import { Cart } from "../../models";
import { mapCartApiResponseToModel } from "../../models/cart";
import URI from "urijs";

export class InitializePaymentSessionsEndpoint {
    constructor(private readonly url: string) { }

    async perform(cartId: string): Promise<Cart> {
        const response: Response = await fetch(`${this.url}/store/carts/${cartId}/payment-sessions`, { method: 'POST' });
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        return mapCartApiResponseToModel(responseBody['cart'], new URI(this.url));
    }
}