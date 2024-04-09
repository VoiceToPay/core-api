const multer = require("multer")
const path = require("path")

const uploads = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./public/voice")
		},
		filename: function (req, file, cb) {
			cb(null, `voice-${Date.now()}` + path.extname(file.originalname))
		},
	}),
	fileFilter: function (req, file, callback) {
		var ext = path.extname(file.originalname)
		if(ext !== ".mp3" && ext !== ".m4a") {
			return callback(new Error())
		}
		callback(null, true)
	},
	limits: { fileSize: 1024*1024*10 /* bytes */ }
})

module.exports = uploads