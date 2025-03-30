
import { prisma } from '@/lib/db/prisma'
import { Profile } from '@prisma/client'


export async function getProfileForUser(userId: string): Promise<Profile | null> {
    return prisma.profile.findFirst({
        where: {
            userId: {
                equals: userId
            }
        }
    })
}