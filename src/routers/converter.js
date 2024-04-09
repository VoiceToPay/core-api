"use strict"

const converterController = require("../controller/converter.controller")
const express = require("express")
const schema = require("../schema")
const validator = require("../middleware/validate.middleware")
const { asyncHandler } = require("../helper")
const router = express.Router()

router.post(
	"/init",
	validator({
		body: schema.initialSchema,
	}),
	asyncHandler(converterController.initial),
)
router.post(
	"/communicate",
	validator({
		body: schema.communicateSchema,
	}),
	asyncHandler(converterController.communicate),
)
module.exports = router
