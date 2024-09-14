export class AddToLineItemEndpoint {
    public constructor(private readonly url: string) { }

    async perform(cartId: string, lineItemId: string, quantity: string): Promise<void> {
        let requestBody: any = {
            quantity: quantity
        };

        await fetch(
            `${this.url}/store/carts/${cartId}/line-items/${lineItemId}`, 
            {
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            }
        );
    }
}