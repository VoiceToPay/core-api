const joi = require("joi")
const { isValidObjectId } = require("mongoose")

const message = joi.string()
const mongoId = joi.string().custom((value, helpers) => {
	if (!isValidObjectId(value)) return helpers.message("Invalid mongodbId")
})

const initialSchema = joi.object().keys({
	message: message.required(),
})

const communicateSchema = joi.object().keys({
	message: message.required(),
	chatId: mongoId.required(),
})

module.exports = {
	initialSchema,
	communicateSchema,
}
