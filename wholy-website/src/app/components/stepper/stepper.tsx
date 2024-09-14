import classNames from "classnames";
import { CSSProperties, FC, PropsWithChildren } from "react";

import styles from "./stepper_styles.module.scss";

export interface StepperProps extends PropsWithChildren {
    style?: CSSProperties;
    className?: string;
}

export const Stepper: FC<StepperProps> = (props) => {
    return (        
        <div style={props.style} className={classNames(styles.stepper, props.className)}>
            {props.children}
        </div>
    );
};

