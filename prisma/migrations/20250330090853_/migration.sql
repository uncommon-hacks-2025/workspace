/*
  Warnings:

  - Added the required column `userId` to the `JournalEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JournalEntry" DROP CONSTRAINT "userId";

-- AlterTable
ALTER TABLE "JournalEntry" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "userId" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
