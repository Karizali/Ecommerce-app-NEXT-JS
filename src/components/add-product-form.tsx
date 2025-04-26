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
import { Input } from "@/components/ui/input"
import { Description } from "@radix-ui/react-dialog"



const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Product Name must be at least 2 characters.",
    }),
    description: z.string().min(6, {
        message: "Description must be at least 20 characters.",
    }),
})

export function AddProductForm({type}: { type?: any }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            description:"",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset()
        // console.log(values)
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
                                    <Input type="text" placeholder="Product Name/title" {...field} />
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
