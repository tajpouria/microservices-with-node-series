import Joi from "@hapi/joi";

export const commentValidator = Joi.object({
  content: Joi.string().min(3).max(255).required(),
  postId: Joi.string().required(),
});
