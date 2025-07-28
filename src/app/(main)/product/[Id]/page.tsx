'use client';
import { useParams } from 'next/navigation';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import image1 from '../../../../assets/CoverImage1.jpg'
import image2 from '../../../../assets/image2.webp'
import Image from "next/image";
import { Star, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export default function Product() {
  const params = useParams();
  const { Id } = params;
  let rating = 3
  console.log("Product ID:", Id);
  const [quantity, setQuantity] = useState(0);

  function quantityHandler(action:any) {

    if (action==='increase') {
      if (quantity >= 10) {
        return
      }
      else {
        setQuantity(quantity + 1)
      }
    }
    else if (action==='decrease') {
      if (quantity <= 0) {
        return
      }
      else {
        setQuantity(quantity - 1)
      }
    }
  }

  return (
    <>
      <h1>Product</h1>
      <div className='flex justify-center'>


        <div className='flex py-12 mx-6 my-4 bg-neutral-200 w-5/6'>

          <div className="px-12 py-4 w-1/3 max-w-1/3">

            <Carousel>
              <CarouselContent>
                <CarouselItem key={2} className=""><Image src={image2} className="w-full rounded" alt="image2" /></CarouselItem>
                <CarouselItem key={3} className=""><Image src={image2} className="w-full rounded" alt="image2" /></CarouselItem>
                <CarouselItem key={4} className=""><Image src={image2} className="w-full rounded" alt="image2" /></CarouselItem>
                {/* <CarouselItem><Image src={''} alt="Image1"/></CarouselItem>
            <CarouselItem><Image src={''} alt="Image1"/></CarouselItem> */}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

          </div>
          <div className='px-4 w-1/3'>
            <div>
              <h1 className='text-2xl'>Name | Prouct {Id}</h1>
            </div>
            {/* Rating */}
            <div className='flex my-4'>
              Rating :
              <div className="relative">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={`empty-${i}`} fill="#111" strokeWidth={0} />
                  ))}
                </div>
                <div className="flex gap-1 absolute top-0">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={`filled-${i}`} fill="yellow" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
            {/* Rating */}
            <div className='text-2xl'>
              Price : 300
            </div>
            <div className='flex my-4'>
              Quantity
              <div className='flex mx-4'>
                <Button className="size-8 cursor-pointer" onClick={()=>{quantityHandler("increase")}} variant="secondary" size="icon">
                  <Plus />
                </Button>

                <Input className='px-1 size-8 text-center mx-4 bg-white' value={quantity} readOnly />
                <Button className="size-8 cursor-pointer" onClick={()=>{quantityHandler("decrease")}} variant="secondary" size="icon">
                  <Minus />
                </Button>
              </div>
            </div>
          </div>
          <div className='w-1/3'>
            <h1 className='text-2xl'>Other details</h1>
          </div>
        </div>
      </div>
    </>
  )
}
