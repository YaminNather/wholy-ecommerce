import { singleton } from "tsyringe";
import { BackendClient } from "../backend_client/backend_client";
import { CurrentCartRepository } from "../current_cart_repository/current_cart_repository";

@singleton()
export class CreateCartUseCase {
    constructor(
        private readonly backendClient: BackendClient,
        private readonly currentCartRepository: CurrentCartRepository,
    ) {}

    async create(): Promise<string> {
        let cartId: string = await this.backendClient.cart.createCart();
        await this.currentCartRepository.setCurrentCart(cartId);
        
        return cartId;
    }
}