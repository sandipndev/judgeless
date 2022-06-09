import type { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest): Promise<any> => {
  if (!req.headers.authorization)
    throw new Error("Authorization Header not provided");

  return { id: "" };
};

export default getUser;
