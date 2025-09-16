//import { button } from "@/components/ui/button";

export default function Home() {
  let year = new Date().getFullYear();
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-sky-800">
            Uttaranchal Tennis Association
          </h1>
          <nav className="space-x-3 hidden md:flex gap-5 font-semibold text-gray-500">
            <button className=" rounded-2xl  hover:text-gray-900">
              Register
            </button>
            <button className="rounded-2xl  hover:text-gray-900">
              User Login
            </button>
            <button className="rounded-2xl  hover:text-gray-900">
              Admin Login
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 py-10 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Annual Doubles Tournament {year}
          </h2>
          <p className="text-gray-600 text-lg">
            Participate in the official UTA Tournament
          </p>
          <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
            <button className=" p-3 bg-sky-200 rounded-xl hover:bg-sky-300 hover:scale-105">
              Register Now
            </button>
          </div>
        </div>

        {/* Illustration / Image Placeholder */}
        <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
          <img
            src="https://t3.ftcdn.net/jpg/01/68/57/86/240_F_168578615_7dmBJwCXVQ2NE4loanM0QUlwAL8sdHFb.jpg"
            alt="Tennis Tournament"
            className="rounded-2xl shadow-lg max-h-96 object-contain w-1/2 h-full"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-sky-300 text-gray-800 text-center py-4 text-sm">
        <p>@{year} Uttaranchal Tennis Association. All rights reserved.</p>
      </footer>
    </div>
  );
}
