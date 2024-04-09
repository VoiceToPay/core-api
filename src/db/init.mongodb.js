"use strict"
const mongoose = require("mongoose")
const { BadRequestError } = require("../core/error.response")
const { DB_URL, DB_NAME } = require("../config")
const { logger } = require("../plugin")

class Database {
	constructor() {
		this.connect()
	}

	connect() {
		if (DB_URL) {
			// eslint-disable-next-line no-constant-condition
			if (1 === 1) {
				mongoose.set("debug", true)
				mongoose.set("debug", { color: true })
			}
			mongoose
				.connect(DB_URL, {
					dbName: DB_NAME,
				})
				.then(() => {
					logger.info("Connection to mongodb created")
				})
				.catch((err) => {
					throw new BadRequestError(err)
				})
		}
	}

	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database()
		}

		return Database.instance
	}
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb
