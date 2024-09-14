"use client";

import 'reflect-metadata';

import { ReactNode, useEffect } from "react";

import  { NavBar } from "@/app/components/nav_bar/nav_bar";
import { StepperArea } from "./stepper_area/stepper_area";

import { MainArea } from "./main_area/main_area";
import { CheckoutPageViewModel, useViewModel } from "./view_model/view_model";
import { useRouter } from 'next/navigation';
import { LoadingIndicatorModal } from '@/app/components/loading_indicator_modal/loading_indicator_modal';

export default function ClientSideCheckoutPage(): ReactNode {
    const router = useRouter();

    const viewModel: CheckoutPageViewModel = useViewModel();
    
    useEffect(
        () => { viewModel.pageOpened(); }, 
        []
    );

    useEffect(
        () => {
            if (viewModel.paymentClientSecret) {
                window.open(`/stripe/payment-portal?client_secret=${viewModel.paymentClientSecret}`);
                
                const broadcastChannel: BroadcastChannel = new BroadcastChannel(`payment_status_${viewModel.paymentClientSecret}`);
                broadcastChannel.onmessage = (event) => {
                    viewModel.receivedPaymentStatus(event.data);
                    broadcastChannel.close();
                };
            }
        },
        [viewModel.paymentClientSecret]
    );

    useEffect(
        () => {
            if (viewModel.alerts.length === 0) return;

            alert(viewModel.alerts[0]);
            viewModel.alertDisplayed();
        },
        [viewModel.alerts]
    );
    
    useEffect(
        () => {
            if (viewModel.navigatingToOrderConfirmationPage !== null) {
                router.push(`/order-confirmation`);
            }
        },
        [viewModel.navigatingToOrderConfirmationPage]
    );

    return (
        <>
            <div className="light_theme">
                <NavBar colorScheme={"light"} />

                <StepperArea />

                <hr />

                <MainArea viewModel={viewModel} />
            </div>
            
            <LoadingIndicatorModal isVisible={viewModel.isLoading} style={{position: 'fixed', top: "0px", left: '0px', width: '100%', height: '100%'}} />
        </>
    );
};