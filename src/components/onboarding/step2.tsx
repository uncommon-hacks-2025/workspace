import { Label } from "../ui/label";

import "react-datepicker/dist/react-datepicker.css";
import { Input } from "../ui/input";

export default function OnboardingStep2() {
    return (
        <div
            className={'flex flex-col gap-1'}
            >
            <Label
            htmlFor="name"
            >
                What is your date of birth?
            </Label>

            <Input
            type="date"
            />
            
            </div>
    )
}