import { singleton } from "tsyringe";
import { CurrentCartRepository } from "../current_cart_repository/current_cart_repository";
import { BackendClient } from "../backend_client/backend_client";
import { Cart, ShippingOption } from "../backend_client/cart";

@singleton()
export class SetCartShippingMethodUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) {}

    async setShippingMethod(): Promise<Cart> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error(`Cart does not exist`);
        
        const shippingOptions: ShippingOption[] = await this.backendClient.cart.listShippingOptions(cartId);
        return await this.backendClient.cart.setShippingMethod(cartId, shippingOptions[0].id);
    }
}