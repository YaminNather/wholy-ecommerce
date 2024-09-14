import { map } from "@/utils/scope_functions";
import { mapPaymentSessionApiResponseToModel, PaymentSession } from "./payment_session";
import { swapURLOrigin } from "@/utils/url_utils";
import URI from "urijs";
import { ServerEnvironmentVariables } from "@/environment_variables";

export interface Cart {
    id: string,
    items: LineItem[];
    email: string | null;
    shippingAddress: CartAddress | null;
    billingAddress: CartAddress | null;
    subtotal: number;
    total: number;
    taxTotal: number;
    discountTotal: number;
    discountTaxTotal: number;
    shippingMethod: CartShippingMethod | null;
    paymentSession: PaymentSession | null;
}

export interface CartAddress {
    firstName: string;
    lastName: string;
    phone: string;
    streetAddress0: string;
    streetAddress1: string;
    city: string;
    postalCode: string; 
    province: string;
}

export interface LineItem {
    id: string,
    title: string,
    subtitle?: string,
    thumbnail: string,
    quantity: number,
    productId: string,
    variantId: string,
    unitPrice: number;
}

export function mapCartApiResponseToModel(apiResponse: any, backendUrl: URI) {
    return {
        id: apiResponse['id'],
        items: (apiResponse['items'] as any[])
            .map(
                (element) => {
                    return {
                        id: element['id'],
                        productId: element['product_id'],
                        title: element['product_title'],
                        subtitle: element['product_subtitle'],
                        quantity: element['quantity'],
                        thumbnail: map(
                            element['thumbnail'] as string, 
                            (it) => swapURLOrigin(new URI(it), new URI(ServerEnvironmentVariables.backendUrl())).href()
                        ),
                        variantId: element['variant_id'],
                        unitPrice: element['unit_price'],
                    } as LineItem;
                }
            ),
        subtotal: apiResponse['subtotal'],
        total: apiResponse['total'],
        taxTotal: apiResponse['tax_total'],
        discountTotal: apiResponse['discount_total'],
        discountTaxTotal: apiResponse['discount_tax_total'],
        email: apiResponse['email'],
        shippingAddress: mapShippingAddressApiResponseToModel(apiResponse['shipping_address']),
        billingAddress: mapShippingAddressApiResponseToModel(apiResponse['billing_address']),
        shippingMethod: ((apiResponse['shipping_methods'] as any[]).length !== 0) ? 
            mapCartShippingMethodApiResponseToModel(apiResponse['shipping_methods'][0])
            : null,
        paymentSession: mapPaymentSessionApiResponseToModel(apiResponse['payment_session']),
    } as Cart;
}

function mapShippingAddressApiResponseToModel(apiResponse: any | undefined): CartAddress | null {
    if (!apiResponse) return null;
    
    return {
        firstName: apiResponse['first_name'],
        lastName: apiResponse['last_name'],
        phone: apiResponse['phone'],
        streetAddress0: apiResponse['address_1'],
        streetAddress1: apiResponse['address_2'],
        city: apiResponse['city'],
        postalCode: apiResponse['postal_code'],
        province: apiResponse['province']
    };
}

export interface CartShippingMethod {
    readonly id: string;
    readonly shippingOptionId: string;
    readonly orderId: string | undefined;
    readonly cartId: string | undefined;
    readonly subtotal: number;
    readonly taxTotal: number;
    readonly total: number;
}

function mapCartShippingMethodApiResponseToModel(apiResponse: any | undefined): CartShippingMethod | null {
    if (!apiResponse) return null;

    return {
        id: apiResponse['id'],
        shippingOptionId: apiResponse['shipping_option_id'],
        orderId: apiResponse['order_id'],
        cartId: apiResponse['cart_id'],
        subtotal: apiResponse['subtotal'],
        taxTotal: apiResponse['tax_total'],
        total: apiResponse['total'],
    };
}
