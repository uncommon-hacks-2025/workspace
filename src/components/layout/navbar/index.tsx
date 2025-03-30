"use client";

import { Button } from "@/components/ui/button";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavButton = {
  title: string;
  href: string;
};

const navButtons: NavButton[] = [
  {
    title: "Get QR Code",
    href: "/code",
  },
  {
    title: "Check in",
    href: "/",
  },
];

export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className={"max-w-4xl flex mx-auto p-8 justify-between w-full"}>
      <Image src={"/logos/logo.svg"} alt={"Logo"} width={80} height={80} />

      <div className={"flex items-center gap-2"}>
        {navButtons.map((val, index) => {
          return (
            <Link key={index} href={val.href}>
              <Button variant={"ghost"}>{val.title}</Button>
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
        ) : (
          <Link href={"/login"}>
            <Button variant={"solid"}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
