import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth/providers";
import { v4 as uuidv4 } from "uuid"; // Import UUID package to generate random IDs

const prisma = new PrismaClient();

// Fetch all journal entries for a specific user
export async function GET(req: Request) {
  const user = await auth();

  if (!user) {

  } else {
    const uId = user.user?.id;

    if (uId) {
      try {
        const entries = await prisma.journalEntry.findMany({
            where: { userId: uId },
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
  try {
    const entryId = uuidv4();

    const { entryTitle, entryDate, medicationsTaken, symptomsHad, sleep, otherNotes } = await req.json();

    const user = await auth();
    
    if (!user) {

    } else {
      const uId = user.user?.id;
  
      if (uId) {
        const newEntry = await prisma.journalEntry.create({
          data: {
            id: entryId,
            entryTitle: entryTitle,
            entryDate: new Date(entryDate), // Ensure correct date format
            medicationsTaken: medicationsTaken || null,
            symptomsHad: symptomsHad || null,
            sleep: sleep || null,
            otherNotes: otherNotes || null,
            userId: uId,
          },
        });

        return NextResponse.json(newEntry);
        
      }
    }
  } catch (error) {
    console.error("Error adding journal entry:", error);
    return NextResponse.json({ error: "Failed to add entry" }, { status: 500 });
  }
}
