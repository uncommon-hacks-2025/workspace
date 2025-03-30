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

  onHistoryChange: (history: MedicalHistory, index: number) => void;
  onDelete: () => void;
  index: number;
};

function HistoryCard({ history, onHistoryChange, onDelete, index }: HistoryCardProps) {
  return (
    <div className={"p-4 bg-neutral-100 rounded-md flex flex-col gap-4"}>
      <div className={"flex gap-4 w-full"}>
        <div className={"flex flex-col gap-1 w-full"}>
          <Label>Condition</Label>
          <Input
            className={"bg-white"}
            value={history.condition}
            onChange={(e) => {
              let newHistory = history;
              newHistory.condition = e.target.value;

              onHistoryChange(newHistory, index);
            }}
          />
        </div>
        <Button
          onClick={onDelete}
          size={"icon"}
          variant={"destructive"}
          className={"self-end h-12 w-12"}
        >
          <Trash />
        </Button>
      </div>

      <Label>What&apos;s the status of this condition?</Label>
      <RadioGroup
        value={history.status}
        onValueChange={(e) => {
          let newHistory = history;
          newHistory.status = e;

          onHistoryChange(newHistory, index);
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Resolved" id={`r1_${index}`} />
          <Label htmlFor={`r1_${index}`}>Resolved</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Ongoing" id={`r2_${index}`} />
          <Label htmlFor={`r2_${index}`}>Ongoing</Label>
        </div>
      </RadioGroup>
    </div>
  );
}

type OnboardingProps = {
  value: MedicalHistory[];
  onChange: (history: MedicalHistory[]) => void;
};

export default function OnboardingStep3({ value, onChange }: OnboardingProps) {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>(value);

  const changeHistory = (history: MedicalHistory[]) => {
    setMedicalHistory(history);
    onChange(history);
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <P>
        Tell us about your medical history. Click "Add more" to include
        additional conditions.
      </P>

      {medicalHistory.map((val, index) => (
        <HistoryCard
        index={index}
          key={index}
          history={val}
          onHistoryChange={(updatedHistory, index) => {
            // Update the medical history at the specific index
            changeHistory(
              medicalHistory.map((history, _index) => {
                if (_index === index) {
                  return updatedHistory; // Return the updated history for this index
                }
                return history; // Return the original history for other indices
              }),
            );
          }}
          onDelete={() =>
            changeHistory(
              medicalHistory.filter((_, _index) => {
                return index !== _index;
              }),
            )
          }
        />
      ))}
      <Button
        className={"h-12"}
        onClick={() => {
          changeHistory([
            ...medicalHistory,
            {
              condition: "",
              status: "Resolved",
            },
          ]);
        }}
      >
        <Plus />
        Add more
      </Button>
    </div>
  );
}
