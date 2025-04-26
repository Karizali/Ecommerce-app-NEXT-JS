import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export default function ProductCard({title, price, imageURL}: {title?: string,price?: number, imageURL?: string}) {
    return (
        <>
            <Card className="w-[250px]">
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
            </Card>
        </>)
}
