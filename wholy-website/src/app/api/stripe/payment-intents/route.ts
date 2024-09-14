import { stripe } from "../../stripe";

export async function POST(request: Request): Promise<Response> {
    let requestBody: any = await request.json();
    
    const createPaymentIntentResponse = await stripe.paymentIntents.create({
        amount: requestBody['amount'],
        currency: 'inr'
    });

    return Response.json(
        {
            'id': createPaymentIntentResponse.id,
            'client_secret': createPaymentIntentResponse.client_secret,
        }
    );
}