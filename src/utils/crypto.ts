import bcrypt from "bcryptjs";

export const hashPassword = async (password: string, salt: number = 10) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
