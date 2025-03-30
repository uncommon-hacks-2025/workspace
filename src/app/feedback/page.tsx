
import { FeedbackForm } from "@/components/feedback-form"

export default function FeedbackPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">We Value Your Feedback</h1>
        <p className="text-center text-muted-foreground mb-6">
          Let us know your thoughts to help us improve!
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
}
