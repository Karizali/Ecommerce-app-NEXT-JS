import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function ProductCard({title, price, imageURL,productId,clickHandler}: {title?: string,price?: number, imageURL?: string,productId?:number,clickHandler:any}) {
    return (
        <>
            <Card onClick={()=>{clickHandler({title,price,imageURL,productId})}} className="w-[250px]">
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
                    <Button>Buy Now</Button>
            </Card>
        </>)
}
