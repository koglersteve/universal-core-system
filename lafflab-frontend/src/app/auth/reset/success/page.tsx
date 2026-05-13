export default function ResetSuccessPage() {
  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Password Updated</h1>
      <p>Your password has been successfully reset.</p>
      <a
        href="/auth/login"
        className="inline-block px-4 py-2 rounded bg-pink-600 hover:bg-pink-700"
      >
        Go to Login
      </a>
    </div>
  );
}
