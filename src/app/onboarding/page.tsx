import { H2, P } from "@/components/typography";
import OnboardingCard from "@/components/onboarding";
import { auth } from "@/lib/auth/providers";
import { redirect } from "next/navigation";
import { getProfileForUser } from "@/backend/profile";

export default async function OnboardingPage() {
  const user = await auth();

  if (!user) {
    redirect("/login");
  } else {
    const userId = user.user?.id;
    if (userId) {
      const profile = await getProfileForUser(userId);
      if (profile !== null) {
        redirect("/");
      }
    } else {
      redirect("/login");
    }
  }

  return (
    <main className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className={"flex flex-col gap-8 max-w-md"}>
        <div className={"flex flex-col gap-2 max-w-md"}>
          <H2>Onboarding</H2>
          <P className={"text-muted-foreground"}>
            Before you can access all the features of Mediary, we&apos;ll need
            you to fill out a couple things.
          </P>
        </div>

        <OnboardingCard />
      </div>
    </main>
  );
}
