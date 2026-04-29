import { PrismaClient } from "@prisma/client";

/**
 * Initializes and exports a PrismaClient instance.
 * This client is used to interact with your database.
 *
 * @example
 * import { prisma } from './prismaClient'; // Assuming this file is named prismaClient.ts
 *
 * async function getUsers() {
 *   const users = await prisma.user.findMany();
 *   console.log(users);
 * }
 */
export const prisma = new PrismaClient();