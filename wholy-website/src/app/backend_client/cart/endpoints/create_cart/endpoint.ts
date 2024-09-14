export class CreateCartEndpoint {
    constructor(private readonly backendUrl: string) { }

    async perform(): Promise<string> {
        let response: Response = await fetch(`${this.backendUrl}/store/carts`, { method: "POST" });
        
        let responseBody: any = await response.json();
        return responseBody['cart']['id'];
    }
}