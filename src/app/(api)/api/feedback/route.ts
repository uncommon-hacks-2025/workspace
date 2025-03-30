// app/api/feedback/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma"; // Import your Prisma client
import { v4 as uuidv4 } from "uuid"; // Import UUID package to generate random IDs

export async function POST(request: Request) {
  try {
    // Generate random IDs for both the feedback and user
    const feedbackId = uuidv4(); // Generate a random feedback ID

    // Extract feedback data from the request body
    const { feedback1, feedback2 } = await request.json();

    // Create a new feedback record in the database
    const newFeedback = await prisma.feedback.create({
      data: {
        id: feedbackId, // Assign the generated random feedback ID
        answer1: feedback1 || null, // Optional feedback1
        answer2: feedback2 || null, // Optional feedback2
      },
    });

    // Return a success message
    return NextResponse.json(
      { message: "Feedback submitted successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 },
    );
  }
}
