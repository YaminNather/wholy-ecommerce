import { ReactNode } from "react";
import classNames from "classnames";

import { ProgressStepper } from "@/app/components/progress_stepper/progress_stepper";
import { Step } from "@/app/components/progress_stepper/step/step";

import styles from "./stepper_area_styles.module.scss";

export function StepperArea(): ReactNode {
    return (
        <div className={classNames("container", styles.stepper_area)}>
            <ProgressStepper currentStepIndex={1}>
                <Step index={0} label="CART" />
                
                <Step index={1} label="CHECKOUT" />
                
                <Step index={2} label="PAYMENT" />
            </ProgressStepper>
        </div>
    );
};