import Joi from "@hapi/joi";

export const postValidators = Joi.object({
  title: Joi.string().min(3).max(255).required(),
});
