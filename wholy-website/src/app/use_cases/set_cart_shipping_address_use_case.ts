import { singleton } from "tsyringe";
import { CurrentCartRepository } from "../current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";
import { Cart, UpdateCartEndpointOptionsAddress } from "../backend_client/cart";

@singleton()
export class SetCartShippingAddressUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
    ) { }
    
    async setShippingAddress(address: UpdateCartEndpointOptionsAddress): Promise<Cart> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error('Cart does not exist'); 
        
        return await this.backendClient.cart.updateCart(cartId, {shippingAddress: address, billingAddress: address});
    }
}