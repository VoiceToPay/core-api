"use strict"
const caller = require("caller")
const { StatusCodes, ReasonPhrases } = require("../utils/httpStatusCode")

class ErrorResponse extends Error {
	constructor(message, status) {
		super(message)
		this.status = status
		this.context = caller(2).split("src")[1].slice(1, -3)
	}
}

class ConflictRequestError extends ErrorResponse {
	constructor(message = ReasonPhrases.CONFLICT) {
		super(message, StatusCodes.CONFLICT)
	}
}

class BadRequestError extends ErrorResponse {
	constructor(message = ReasonPhrases.BAD_REQUEST) {
		super(message, StatusCodes.BAD_REQUEST)
	}
}

class ForbiddenError extends ErrorResponse {
	constructor(message = ReasonPhrases.FORBIDDEN) {
		super(message, StatusCodes.FORBIDDEN)
	}
}

class NotFoundError extends ErrorResponse {
	constructor(message = ReasonPhrases.NOT_FOUND) {
		super(message, StatusCodes.NOT_FOUND)
	}
}

module.exports = {
	BadRequestError,
	ConflictRequestError,
	ForbiddenError,
	NotFoundError,
}
