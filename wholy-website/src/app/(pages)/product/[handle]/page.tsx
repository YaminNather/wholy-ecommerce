import 'reflect-metadata';

import { BackendClient } from "@/app/backend_client/backend_client";
import { ProductsBackendClient, Product } from "@/app/backend_client/products";

import UseClientProductPage from "./client_page";

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const productsClient: ProductsBackendClient = new BackendClient().products;
  const product: Product = (await productsClient.list({handle: params.handle})).products[0];
  
  console.log(`CustomLog: Product queried: ${product.images}`);

  return <UseClientProductPage id={product.variantId} name={product.title} price={product.price} images={product.images} />;
}