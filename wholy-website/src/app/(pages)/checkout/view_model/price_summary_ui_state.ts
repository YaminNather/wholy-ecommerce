export interface PriceSummaryUiState {
    readonly isOpen: boolean;
    readonly subtotal: string;
    readonly couponDiscount: string | null;
    readonly originalShipping: string | null;
    readonly discountedShipping: string | null;
    readonly total: string;
}

export function defaultPriceSummary(): PriceSummaryUiState {
    return {
        isOpen: false,
        subtotal: `₹${0}`,
        couponDiscount: null,
        originalShipping: 'TBC',
        discountedShipping: null,
        total: 'TBC',
    };
}