-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "answer1" TEXT,
    "answer2" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
