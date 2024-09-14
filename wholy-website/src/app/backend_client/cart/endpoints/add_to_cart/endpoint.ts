export class AddToCartEndpoint {
    constructor(url: string) {
        this.url = url;
    }

    async perform(cartId: string, productId: String, quantity: number): Promise<void> {
        let requestBody: any = {
            'variant_id': productId,
            'quantity': quantity,
            'metadata': {}
        };
        
        await fetch(
            `${this.url}/store/carts/${cartId}/line-items`, 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(requestBody),
            }
        );
    }

    private readonly url: string;
}