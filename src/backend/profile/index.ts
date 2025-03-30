"use server";

import { auth } from "@/lib/auth/providers";
import { prisma } from "@/lib/db/prisma";
import { MedicalHistory } from "@/types/history";
import { Profile } from "@prisma/client";
import { getUser, setUsersFullName } from "../user";
import { createQrCode } from "../qr-code";

export async function getProfileForUser(
  userId: string,
): Promise<Profile | null> {
  return prisma.profile.findFirst({
    where: {
      userId: {
        equals: userId,
      },
    },
  });
}

export async function createProfile(
  fullName: string,
  dateOfBirth: Date,
  history: MedicalHistory[],
): Promise<Profile | null> {
  const user = await auth();

  if (user === null) {
    throw new Error("Must be logged in");
  } else {
    const userId = user.user?.id; // Extract the user ID from the authenticated user object
    if (!userId) {
      return null;
    }
    // Proceed to create a new profile

    if (await getProfileForUser(userId)) {
      // Profile already exists for this user
      return null;
    }

    const foundUser = await getUser(userId);

    if (!foundUser) {
      // User not found
      throw new Error("User not found");
    }

    // change the user's name
    setUsersFullName(userId, fullName);

    // get the current u
    const profile = await prisma.profile.create({
      data: {
        user: {
          connect: {
            id: userId, // Connect to the existing user
          },
        },
        dateOfBirth,
        // userId is managed by Prisma through the user relation
        gender: "Not Specified", // Provide a default or valid value
        height: 0, // Provide a default or valid value
        weight: 0, // Provide a default or valid value
      },
    });

    const medicalConditions = await prisma.medicalCondition.createMany({
      data: await Promise.all(
        history.map(async (condition) => ({
          profileId: profile.id, // Use the created profile's ID
          condition: condition.condition,
          notes: condition.notes || "",
          diagnosedDate: new Date(), // Set the diagnosed date to now, or you can customize this
          status: condition.status, // Use the status provided in the history
        })),
      ),
      skipDuplicates: true, // Skip duplicates if any
    });

    if (medicalConditions.count === 0) {
      // Handle the case where no medical conditions were created
      console.error("No medical conditions were created");
    } else {
      console.log(`Created ${medicalConditions.count} medical conditions`);
    }

    // create a QR code as well
    const qrcode = createQrCode(userId)

    if (!qrcode) {
      // Handle the case where QR code creation failed
      console.error("Failed to create QR code for user");
      // You might want to handle this differently based on your application needs
    } else {
      console.log(`Created QR code for user with ID: ${userId}`);
    }

    // Return the created profile
    return profile;
  }
}
