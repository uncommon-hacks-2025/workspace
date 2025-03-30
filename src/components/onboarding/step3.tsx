import { Label } from "../ui/label";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { P } from "../typography";
import type { MedicalHistory } from "@/types/history";

type HistoryCardProps = {
    history: MedicalHistory;

    onHistoryChange: (history: MedicalHistory) => void;
    onDelete: () => void;
}

function HistoryCard({history, onHistoryChange, onDelete}: HistoryCardProps) {
    return (
        <div className={'p-4 bg-neutral-100 rounded-md flex flex-col gap-4'}>
               <div
               className={'flex gap-4 w-full'}
               >
                    <div
                    className={'flex flex-col gap-1 w-full'}
                    >
                        <Label
                    >
                        Condition
                    </Label>
                    <Input className={'bg-white'} value={history.condition}
                    onChange={(e) => {
                        let newHistory = history;
                        newHistory.condition = e.target.value;

                        onHistoryChange(newHistory);
                    }}
                    />
                   
                    </div>
               <Button
               onClick={onDelete}
                size={'icon'}
                variant={'destructive'}
                className={'self-end h-12 w-12'}

                >
                    <Trash />
                </Button>
                </div>

                <Label
                >
                    What&apos;s the status of this condition?
                </Label>
                <RadioGroup
                value={history.status}
                onValueChange={(e) => {
                    let newHistory = history;
                    newHistory.status = e;

                    onHistoryChange(newHistory);
                }}
                >
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Resolved" id="r1" />
                    <Label htmlFor="r1">Resolved</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ongoing" id="r2" />
                    <Label htmlFor="r2">Ongoing</Label>
                </div>
                </RadioGroup>
               
            </div>
    )
}

type OnboardingProps = {
    value: MedicalHistory[];
    onChange: (history: MedicalHistory[]) => void;
}

export default function OnboardingStep3({ value, onChange }: OnboardingProps) {
    const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>(value);

    const changeHistory = (history: MedicalHistory[]) => {
        setMedicalHistory(history);
        onChange(history);
    }

    return (
        <div
            className={'flex flex-col gap-4'}
            >
            <P>
                Tell us about your medical history. Click "Add more" to include additional conditions.
            </P>

            {
                medicalHistory.map((val, index) => (
                    <HistoryCard key={index} 
                    history={val}
                    onHistoryChange={(updatedHistory) => {

                        changeHistory(medicalHistory.map((item, _index) => {
                            return _index === index ? updatedHistory : item;
                        }));
                    }}
                    onDelete={() => changeHistory(medicalHistory.filter((_, _index) => {
                        return index !== _index;
                    }))}
                    />
                ))
            }
            <Button
            className={'h-12'}
            onClick={() => {
                changeHistory([
                    ...medicalHistory, {
                        condition: "",
                        status: "Resolved"
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