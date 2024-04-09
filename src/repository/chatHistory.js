const BaseRepo = require("./base.repo")
const { chatHistoryModel } = require("../models")

class ChatHistoryRepo extends BaseRepo {
	constructor() {
		super(chatHistoryModel, "chat-history")
	}

	createChatHistory = async ({ txMessage, confirmedCode, history }) => {
		return await this.create({
			txMessage,
			confirmedCode,
			history,
		})
	}

	findChatHistory = async (chatId) => await this.findById(chatId)
}

module.exports = new ChatHistoryRepo()
