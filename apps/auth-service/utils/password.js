import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export { hashPassword, comparePasswords };
