const { v4: uuidv4 } = require("uuid")

const requestTracking = (req, res, next) => {
	req.requestId = req["x-request-id"] ? req["x-request-id"] : uuidv4()
	next()
}

module.exports = requestTracking
