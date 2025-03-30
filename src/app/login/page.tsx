
import { LoginForm } from "@/components/login-form"
import { auth } from "@/lib/auth/providers"

export default async function LoginPage() {

    const session = await auth()

    if (session) {
        return (
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className={'w-full max-w-sm'}>
                    <p>You are logged in</p>
                </div>
            </div>
        )
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div
            className={'w-full max-w-sm'}
            >
               <LoginForm />
               
            </div>
        </div>
    )
}