import type { NextApiRequest, NextApiResponse } from "next";
import { setAuthCookies } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";

initAuth();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await setAuthCookies(req, res);
  return res.status(200).json({ status: true });
};

export default handler;
