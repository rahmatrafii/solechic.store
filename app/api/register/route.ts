import { signUp } from "@/lib/firebase/authServices";

import type { NextApiResponse } from "next";

export async function POST(req: Request, res: NextApiResponse) {
  const payload = await req.json();

  const response = await signUp(payload);

  if (response.status) {
    return new Response("OK", {
      status: 200,
      statusText: response.message,
    });
  } else {
    return new Response("Not Ok", {
      status: 400,
      statusText: response.message,
    });
  }
}
