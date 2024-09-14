import { singleton } from "tsyringe";

import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";
import { Cart } from "@/app/backend_client/cart";
import { HttpError } from "@/app/backend_client/errors/HttpError";

@singleton()
export class CreateCartStripePaymentIntentUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) { }

    async create(): Promise<string> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error("No cart available");
        
        const cart: Cart = await this.backendClient.cart.getCart(cartId);
        
        const requestBody: any = { 'amount': cart.total };
        const response: Response = await fetch('/api/stripe/payment-intents', {method: 'POST', body: JSON.stringify(requestBody)});
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        
        const metadata: any = {
            'payment_intent': { 
                'id': responseBody['id'], 
                'client_secret': responseBody['client_secret'] 
            },
        };
        
        await this.backendClient.cart.updatePaymentSessionData(cart.id, cart.paymentSession!.providerId, metadata);
        
        return responseBody['client_secret'];
    }
}