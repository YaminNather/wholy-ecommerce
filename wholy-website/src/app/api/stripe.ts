import Stripe from "stripe";
import { ServerEnvironmentVariables } from "../../environment_variables";

export const stripe: Stripe = new Stripe(ServerEnvironmentVariables.stripeSecretKey());