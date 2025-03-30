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

export async function setUsersFullName(userId: string, name: string): Promise<User | null> {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            name
        }
    })
}

