const OpenAiService = require("../services/openai.service")

class OpenAiController {
	initial = async (req, res) => {
		return res.sendData(await OpenAiService.initial(req.body))
	}
	communicate = async (req, res) => {
		return res.sendData(await OpenAiService.communicate(req.body))
	}
}

module.exports = new OpenAiController()
