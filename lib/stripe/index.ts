import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51NpsTWBNbblLibxSDZokHeJBfoLQ4KZ1XpH7FvNqyIYzjy9PwrwA23GOd7D3bGOGWPMVx8eRETmsBRSCCljMbH5y00gmB1BXRF"
    );
  }
  return stripePromise;
};

export default getStripe;
