import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import getUser from "../../../utils/getUser";

export const commons = {
  id: true,
  body: true,
  anonymous: true,
  createdAt: true,
};

const client = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { id } = await getUser(req);
    if (!id) return res.status(500).end();

    const result = await client.post.findMany({
      select: {
        ...commons,
        author: {
          select: {
            displayName: true,
            photoURL: true,
          },
        },
      },
      orderBy: [{ createdAt: "desc" }],
      take: req.query && req.query.all == "1" ? undefined : 10,
      skip: req.query && req.query.skip ? Number(req.query.skip) : 0,
    });

    const anonFilteredResults = result.map((p) => {
      // @ts-ignore
      if (p.anonymous) p.author = undefined;
      return p;
    });

    res.status(200).json(anonFilteredResults);
  } catch (err) {
    res.status(403).send(err);
  }
};

export default handler;
