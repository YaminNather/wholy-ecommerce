import URI from "urijs";
import { Cart, mapCartApiResponseToModel } from "../../models/cart";

export class GetCartEndpoint {
    constructor(private readonly url: string) { }

    async perform(id: string): Promise<Cart> {
        let url: URL = new URL(`${this.url}/store/carts/${id}`);
        // url.searchParams.set('fields', '+items.thumbnail');

        let response: Response = await fetch(url.toString());
        let responseBody: any = await response.json();
        
        return mapCartApiResponseToModel(responseBody['cart'], new URI(this.url));
    } 
}