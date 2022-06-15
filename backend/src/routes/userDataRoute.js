const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")
const SoupData = mongoose.model("soup_data")
const userAuth = require("../middleware/userAuth")

const router_data = express.Router()

router_data.get("/api/travelope/get-data", userAuth, async (req, res) => {

	try {
		UserData.findOne({userLink: req.query.id}, (e, data) => {
			if (e || !data) {
				return res.status(404).send("ERROR")
			}
			res.send(data)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.put(`/api/travelope/update-data`, userAuth, async (req, res) => {

	const {data, userLink} = req.body

	try {
		UserData.updateOne({userLink: userLink}, {data: data}, {}, (e, res) => {
			console.log(res.matchedCount)
		})

		res.sendStatus(200)
	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post(`/api/add-soup`, userAuth, async (req, res) => {

	const {soupId, soupType, data} = req.body

	try {

		const soup = new SoupData({soupId, soupType , data})
		await soup.save()

		res.sendStatus(200)

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}
})

router_data.get(`/api/get-soup`, userAuth, async (req, res) => {

	try {

		console.log(req.query.soupType)

		SoupData.aggregate([
			{ $match: { soupType: req.query.soupType }},
			{ $sample: {size: 1}}
		], {}, (err, result) => {
			console.log(result)
			res.send(result)
		});


	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

module.exports = router_data
