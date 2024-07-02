import { CreateJobAdPayload, CreateSearchProfilePayload, createJobAd, createSearchProfile } from './actions.js'
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

  const user3: AuthUser = await createUser(prisma, {
    username: 'orblatt@gmail.com',
    password: '12345678',
  })

  const mockJobAdsPayloads: CreateJobAdPayload[] = [
    { category: 'Babysitting', 
    title: 'Experienced Babysitter Required', 
    description: 'Seeking experienced, warm babysitter for engaging child care in Tel Aviv.',
    price: 80, city: 'Tel Aviv', duration: 2, youngestChildAge: 2 },
    { category: 'House Keeping',
    title: 'Housekeeper Needed for Busy Family',
    description: 'Looking for reliable, experienced housekeeper for duties in Tel Aviv.',
    price: 140, city: 'Ramat Gan', duration: 4, numberOfRooms: 3.5 },
    { category: 'Gardening',
    title: 'Gardener Wanted for Private Residence',
    description: 'Seeking skilled gardener for diverse plant maintenance in Tel Aviv.',
    price: 130, city: 'Petah Tikva', duration: 2, toolsProvided: true },
    { category: 'Babysitting',
      title: 'Sweet Babysitter Needed',
      description: 'Seeking sweet, patient babysitter for daughter in Ramat Gan.',
      price: 100, city: 'Ramat Gan', duration: 3, youngestChildAge: 5 },
    { category: 'House Keeping',
      title: 'Housekeeper Needed',
      description: 'Seeking housekeeper to maintain our home in Petah Tikva.',
      price: 250, city: 'Tel Aviv', duration: 5, numberOfRooms: 4.5 },
    { category: 'Gardening',
      title: 'Gardener Wanted Today!!!',
      description: 'Seeking skilled gardener who loves plants for garden in Tel Aviv.',
      price: 450, city: 'Tel Aviv', duration: 8, toolsProvided: false },
  ];

  
  mockJobAdsPayloads.forEach(async (payload: CreateJobAdPayload, index: number) => {
    const oneThird = Math.floor(mockJobAdsPayloads.length / 3);
    const twoThirds = Math.floor((mockJobAdsPayloads.length / 3) * 2);

    const assignedUser: AuthUser =
      index < oneThird ? user1 :
      index < twoThirds ? user2 :
      user3;
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
    try {
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
  } catch (err: any) {
    console.error('Error creating user during db seed:', err.message);
  }
};