const app = require("./src/app")
const { APP_PORT } = require("./src/config")

const server = app.listen(APP_PORT, () => {
	console.log(`Server listening on ${APP_PORT}`)
})

process.on("SIGINT", () => {
	server.close(() => console.log("server closed"))
})
