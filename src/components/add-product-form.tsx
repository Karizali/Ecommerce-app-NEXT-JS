"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { any, z } from "zod"
import axios from 'axios';
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
import Swal from 'sweetalert2'


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Product Name must be at least 2 characters.",
    }),
    description: z.string().min(6, {
        message: "Description must be at least 20 characters.",
    }),
    category: z.string({
        required_error: "Please select an Category for your Product",
    }).refine((val) => {
        let categoryArray = ["clothes", "Electronics", "Books", "Tech", "Sports",
            "Home Appliances", "Beauty Products", "Toys", "Automotive", "Health & Wellness"]
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
    price: z.string().regex(/^[1-9]\d*$/, {
        message: "Price must be a valid number",
    }),
})


export function AddProductForm({ type }: { type?: any }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            image: "",
            price: "",
        },
    })

    const addProduct = async (values: z.infer<typeof formSchema>, e: any) => {
        console.log("Form Values:", values);


        // Set axios base URL
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        try {
            const response = await axios.post('/api/product', values,{
                withCredentials: true,
            });
            console.log("Response:", response.data);
            // form.reset()
            Toast.fire({
                icon: "success",
                title: "Product added successfully! with ID: " + response.data._id,
            });
            return response.data;
        } catch (error: any) {
            return {
                message: error.response ? error.response.data.message : 'An error occurred while adding the product.'
            }
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(addProduct)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name="title"
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
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number"
                                        placeholder="Product Price"
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
                                        <SelectItem value="Electronics">Electronics</SelectItem>
                                        <SelectItem value="Books">Books</SelectItem>
                                        <SelectItem value="Sports">Sports</SelectItem>
                                        <SelectItem value="Home Appliances">Home Appliances</SelectItem>
                                        <SelectItem value="Beauty Products">Beauty Products</SelectItem>
                                        <SelectItem value="Toys">Toys</SelectItem>
                                        <SelectItem value="Automotive">Automotive</SelectItem>
                                        <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                                        <SelectItem value="Tech">Tech</SelectItem>
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
