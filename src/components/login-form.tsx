"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { H2, P } from "./typography"
import Image from "next/image"
import { signIn } from '@/lib/auth/client' 


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const handleLogin =  async () => {
     await signIn("auth0")
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div
      className={'flex flex-col gap-4'}
      >
        <div
        className={'flex flex-col gap-2 items-center'}
        >
          <H2>Login to your account</H2>
            <P className="text-muted-foreground text-center">
              We take privacy very seriously. We require your consent to proceed.
            </P>
        </div>
        <div
        className={'text-center'}
        >
              
              <Button onClick={handleLogin} className="w-full py-8 border border-transparent hover:border-black transition-colors relative">
                <Image
                src={'/logos/auth0.svg'}
                alt={'Auth0 Logo'}
                width={32}
                height={32}
                className={'absolute left-4'}
                />
                Login with Auth0
              </Button>

                <Button variant={'link'}>
                Learn more about how we handle your data.
                </Button>
           
        </div>
      </div>
    </div>
  )
}
