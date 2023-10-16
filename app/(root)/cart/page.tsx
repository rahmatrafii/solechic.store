import CartContent from "@/components/CartContent";
import Recommen from "@/components/Recommen";
import { getProducts } from "@/sanity/sanity-utils";

const Page = async () => {
  const recommen = await getProducts();
  return (
    <section className=" w-full py-20">
      <div className="w-full mb-32">
        <h1 className="text-2xl font-bold mb-5 flex items-center gap-3">
          Cart
        </h1>
        <CartContent />
      </div>
      <Recommen products={recommen} />
    </section>
  );
};

export default Page;
