'use client';

import 'reflect-metadata';
import { container } from "tsyringe";

import { FormEventHandler, Suspense } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, Stripe, StripeElements } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

import { CompleteCartUseCase } from "@/app/use_cases/complete_cart_use_case";

import styles from "./page.module.scss";
import { Order } from "@/app/backend_client/order";

const stripe = loadStripe("pk_test_51JkTmBSHRuYM7AUmBuExyTEi2qX0afE3ssxBCfeFaEncFRmb2w599uiNMScb6FJ6xjIHyhZw9iYXm3EKX7UhFNvl00MXWzF2hW");

export default function PaymentPortalPage() {
  return (
    <Suspense>
      <InternalPaymentPortalPage />
    </Suspense>
  );
}


function InternalPaymentPortalPage() {
  const searchParams = useSearchParams();
  const clientSecret: string = searchParams.get('client_secret') as string;

  return (
    <Elements stripe={stripe} options={{clientSecret: clientSecret}}>
      <PaymentForm clientSecret={clientSecret} />
    </Elements>
  );
}

function PaymentForm({ clientSecret } : { clientSecret: string }) {
  const stripe: Stripe | null = useStripe();
  const elements: StripeElements | null = useElements();

  const onFormSubmitted: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements: elements,
      confirmParams: undefined,
      redirect: 'if_required'
    });
  
    if (error) {
      alert(`Payment failed:\n${error.message}`);
    }
    
    const completeCartUseCase: CompleteCartUseCase = container.resolve(CompleteCartUseCase);
    let order: Order | null = null;
    if (!error) {
      try {
        order = await completeCartUseCase.complete();
      }
      catch (exception) {
        alert(`Failed to complete cart:\n${exception}`);
        console.error(`Failed to complete cart:\n${exception}`);
      }
    }

    const broadcastChannel: BroadcastChannel = new BroadcastChannel(`payment_status_${clientSecret}`);    
    broadcastChannel.postMessage((error || !order) ? 'failed' : order.id);
    broadcastChannel.close();
    
    window.close();
  };

  return (
    <div className={styles.form_container}>
      <form onSubmit={onFormSubmitted}>
        <PaymentElement />

        <button className={styles.submit_button}>Submit</button>
      </form>
    </div>
  );
}

// 4000003560000008