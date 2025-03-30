"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import OnboardingStep1 from "./step1";

export default function OnboardingCard() {
    const [step, setStep] = useState<number>(1);

    return (
        <div
        className={'flex flex-col gap-4'}
        >
            
            {
                step === 1 ? (
                    <OnboardingStep1 />
                ) : null
            }
           
            <Button
            onClick={() => setStep(step + 1)}
            variant={'solid'}
            >
                Next
            </Button>
            {
                step > 1 ? (
                    <Button
                    onClick={() => setStep(step - 1)}
                    variant={'default'}
                    >
                        Go back
                    </Button>
                ) : null
            }
        </div>
    )
}