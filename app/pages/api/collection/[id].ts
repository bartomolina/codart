import type { NextApiRequest, NextApiResponse } from "next";
import { getABCollection } from "../../../lib/artblocks";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const collection = await getABCollection(req.query.id as string);
  res.status(200).json(collection);
}
