"use strict"

const { Schema, model } = require("mongoose")

const DOCUMENT_NAME = "chatHistory"
const COLLECTION_NAME = "chatHistories"

var chatHistorySchema = new Schema(
	{
		txMessage: {
			type: String,
			required: true,
		},
		confirmedCode: {
			type: String,
			required: true,
		},
		history: [],
	},
	{
		timestamps: true,
		collection: COLLECTION_NAME,
	},
)
module.exports = model(DOCUMENT_NAME, chatHistorySchema)
