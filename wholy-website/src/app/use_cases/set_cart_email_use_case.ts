import { singleton } from "tsyringe";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";
import { Cart } from "../backend_client/cart";

@singleton()
export class SetCartEmailUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) {}

    async setEmail(email: string): Promise<Cart> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error('Cart does not exist'); 
        
        return await this.backendClient.cart.updateCart(cartId, {email: email});
    }
}