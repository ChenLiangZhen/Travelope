const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")
const SoupData = mongoose.model("soup_data")
const userAuth = require("../middleware/userAuth")

const router_data = express.Router()

router_data.get("/travelope/get-trips/:accountID", userAuth, async (req, res) => {

	const {accountID} = req.params

	try {
		UserData.findOne({userLink: req.query.id}, (e, data) => {
			if (e || !data) {
				return res.status(404).send("ERROR")
			}

			res.send(data.trips)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post("/travelope/new-trip/:accountID", userAuth, async (req, res) => {

	const {accountID} = req.params
	const tripData = req.body

	console.log("new Trip")

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {
			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			console.log(userData)

			let prevActiveTripIndex = userData.trips.findIndex(trip => trip.isActive === true)
			if (prevActiveTripIndex >= 0) {

				console.log("found previous active trip.")

				userData.trips[prevActiveTripIndex].isActive = false
				await userData.save()
			}

			userData.trips.push(tripData)
			await userData.save()

			res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post("/travelope/new-shared-trip/:sharedAccountID/:fromAccountID/:fromAccountNickname", userAuth, async (req, res) => {

	const {sharedAccountID, fromAccountID, fromAccountNickname} = req.params
	const tripData = req.body

	console.log("new shared Trip")

	try {
		UserData.findOne({userLink: sharedAccountID}, async (e, userData) => {

			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			console.log(userData)

			// let prevActiveTripIndex = userData.trips.findIndex(trip => trip.isActive === true)
			// if (prevActiveTripIndex >= 0) {
			//
			// 	console.log("found previous active trip.")
			//
			// 	userData.trips[prevActiveTripIndex].isActive = false
			// 	await userData.save()
			// }

			userData.sharedTrips.push({
				...tripData,
				sharedAccountID: sharedAccountID,
				fromAccountID: fromAccountID,
				fromAccountNickname: fromAccountNickname
			})

			userData.save()

			res.status(200).send("successfully shared trip")
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post("/travelope/del-trip/:accountID/:tripID", userAuth, async (req, res) => {

	const {accountID, tripID} = req.params

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {
			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			console.log(userData)

			let targetIndex = userData.trips.findIndex(trip => trip.tripID === tripID)
			if (targetIndex >= 0) {

				console.log("found del trip target.")

				userData.trips.splice(targetIndex, 1)
				await userData.save()
			}

			res.status(200).send("Successfully del trip")
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post("/travelope/new-trip-note/:accountID", userAuth, async (req, res) => {

	const {accountID} = req.params
	const tripNoteData = req.body

	console.log(tripNoteData)

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {

			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			let targetTripIndex = userData.trips.findIndex(trip => trip.isActive === true)
			if (targetTripIndex >= 0) {

				userData.trips[targetTripIndex].tripNotes.push(tripNoteData)
				await userData.save()
			}

			res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.put("/travelope/update-trip-note/:accountID/:noteID", userAuth, async (req, res) => {

	const {accountID, noteID} = req.params
	const tripNoteData = req.body

	console.log("updateTripNote" + tripNoteData)

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {

			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			let targetTripIndex = userData.trips.findIndex(trip => trip.isActive === true)
			if (targetTripIndex >= 0) {

				const targetIndex = userData.trips[targetTripIndex].tripNotes.findIndex(item => item.noteID === noteID)
				userData.trips[targetTripIndex].tripNotes[targetIndex] = tripNoteData
				await userData.save()
			}

			res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.put("/travelope/set-trip-inactive/:accountID/:tripID", userAuth, async (req, res) => {

	const {accountID, tripID} = req.params

	console.log("setTripInactive")

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {

			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			let targetTripIndex = userData.trips.findIndex(trip => trip.tripID === tripID)
			if (targetTripIndex >= 0) {


				userData.trips[targetTripIndex].isActive = false
				await userData.save()
			}

			res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.post("/travelope/del-trip-note/:accountID/:noteID", userAuth, async (req, res) => {

	const {accountID, noteID} = req.params

	try {
		UserData.findOne({userLink: accountID}, async (e, userData) => {

			if (e || !userData) {
				return res.status(404).send("ERROR")
			}

			let targetTripIndex = userData.trips.findIndex(trip => trip.isActive === true)
			if (targetTripIndex >= 0) {

				const targetIndex = userData.trips[targetTripIndex].tripNotes.findIndex(item => item.noteID === noteID)
				userData.trips[targetTripIndex].tripNotes.splice(targetIndex, 1)
				await userData.save()
			}

			res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_data.put(`/travelope/update-data`, userAuth, async (req, res) => {

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

module.exports = router_data
