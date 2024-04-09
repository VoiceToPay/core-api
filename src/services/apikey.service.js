const { apiKeyRepository } = require("../repository")

class ApiKeyService {
	static createApikey = async () => {
		return await apiKeyRepository.createApiKey("0000")
	}

	static findApikeyByKey = async (key) => {
		return await apiKeyRepository.findByKey(key)
	}
}

module.exports = ApiKeyService
