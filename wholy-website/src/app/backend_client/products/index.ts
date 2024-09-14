import { ProductsBackendClient } from "./products_client";
export { ProductsBackendClient };

import { Product } from "./models";
export type { Product };

import type { ListProductsEndpointOptions, ListProductsEndpointResponse } from "./endpoints/list_products/endpoint";
import type { GetProductWithIdEndpointResponse } from "./endpoints/get_product_with_id/endpoint";
export type {
    ListProductsEndpointOptions, ListProductsEndpointResponse,
    GetProductWithIdEndpointResponse as GetProductEndpointResponse,
};
