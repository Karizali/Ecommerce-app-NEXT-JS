"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Description } from "@radix-ui/react-dialog"



const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Product Name must be at least 2 characters.",
    }),
    description: z.string().min(6, {
        message: "Description must be at least 20 characters.",
    }),
    category: z.string({
        required_error: "Please select an Category for your Product",
    }).refine((val) => {
        let categoryArray = ["clothes", "Electronics", "Books"]
        return categoryArray.includes(val)
    }, {
        message: "Please select a valid Category for your Product",
    }),
    image: z.string()
        .refine((val) => {
            let acceptableFileTypes = ["jpg", "jpeg", "png"]
            let fileType = val.split(".").pop()
            if (fileType) {
                return acceptableFileTypes.includes(fileType)
            }
            return false
        }, {
            message: "Please upload a valid image file (jpg, jpeg, png)",
        }),
})


export function AddProductForm({ type }: { type?: any }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            description: "",
            category: "",
            image: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>,e:any) {
    
        // ImageURL =  e.target[1].value
        // console.log("Image ",ImageURL)
        
        console.log(values)
        form.reset()
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input type="text"
                                        placeholder="Product Name/title"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public product name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Picture</FormLabel>
                                <FormControl >
                                    <Input
                                        id="picture" type="file"
                                        accept="image/png, image/gif, image/jpeg"
                                        {...field}
                                    />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public product name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select a Category of your Product" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="clothes">Clothes</SelectItem>
                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input className="h-30" type="text" placeholder="" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Write about your Product
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </>
    )
}
