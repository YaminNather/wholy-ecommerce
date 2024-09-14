import { CSSProperties, FC, useEffect, useState } from "react";
import classNames from "classnames";
import Image, { StaticImageData } from "next/image";

import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css';

import styles from "./product_images_carousel_styles.module.scss";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";

import 'pure-react-carousel/dist/react-carousel.es.css';
import { DotControls } from "@/app/components/pure_react_carousel/dot_controls";


export interface ProductImagesCarouselProps {
    images: string[];
    style?: CSSProperties;
    className?:string;
}

export function ProductImagesCarousel(props: ProductImagesCarouselProps) {
    const [currentSlide, _] = useState<number>(0);

    const [carouselContainerElement, setCarouselContainerElement] = useState<HTMLDivElement | null>(null);
    const [carouselSize, setCarouselSize] = useState<number[]>([0.0 , 0.0]);

    useEffect(
        () => {
            if (carouselContainerElement === null) return;

            const listener = (event: UIEvent) => {
                const newCarouselSize: number[] = [carouselContainerElement.clientWidth, carouselContainerElement.clientHeight];
                setCarouselSize(newCarouselSize);
            };

            window.addEventListener("resize", listener);

            return () => window.removeEventListener("resize", listener);
        },
        [carouselContainerElement]
    );    

    return (
        <div 
            ref={(element) => {
                if (element === null || element === carouselContainerElement) return;
                
                
                const newCarouselSize: number[] = [element.clientWidth, element.clientHeight];
                setCarouselSize(newCarouselSize);
                
                setCarouselContainerElement(element);

            }} 
            style={props.style} className={classNames(styles.carousel_container, props.className)}
        >
            <div className={styles.carousel_provider_container}>
                <CarouselProvider
                    totalSlides={props.images.length}
                    naturalSlideWidth={carouselSize[0]}
                    naturalSlideHeight={carouselSize[1]}
                    currentSlide={currentSlide}
                >
                    <Slider>
                        {props.images.map(
                            (value, index, array) => {
                                return (
                                    <Slide key={index} index={index} className={styles.slide}>
                                        <div className={styles.slide_container}>
                                            <Zoom ZoomContent={ (data) => <>{data.img}</> }>
                                                <Image src={value} alt="" width={carouselSize[0]} height={carouselSize[1]} priority={index === 0} className={styles.product_image} />
                                            </Zoom>
                                        </div>
                                    </Slide>
                                );

                                return (
                                    <Slide key={index} index={index} className={styles.slide}>
                                        <Zoom  ZoomContent={ (data) => <>{data.img}</> }>
                                            <Image src={value} alt="" className={styles.product_image} />
                                        </Zoom>
                                    </Slide>
                                );

                                return (
                                    <Slide key={index} index={index}>
                                        <div className={styles.slide_container}>
                                            <Zoom 
                                                ZoomContent={(data) => {
                                                    return (
                                                        <>{data.img}</>
                                                    );
                                                }}
                                            >
                                                <Image src={value} alt="" className={styles.product_image} />
                                            </Zoom>
                                            {/* <ImageWithZoom src={value.src} alt="" imageClassName={styles.product_image}  /> */}
                                        </div>
                                    </Slide>
                                );
                            }
                        )}
                    </Slider>

                    <div className={classNames("carousel_controls", styles.carousel_controls)}>
                        <ButtonBack>
                            <span className="material-icons">keyboard_arrow_left</span>
                        </ButtonBack>
                        
                        <ButtonNext>
                            <span className="material-icons">keyboard_arrow_right</span>
                        </ButtonNext>
                    </div>
                    
                    <DotControls count={props.images.length} className={styles.dot_controls} />
                </CarouselProvider>
            </div>
        </div>
    );
}
