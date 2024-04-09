const { logger } = require("../plugin")

const handleNotFound = (req, res, next) => {
	const error = new Error("Not found")
	error.status = 404
	next(error)
}

// eslint-disable-next-line no-unused-vars
const handleError = (error, req, res, next) => {
	logger.error(error.message, {
		requestId: req.requestId,
		context: error.context,
	})

	const statusCode = error.status ? error.status : 500
	return res.status(statusCode).json({
		status: "Error",
		code: statusCode,
		message: error.message || "Internal Server error",
	})
}

module.exports = {
	handleError,
	handleNotFound,
}
