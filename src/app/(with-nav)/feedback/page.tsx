import { FeedbackForm } from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <div className="flex w-full justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-lg p-6 border border-black h-fit">
        <h1 className="text-2xl font-bold text-center mb-4">
          Help Further Research and Development
        </h1>
        <p className="text-center text-muted-foreground mb-6">
          Your contribution is invaluable in helping us figure out the general
          direction of our product and improve the experience of research in 
          healthcare.
        </p>
        <FeedbackForm />
      </div>
    </div>
  );
}
