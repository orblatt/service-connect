import { JobAd } from 'wasp/entities'
import { HttpError } from 'wasp/server'
import { CreateJobAd, UpdateJobAd } from 'wasp/server/operations'
import { emailSender } from "wasp/server/email";

type CreateJobAdPayload = Pick<JobAd, 'description' | 'price'>

export const createJobAd: CreateJobAd<CreateJobAdPayload, JobAd> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.create({
    data: { 
      description: args.description,
      price: args.price,
      owner: { connect: { id: context.user.id } },
    },
  })
}

type UpdateJobAdPayload = Pick<JobAd, 'id' | 'isDone'>

export const updateJobAd: UpdateJobAd<UpdateJobAdPayload,  { count: number } > = async (
  { id, isDone }, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  return context.entities.JobAd.updateMany({
    where: { id, owner: { id: context.user.id } },
    data: { isDone },
  })
}

export const sendEmail = async (
  args, 
  context
) => {
  if (!context.user) {
    throw new HttpError(401)
  }
  const info = await emailSender.send({
    from: {
      name: "John Doe",
      email: "john@example.com",
    },
    to: "bob@example.com",
    subject: "Saying hello",
    text: `Hello world ${Object.entries(args)} ${Object.keys(args)}`,
    html: `Hello <strong>world</strong> ${args.minPrice} ${args.maxPrice}`,
  });
  return info;
}