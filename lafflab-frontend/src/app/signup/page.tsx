import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-100">Create your account</h1>
          <p className="text-sm text-gray-400">Join the ecosystem</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              className="w-full rounded-md bg-gray-900 border border-gray-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm font-medium text-white"
          >
            Create account
          </button>

          <p className="text-[11px] text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <Link href="/settings/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </Link>
            .
          </p>
        </form>

        <p className="text-xs text-gray-400 text-center">
          Already have an account{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
