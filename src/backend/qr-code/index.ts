"use server";

import { QRCode } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { randomUUID } from "crypto";

export async function getQrCode(userId: string): Promise<QRCode | null> {
  return prisma.qRCode.findFirst({
    where: {
      user: {
        id: userId,
      },
    },
  });
}

export async function getQrCodeWithUuid(_uuid: string) {
    return prisma.qRCode.findFirst({
        select: undefined, // Select all fields of the QRCode
      where: {
        uuid: _uuid, // Use the UUID to find the QR code
      },
      
    });
  }

export async function createQrCode(
  userId: string,
): Promise<QRCode> {
  return prisma.qRCode.create({
    data: {
        // Create a new QR code entry for the user
        user: {
            connect: {
            id: userId, // Connect to the existing user
            },
        },
        qrCodeData: "", // Provide a default or meaningful value for qrCodeData
        // You can add other QR code specific fields here if needed
    }
  })
}

export async function updateQrCode(
  qrCodeId: string,
  qrCodeData: string
): Promise<QRCode> {
  return prisma.qRCode.update({
    where: {
      id: qrCodeId,
    },
    data: {
      qrCodeData, // Update the QR code data
    },
  });
}

export async function updateQrCodePrivacy(
  qrCodeId: string,
  {
    allergies,
    medicalHistory,
    name,
    dateOfBirth,
    shareHealthLogs,
  }: {
    allergies: boolean; // Update shareAllergies
    medicalHistory: boolean; // Update shareMedicalHistory
    name?: boolean; // Optional, if you want to update shareName
    dateOfBirth?: boolean; // Optional, if you want to update shareDateOfBirth
    shareHealthLogs?: boolean; // Optional, if you want to update shareHealthLogs
  }
): Promise<QRCode> {
    const uuid = randomUUID(); 
  return prisma.qRCode.update({
    where: {
      id: qrCodeId,
    },
    data: {
        uuid: uuid, // new UUID for the QR code to ensure it's unique after privacy update
        shareAllergies: allergies, // Update shareAllergies
        shareMedicalHistory: medicalHistory, // Update shareMedicalHistory
        shareDateOfBirth: dateOfBirth ?? false, // Update shareDateOfBirth, default to false if not provided
        shareName: name ?? false, // Update shareName, default to false if not provided
        shareHealthLogs: shareHealthLogs ?? false, // Update shareHealthLogs, default to false if not provided
        
    },
  });
}