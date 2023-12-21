//Stripe is a class from stripe lib
//create a stripe instance to create charge object which contains all the information needed to charge a customer
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_KEY!, {//STRIPE_KEY is the env variable storing the value from the kubectl service/pod named stripe-create
  apiVersion: "2023-08-16",// the pod was started in terminal by kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51Nn9aRIrPR0Q27t6UzaRLEOiXx8BKxhvVMvfPQOT1bpSkIzcGzUMOxcOMRyF0sdd9kGRTjgVvRVoazgvuMMIcZA700JjM2bnf2
});//the key stored as a secrete is form stripe APIkeys, and the env to store this secrete is defined in paymeny-depl.
//secrete is a kubectl service to make sensitive info secure