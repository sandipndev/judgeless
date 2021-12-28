import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import getUser from "../../../utils/getUser";
import validate from "../../../validators/post/create";

import initAuth from "../../../utils/initAuth";
import { commons } from "./list";
initAuth();

const client = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST request allowed" });
    return;
  }

  try {
    const { value, error } = validate(req);
    if (!value || error)
      return res.status(422).json({ message: error?.message });

    const { id } = await getUser(req);
    if (!id) return res.status(500).send("User not found");

    const result = await client.post.create({
      data: { ...value, authorId: id },
      select: { ...commons, author: true },
    });

    // @ts-ignore
    if (value.anonymous) result["author"] = undefined;

    res.status(200).json(result);
  } catch (err) {
    res.status(403).send(err);
  }
};

export default handler;
