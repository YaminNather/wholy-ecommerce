"use client";

import "reflect-metadata";

import Image from "next/image";
import styles from "./sign_up_page.module.scss";
import classNames from "classnames";
import {  useRouter } from "next/navigation";

import GoogleLogoImage from "./assets/google.svg"; 
import { greenPlant1Image, yellowPlant0Image } from "../../../common_imported_images/plants";
import haloImage from "./assets/halo.png";
import dotsSet1Image from "./assets/dots-set-1.png";
import dotsSet2Image from "./assets/dots-set-2.png";
import { SignUpPageViewModel, useViewModel } from "./view_model";

export default function SignUpPage() {
    const viewModel: SignUpPageViewModel = useViewModel();

    const router = useRouter();    

    return (
        <div className={classNames("light_theme", styles.sign_up_page)}>
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
                        <label>First Name</label>
                        
                        <input placeholder="John" />
                    </div>
                    
                    <div className={styles.input_with_label_container}>
                        <label>Doe</label>
                        
                        <input placeholder="Doe" />
                    </div>

                    <div className={styles.input_with_label_container}>
                        <label>Email</label>
                        
                        <input placeholder="johndoe@gmail.com" />
                    </div>
                    
                    <div className={styles.input_with_label_container}>
                        <label>Password</label>
                        
                        <input type="password" placeholder="Password Here" />
                    </div>

                    <button>SIGN UP</button>

                    <button className={classNames(styles.social_login_button, styles.google_login_button)}>
                        <Image src={GoogleLogoImage} alt="" /> <span>Google</span>
                    </button>
                </div>
            </div>
        </div>
    );
};