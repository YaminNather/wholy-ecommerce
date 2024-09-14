import { singleton } from "tsyringe";
import { CurrentCartRepository } from "@/app/current_cart_repository/current_cart_repository";
import { BackendClient } from "@/app/backend_client/backend_client";
import { Order } from "@/app/backend_client/order";
import { ForgetCartUseCase } from "./forget_cart_use_case";

@singleton()
export class CompleteCartUseCase {
    constructor(
        private readonly currentCartRepository: CurrentCartRepository,
        private readonly backendClient: BackendClient,
        
        private readonly forgetCartUseCase: ForgetCartUseCase,
    ) {}

    async complete(): Promise<Order> {
        const cartId: string | null = (await this.currentCartRepository.getCurrentCart()) as string;
        const order: Order = await this.backendClient.cart.completeCart(cartId);
        
        this.forgetCartUseCase.forget();
        
        return order;
    }
}