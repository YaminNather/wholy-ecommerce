// import querystring from "node:querystring";
import URI from "urijs";
import { mapProductFromApiResponse, Product } from "../../models/product";

export interface ListProductsEndpointOptions {
    readonly handle?: string;
}

export interface ListProductsEndpointResponse {
    readonly limit: number;
    readonly offset: number;
    readonly count: number;
    readonly products: Product[];
}

export class ListProductsEndpoint {
    constructor(url: string) {
        console.log(`CustomLog: Url = ${url}`);
        this.url = url;
    }

    public async perform(options: ListProductsEndpointOptions): Promise<ListProductsEndpointResponse> {
        let url: URL = new URL(`${this.url}/store/products`);
        // url.searchParams.set('region_id', 'reg_01J61K42GTT0XPH9Q92VNC3TT9');
        if (options.handle !== undefined) url.searchParams.set('handle', options.handle);

        const response: Response = await fetch(url.toString());
        const responseBody: any = await response.json();
        
        return {
            limit: responseBody['limit'],
            offset: responseBody['offset'],
            count: responseBody['count'],
            products: (responseBody['products'] as any[]).map((element) => mapProductFromApiResponse(element, new URI(this.url))),
        };
    }
    

    private readonly url: string;
}