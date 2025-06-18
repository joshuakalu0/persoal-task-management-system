import { PrismaClient } from "../../generated/prisma";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Useful for dev
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
