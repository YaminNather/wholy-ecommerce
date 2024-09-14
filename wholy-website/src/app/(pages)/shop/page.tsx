import 'reflect-metadata';

import { ProductsBackendClient } from "@/app/backend_client/products";
import { UseClientShopPage } from "./use_client_page";
import { BackendClient } from "@/app/backend_client/backend_client";
import { ServerSideProduct } from "./server_side_product";

export default async function ShopPage() {
  let productsClient: ProductsBackendClient = new BackendClient().products;
  
  let products: ServerSideProduct[] = (await productsClient.list({})).products
    .map(
      (element) => ({
        id: element.variantId,
        name: element.title,
        handleName: element.handle,
        price: `₹${(element.price / 100).toString()}`,
      })
    );

  return <UseClientShopPage products={products} />
}