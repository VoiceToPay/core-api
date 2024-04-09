"use strict"

const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode")

class SuccessResponse {
	constructor({
		message,
		status = StatusCodes.OK,
		reasonStatusCode = ReasonPhrases.OK,
		data = {},
	}) {
		this.message = !message ? reasonStatusCode : message
		this.status = status
		this.data = data
	}

	send(res) {
		res.status(this.status).json(this)
	}
}

class OKResponse extends SuccessResponse {
	constructor({ message, data }) {
		super({ message, data })
	}
}

class CreatedResponse extends SuccessResponse {
	constructor({
		message,
		status = StatusCodes.CREATED,
		reasonStatusCode = ReasonPhrases.CREATED,
		data,
	}) {
		super({ message, status, reasonStatusCode, data })
	}
}

module.exports = {
	OKResponse,
	CreatedResponse,
	SuccessResponse,
}
