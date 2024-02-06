import Joi from "joi";

const titleSchema= Joi.object({
  title : Joi.string().min(2).max(256).required(),
})
const validateTitleSchema = (title) => titleSchema.validate(title);

const subtitleSchema = Joi.object({
  subtitle : Joi.string().min(2).max(256).required(),
})
const validateSubtitleSchema = (subtitle)=> subtitleSchema.validate(subtitle);

const descriptionSchema = Joi.object({
  description: Joi.string().min(2).max(1024).required(),
});
const validateDescriptionSchema = (description)=> descriptionSchema.validate(description);

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
})
const validatePhoneSchema = (phone) => phoneSchema.validate(phone);

const emailSchema = Joi.object({
  email : Joi.string().min(5).email({ tlds: { allow: false } }).required(),
})
const validateEmailSchema = (email) => emailSchema.validate(email);

const webSchema = Joi.object({
  web: Joi.string().min(14).allow(""),
});
const validateWebSchema = (web) => webSchema.validate(web);

const urlSchema = Joi.object({
  url : Joi.string().min(14).required(),
})
const validateUrlSchema = (url) => urlSchema.validate(url);

const altSchema = Joi.object({
  alt : Joi.string().min(2).max(256).required(),
})
const validateAltSchema = (alt) => altSchema.validate(alt);

const stateSchema = Joi.object({
  state: Joi.string().allow(""),
});
const validateStateSchema = (state) => stateSchema.validate(state);

const countrySchema = Joi.object({
  country: Joi.string().required(),
});
const validateCountrySchema = (country) => countrySchema.validate(country);

const citySchema = Joi.object({
  city: Joi.string().required(),
});
const validateCitySchema = (city) => citySchema.validate(city);

const streetSchema = Joi.object({
  street: Joi.string().required(),
});
const validateStreetSchema = (street) => streetSchema.validate(street);

const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().required(),
});
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);

const zipSchema = Joi.object({
  zip: Joi.number().allow(""),
});
const validateZipSchema = (zip) => zipSchema.validate(zip);


const validateSchema = {
  title: validateTitleSchema,
  subtitle: validateSubtitleSchema,
  description: validateDescriptionSchema,
  phone: validatePhoneSchema,
  email: validateEmailSchema,
  web: validateWebSchema,
  url: validateUrlSchema,
  alt: validateAltSchema,
  state: validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
};

export default validateSchema;