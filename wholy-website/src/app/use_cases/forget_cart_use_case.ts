import { singleton } from "tsyringe";
import { CurrentCartRepository } from "../current_cart_repository/current_cart_repository";

@singleton()
export class ForgetCartUseCase {
    constructor(private readonly currentCartRepository: CurrentCartRepository) {}

    async forget(): Promise<void> {
        await this.currentCartRepository.removeCurrentCart();
    }
}