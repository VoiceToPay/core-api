const { OKResponse } = require("../core/success.response")

const responseFormatter = (req, res, next) => {
	res.sendData = function (data) {
		new OKResponse({
			message: "Success",
			data,
		}).send(res)
	}

	next()
}

module.exports = responseFormatter
