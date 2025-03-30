import { Label } from "../ui/label";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";

type OnboardingProps = {
  value: Date;
  onChange: (date: Date) => void;
};

export default function OnboardingStep2({ value, onChange }: OnboardingProps) {
  return (
    <div className={"flex flex-col gap-1"}>
      <Label htmlFor="name">What is your date of birth?</Label>

      <Input
        value={value.toISOString().split("T")[0]}
        onChange={(e) => {
          const selectedDate = new Date(e.target.value);
          onChange(selectedDate);
        }}
        type="date"
      />
    </div>
  );
}
