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
import axios from "axios"
import Swal from "sweetalert2"



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
    email: z.coerce.string().email().min(6),

    password: z.string().min(1, {
        message: "Type your password",
    }),
})

export function LogInForm({ type }: { type?: any }) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })


    const logIn = async (values: z.infer<typeof formSchema>) => {
        console.log("Form Values:", values);


        // Set axios base URL
        axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

        try {
            const response = await axios.post('/api/login', {
                email: values.email,
                password: values.password,
            },{
                withCredentials: true, 
            });
            console.log("Response:", response.data);
            // form.reset()
            Toast.fire({
                icon: "success",
                title: "LogIn successfully! " + response.data.message,
            });
            return response.data;
        } catch (error: any) {
            console.error("Error during LogIn:", error);
            console.error("Error data:", error.response.data.message);
            Toast.fire({
                icon: "error",
                title: error.response.data.message,
            });
            return {
                message: error.response.data.message,
            }
        }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(logIn)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Email" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                {/* <FormDescription>
                                    Password Should be strong
                                </FormDescription> */}
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
