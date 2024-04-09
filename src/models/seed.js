require("dotenv").config()
require("../db/init.mongodb")
const redisClient = require("../db/init.redis")
const { apiKeyModel } = require("./index")
const { ApiKeyService } = require("../services/index")
const { logger } = require("../plugin")

const seedApiKey = async () => {
	await apiKeyModel.collection.drop()
	await ApiKeyService.createApikey()
}

const seed = async () => {
	await redisClient.flushAll()
	await seedApiKey()
	return null
}

seed().then(() => {
	logger.debug("Seeding success")
	process.exit(0)
})
