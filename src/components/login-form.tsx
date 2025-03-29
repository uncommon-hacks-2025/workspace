import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { H2, P } from "./typography"
import Image from "next/image"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center pb-40", className)} {...props}>

      <div
      className={'flex flex-col gap-4 items-center justify-center'}
      >
         <Image
        src={'/logos/auth0.svg'}
        alt={'Auth0 Logo'}
        width={56}
        height={56}
        className={'grayscale opacity-50'}
        />
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
              
              <Button className="font-semibold text-md w-full py-8 border border-transparent hover:border-black transition-colors relative">
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
