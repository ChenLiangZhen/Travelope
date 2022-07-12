const express = require("express")
const mongoose = require("mongoose")
const aws = require("aws-sdk")
const jwt = require("jsonwebtoken")
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")
const userAuth = require("../middleware/userAuth")

require("dotenv").config()

const router_transfer = express.Router()
const bucketName = "horizones-space"
const doSpaces = new aws.Endpoint("sgp1.digitaloceanspaces.com")

const accessKey = process.env.DOSPACE_ACCESS_KEY
const secretKey = process.env.DOSPACE_SECRET_KEY

const doClient = new aws.S3({

	endpoint: doSpaces,
	region: "us-east-1",
	credentials: {
		accessKeyId: accessKey,
		secretAccessKey: secretKey,
	},
})

router_transfer.get("/api/travelope/get-upload-link/:accountID/:key", userAuth, async (req, res) => {

	const { accountID, key } = req.params

	const doParams = {
		Bucket: bucketName,
		Key: "travelope/user_contents/" + accountID + "/" + key,
		Expires: 10000000,
		ContentType: "application/octet-stream",
	}

	try {

		const uploadURL = await doClient.getSignedUrlPromise("putObject", doParams)
		res.json({ url: uploadURL, name: key })

	} catch (err) {

		console.log("[fileTransfer]: " + err)
	}

})

router_transfer.get("/api/travelope/get-download-link/:accountID/:key", userAuth, async (req, res) => {

	const { accountID, key } = req.params

	const doParams = {
		Bucket: bucketName,
		Key: "travelope/user_contents/" + accountID + "/" + key,
		Expires: 10000000,
	}

	try {

		const downloadURL = await doClient.getSignedUrlPromise("getObject", doParams)
		res.json({ url: downloadURL })

	} catch (err) {

		console.log("[fileTransfer]: " + err)
	}

})

module.exports = router_transfer
