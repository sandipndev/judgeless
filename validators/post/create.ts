import { NextApiRequest } from "next";
import Joi from "joi";

type CreatePostRequest = {
  body: string;
  anonymous?: boolean;
};

const schema = Joi.object().keys({
  body: Joi.string().required(),
  anonymous: Joi.boolean().default(false),
});

const handler = (
  req: NextApiRequest
): Joi.ValidationResult<CreatePostRequest> => {
  return schema.validate(req.body);
};

export default handler;
