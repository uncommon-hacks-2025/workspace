"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type NavButton = {
  title: string;
  href: string;
  className?: string;
};

const navButtons: NavButton[] = [
  {
    title: "Journal",
    href: "/journal",
  },
  {
    title: "Get QR Code",
    href: "/code",
  },
  {
    title: "Improve Mediary",
    href: "/feedback",
    className: "hidden md:inline-flex" // This will hide the button on small screens
  },
];

export default function Navbar() {
  const { status, data } = useSession();

  return (
    <nav className={"max-w-4xl flex mx-auto p-8 justify-between w-full"}>
      <Link href={"/"} className={"flex items-center gap-2"}>
        <Image src={"/logos/logo.svg"} alt={"Logo"} width={80} height={80} />
      </Link>

      <div className={"flex items-center gap-2"}>
        {navButtons.map((val, index) => {
          return (
            <Link key={index} href={val.href}>
              <Button variant={"ghost"}
              className={cn(val.className)}
              >{val.title}</Button>
            </Link>
          );
        })}

        {status === "authenticated" ? (
          <Button
            variant={"solid"}
            onClick={() =>
              signOut({
                redirectTo: "/login",
              })
            }
          >
            Log out
          </Button>
        ) : status === "unauthenticated" ?(
          <Link href={"/login"}>
            <Button variant={"solid"}>Login</Button>
          </Link>
        ) : (
            // spin 
            <Button 
              variant={"ghost"}
              disabled
                className={"cursor-not-allowed"}
            >
            Loading...
            </Button>
        )
    }
      </div>
    </nav>
  );
}
