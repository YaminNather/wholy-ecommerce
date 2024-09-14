"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import classNames from "classnames";

import { greenPlant1Image, yellowPlant0Image } from "@/app/common_imported_images/plants";
import GoogleLogoImage from "./assets/google.svg"; 
import haloImage from "./assets/halo.png";
import dotsSet1Image from "./assets/dots-set-1.png";
import dotsSet2Image from "./assets/dots-set-2.png";

import styles from "./login_page.module.scss";

export default function LoginPage() {
    const router = useRouter();

    return (
        <div className={classNames("light_theme", styles.login_page)}>
            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.yellow_plant0)} />
            
            <Image src={yellowPlant0Image} alt="" className={classNames("background_prop", styles.yellow_plant1)} />
            
            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.green_plant0)} />
            
            <Image src={greenPlant1Image} alt="" className={classNames("background_prop", styles.green_plant1)} />

            <Image src={dotsSet1Image} alt="" className={classNames("background_prop", styles.dots_set_1)} />
            
            <Image src={dotsSet2Image} alt="" className={classNames("background_prop", styles.dots_set_2)} />

            <div className={classNames("container", styles.container)}>
                <div className={styles.form}>
                    <Image src={haloImage} alt="" className={styles.halo} />

                    <div className={styles.input_with_label_container}>
                        <label>Email</label>
                        
                        <input placeholder="johndoe@gmail.com" />
                    </div>
                    
                    <div className={styles.input_with_label_container}>
                        <label>Password</label>
                        
                        <input type="password" placeholder="Password Here" />
                    </div>

                    <button className={styles.login_button}>LOGIN</button>

                    <button className={classNames(styles.social_login_button, styles.google_login_button)}>
                        <Image src={GoogleLogoImage} alt="" /> <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};