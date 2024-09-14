import { ServerEnvironmentVariables } from "@/environment_variables";
import { swapURLOrigin } from "@/utils/url_utils";
import URI from "urijs";

export interface Product {
    readonly productId: string,
    readonly title: string;
    readonly subtitle?: string;
    readonly description: string;
    readonly handle: string;
    readonly images: string[];
    readonly thumbnail: string;
    readonly price: number;
    readonly variantId: string;
}

export function mapProductFromApiResponse(apiResponse: any, backendUrl: URI): Product {
    return {
        productId: apiResponse['id'],
        title: apiResponse['title'],
        subtitle: apiResponse['subtitle'],
        description: apiResponse['description'],
        handle: apiResponse['handle'],
        images: (apiResponse['images'] as any[])
            .map((element) => new URI(element['url'] as string))
            .map((element) => swapURLOrigin( element, new URI(ServerEnvironmentVariables.backendUrl()) ).href()),
        thumbnail: apiResponse['thumbnail'],
        price: (apiResponse['variants'] as any[])[0]['prices'][0]['amount'],
        variantId: apiResponse['variants'][0]['id'],
    };
}