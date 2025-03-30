"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import OnboardingStep1 from "./step1";
import OnboardingStep2 from "./step2";
import OnboardingStep3 from "./step3";
import type { MedicalHistory } from "@/types/history";
import { createProfile } from "@/backend/profile";
import { useRouter } from "next/navigation";

const maxSteps = 4;

export default function OnboardingCard() {
  const router = useRouter();

  const [fullName, setFullname] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);

  const [step, setStep] = useState<number>(1);
  const percentageStep = Math.ceil((step / (maxSteps - 1)) * 100);

  const onComplete = async () => {
    try {
      const profile = await createProfile(
        fullName,
        dateOfBirth,
        medicalHistory,
      );
      if (!profile) {
        // Handle the case where profile creation failed
        alert("Profile already exists or user not found.");
        return;
      } else {
        router.push("/"); // go back to the home page
      }
    } catch (error) {
      // Handle the error appropriately
      console.error("Failed to create profile:", error);
      alert("Failed to create profile. Please try again later.");
      // Optionally, you can provide more user-friendly feedback
      // or redirect the user to an error page
      return;
    }
  };

  return (
    <div className={"flex flex-col gap-4 pb-20"}>
      {step === 1 ? (
        <OnboardingStep1
          value={fullName}
          onChange={(name) => setFullname(name)}
        />
      ) : step === 2 ? (
        <OnboardingStep2
          value={dateOfBirth}
          onChange={(date) => setDateOfBirth(date)}
        />
      ) : (
        <OnboardingStep3
          value={medicalHistory}
          onChange={(history) => setMedicalHistory(history)}
        />
      )}

      {step < maxSteps - 1 ? (
        <Button onClick={() => setStep(step + 1)} variant={"solid"}>
          Next
        </Button>
      ) : (
        <Button onClick={onComplete} variant={"solid"}>
          Complete
        </Button>
      )}

      {step > 1 ? (
        <Button onClick={() => setStep(step - 1)} variant={"default"}>
          Go back
        </Button>
      ) : null}
      <div className={"bg-neutral-100 rounded-full h-2 w-full "}>
        <hr
          style={{
            width: `${percentageStep}%`,
            transition: "width 0.15s ease-in-out", // Smooth transition for width changes
          }}
          className={`h-full bg-black rounded-full`}
        />
      </div>
    </div>
  );
}
