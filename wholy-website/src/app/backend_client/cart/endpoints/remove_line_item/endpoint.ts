export class RemoveLineItemEndpoint {
    constructor(private readonly url: string) { }

    async perform(cartId: string, lineItemId: String): Promise<void> {
        await fetch(`${this.url}/store/carts/${cartId}/line-items/${lineItemId}`, {method: 'DELETE'});
    }
}