import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";
import { singleton } from "tsyringe";
import { Cart } from "../backend_client/cart";

@singleton()
export class InitializeCartPaymentSessionUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) {}

    async initialize(): Promise<Cart> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (!cartId) throw new Error('Cart does not exist');
        
        await this.backendClient.cart.initializePaymentSessions(cartId);
        return await this.backendClient.cart.selectPaymentSession(cartId, 'stripe');
    }
}