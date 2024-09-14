import { container } from "tsyringe";

import { Cart, CartAddress } from "@/app/backend_client/cart";
import { useMemo, useState } from "react";
import { ContactDetailsUiState, defaultContactDetails, isContactDetailsFilled } from "./contact_details_ui_state";
import { AddressUiState, defaultAddress } from "./address_ui_state";
import { defaultPriceSummary, PriceSummaryUiState } from "./price_summary_ui_state";
import { CartLineItemUiState, mapCartLineItemToUiState } from "./cart_line_item_ui_state";

import { GetCartUseCase } from "@/app/use_cases/get_cart_use_case";
import { SetCartEmailUseCase } from "@/app/use_cases/set_cart_email_use_case";
import { SetCartShippingAddressUseCase } from "@/app/use_cases/set_cart_shipping_address_use_case";
import { SetCartShippingMethodUseCase } from "@/app/use_cases/set_cart_shipping_method_use_case";
import { InitializeCartPaymentSessionUseCase } from "@/app/use_cases/initialize_cart_payment_session";
import { StripePaymentSessionData } from "@/app/backend_client/cart/models/payment_session";

export function useViewModel(): CheckoutPageViewModel {
    const getCartUseCase: GetCartUseCase = useMemo(() => container.resolve(GetCartUseCase), []);
    const setCartEmailUseCase: SetCartEmailUseCase = useMemo(() => container.resolve(SetCartEmailUseCase), []);
    const setCartShippingAddressUseCase: SetCartShippingAddressUseCase = useMemo(() => container.resolve(SetCartShippingAddressUseCase), []);
    const setCartShippingMethodUseCase: SetCartShippingMethodUseCase = useMemo(() => container.resolve(SetCartShippingMethodUseCase), []);
    const initializePaymentSessionUseCase: InitializeCartPaymentSessionUseCase = useMemo(() => container.resolve(InitializeCartPaymentSessionUseCase), []);
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [contactDetails, setContactDetails] = useState<ContactDetailsUiState>(defaultContactDetails());
    const [address, setAddress] = useState<AddressUiState>(defaultAddress());
    
    const [couponCodeFieldValue, setCouponCodeFieldValue] = useState<string>("");
    const [appliedCoupon, setAppliedCouponCode] = useState<string | null>(null);
    
    const [cartLineItems, setCartLineItems] = useState<CartLineItemUiState[]>([]);
    const [priceSummary, setPriceSummary] = useState<PriceSummaryUiState>(defaultPriceSummary());
    
    const [alerts, setAlerts] = useState<string[]>([]);
    
    const [isConfirmAndPayButtonEnabled, setIsConfirmAndPayButtonEnabled] = useState<boolean>(false);
    
    const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);
    const [navigatingToOrderConfirmationPage, setNavigatingToOrderConfirmationPage] = useState<string | null>(null);
    
    
    return {
        isLoading,
        
        contactDetails,
        address,
        
        couponCodeFieldValue,
        appliedCoupon,
        
        cartLineItems,
        priceSummary,
        
        alerts,
        
        paymentClientSecret: paymentClientSecret,
        
        
        navigatingToOrderConfirmationPage,
        pageOpened: async () => {
            const cart: Cart = (await getCartUseCase.getCart())!;
            setCartLineItems( cart.items.map((e) => mapCartLineItemToUiState(e)) );

            const shippingAddress: CartAddress | null = cart.shippingAddress;
            if (shippingAddress) {
                setContactDetails(
                    (contactDetails) => {
                       return {
                            ...contactDetails,
                            firstNameFieldValue: shippingAddress.firstName,
                            lastNameFieldValue: shippingAddress.lastName,
                            phoneNumberFieldValue: shippingAddress.phone,
                        }; 
                    }
                );

                const addressUiState: AddressUiState = {
                    streetAddress0FieldValue: shippingAddress.streetAddress0,
                    streetAddress1FieldValue: shippingAddress.streetAddress1,
                    cityFieldValue: shippingAddress.city,
                    pincodeFieldValue: shippingAddress.postalCode,
                    stateFieldValue: shippingAddress.province,
                };
                setAddress(addressUiState);
            }

            if (cart.email) {
                setContactDetails( (value) => ({ ...value, emailFieldValue: cart.email! }) );
            }

            setPriceSummary(
                (value) => {
                    return {
                        ...value,
                        subtotal: (cart.subtotal / 100).toString(),
                        total: (cart.total / 100).toString(),
                    };
                }
            );
            
            setIsConfirmAndPayButtonEnabled(cart.email !== null && cart.shippingAddress !== null);
            
            setIsLoading(false);
        },

        firstNameFieldValueChanged: (value) => {
            setContactDetails({...contactDetails, firstNameFieldValue: value});
        },
        lastNameFieldValueChanged: (value) => {
            setContactDetails({...contactDetails, lastNameFieldValue: value});
        },
        emailFieldValueChanged: (value) => {
            setContactDetails({...contactDetails, emailFieldValue: value});
        },
        phoneNumberFieldValueChanged: (value) => {
            setContactDetails({...contactDetails, phoneNumberFieldValue: value});
        },

        streetAddress0FieldValueChanged: (value) => {
            setAddress({...address, streetAddress0FieldValue: value});
        },
        streetAddress1FieldValueChanged: (value) => {
            setAddress({...address, streetAddress1FieldValue: value});
        },
        cityFieldValueChanged: (value) => {
            setAddress({...address, cityFieldValue: value});
        },
        pincodeFieldValueChanged: (value) => {
            setAddress({...address, pincodeFieldValue: value});
        },
        stateFieldValueChanged: (value) => {
            setAddress({...address, stateFieldValue: value});
        },

        isUpdateInformationButtonEnabled: true,
        updateInformationButtonClicked: async () => {
            if (!isContactDetailsFilled(contactDetails)) {
                setAlerts((value) => [...value, "Fill all fields first"]);
            }

            setIsLoading(true);
            
            await setCartEmailUseCase.setEmail(contactDetails.emailFieldValue);

            await setCartShippingAddressUseCase.setShippingAddress({
                firstName: contactDetails.firstNameFieldValue,
                lastName: contactDetails.lastNameFieldValue,
                phoneNumber: contactDetails.phoneNumberFieldValue,
                streetAddress0: address.streetAddress0FieldValue,
                streetAddress1: address.streetAddress1FieldValue,
                city: address.cityFieldValue,
                postalCode: address.pincodeFieldValue,
                province: address.stateFieldValue,
                countryCode: "in"
            });
            
            const cart: Cart = await setCartShippingMethodUseCase.setShippingMethod();

            setIsLoading(false);
            setAlerts((value) => [...value, "Updated successfully"]);
            setIsConfirmAndPayButtonEnabled(cart.email !== null && cart.shippingAddress !== null);
        },
    
        couponCodeFieldValueChanged: (value) => setCouponCodeFieldValue(value),
        applyCouponCodeButtonClicked: () => { },
        
        isConfirmAndPayButtonEnabled: isConfirmAndPayButtonEnabled,
        confirmAndPayButtonClicked: async () => {
            setIsLoading(true);

            let cart: Cart = (await getCartUseCase.getCart()) as Cart;
            if (!cart.paymentSession) {
                cart = await initializePaymentSessionUseCase.initialize();
            }

            let paymentSessionData: StripePaymentSessionData = cart.paymentSession!.data as StripePaymentSessionData;
            setPaymentClientSecret(paymentSessionData.clientSecret!);
        },
        
        receivedPaymentStatus: (status) => {
            setPaymentClientSecret(null);
            setIsLoading(false);
            
            if (status === 'failed') {
                setAlerts((value) => [...value, 'Payment failed']);
                return;
            }
            
            setAlerts((value) => [...value, 'Payment success']);
            setNavigatingToOrderConfirmationPage(status);
        },

        alertDisplayed: () => {
            setAlerts((value) => value.slice(1, value.length));
        }
    };
}

export interface CheckoutPageViewModel {
    readonly isLoading: boolean;
    readonly contactDetails: ContactDetailsUiState;
    readonly address: AddressUiState;
    
    readonly couponCodeFieldValue: string;
    readonly appliedCoupon: string | null;
    
    readonly cartLineItems: CartLineItemUiState[];
    readonly priceSummary: PriceSummaryUiState;
    
    readonly alerts: string[];
    
    readonly paymentClientSecret: string | null;
    
    readonly navigatingToOrderConfirmationPage: string | null;

    readonly pageOpened: () => void;

    readonly firstNameFieldValueChanged: (value: string) => void;
    readonly lastNameFieldValueChanged: (value: string) => void;
    readonly emailFieldValueChanged: (value: string) => void;
    readonly phoneNumberFieldValueChanged: (value: string) => void;

    readonly streetAddress0FieldValueChanged: (value: string) => void;
    readonly streetAddress1FieldValueChanged: (value: string) => void;
    readonly cityFieldValueChanged: (value: string) => void;
    readonly pincodeFieldValueChanged: (value: string) => void;
    readonly stateFieldValueChanged: (value: string) => void;
    
    readonly isUpdateInformationButtonEnabled: boolean;
    readonly updateInformationButtonClicked: () => void;
    
    readonly couponCodeFieldValueChanged: (value: string) => void;
    readonly applyCouponCodeButtonClicked: () => void;
    
    readonly isConfirmAndPayButtonEnabled: boolean;
    readonly confirmAndPayButtonClicked: () => void;
    readonly receivedPaymentStatus: (status: 'succeeded' | 'failed') => void;
    
    readonly alertDisplayed: () => void;
}