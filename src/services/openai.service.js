const chatHistoryRepo = require("../repository/chatHistory")
const { BadRequestError } = require("../core/error.response")
const { OpenAI } = require("openai")
const { OPENAI_API_KEY } = require("../config")

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY,
})

class OpenAiService {
	static textToVoice = async (text) => {
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: text,
		})
		return new Buffer.from(await mp3.arrayBuffer())
	}

	static initial = async ({ message }) => {
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0613",
			messages: [
				{
					role: "system",
					content:
						"Correct me to send crypto asset (USDC, USDT or Solana) to someone, sentence only, format: [Send {amount} {crypto asset} to {receiver}]",
				},
				{
					role: "user",
					content: message,
				},
			],
		})
		const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
		const replyMessage = `${completion.choices[0].message.content}\nPlease confirm transaction with code: ${code}`
		const chatHistory = await chatHistoryRepo.createChatHistory({
			txMessage: completion.choices[0].message.content,
			confirmedCode: code,
			history: [
				{ role: "user", content: message },
				{ role: "assistant", content: replyMessage },
			],
		})
		const mp3 = await this.textToVoice(replyMessage)
		return {
			text: replyMessage,
			mp3,
			chatId: chatHistory._id,
		}
	}

	// eslint-disable-next-line no-unused-vars
	static communicate = async ({ message, chatId }) => {
		const chatHistory = await chatHistoryRepo.findChatHistory(chatId)
		if (!chatHistory) throw new BadRequestError("Invalid chat id")
		const completion = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0613",
			messages: [
				{
					role: "system",
					content: `
						You receive confirmed message includes code - random 6 digits from user. 
						If user confirmed, extract the code - 6 digits, Format: Extracted code: {code}.
						If user want to make transaction to others, correct user message to send crypto asset(USDC or USDT or Solana) to someone, sentence only, format: send { amount } { crypto asset } to { receiver }: `,
				},
				{
					role: "user",
					content: message,
				},
			],
		})
		let additionData = null
		let replyMessage
		let txMessage = chatHistory.txMessage
		let code = chatHistory.confirmedCode
		if (completion.choices[0].message.content.includes("Extracted")) {
			const msg = completion.choices[0].message.content
			console.log(msg)
			msg.slice(0, -7)
			if (msg.toUpperCase().includes(chatHistory.confirmedCode)) {
				replyMessage = "Voice confirmed, transaction's in process"
				const [action, amount, asset] = chatHistory.txMessage
					.split(" to ")[0]
					.split(" ")
				const receiver = chatHistory.txMessage.split(" to ")[1]
				additionData = {
					action,
					amount: Number(amount),
					asset,
					receiver: receiver.replaceAll(".", ""),
					domainName: receiver
						.replaceAll(".", "")
						.replaceAll(" ", "")
						.toLowerCase()
						.concat(".sol"),
				}
			} else {
				code =
					Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
				replyMessage = `Wrong code confirmed \nPlease confirm transaction with code: ${code}`
			}
		} else {
			code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000
			txMessage = completion.choices[0].message.content.trim()
			replyMessage = `${completion.choices[0].message.content}\nPlease confirm transaction with code: ${code}`
		}
		await chatHistoryRepo.findOneAndUpdate(
			{ _id: chatId },
			{
				confirmedCode: code,
				txMessage,
				history: [
					...chatHistory.history,
					{ role: "user", content: message },
					{ role: "assistant", content: replyMessage },
				],
			},
		)
		const mp3 = await this.textToVoice(replyMessage)
		return {
			text: replyMessage,
			mp3,
			chatId: chatHistory._id,
			additionData,
		}
	}
}

module.exports = OpenAiService
