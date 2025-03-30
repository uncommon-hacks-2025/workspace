-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "qrCodeData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "shareName" BOOLEAN NOT NULL DEFAULT false,
    "shareDateOfBirth" BOOLEAN NOT NULL DEFAULT false,
    "shareMedicalHistory" BOOLEAN NOT NULL DEFAULT false,
    "shareAllergies" BOOLEAN NOT NULL DEFAULT false,
    "shareHealthLogs" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_userId_key" ON "QRCode"("userId");

-- AddForeignKey
ALTER TABLE "QRCode" ADD CONSTRAINT "QRCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
