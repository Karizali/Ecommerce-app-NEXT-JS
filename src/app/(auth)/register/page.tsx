import { SignUpForm } from "@/components/register-form"
import Link from "next/link"

export default function SignUP() {
  return (
    <>
      <h1 className="flex justify-around items-center text-4xl font-bold font-serif mb-5 mt-2 text-blue-600">Sign Up</h1>
      <div className="flex items-center justify-center">
        <div className="w-100 border-2 border-gray-300 rounded-lg p-12 py-20 shadow-lg bg-white">
          <SignUpForm />
          <div className="mt-5">
            <Link className="text-blue-600 underline font-bold" href={'../login'}>Already Have an Account? Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}