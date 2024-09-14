export interface AddressUiState {
    readonly streetAddress0FieldValue: string;
    readonly streetAddress1FieldValue: string;
    readonly cityFieldValue: string;
    readonly pincodeFieldValue: string;
    readonly stateFieldValue: string;
}

export function defaultAddress(): AddressUiState {
    return {
        streetAddress0FieldValue: "",
        streetAddress1FieldValue: "",
        cityFieldValue: "",
        pincodeFieldValue: "",
        stateFieldValue: "Tamil Nadu",
    };
} 