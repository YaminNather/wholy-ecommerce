import { singleton } from "tsyringe";
import { Cart } from "../backend_client/cart";
import { CurrentCartRepository } from "../current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";

@singleton()
export class GetCartUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) { }

    async getCart(): Promise<Cart | null> {
        let cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) return null;
        
        return await this.backendClient.cart.getCart(cartId);
    }
}