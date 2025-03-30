import { Input } from "../ui/input";
import { Label } from "../ui/label";

type OnboardingProps = {
  value: string;
  onChange: (name: string) => void;
};

export default function OnboardingStep1({ value, onChange }: OnboardingProps) {
  return (
    <div className={"flex flex-col gap-1"}>
      <Label htmlFor="name">
        First thing&apos;s first, what&apos;s your full name?
      </Label>
      <Input
        name="name"
        placeholder="Full name"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
