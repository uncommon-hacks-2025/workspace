import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/db/prisma"; // Adjust path to match your project setup
import { getSession } from "next-auth/react"; // Assuming authentication is handled

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session?.user?.id) return res.status(401).json({ error: "Unauthorized" });

  const userId = session.user.id;

  if (req.method === "GET") {
    try {
      const entries = await prisma.journalEntry.findMany({ where: { id: userId } });
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch journal entries." });
    }
  }

  if (req.method === "POST") {
    try {
      const { entryTitle, otherNotes } = req.body;
      const newEntry = await prisma.journalEntry.create({
        data: {
          id: userId,
          entryTitle,
          entryDate: new Date(),
          otherNotes,
        },
      });
      return res.status(201).json(newEntry);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create journal entry." });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
