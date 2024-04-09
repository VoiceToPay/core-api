"use strict"

const express = require("express")
// const { apiKey, permission } = require("../middleware/apikey.middleware")

const router = express.Router()

// router.use(apiKey)
// router.use(permission("0000"))

router.get("/", (req, res) => {
	res.sendData("ok")
})
router.use("/", require("./converter"))

module.exports = router
