import { HttpError } from "@/app/backend_client/errors/HttpError";
import { mapShippingOptionApiResponseToModel, ShippingOption } from "../../models/shipping_option";

export class ListShippingOptionsEndpoint {
    constructor(private readonly url: string) { }

    async perform(cartId: string): Promise<ShippingOption[]> {
        const response: Response = await fetch(`${this.url}/store/shipping-options/${cartId}`);
        if (HttpError.isResponseError(response)) throw new HttpError(response);
        
        const responseBody: any = await response.json();
        
        return (responseBody['shipping_options'] as any[])
            .map((e) => mapShippingOptionApiResponseToModel(e));
    }
}