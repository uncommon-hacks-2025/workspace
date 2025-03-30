import { prisma } from "@/lib/db/prisma";

// Function to get the latest journal entry for a user
export async function getLatestEntry(userId: string) {
  const entry = await prisma.journalEntry.findFirst({
    where: { 
      User: {
        id: userId // Ensure we are fetching entries for the specific user
      }
     },
    orderBy: { entryDate: "desc" },
  });

  return entry;
}

export async function getUserJournals(userId: string) {
  const entry = await prisma.journalEntry.findMany({
    where: { 
      User: {
        id: userId // Ensure we are fetching entries for the specific user
      }
     },
    orderBy: { entryDate: "desc" },
  });

  return entry;
}

