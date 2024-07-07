import { CreateJobAdPayload, createJobAd } from './actions.js'
import { sanitizeAndSerializeProviderData } from 'wasp/server/auth'
import { type AuthUser } from 'wasp/auth'
import { PrismaClient } from '@prisma/client'

export const devSeedSimple = async (prisma: PrismaClient) => {
  const user1: AuthUser = await createUser(prisma, {
    email: 'nathanch@mta.ac.il',
    password: '12345678',
  })

  const user2: AuthUser = await createUser(prisma, {
    email: 'tomeryh@mta.ac.il',
    password: '12345678',
  })

  const user3: AuthUser = await createUser(prisma, {
    email: 'orblatt@gmail.com',
    password: '12345678',
  })

  const mockJobAdsPayloads: CreateJobAdPayload[] = [
    { category: 'Babysitting',
      title: 'Weekend Babysitter Needed',
      description: 'Looking for a friendly and dependable babysitter for weekends in Tel Aviv.',
      price: 90, city: 'Tel Aviv', duration: 3, youngestChildAge: 3 },
    { category: 'House Keeping',
      title: 'Part-Time Housekeeper',
      description: 'Part-time housekeeper required for a small apartment in Ramat Gan.',
      price: 70, city: 'Ramat Gan', duration: 2, numberOfRooms: 2 },
    { category: 'Gardening',
      title: 'Gardener for Small Garden',
      description: 'Need a gardener to take care of a small garden space in Petah Tikva. Tools not provided.',
      price: 60, city: 'Petah Tikva', duration: 1, toolsProvided: false },
    { category: 'Babysitting',
      title: 'After-School Care Required',
      description: 'Responsible babysitter needed for after-school care in Petah Tikva.',
      price: 85, city: 'Petah Tikva', duration: 4, youngestChildAge: 7 },
    { category: 'House Keeping',
      title: 'Full-Time Housekeeper Wanted',
      description: 'Full-time housekeeper wanted for a large home in Tel Aviv.',
      price: 300, city: 'Tel Aviv', duration: 6, numberOfRooms: 5.5 },
    { category: 'Gardening',
      title: 'Experienced Gardener Required',
      description: 'Experienced gardener needed for routine garden maintenance in Ramat Gan.',
      price: 120, city: 'Ramat Gan', duration: 3, toolsProvided: true },
    { category: 'Babysitting',
      title: 'Evening Babysitter for Young Child',
      description: 'Seeking a gentle babysitter for evening hours in Tel Aviv.',
      price: 75, city: 'Tel Aviv', duration: 2, youngestChildAge: 4 },
    { category: 'House Keeping',
      title: 'Weekend Cleaner Needed',
      description: 'Looking for a cleaner to work on weekends in a mid-sized house in Petah Tikva.',
      price: 200, city: 'Petah Tikva', duration: 5, numberOfRooms: 3 },
    { category: 'Gardening',
      title: 'Professional Gardener for Large Estate',
      description: 'Professional gardener needed for a large estate garden in Tel Aviv.',
      price: 500, city: 'Tel Aviv', duration: 7, toolsProvided: true },
      { category: 'Babysitting', 
      title: 'Morning Babysitter for Toddler', 
      description: 'Urgently seeking a patient and energetic babysitter for morning care in Ramat Gan.',
      price: 120, city: 'Ramat Gan', duration: 4, youngestChildAge: 1 },
    { category: 'House Keeping',
      title: 'Daily Housekeeper Needed',
      description: 'Daily housekeeper needed for routine cleaning and maintenance in a family home in Tel Aviv.',
      price: 180, city: 'Tel Aviv', duration: 6, numberOfRooms: 2 },
    { category: 'Gardening',
      title: 'Weekend Gardening Help',
      description: 'Casual gardener needed for weekends to manage and beautify a small garden in Petah Tikva.',
      price: 250, city: 'Petah Tikva', duration: 5, toolsProvided: true },
    { category: 'Babysitting',
      title: 'Evening Babysitter for Two Children',
      description: 'Experienced babysitter needed for evenings to look after two children in Tel Aviv.',
      price: 150, city: 'Tel Aviv', duration: 3, youngestChildAge: 6 },
    { category: 'House Keeping',
      title: 'Reliable Cleaner for Large Apartment',
      description: 'Reliable cleaner required for a large apartment in Ramat Gan. Attention to detail a must.',
      price: 90, city: 'Ramat Gan', duration: 2, numberOfRooms: 4 },
    { category: 'Gardening',
      title: 'Professional Landscape Gardener',
      description: 'Professional landscape gardener needed to redesign and maintain large garden in Tel Aviv.',
      price: 800, city: 'Tel Aviv', duration: 8, toolsProvided: false },
    { category: 'Babysitting',
      title: 'Weekend Babysitter for Infant',
      description: 'Seeking a gentle and experienced babysitter for infant care during weekends in Petah Tikva.',
      price: 200, city: 'Petah Tikva', duration: 5, youngestChildAge: 0.5 },
    { category: 'House Keeping',
      title: 'Organizer and Cleaner Needed',
      description: 'Organizer needed for sorting and cleaning a cluttered home office in Tel Aviv.',
      price: 300, city: 'Tel Aviv', duration: 9, numberOfRooms: 1 },
    { category: 'Gardening',
      title: 'Gardener for Urban Balcony',
      description: 'Looking for a gardener with experience in balcony and small space gardening in Ramat Gan.',
      price: 70, city: 'Ramat Gan', duration: 1, toolsProvided: false }
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
  data: { email: string, password: string }
): Promise<AuthUser> {
    try {
      const newUser = await prisma.user.create({
        data: {
          auth: {
              create: {
                identities: {
                    create: {
                      providerName: 'email',
                      providerUserId: data.email,
                      providerData: await sanitizeAndSerializeProviderData<'email'>({
                          hashedPassword: data.password,
                          isEmailVerified: true, // Set isEmailVerified to true
                          emailVerificationSentAt: new Date().toISOString(), // Set the verification sent date to now
                          passwordResetSentAt: null,
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