export interface UpdateLineItemOptions {
    readonly quantity?: number; 
}

export class UpdateLineItemEndpoint {
    constructor(private readonly url: string) { }

    async perform(cartId: string, lineItemId: string, options?: UpdateLineItemOptions): Promise<void> {
        let requestBody: any = {};
        if (options !== undefined) {
            if (options.quantity !== undefined) requestBody = { ...requestBody, 'quantity': options.quantity };
        }

        await fetch(
            `${this.url}/store/carts/${cartId}/line-items/${lineItemId}`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            }
        );
    }
}