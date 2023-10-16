import { CartProducType } from "@/types";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_LOCAL_STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2023-08-16",
});

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1O0yGWBNbblLibxSkH3BhOfO" }],
      line_items: data?.map((item: CartProducType) => {
        const img = item.image.asset._ref;
        const newImage = img
          .replace(
            "image-",
            "https://cdn.sanity.io/images/x0ke15e2/production/"
          )
          .replace("-webp", ".webp")
          .replace("-jpg", ".jpg");
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/success/${process.env.NEXT_LOCAL_RANDOM_STRING}`,
      cancel_url: `http://localhost:3000/`,
    };
    const session: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    return Response.json({ status: 200, data: session });
  } catch (error: any) {
    return Response.json({ status: 500, message: error.message });
  }
}
