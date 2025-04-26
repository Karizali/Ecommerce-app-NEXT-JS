

import Link from "next/link"
import { LogInForm } from "@/components/login-form"


export default function Login() {
    return (
        <>
            <h1 className="flex justify-around items-center text-4xl font-bold font-serif mb-5 mt-2 text-blue-600">Log In</h1>
            <div className="flex items-center justify-center">
                <div className="w-100 border-2 border-gray-300 rounded-lg p-12 py-20 shadow-lg bg-white">   
                    <LogInForm />
                    <div className="mt-5">
                        <Link className="text-blue-600 underline font-bold" href={'../forgotPassword'}>Forgot Your Password</Link>
                    </div>
                    <div className="mt-5">
                        <Link className="text-blue-600 underline font-bold" href={'../register'}>Don't Have Account? Register Here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}