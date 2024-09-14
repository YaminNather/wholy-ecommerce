import URI from "urijs";
import { Cart, mapCartApiResponseToModel } from "../../models/cart";

export class UpdateCartEndpoint {
    constructor(private readonly url: string) { }

    async perform(cartId: string, options: UpdateCartEndpointOptions): Promise<Cart> {
        let requestBody: any = {
            'email': options.email,
            'shipping_address': this.mapShippingAddressToRequestBody(options.shippingAddress),
            'billing_address': this.mapShippingAddressToRequestBody(options.shippingAddress),
        };
        let response: Response = await fetch(
            `${this.url}/store/carts/${cartId}`,
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(requestBody),
            }
        );
        
        let responseBody: any = await response.json();
        return mapCartApiResponseToModel(responseBody['cart'], new URI(this.url));
    }
    
    private mapShippingAddressToRequestBody(optionModel: UpdateCartEndpointOptionsAddress | undefined): any | undefined {
        if (!optionModel) return undefined;

        return {
            'first_name': optionModel.firstName,
            'last_name': optionModel.lastName,
            'phone': optionModel.phoneNumber,
            'address_1': optionModel.streetAddress0,
            'address_2': optionModel.streetAddress1,
            'city': optionModel.city,
            'postal_code': optionModel.postalCode,
            'province': optionModel.province,
            'country_code': optionModel.countryCode,
        };      
    }
}

export interface UpdateCartEndpointOptions {
    readonly email?: string;
    readonly shippingAddress?: UpdateCartEndpointOptionsAddress;
    readonly billingAddress?: UpdateCartEndpointOptionsAddress;
}

export interface UpdateCartEndpointOptionsAddress {
    readonly firstName: string;
    readonly lastName: string;
    readonly phoneNumber: string;
    readonly streetAddress0: string;
    readonly streetAddress1: string;
    readonly city: string;
    readonly province: string;
    readonly postalCode: string;
    readonly countryCode: string;
}