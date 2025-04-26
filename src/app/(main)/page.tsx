
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import image1 from '../../assets/CoverImage1.jpg'
import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center px-12 items-center space-x-2">
        <Input
          type="text"
          placeholder="Search"
          className="w-full"
        />
        <Button type="submit">Search</Button>

      </div>
      <div className="px-12 py-4">
        <Carousel>
          <CarouselContent>
            <CarouselItem className=""><Image src={image1} className="w-full rounded" alt="Image1"/></CarouselItem>
            {/* <CarouselItem><Image src={''} alt="Image1"/></CarouselItem>
            <CarouselItem><Image src={''} alt="Image1"/></CarouselItem> */}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="flex justify-center gap-2 flex-wrap">
        <ProductCard title="aksjaaksj" price={300}  />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>



    </div>
  );
}
