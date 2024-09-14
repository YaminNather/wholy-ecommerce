export interface ShippingOption {
    readonly id: string;
}

export function mapShippingOptionApiResponseToModel(apiResponse: any): ShippingOption {
    return {
        id: apiResponse['id']
    };
}