import { prisma } from "../libs/prisma";
import { z } from "zod";
import { signupSchema } from "../schemas/auth.schemas";

export const getUserByEmailHelper = (email: string) => {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUserHelper = (data: z.infer<typeof signupSchema>) => {
  return prisma.user.create({
    data,
  });
};
