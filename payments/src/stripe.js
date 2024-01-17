"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
//Stripe is a class from stripe lib
//create a stripe instance to create charge object which contains all the information needed to charge a customer
const stripe_1 = __importDefault(require("stripe"));
exports.stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2023-08-16", // the pod was started in terminal by kubectl create secret generic stripe-secret --from-literal STRIPE_KEY=sk_test_51Nn9aRIrPR0Q27t6UzaRLEOiXx8BKxhvVMvfPQOT1bpSkIzcGzUMOxcOMRyF0sdd9kGRTjgVvRVoazgvuMMIcZA700JjM2bnf2
}); //the key stored as a secrete is form stripe APIkeys, and the env to store this secrete is defined in paymeny-depl.
//secrete is a kubectl service to make sensitive info secure
