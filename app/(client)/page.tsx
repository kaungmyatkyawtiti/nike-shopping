import ProductCard from "@/components/ProductCard";
import { products } from "@/constants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import ScrollHint from "@/components/ScrollHint";
import { getCurrentUser } from "@/lib/actions/auth-action";

export default async function Home() {
  const user = await getCurrentUser();
  console.log("user", user);

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      {/* mobile horizontal scroll */}
      {/* <ScrollArea className="md:hidden relative"> */}
      {/*   <div className="flex w-full gap-4 pb-5"> */}
      {/*     {products.map((product) => ( */}
      {/*       <figure key={product.id} className="shrink-0"> */}
      {/*         <ProductCard */}
      {/*           title={product.title} */}
      {/*           imageSrc={product.imageSrc} */}
      {/*           description={product.description} */}
      {/*           price={product.pirce} */}
      {/*         /> */}
      {/*       </figure> */}
      {/*     ))} */}
      {/*   </div> */}
      {/*   <ScrollBar orientation="horizontal" /> */}
      {/*   <ScrollHint /> */}
      {/* </ScrollArea> */}

      {/* in md grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            imageSrc={product.imageSrc}
            description={product.description}
            price={product.pirce}
          />
        ))}
      </div>
    </div>
  );
}
