import { singleton } from "tsyringe";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";

@singleton()
export class RemoveFromCartUseCase {
    constructor(
        private readonly backendClient: BackendClient,
        private readonly currentCartRepository: CurrentCartRepository,
    ) {}

    async remove(productId: string, quantity: number): Promise<void> {
        let cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error("Cannot remove from cart that does not exist");
        
        await this.backendClient.cart.addToCart(cartId, productId, quantity);
    }
}