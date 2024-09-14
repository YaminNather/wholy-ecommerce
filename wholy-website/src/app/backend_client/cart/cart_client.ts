import { Cart } from "./models/cart";

import { GetCartEndpoint } from "./endpoints/get_cart/endpoint";
import { UpdateLineItemEndpoint, UpdateLineItemOptions } from "./endpoints/update_line_item/endpoint";
import { UpdateCartEndpoint, UpdateCartEndpointOptions } from "./endpoints/update_cart/endpoint";
import { ShippingOption } from "./models/shipping_option";
import { AddToCartEndpoint } from "./endpoints/add_to_cart/endpoint";
import { RemoveLineItemEndpoint } from "./endpoints/remove_line_item/endpoint";
import { CreateCartEndpoint } from "./endpoints/create_cart/endpoint";
import { ListShippingOptionsEndpoint } from "./endpoints/list_shipping_options/endpoint";
import { SetShippingMethodEndpoint } from "./endpoints/set_shipping_method/endpoint";
import { InitializePaymentSessionsEndpoint } from "./endpoints/initialize_payment_sessions/endpoint";
import { UpdatePaymentSessionMetadataEndpoint as UpdatePaymentSessionDataEndpoint } from "./endpoints/update_payment_session_data/endpoint";
import { SelectPaymentSessionEndpoint } from "./endpoints/select_payment_session/endpoint";
import { Order } from "../order/models/order";
import { CompleteCartEndpoint } from "./endpoints/complete_cart/endpoint";

export class CartClient {
    constructor(url: string) {
        this.addToCartEndpoint = new AddToCartEndpoint(url);
        this.removeLineItemEndpoint = new RemoveLineItemEndpoint(url);
        this.updateLineItemEndpoint = new UpdateLineItemEndpoint(url);
        this.updateCartEndpoint = new UpdateCartEndpoint(url);
        this.getCartEndpoint = new GetCartEndpoint(url);
        this.createCartEndpoint = new CreateCartEndpoint(url);
        this.listShippingOptionsEndpoint = new ListShippingOptionsEndpoint(url);
        this.setShippingMethodEndpoint = new SetShippingMethodEndpoint(url);
        this.initializePaymentSessionsEndpoint = new InitializePaymentSessionsEndpoint(url);
        this.updatePaymentSessionDataEndpoint = new UpdatePaymentSessionDataEndpoint(url);
        this.selectPaymentSessionEndpoint = new SelectPaymentSessionEndpoint(url);
        this.completeCartEndpoint = new CompleteCartEndpoint(url);
    }
    
    createCart(): Promise<string> {
        return this.createCartEndpoint.perform();
    }

    addToCart(cartId: string, productId: string, quantity: number): Promise<void> { 
        return this.addToCartEndpoint.perform(cartId, productId, quantity);
    }
    
    getCart(cartId: string): Promise<Cart> {
        return this.getCartEndpoint.perform(cartId);
    }
    
    updateCart(cartId: string, options: UpdateCartEndpointOptions): Promise<Cart> {
        return this.updateCartEndpoint.perform(cartId, options);
    }

    updateLineItem(cartId: string, lineItemId: string, options?: UpdateLineItemOptions): Promise<void> {
        return this.updateLineItemEndpoint.perform(cartId, lineItemId, options);
    }

    removeLineItem(cartId: string, lineItemId: String): Promise<void> {
        return this.removeLineItemEndpoint.perform(cartId, lineItemId);
    }

    listShippingOptions(cartId: string): Promise<ShippingOption[]> {
        return this.listShippingOptionsEndpoint.perform(cartId);
    }

    setShippingMethod(cartId: string, shippingOption: string): Promise<Cart> {
        return this.setShippingMethodEndpoint.perform(cartId, shippingOption);
    }

    initializePaymentSessions(cartId: string): Promise<Cart> {
        return this.initializePaymentSessionsEndpoint.perform(cartId);
    }
    
    selectPaymentSession(cartId: string, providerId: string): Promise<Cart> {
        return this.selectPaymentSessionEndpoint.perform(cartId, providerId);
    }
    
    updatePaymentSessionData(cartId: string, providerId: string, data: any): Promise<Cart> {
        return this.updatePaymentSessionDataEndpoint.perform(cartId, providerId, data);
    }
    
    completeCart(cartId: string): Promise<Order> {
        return this.completeCartEndpoint.perform(cartId);
    }


    private readonly createCartEndpoint: CreateCartEndpoint;
    private readonly addToCartEndpoint: AddToCartEndpoint;
    private readonly getCartEndpoint: GetCartEndpoint;
    private readonly updateCartEndpoint: UpdateCartEndpoint;
    private readonly updateLineItemEndpoint: UpdateLineItemEndpoint;
    private readonly removeLineItemEndpoint: RemoveLineItemEndpoint;
    private readonly listShippingOptionsEndpoint: ListShippingOptionsEndpoint;
    private readonly setShippingMethodEndpoint: SetShippingMethodEndpoint;
    private readonly initializePaymentSessionsEndpoint: InitializePaymentSessionsEndpoint;
    private readonly selectPaymentSessionEndpoint: SelectPaymentSessionEndpoint;
    private readonly updatePaymentSessionDataEndpoint: UpdatePaymentSessionDataEndpoint;
    private readonly completeCartEndpoint: CompleteCartEndpoint;
}