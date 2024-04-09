const ApiKeyService = require("../services/apikey.service")
const { ForbiddenError } = require("../core/error.response")
const API_KEY = "x-api-key"

const apiKey = async (req, res, next) => {
	const key = req.headers[API_KEY]?.toString()
	if (!key) {
		return next(new ForbiddenError("Missing api-key"))
	}

	const objKey = await ApiKeyService.findApikeyByKey(key)
	if (!objKey) {
		return next(new ForbiddenError("Apikey Invalid"))
	}
	req.apiKey = objKey
	return next()
}

const permission = (permission) => {
	return (req, res, next) => {
		if (!req.apiKey.permissions) {
			throw new ForbiddenError("Permission denied")
		}

		const validPermission = req.apiKey.permissions.includes(permission)
		if (!validPermission) {
			throw new ForbiddenError("Permission denied")
		}

		return next()
	}
}

module.exports = {
	apiKey,
	permission,
}
