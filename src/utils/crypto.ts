import bcrypt from "bcryptjs";

export const hashPassword = (password: string, salt: number = 10) => {
  return bcrypt.hash(password, salt);
};

export const validatePassword = (
  password: string,
  hashedPassword: string
) => {
  return bcrypt.compare(password, hashedPassword);
};
