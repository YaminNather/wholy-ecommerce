export interface PaymentSession {
    readonly id: string;
    readonly providerId: string;
    readonly amount: number;
    readonly status: string;
    readonly isSelected: boolean;
    readonly data: any;
}

export interface StripePaymentSessionData {
    readonly id: string;
    readonly clientSecret: string | undefined;
}

export interface PaymentIntentData {
    readonly id: string;
    readonly clientSecret: string;
}

export function mapPaymentSessionApiResponseToModel(apiResponse: any | undefined): PaymentSession | null {
    if (!apiResponse) return null;
    
    const providerId: string = apiResponse['provider_id'];

    return {
        id: apiResponse['id'],
        providerId: providerId,
        amount: apiResponse['amount'],
        status: apiResponse['status'],
        isSelected: apiResponse['is_selected'],
        data: mapDataApiResponseToModel(providerId, apiResponse['data']),
    };
}

function mapDataApiResponseToModel(providerId: string, apiResponse: any): any {
    if (providerId === 'stripe') {
        return {
            id: apiResponse['id'],
            clientSecret: apiResponse['client_secret'],
        } as StripePaymentSessionData;
    }
    else if (providerId === 'manual') {
        return null;
    }
}