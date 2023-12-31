"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const router = useRouter();

  const { status, data } = useSession();

  const handleLoginClick = () => signIn();

  const handleLogoutClick = () => {
    setMenuIsOpen(false);
    signOut();
  };

  const handleMenuClick = () => setMenuIsOpen(!menuIsOpen);

  return (
    <header className="container mx-auto p-5 py-0 h-[92px] flex justify-between items-center">
      <Link href="/">
        <Image
          priority
          width={183}
          height={32}
          src="/logo.png"
          alt="Full Stack Week"
        />
      </Link>
      {status === "unauthenticated" && (
        <button
          className="text-primary text-sm font-semibold"
          onClick={handleLoginClick}
        >
          Login
        </button>
      )}
      {status === "authenticated" && data.user && (
        <div className="flex items-center gap-3 border-grayLighter border border-solid p-2 px-3 rounded-full relative">
          <AiOutlineMenu
            size={16}
            onClick={handleMenuClick}
            className="cursor-pointer"
          />
          <Image
            className="rounded-full shadow-md"
            width={34}
            height={34}
            src={data.user.image!}
            alt={data.user.name!}
          />
          {menuIsOpen && (
            <div className="z-10 absolute top-14 left-0 w-full h-[100px]  bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
              <Link href="/my-trips">
                <button
                  className="text-primary text-sm pb-2 border-b border-grayLighter font-semibold"
                  onClick={handleMenuClick}
                >
                  Minhas viagens
                </button>
              </Link>
              <button
                className="text-primary text-sm font-semibold pt-2"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
