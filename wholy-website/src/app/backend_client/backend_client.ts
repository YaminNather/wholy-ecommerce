import { singleton } from "tsyringe";
import { CartClient as CartBackendClient } from "./cart/cart_client";
import { ProductsBackendClient } from "./products/products_client";
import { AuthenticationClient } from "./authentication/authentication_client";
import { ClientEnvironmentVariables, ServerEnvironmentVariables } from "@/environment_variables";

@singleton()
export class BackendClient {
    readonly products: ProductsBackendClient = new ProductsBackendClient(BackendClient.url);
    readonly cart: CartBackendClient = new CartBackendClient(BackendClient.url);
    readonly authentication: AuthenticationClient = new AuthenticationClient(BackendClient.url);
    
    private static readonly url: string = (typeof(window) === "undefined") ? ServerEnvironmentVariables.backendUrl() : ClientEnvironmentVariables.clientBackendUrl();
}