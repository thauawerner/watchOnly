'use client'

import SignupForm from "@/components/SignUpForm"
export default function signUPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">signup</h1>
        <SignupForm />
      </div>
    </div>
  )
}

