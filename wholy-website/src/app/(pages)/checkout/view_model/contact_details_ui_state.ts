export interface ContactDetailsUiState {
    readonly firstNameFieldValue: string;
    readonly lastNameFieldValue: string;
    readonly emailFieldValue: string;
    readonly phoneNumberFieldValue: string; 
}

export function defaultContactDetails(): ContactDetailsUiState {
    return {
        firstNameFieldValue: "",
        lastNameFieldValue: "",
        emailFieldValue: "",
        phoneNumberFieldValue: "",
    };
}

export function isContactDetailsFilled(contactDetails: ContactDetailsUiState): boolean {
    return (
        contactDetails.firstNameFieldValue !== ""
        && contactDetails.lastNameFieldValue !== ""
        && contactDetails.emailFieldValue !== ""
        && contactDetails.phoneNumberFieldValue !== ""
    );
}