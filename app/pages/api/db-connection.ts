// @ts-nocheck
import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma.$connect().then((result) => {
    res.status(200).end();
  });
}
