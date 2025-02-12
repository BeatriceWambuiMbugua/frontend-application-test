"use client"
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  return (
    <div>
      <div className="container mx-auto flex items-center justify-between  pt-4 px-2 md:px-0">
        <Link href={"/"} className="flex gap-2 items-center">
          <Image
            src={"/logo.svg"}
            width={100}
            height={100}
            alt="Frontend Logo"
            className="w-10 h-10"
          />
          <p className="text-lg font-bold hover:subpixel-antialiased">
            Frontend Test
          </p>
        </Link>

        {session ? (
          <button
            onClick={() => signOut()}
            className="text-neutral-900 bg-gray-200 hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center hover:subpixel-antialiased "
          >
            Logout
          </button>
        ) : (
          <Link href={"/"}>
            <button
              type="submit"
              className="text-neutral-900 bg-gray-200 hover:bg-gray-100 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center hover:subpixel-antialiased "
            >
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
