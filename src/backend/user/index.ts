import { User } from "@prisma/client"
import { prisma } from "@/lib/db/prisma"

export async function getUser(userId: string): Promise<User | null> {
    return prisma.user.findFirst({
        where: {
            id: {
                equals: userId
            }
        }
    })
}