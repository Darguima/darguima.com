import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="fixed top-0 left-0 w-full h-full m-0 p-8 font-sans bg-primary text-white flex items-center justify-center text-center">
      <div className="my-8">
        <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
          <img src="/logo.svg" alt="Logo" className="w-20 h-auto" />
        </div>

        <h1 className="my-8 text-3xl mb-2">Page Not Found</h1>

        <p className="my-8 text-lg text-gray-300">
          It may have been moved or deleted. Please check the URL or return to the{' '}
          <Link href="/" className="text-white underline hover:text-gray-200 transition-colors">
            homepage
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
