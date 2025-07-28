'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import image1 from '../../assets/CoverImage1.jpg'
import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Target } from "lucide-react";


export default function Home() {




  return (
    <div className="">

      <div className="px-12 py-4">
        <Carousel>
          <CarouselContent>
            <CarouselItem className=""><Image src={image1} className="w-full rounded" alt="Image1" /></CarouselItem>
            {/* <CarouselItem><Image src={''} alt="Image1"/></CarouselItem>
            <CarouselItem><Image src={''} alt="Image1"/></CarouselItem> */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <ProductCard title="first" price={300} imageURL={""} productId={2} />
        <ProductCard title="second" price={400} imageURL={""} productId={3} />
        <ProductCard title="second" price={400} imageURL={""} productId={4} />
        <ProductCard title="second" price={400} imageURL={""} productId={5} />
        <ProductCard title="second" price={400} imageURL={""} productId={6} />
        <ProductCard title="second" price={400} imageURL={""} productId={7} />
        <ProductCard title="second" price={400} imageURL={""} productId={8} />
      </div>



    </div>
  );
}
