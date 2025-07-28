'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import Image from "next/image"



export default function ProductCard({ title, price, imageURL, productId }: { title?: string, price?: number, imageURL?: string, productId?: number }) {

    
    const router = useRouter()
    
    function clickHandler({ title, price, imageURL, productId }: { title?: string, price?: number, imageURL?: string, productId?: number }) {
        router.push(`product/${productId}`)
        console.log(title, price, imageURL)


    }

    return (
        <>
            <Card onClick={() => { clickHandler({ title, price, imageURL, productId }) }} className="w-[250px]">
                <CardHeader>
                    {/* <Image src={''} alt="" width={20} height={20}/> */}
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <CardTitle>{title}</CardTitle>
                    <p></p>
                </CardContent>
                <CardFooter>
                    <p>Rs.{price}</p>
                </CardFooter>
                <Button variant={"outline"} className="mx-4">Add To Cart</Button>
                <Button className="mx-4">Buy Now</Button>
            </Card>
        </>)
}
