import Joi  from "joi";

import {  validateEmailLogin, validatePasswordLogin } from "./loginValidation";

const firstSchema = Joi.object({
  first: Joi.string().min(2).max(256).required(),
})
const validateFirstSchema = (first) => firstSchema.validate(first);

const middleSchema = Joi.object({
  middle: Joi.string().min(2).max(256).allow(""),
});
const validateMiddleSchema = (middle) => middleSchema.validate(middle);

const lastSchema = Joi.object({
  last : Joi.string().min(2).max(256).required(),
});
const validateLastSchema = (last) => lastSchema.validate(last);

const phoneSchema = Joi.object({
  phone: Joi.string().min(9).max(11).required(),
});
const validatePhoneSchema = (phone)=> phoneSchema.validate(phone);

const urlSchema = Joi.object({
  url: Joi.string().min(14).allow(""),
});
const validateUrlSchema = (url) => urlSchema.validate(url);

const altSchema = Joi.object({
  alt: Joi.string().min(2).max(256).allow(""),
});
const validateAltSchema = (alt) => altSchema.validate(alt);

const stateSchema = Joi.object({
  state: Joi.string().min(2).max(256).allow(""),
});
const validateStateSchema = (state) => stateSchema.validate(state);

const countrySchema = Joi.object({
  country: Joi.string().min(2).max(256).required(),
})
const validateCountrySchema = (country)=> countrySchema.validate(country);

const citySchema = Joi.object({
  city: Joi.string().min(2).max(256).required(),
})
const validateCitySchema = (city)=> citySchema.validate(city);

const streetSchema = Joi.object({
  street: Joi.string().min(2).max(256).required(),
})
const validateStreetSchema = (street)=> streetSchema.validate(street);

const houseNumberSchema = Joi.object({
  houseNumber: Joi.number().min(1).max(1000000).required(),
});
const validateHouseNumberSchema = (houseNumber) =>
  houseNumberSchema.validate(houseNumber);

const zipSchema = Joi.object({
  zip: Joi.number().min(1).max(1000000).required(),
});
const validateZipSchema = (zip) => zipSchema.validate(zip)

const isBusinessSchema = Joi.object({
  isBusiness: Joi.boolean().required(),
})
const validateIsBusinessSchema = (isBusiness) => isBusinessSchema.validate(isBusiness);

const validateSchema = {
  first : validateFirstSchema,
  middle: validateMiddleSchema,
  last: validateLastSchema,
  phone: validatePhoneSchema,
  email: validateEmailLogin,
  password : validatePasswordLogin,
  url : validateUrlSchema,
  alt: validateAltSchema,
  state : validateStateSchema,
  country: validateCountrySchema,
  city: validateCitySchema,
  street: validateStreetSchema,
  houseNumber: validateHouseNumberSchema,
  zip: validateZipSchema,
  isBusiness : validateIsBusinessSchema,
}

export default validateSchema;