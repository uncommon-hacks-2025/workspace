import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth/providers";
import Image from "next/image";
import Link from "next/link";

type NavButton = {
  title: string;
  href: string;
};

const navButtons: NavButton[] = [
  {
    title: "Features",
    href: "/",
  },
  {
    title: "Check in",
    href: "/",
  },
];

export default async function Navbar() {
  const user = await auth();

  const loggedIn = user !== null;

  return (
    <nav className={"flex mx-auto p-8 justify-around w-full"}>
      <Image src={"/logos/logo.svg"} alt={"Logo"} width={80} height={80} />

      <div className={"flex items-center gap-2"}>
        {navButtons.map((val, index) => {
          return (
            <Link key={index} href={val.href}>
              <Button variant={'ghost'} >
                {val.title}
              </Button>
            </Link>
          );
        })}

        {loggedIn ? (
          <Button variant={"solid"}>Log out</Button>
        ) : (
          <Button
          variant={'solid'}
          >Login</Button>
        )}
      </div>
    </nav>
  );
}
