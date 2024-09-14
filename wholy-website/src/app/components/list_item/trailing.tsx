import { FC, PropsWithChildren } from "react";
import styles from "./list_item_styles.module.scss";

export const Trailing: FC<PropsWithChildren> = (props) => {
    return (
        <div className={styles.area}>
            {props.children}
        </div>
    );
};