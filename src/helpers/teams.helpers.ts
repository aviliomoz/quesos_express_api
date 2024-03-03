import { prisma } from "../libs/prisma";

export const joinTeamHelper = (
  user_id: string,
  restaurant_id: string,
  options?: {
    is_admin: boolean;
  }
) => {
  return prisma.team.create({
    data: {
      user_id,
      restaurant_id,
      is_admin: options?.is_admin || false,
    },
  });
};
