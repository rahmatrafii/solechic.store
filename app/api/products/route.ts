import {
  clearCart,
  deleteProduct,
  getAllProducts,
  phusToCart,
  updateProduct,
} from "@/lib/firebase/productServices";

export async function POST(req: Request) {
  const data = await req.json();
  const res = await phusToCart(data);
  return Response.json({ res });
}

export async function GET() {
  const res = await getAllProducts();
  return Response.json({ res });
}

export async function PATCH(req: Request) {
  const data = await req.json();
  const res = await updateProduct(data);
  return Response.json({ res });
}

export async function DELETE(req: Request) {
  const data = await req.json();
  if (data.email) {
    const res = await clearCart(data);
    return Response.json({ res });
  } else {
    const res = await deleteProduct(data);
    return Response.json({ res });
  }
}
