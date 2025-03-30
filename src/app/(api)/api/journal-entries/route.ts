import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth/providers";

const prisma = new PrismaClient();

// Fetch all journal entries for a specific user
export async function GET(req: Request) {
  const user = await auth();

  if (!user) {

  } else {
    const userId = user.user?.id;

    if (userId) {
      try {
        const entries = await prisma.journalEntry.findMany({
            where: { id: userId },
            orderBy: { entryDate: "desc" }
        });
        return NextResponse.json(entries);
      } catch (error) {
          console.error("Error fetching journal entries:", error);
          return NextResponse.json({ error: "Failed to fetch journal entries" }, { status: 500 });
      }
    }
  }
    
}

// Add a new journal entry
export async function POST(req: Request) {
    const { entryTitle, entryDate, medicationsTaken, symptomsHad, sleep, otherNotes } = await req.json();
    const userId = "user123"; // Replace with actual user session ID

    try {
        const newEntry = await prisma.journalEntry.create({
            data: {
                id: userId,
                entryTitle,
                entryDate: new Date(entryDate), // Ensure correct date format
                medicationsTaken,
                symptomsHad,
                sleep,
                otherNotes
            }
        });
        return NextResponse.json(newEntry);
    } catch (error) {
        console.error("Error adding journal entry:", error);
        return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
    }
}
