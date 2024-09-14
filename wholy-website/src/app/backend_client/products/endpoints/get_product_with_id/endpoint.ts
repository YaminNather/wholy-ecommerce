import URI from "urijs";
import { mapProductFromApiResponse, Product } from "../../models/product";

export interface GetProductWithIdEndpointResponse {
    readonly product: Product;
}

export class GetProductWithIdEndpoint {
    public constructor(private readonly url: string) { }

    async perform(id: String): Promise<GetProductWithIdEndpointResponse> {
        let response: Response = await fetch(`${this.url}/store/products/${id}`);
        let responseBody: any = await response.json();
        
        return {
            product: mapProductFromApiResponse(responseBody['product'], new URI(this.url)),
        };
    }
}