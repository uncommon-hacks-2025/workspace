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
    title: "features",
    href: "/",
  },
  {
    title: "check in",
    href: "/",
  },
];

export default async function Navbar() {
  const user = await auth();

  const loggedIn = user !== null;

  return (
    <nav className={"flex w-4 justify-around"}>
      <Image src={"/logos/logo.svg"} alt={"Logo"} width={80} height={80} />

      <div className={"flex items-center"}>
        {navButtons.map((val, index) => {
          return (
            <Link key={index} href={val.href}>
              <Button className={"bg-transparent hover:!bg-black"}>
                {val.title}
              </Button>
            </Link>
          );
        })}

        {loggedIn ? (
          <Button variant={"solid"}>Log out</Button>
        ) : (
          <Button>Login</Button>
        )}
      </div>
    </nav>
  );
}
