import { BackendClient} from "@/app/backend_client/backend_client";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { Cart, LineItem } from "../backend_client/cart";
import { singleton } from "tsyringe";

@singleton()
export class DecrementLineItemQuantityUseCase {
    constructor(
        private readonly backendClient: BackendClient,
        private readonly currentCartRepository: CurrentCartRepository,
    ) {}

    async decrement(lineItemId: string, quantity: number): Promise<void> {
        const cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) throw new Error("Cart does not exist");
        
        const cart: Cart = await this.backendClient.cart.getCart(cartId);
        const lineItem: LineItem = cart.items.find((e) => e.id === lineItemId)!;

        if (lineItem.quantity - quantity > 0) {
            await this.backendClient.cart.updateLineItem(cartId, lineItemId, { quantity: lineItem.quantity - quantity });
        }
        else {
            await this.backendClient.cart.removeLineItem(cartId, lineItemId);
        }
    }
}