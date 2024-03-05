import { prisma } from "../libs/prisma";

export const validateMemberHelper = (
  user_id: string,
  restaurant_id: string
) => {
  return prisma.team.findFirst({
    where: { user_id, restaurant_id },
  });
};
