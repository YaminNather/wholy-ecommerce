import { BackendClient} from "@/app/backend_client/backend_client";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { Cart, LineItem } from "../backend_client/cart";
import { singleton } from "tsyringe";
import { CreateCartUseCase } from "./create_cart_use_case";

@singleton()
export class IncrementLineItemQuantityUseCase {
    constructor(
        private readonly backendClient: BackendClient,
        private readonly createCartUseCase: CreateCartUseCase,
        private readonly currentCartRepository: CurrentCartRepository,
    ) {}

    async increment(lineItemId: string, quantity: number): Promise<void> {
        let cartId: string | null = await this.currentCartRepository.getCurrentCart();
        if (cartId === null) {
            cartId = await this.createCartUseCase.create();
        }
        
        const cart: Cart = await this.backendClient.cart.getCart(cartId);
        const lineItem: LineItem = cart.items.find((e) => e.id === lineItemId)!;

        await this.backendClient.cart.updateLineItem(cartId, lineItemId, { quantity: lineItem.quantity + quantity });
    }
}