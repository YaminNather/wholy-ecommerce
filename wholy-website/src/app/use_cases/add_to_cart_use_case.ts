import { singleton } from "tsyringe";

import { BackendClient } from "@/app/backend_client/backend_client"
import { CreateCartUseCase } from "./create_cart_use_case";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";

@singleton()
export class AddToCartUseCase {
    constructor(
        private readonly backendClient: BackendClient, 
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly createCartUseCase: CreateCartUseCase,
    ) {}

    async add(productId: string, quantity: number): Promise<void> {
        if (!await this.currentCartRepository.cartExists()) {
            await this.createCartUseCase.create();
        }

        let cartId: string = (await this.currentCartRepository.getCurrentCart())!;
        await this.backendClient.cart.addToCart(cartId, productId, quantity);
    }
}