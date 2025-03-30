"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FeedbackForm() {
  const [feedback1, setFeedback1] = useState("");
  const [feedback2, setFeedback2] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback1.trim() && !feedback2.trim()) return;

    // Simulate form submission (replace with API call)
    console.log("Feedback 1:", feedback1);
    console.log("Feedback 2:", feedback2);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {submitted ? (
        <p className="text-green-600 text-center">Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input type="text" placeholder="Your Name (Optional)" className="border p-2 rounded-md" />

          <p>1) How effectively does Medify address the issue of miscommunication and inconsistency in your medical data? Please provide specific examples.</p>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback1}
            onChange={(e) => setFeedback1(e.target.value)}
            className="border p-2 rounded-md"
          />

          <p>2) If you could add one feature to Medify, what would it be? Please give a detailed description.</p>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback2}
            onChange={(e) => setFeedback2(e.target.value)}
            className="border p-2 rounded-md"
          />

          <Button type="submit" className="bg-black text-white w-full py-2 rounded-md">
            Submit Feedback
          </Button>
        </form>
      )}
    </div>
  );
}
