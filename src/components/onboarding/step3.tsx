import { Label } from "../ui/label";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type MedicalHistory = {
    condition: string;
}

function HistoryCard() {
    return (
        <div className={'p-4 bg-neutral-100 rounded-md flex flex-col gap-4'}>
                
                <div
                className={'flex flex-col gap-1'}
                >
                     <Label
                >
                    Condition
                </Label>
                <Input className={'bg-white'} />
                </div>

                <Label
                >
                    What&apos;s the status of this condition?
                </Label>
                <RadioGroup>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Resolved</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Ongoing</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                </div>
                </RadioGroup>
               
            </div>
    )
}
export default function OnboardingStep3() {
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([]);

    return (
        <div
            className={'flex flex-col gap-1'}
            >
            <Label
            >
                Describe your medical history
            </Label>

            {
                medicalHistory.map((val, index) => (
                    <HistoryCard key={index} />
                ))
            }
            <Button
            className={'h-12'}
            onClick={() => {
                setMedicalHistory([
                    ...medicalHistory, {
                        condition: ""
                    }
                ])
            }}
            >
                <Plus />
                Add more
            </Button>
            
            </div>
    )
}