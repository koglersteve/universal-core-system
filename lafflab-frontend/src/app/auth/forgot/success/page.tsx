export default function ResetSuccessPage() {
  return (
    <div className="max-w-md mx-auto p-6 text-white space-y-6">
      <h1 className="text-2xl font-bold">Check Your Email</h1>
      <p className="text-white/60">
        If an account exists for that email, you’ll receive a reset link shortly.
      </p>
      <p className="text-white/40">
        Didn’t get it? Check spam or try again.
      </p>
    </div>
  );
}
