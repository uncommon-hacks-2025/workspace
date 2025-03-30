import { H1, H2, P } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
      <div
        className={
          "md:min-h-[calc(100vh-280px)] flex flex-col md:flex-row gap-4 h-fit max-w-4xl mx-auto items-center px-8"
        }
      >
        <div className={"flex flex-col gap-2 h-fit"}>
          <P className={"uppercase text-muted-foreground text-lg"}>
            Your Health, Simplified
          </P>
          <div className={"flex flex-col gap-2"}>
            <H2>Crack your Personal Medical Record</H2>
            <P>Your health record shouldn’t restart when you change clinics. That's why we created Mediary, a simple and secure way to manage and share your medical history.</P>
          </div>

          <Link
          href={"/login"}
          >
          <Button className={"mt-4 w-full md:w-fit"} variant={"solid"}>
            Get started
          </Button>
          </Link>
          
        </div>
        <div className={"relative mx-auto"}>
          <Image
            src={"/images/journal2.svg"}
            alt={"Journal"}
            width={300}
            height={300}
            className={"max-w-[300px] aspect-square"}
          />
          <Image
            src={"/images/journal1.svg"}
            alt={"Journal"}
            width={150}
            height={150}
            className={"absolute bottom-0 aspect-square"}
          />
        </div>
      </div>

      <div className={"bg-neutral-100 py-16 px-8"}>
        <div className={"flex flex-col h-fit max-w-4xl mx-auto "}>
          <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-col gap-2 w-full"}>
              <H2>Before vs. After Mediary</H2>

              <div
                className={
                  "text-center max-w-xl mx-auto w-full flex flex-col items-center mt-8"
                }
              >
                <P>
                  <strong>Before</strong> Mediary, patients and their new
                  doctors miscommunicate
                </P>
                <div className={"relative"}>
                  <Image
                    src={"/images/diagram1.svg"}
                    alt={"Journal"}
                    width={500}
                    height={500}
                    className={"my-8"}
                  />
                </div>
              </div>

              <div
                className={
                  "text-center max-w-xl mx-auto w-full flex flex-col items-center mt-8"
                }
              >
                <P>
                  <strong>After</strong> Mediary, patients and their new doctors
                  communicate effectively, ensuring a seamless healthcare
                  experience.
                </P>
                <div className={"relative"}>
                  <Image
                    src={"/images/diagram2.svg"}
                    alt={"Journal"}
                    width={500}
                    height={500}
                    className={"my-8"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
