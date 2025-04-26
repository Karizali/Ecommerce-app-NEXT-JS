import Link from "next/link"
import OTPForm from "@/components/OTP-form"

export default function ForgotPassword() {
    return (
        <>
            <h1 className="flex justify-around items-center text-4xl font-bold font-serif mb-5 mt-2 text-blue-600">Reset Password</h1>
            <div className="flex items-center justify-center">
                <div className="w-100 border-2 border-gray-300 rounded-lg p-12 py-20 shadow-lg bg-white">
                    <OTPForm />
                    <div>
                        {/* <Link href={''}>Forgot Your Password</Link> */}
                        <h1 className="text-3xl font-bold underline">
                            Hello world!
                        </h1>
                    </div>
                </div>
            </div>
        </>
    )
}