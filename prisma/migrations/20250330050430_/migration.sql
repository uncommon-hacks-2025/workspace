-- CreateTable
CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "entryTitle" TEXT NOT NULL,
    "entryDate" DATE NOT NULL,
    "medicationsTaken" TEXT,
    "symptomsHad" TEXT,
    "sleep" DECIMAL(3,1),
    "otherNotes" TEXT,

    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JournalEntry" ADD CONSTRAINT "userId" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
