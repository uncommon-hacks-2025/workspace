"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FeedbackForm() {
  const [feedback1, setFeedback1] = useState(""); // Feedback for the first question
  const [feedback2, setFeedback2] = useState(""); // Feedback for the second question
  const [feedback3, setFeedback3] = useState(""); // Feedback for the second question
  const [submitted, setSubmitted] = useState(false); // Track if form is submitted
  const [error, setError] = useState(""); // Store error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If no feedback is provided, show error
    if (!feedback1.trim() && !feedback2.trim()) {
      setError("At least one feedback is required.");
      return;
    }

    // Make a POST request to submit feedback
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback1,
          feedback2,
          feedback3,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true); // Show success message
        setError(""); // Clear error if successful
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while submitting your feedback.");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {submitted ? (
        <p className="text-green-600 text-center">
          Thank you for your feedback!
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <p>
            1) How effectively does Mediary address the issue of
            miscommunication and inconsistency in your medical data? Please
            provide specific examples.
          </p>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback1}
            onChange={(e) => setFeedback1(e.target.value)}
            className="border p-2 rounded-md"
          />
          <p>
            2) If you could add one feature to Mediary, what would it be? Please
            give a detailed description.
          </p>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback2}
            onChange={(e) => setFeedback2(e.target.value)}
            className="border p-2 rounded-md"
          />
         


          <p>
            3) What are your overall thoughts on the United States healthcare system and how Mediary fits into it?
          </p>
          <Input
            type="text"
            placeholder="Write your feedback..."
            value={feedback3}
            onChange={(e) => setFeedback3(e.target.value)}
            className="border p-2 rounded-md"
          />
          {error && <p className="text-red-600">{error}</p>}{" "}
          {/* Error Message */}
          <Button
            type="submit"
            className="bg-black text-white w-full py-2 rounded-md"
          >
            Submit Feedback
          </Button>
        </form>
      )}
    </div>
  );
}
