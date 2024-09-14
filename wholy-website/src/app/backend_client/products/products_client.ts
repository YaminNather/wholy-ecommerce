import { GetProductWithIdEndpoint, GetProductWithIdEndpointResponse } from "./endpoints/get_product_with_id/endpoint";
import { ListProductsEndpoint, ListProductsEndpointOptions, ListProductsEndpointResponse } from "./endpoints/list_products/endpoint";

export class ProductsBackendClient {
    constructor(url: string) {
        this.listProductsEndpoint = new ListProductsEndpoint(url);
        this.getProductWithIdEndpoint = new GetProductWithIdEndpoint(url);
    }

    list(options: ListProductsEndpointOptions): Promise<ListProductsEndpointResponse> {
        return this.listProductsEndpoint.perform(options);
    }
    
    getWithId(id: String): Promise<GetProductWithIdEndpointResponse> {
        return this.getProductWithIdEndpoint.perform(id);
    }

    
    
    private readonly listProductsEndpoint: ListProductsEndpoint;
    private readonly getProductWithIdEndpoint: GetProductWithIdEndpoint;
}