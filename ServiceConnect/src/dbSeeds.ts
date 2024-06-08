import { CreateJobAdPayload, createJobAd } from './actions.js'
import { sanitizeAndSerializeProviderData } from 'wasp/server/auth'
import { type AuthUser } from 'wasp/auth'
import { PrismaClient } from '@prisma/client'

export const devSeedSimple = async (prisma: PrismaClient) => {
  const user1: AuthUser = await createUser(prisma, {
    username: 'user1@example.com',
    password: '12345678',
  })

  const user2: AuthUser = await createUser(prisma, {
    username: 'user2@example.com',
    password: '12345678',
  })

  const mockJobAdsPayloads: CreateJobAdPayload[] = [
    { description: 'Clean and cook once a week', price: 100 },
    { description: 'Walk the dog twice a week', price: 49.99 },
    { description: 'Babysit on weekends', price: 119.99 },
    { description: 'Babysit everyday', price: 90 },
    { description: 'Lawn mowing service', price: 75.5 },
    { description: 'House painting service', price: 200 }
  ];
  
  mockJobAdsPayloads.forEach(async (payload: CreateJobAdPayload, index: number) => {
    const assignedUser: AuthUser = index < Math.floor(mockJobAdsPayloads.length / 2) ? user1 : user2;
    try {
        await createJobAd(
            payload,
            { 
                user: assignedUser, 
                entities: { JobAd: prisma.jobAd } 
            }
        );
    } catch (err: any) {
        console.error('Error creating job ad during db seed:', err.message);
    }
  });  
};

async function createUser(
  prisma: PrismaClient,
  data: { username: string, password: string }
): Promise<AuthUser> {
    const newUser = await prisma.user.create({
        data: {
        auth: {
            create: {
            identities: {
                create: {
                providerName: 'username',
                providerUserId: data.username,
                providerData: await sanitizeAndSerializeProviderData<'username'>({
                    hashedPassword: data.password
                }),
                },
            },
            },
        },
        },
    })
    return {
        ...newUser,
        auth: {
            id: newUser.id.toString(),
            userId: newUser.id,
            identities: []
        }
    };
};