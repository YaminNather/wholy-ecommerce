import { UIProduct } from "./ui_product";

import pineappleCookieImage from "./product_images/pineapple/cookie.png";
import pineappleFruit0Image from "./product_images/pineapple/fruit-0.png";
import pineappleFruit1Image from "./product_images/pineapple/fruit-1.png";
import pineappleWrappedCookieImage from "./product_images/pineapple/wrapped-cookie.png";
import pineappleWrappedCookieWithShadowImage from "./product_images/pineapple/wrapped-cookie-with-shadow.png";
import pineappleWrappedCookiePortraitImage from "./product_images/pineapple/wrapped-cookie-portrait.png";
import pineappleWrappedCookieBackWithShadowImage from "./product_images/pineapple/wrapped-cookie-back-with-shadow.png";
import pineappleWrappedCookieBackImage from "./product_images/pineapple/wrapped-cookie-back.png";
import pineappleNameContainerImage from "./product_images/pineapple/name-container.png";
import pineappleConcentricCircleImage from "./product_images/pineapple/concentric-circle.svg";
import pineappleUnwrappedCircleWithHaloImage from "./product_images/pineapple/half-unwrapped-cookie-with-halo.png";

import strawberryCookieImage from "./product_images/strawberry/cookie.png";
import strawberryFruit0Image from "./product_images/strawberry/fruit-0.png";
import strawberryFruit1Image from "./product_images/strawberry/fruit-1.png";
import strawberryWrappedCookieImage from "./product_images/strawberry/wrapped-cookie.png";
import strawberryWrappedCookieWithShadowImage from "./product_images/strawberry/wrapped-cookie-with-shadow.png";
import strawberryWrappedCookiePortraitImage from "./product_images/strawberry/wrapped-cookie-portrait.png";
import strawberryWrappedCookieBackImage from "./product_images/strawberry/wrapped-cookie-back.png";
import strawberryWrappedCookieBackWithShadowImage from "./product_images/strawberry/wrapped-cookie-back-with-shadow.png";
import strawberryNameContainerImage from "./product_images/strawberry/name-container.png";
import strawberryConcentricCircleImage from "./product_images/strawberry/concentric-circle.svg";
import strawberryUnwrappedCircleWithHaloImage from "./product_images/strawberry/half-unwrapped-cookie-with-halo.png";

import figCookieImage from "./product_images/fig/cookie.png";
import figFruit0Image from "./product_images/fig/fruit-0.png";
import figFruit1Image from "./product_images/fig/fruit-1.png";
import figWrappedCookieImage from "./product_images/fig/wrapped-cookie.png";
import figWrappedCookieWithShadowImage from "./product_images/fig/wrapped-cookie-with-shadow.png";
import figWrappedCookiePortraitImage from "./product_images/fig/wrapped-cookie-portrait.png";
import figWrappedCookieBackWithShadowImage from "./product_images/fig/wrapped-cookie-back-with-shadow.png";
import figWrappedCookieBackImage from "./product_images/fig/wrapped-cookie-back.png";
import figNameContainerImage from "./product_images/fig/name-container.png";
import figConcentricCircleImage from "./product_images/fig/concentric-circle.svg";
import figUnwrappedCircleWithHaloImage from "./product_images/fig/half-unwrapped-cookie-with-halo.png";

import blueberryCookieImage from "./product_images/blueberry/cookie.png";
import blueberryFruit0Image from "./product_images/blueberry/fruit-0.png";
import blueberryFruit1Image from "./product_images/blueberry/fruit-1.png";
import blueberryWrappedCookieImage from "./product_images/blueberry/wrapped-cookie.png";
import blueberryWrappedCookieWithShadowImage from "./product_images/blueberry/wrapped-cookie-with-shadow.png";
import blueberryWrappedCookiePortraitImage from "./product_images/blueberry/wrapped-cookie-portrait.png";
import blueberryWrappedCookieBackWithShadowImage from "./product_images/blueberry/wrapped-cookie-back-with-shadow.png";
import blueberryWrappedCookieBackImage from "./product_images/blueberry/wrapped-cookie-back.png";
import blueberryNameContainerImage from "./product_images/blueberry/name-container.png";
import blueberryConcentricCircleImage from "./product_images/blueberry/concentric-circle.svg";
import blueberryUnwrappedCircleWithHaloImage from "./product_images/blueberry/half-unwrapped-cookie-with-halo.png";

export class UIProducts {
    public static withId(id: string): UIProduct | null {
        const index: number = UIProducts.array.findIndex((value, index, array) => value.id === id);

        if (index === -1) return null;

        return UIProducts.array[index];
    }

    public static withName(name: String): UIProduct | null {
        return UIProducts.array.find((value) => value.name.toLowerCase() === name.toLowerCase()) ?? null;
    }

    public static pineapple: UIProduct = {
        id: "variant_01J6DZTF04311STHKMGAB1CA24",
        name: "Pineapple",
        color: "#dfaa2a",
        fruits: [ pineappleFruit0Image, pineappleFruit1Image ],
        cookieImage: pineappleCookieImage,
        wrappedCookieImage: pineappleWrappedCookieImage,
        wrappedCookieWithShadowImage: pineappleWrappedCookieWithShadowImage,        
        wrappedCookieBackWithShadowImage: pineappleWrappedCookieBackWithShadowImage,
        wrappedCookieBackImage: pineappleWrappedCookieBackImage,
        wrappedCookiePortraitImage: pineappleWrappedCookiePortraitImage,
        nameContainerImage: pineappleNameContainerImage,
        concentricCirclesImage: pineappleConcentricCircleImage,
        unwrappedCookieWithHaloImage: pineappleUnwrappedCircleWithHaloImage
    };
    
    public static strawberry: UIProduct = {
        id: "variant_01J6BNS03X685HGRANQ41MG7Z7",
        name: "Strawberry",
        color: "#c2203c",
        fruits: [ strawberryFruit0Image, strawberryFruit1Image ],
        cookieImage: strawberryCookieImage,
        wrappedCookieImage: strawberryWrappedCookieImage,
        wrappedCookieWithShadowImage: strawberryWrappedCookieWithShadowImage,
        wrappedCookiePortraitImage: strawberryWrappedCookiePortraitImage,
        wrappedCookieBackWithShadowImage: strawberryWrappedCookieBackWithShadowImage,
        wrappedCookieBackImage: strawberryWrappedCookieBackImage,
        nameContainerImage: strawberryNameContainerImage,
        concentricCirclesImage: strawberryConcentricCircleImage,
        unwrappedCookieWithHaloImage: strawberryUnwrappedCircleWithHaloImage
    };
    
    public static fig: UIProduct = {
        id: "variant_01J6DZVE5D7ZZK6JTZP8Y4SZXE",
        name: "Fig",
        color: "#cd7434",
        fruits: [ figFruit0Image, figFruit1Image ],
        cookieImage: figCookieImage,
        wrappedCookieImage: figWrappedCookieImage,
        wrappedCookieWithShadowImage: figWrappedCookieWithShadowImage,
        wrappedCookiePortraitImage: figWrappedCookiePortraitImage,
        wrappedCookieBackWithShadowImage: figWrappedCookieBackWithShadowImage,
        wrappedCookieBackImage: figWrappedCookieBackImage,
        nameContainerImage: figNameContainerImage,
        concentricCirclesImage: figConcentricCircleImage,
        unwrappedCookieWithHaloImage: figUnwrappedCircleWithHaloImage
    };    
    
    public static blueberry: UIProduct = {
        id: "variant_01J6BNKKNX77G71TQ796BTD85Q",
        name: "Blueberry",
        color: "#283775",
        fruits: [ blueberryFruit0Image, blueberryFruit1Image ],
        cookieImage: blueberryCookieImage,
        wrappedCookieImage: blueberryWrappedCookieImage,
        wrappedCookieWithShadowImage: blueberryWrappedCookieWithShadowImage,
        wrappedCookiePortraitImage: blueberryWrappedCookiePortraitImage,
        wrappedCookieBackWithShadowImage: blueberryWrappedCookieBackWithShadowImage,
        wrappedCookieBackImage: blueberryWrappedCookieBackImage,
        nameContainerImage: blueberryNameContainerImage,
        concentricCirclesImage: blueberryConcentricCircleImage,
        unwrappedCookieWithHaloImage: blueberryUnwrappedCircleWithHaloImage
    };

    public static array: UIProduct[] = [
        UIProducts.blueberry,
        UIProducts.pineapple,
        UIProducts.strawberry,
        UIProducts.fig,
    ];
}

// export const uiProducts: UiProduct[] = [
//     {
//         name: "Pineapple",
//         color: "#dfaa2a",
//         fruits: [ pineappleFruit0Image ],
//         cookieImage: pineappleCookieImage,
//         wrappedCookieImage: pineappleWrappedCookieImage
//     },

//     {
//         name: "Fig",
//         color: "#cd7434",
//         fruits: [ figFruit0Image ],
//         cookieImage: figCookieImage,
//         wrappedCookieImage: figWrappedCookieImage
//     },
    
//     {
//         name: "Strawberry",
//         color: "#c2203c",
//         fruits: [ strawberryFruit0Image ],
//         cookieImage: strawberryCookieImage,
//         wrappedCookieImage: strawberryWrappedCookieImage
//     },
    
//     {
//         name: "Blueberry",
//         color: "#283775",
//         fruits: [ blueberryFruit0Image ],
//         cookieImage: blueberryCookieImage,
//         wrappedCookieImage: blueberryWrappedCookieImage
//     }
// ];