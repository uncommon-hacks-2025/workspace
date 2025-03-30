-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "userId";

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "answer3" TEXT;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
