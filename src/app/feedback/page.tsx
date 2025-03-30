import { Button } from "@/components/ui/button";

export default function FeedbackPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-md text-center bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">We Value Your Feedback</h1>
        <p className="text-muted-foreground mb-6">
          Let us know your thoughts by filling out our feedback form.
        </p>
        <Button asChild className="bg-black text-white w-full py-2 rounded-md">
          <a href="https://fmjsurvey.com/public/survey/6d864365384528397e13dd3a2210bd8ede5f90c85775a9d76783d8ab144280ad" target="_blank" rel="noopener noreferrer">
            Give Feedback
          </a>
        </Button>
      </div>
    </div>
  );
}
