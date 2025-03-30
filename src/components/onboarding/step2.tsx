import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function OnboardingStep1() {
    return (
        <div
            className={'flex flex-col gap-1'}
            >
            <Label
            htmlFor="name"
            >
                First thing&apos;s first, what&apos;s your full name?
            </Label>
            <Input name="name" />
            </div>
    )
}