export interface Order {
    readonly id: string;
}

export function mapOrderApiResponseToModel(apiResponse: any): Order {
    return {
        id: apiResponse['id']
    };
}