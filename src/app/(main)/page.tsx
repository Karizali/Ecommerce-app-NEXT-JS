'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()

  function clickHandler({title,price,imageURL,productId}:{title?: string,price?: number, imageURL?: string,productId:number}){
    router.push(`product/${productId}`)
    console.log(title,price,imageURL)


  }

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
        <ProductCard clickHandler={clickHandler} title="first" price={300} productId={2} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={3} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={4} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={5} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={6} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={7} />
        <ProductCard clickHandler={clickHandler} title="second" price={400}  productId={8} />
      </div>



    </div>
  );
}
