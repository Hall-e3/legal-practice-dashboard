import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-gray-950 px-4 text-center">
      <div className="relative mx-auto max-w-md">
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 blur-3xl opacity-50" />
        <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 blur-3xl opacity-50" />
        <div className="relative z-10 grid gap-4">
          <h1 className="text-9xl font-bold tracking-tighter text-gray-50">
            404
          </h1>
          <p className="text-lg font-medium text-gray-400">
            Oops, looks like you are lost.
          </p>

          <Link
            className="border text-white bg-primary_color rounded-md px-[24px] py-[16px] h-[53px] w-[262px] flex items-center justify-center shadow-md duration-[800ms] ease-in-out hover:opacity-80"
            href="/"
          >
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  );
}
