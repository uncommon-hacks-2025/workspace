
import { getProfileForUser } from "@/backend/profile";
import { LoginForm } from "@/components/login-form"
import { auth } from "@/lib/auth/providers"

import { redirect } from "next/navigation";

export default async function LoginPage() {
    const user = await auth();
    
    if (user !== null) {
        const userId = user.user?.id;
        console.log(userId);

        if (userId === undefined) {
            // do something
            redirect("/");
        }
        else {
            const hasProfile = await getProfileForUser(userId);

            console.log(hasProfile);

            if (hasProfile !== null) {
                // user already did the onboarding process, redirect them to the dashboard
            }
            else {
                // redirect to the onboarding
                redirect("/onboarding");
            }
        }
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