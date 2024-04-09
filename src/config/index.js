const AppConfig = {
	NODE_ENV: process.env.NODE_ENV || "DEV",
	APP_PORT: process.env.APP_PORT || "5000",

	DB_URL: process.env.DB_URL || "mongodb://localhost:27017",
	DB_NAME: process.env.DB_NAME || "temp",
	REDIS_URL: process.env.REDIS_URL,

	WRITE_LOG_FILE:
		Boolean(process.env.WRITE_LOG_FILE == "true") ||
		this.NODE_ENV == "PROD",
	OPENAI_API_KEY: process.env.OPENAI_API_KEY
}

module.exports = AppConfig
