
import { prisma } from '@/lib/db/prisma'


// Function to get the latest journal entry for a user
export async function getLatestEntry(userId: string) {
  const entry = await prisma.journalEntry.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return entry
}
