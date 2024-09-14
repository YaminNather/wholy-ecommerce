import classNames from "classnames";

import { CouponCodeForm } from "./coupon_code_form/coupon_code_form";
import { states } from "../../states";

import styles from "./checkout_form_styles.module.scss";
import { CheckoutPageViewModel } from "../../view_model";

export interface CheckoutFormProps {
    readonly viewModel: CheckoutPageViewModel;
}

export function CheckoutForm({viewModel}: CheckoutFormProps ) {
    return (
        <div className={styles.checkout_form}>
            <h3>Contact Information</h3>

            <input placeholder="First Name" value={viewModel.contactDetails.firstNameFieldValue} onChange={(event) => viewModel.firstNameFieldValueChanged(event.target.value)} />
                
            <input placeholder="Last Name" value={viewModel.contactDetails.lastNameFieldValue} onChange={(event) => viewModel.lastNameFieldValueChanged(event.target.value)} />

            <div className={classNames(styles.email_field_area)}>
                <input placeholder="Email" value={viewModel.contactDetails.emailFieldValue} onChange={(event) => viewModel.emailFieldValueChanged(event.target.value)} />
                
                {/* <button 
                    onClick={(event) => controller.onGoogleSignInButtonClicked()} 
                    style={{ display: controller.isGoogleSignInButtonVisible() ? undefined : "none" }} 
                    className={classNames("button_yellow")}
                >
                    Google Sign In
                </button> */}
            </div>

            <input type="number" placeholder="Phone Number" value={viewModel.contactDetails.phoneNumberFieldValue} onChange={(event) => viewModel.phoneNumberFieldValueChanged(event.target.value)} />
            
            <h3 className={styles.shipping_address_header}>Shipping Address</h3>
            
            <div className={styles.shipping_address_area}>
                <input placeholder="Street 0" value={viewModel.address.streetAddress0FieldValue} onChange={(event) => viewModel.streetAddress0FieldValueChanged(event.target.value)} />
                
                <input placeholder="Street 1" value={viewModel.address.streetAddress1FieldValue} onChange={(event) => viewModel.streetAddress1FieldValueChanged(event.target.value)} />                                
                
                <input placeholder="City" value={viewModel.address.cityFieldValue} onChange={(event) => viewModel.cityFieldValueChanged(event.target.value)} />

                <input placeholder="Pincode" type="number" value={viewModel.address.pincodeFieldValue} onChange={(event) => viewModel.pincodeFieldValueChanged(event.target.value)} />

                <select value={viewModel.address.stateFieldValue} onChange={(event) => viewModel.stateFieldValueChanged(event.target.value)}>
                    {states.map(
                        (value, index, array) => {
                            return <option key={index} value={value}>{value}</option>;
                        }
                    )}
                </select>
            </div>
            
            <button 
                disabled={!viewModel.isUpdateInformationButtonEnabled} 
                onClick={() => viewModel.updateInformationButtonClicked()} 
                className={styles.update_information_button}
            >
                Update Information
            </button>
            
            <CouponCodeForm viewModel={viewModel} className={styles.coupon_code_form} />

            <button 
                disabled={!viewModel.isConfirmAndPayButtonEnabled} 
                className={styles.confirm_and_pay_button} 
                onClick={(_) => viewModel.confirmAndPayButtonClicked()}
            >
                CONFIRM AND PAY
            </button>
        </div>
    );
};