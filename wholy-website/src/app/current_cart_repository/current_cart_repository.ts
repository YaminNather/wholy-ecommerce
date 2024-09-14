import { singleton } from "tsyringe";

@singleton()
export class CurrentCartRepository {
    async getCurrentCart(): Promise<string | null> {
        return sessionStorage.getItem(CurrentCartRepository.key);
    }

    async setCurrentCart(cartId: string): Promise<void> {
        sessionStorage.setItem(CurrentCartRepository.key, cartId);
    }

    async removeCurrentCart(): Promise<void> {
        sessionStorage.removeItem(CurrentCartRepository.key);
    }

    async cartExists(): Promise<boolean> {
        return sessionStorage.getItem(CurrentCartRepository.key) !== null;
    }
    

    private static readonly key: string = 'cart_id';
}