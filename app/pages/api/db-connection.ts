import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma.$connect().then(() => {
    res.status(200).end();
  });
}
