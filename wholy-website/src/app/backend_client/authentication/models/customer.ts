export interface Customer {
    readonly id: string;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly phone: string | null;
    readonly hasAccount: boolean;
}

export function mapCustomerApiResponseToModel(apiResponse: any): Customer {
    return {
        id: apiResponse['id'],
        email: apiResponse['email'],
        firstName: apiResponse['first_name'],
        lastName: apiResponse['last_name'],
        phone: apiResponse['phone'] ?? null,
        hasAccount: apiResponse['has_account'],
    };
} 