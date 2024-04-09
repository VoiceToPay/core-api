const { createLogger, format, transports } = require("winston")
const { WRITE_LOG_FILE } = require("../config")
require("winston-daily-rotate-file")
const { Console, DailyRotateFile } = transports
const util = require("util")

class Logger {
	constructor() {
		this.logger = createLogger({
			level: "debug",
		})

		if (WRITE_LOG_FILE) {
			const fileFormat = format.combine(
				format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
				format.json(),
			)
			const errTransport = new DailyRotateFile({
				dirname: "./logs",
				filename: "error-%DATE%.log",
				datePattern: "YYYY-MM-DD-HH",
				maxSize: "20m",
				maxFiles: "14d",
				format: fileFormat,
				level: "error",
			})
			const infoTransport = new DailyRotateFile({
				dirname: "./logs",
				filename: "combined-%DATE%.log",
				datePattern: "YYYY-MM-DD-HH",
				maxSize: "20m",
				maxFiles: "14d",
				format: fileFormat,
			})
			this.logger.add(errTransport)
			this.logger.add(infoTransport)
		} else {
			const formatCustom = format.printf(
				({
					level,
					message,
					context = null,
					requestId = null,
					timestamp,
				}) => {
					return `${level}  ${timestamp}${requestId ? `  ${requestId}` : ""}${context ? `  ${context}` : ""}  ${
						typeof message === "string"
							? message
							: util.inspect(message, { colors: true })
					}`
				},
			)
			const errorStackFormat = format((info) => {
				if (info.stack) {
					console.log(info.stack)
					return false
				}
				return info
			})
			const consoleTransport = new Console({
				format: format.combine(
					format.colorize(),
					format.simple(),
					format.timestamp({ format: "DD/MM/YYYY HH:mm:ss" }),
					errorStackFormat(),
					formatCustom,
				),
			})
			this.logger.add(consoleTransport)
		}
	}

	info = (message, params = { requestId: null, context: null }) => {
		const logObject = Object.assign(
			{
				message,
			},
			params,
		)
		this.logger.info(logObject)
	}

	error = (message, params = { requestId: null, context: null }) => {
		const logObject = Object.assign(
			{
				message,
			},
			params,
		)
		this.logger.error(logObject)
	}

	debug = (message, params = { requestId: null, context: null }) => {
		const logObject = Object.assign(
			{
				message,
			},
			params,
		)
		this.logger.debug(logObject)
	}

	log = (message) => {
		this.logger.log(message)
	}
}

module.exports = new Logger()
