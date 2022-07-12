const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const userAuth = require("../middleware/userAuth")
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")

const router_user = express.Router()

router_user.get("/api/travelope/find-user/:accountID",userAuth ,async (req, res) => {

	const { accountID } = req.params

	try {
		console.log(accountID)
		User.findOne({id: accountID}, (e, data) => {

			if (e || !data) {
				console.log("ERROR FINDING USER:" + e)
				return res.status(404).send("ERROR")
			}

			res.send(data)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_user.post("/api/travelope/signup", async (req, res) => {

	const { nickname, email, id, password } = req.body
	let linkId, userData

	try {

		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return res.status(400).send("Signup Failed: Email Invalid.")
		}

		//以 User Model 建立新的使用者，並儲存使用者至資料庫
		const user = new User({ nickname, email, id, password })
		await user.save()


		//使用用戶 id 與伺服器端私鑰產生 Json Web Token，並回傳。 回傳的 Token 必須存放於使用者裝置。
		//SECRET_KEY_OF_MIDTERM_PROJECT，Base64 Encoded.

		linkId = user.id
		userData = {}

		const data = new UserData({
			userLink: linkId,
			data: userData,
		})

		await data.save()

		const token = jwt.sign({ userId: user._id }, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")
		res.send({ token })

	} catch (e) {

		res.status(422).send("Signup Failed: " + e)
		console.log("[Sign Up]: " + e)
	}

})

router_user.post("/api/travelope/signin", async (req, res) => {

	const { email, password } = req.body

	if (!email || !password) {
		return res.status(422).send({ error: "must provide email and password." })
	}
	//尋找該 email 的使用者是否存在。 若不在則回傳錯誤。
	const user = await User.findOne({ email })
	if (!user) {
		return res.status(422).send({ error: "invalid password of email" })
	}

	try {
		await user.comparePassword(password)
		const token = jwt.sign({ userId: user._id }, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")

		const userData = await UserData.findOne({ userLink: user.id })

		console.log("userData: " + userData)
		console.log("user: " + user)

		res.send({ token, user, userData })
	} catch (e) {
		return res.status(422).send({ error: "invalid password of email" })
	}
})

router_user.post("/api/travelope/sign-with-apple", async (req, res) => {

	const { email, password } = req.body

	if (!email || !password) {
		return res.status(422).send({ error: "must provide email and password." })
	}

	//尋找該 email 的使用者是否存在。 若不在則回傳錯誤。
	const user = await User.findOne({ email })

	if (!user) {
		try {

			let nickname = email
			let id = "" + new Date().getTime()


			if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
				return res.status(400).send("Signup Failed: Email Invalid.")
			}

			//以 User Model 建立新的使用者，並儲存使用者至資料庫
			const user = new User({ nickname, email, id, password })
			await user.save()


			//使用用戶 id 與伺服器端私鑰產生 Json Web Token，並回傳。 回傳的 Token 必須存放於使用者裝置。
			//SECRET_KEY_OF_MIDTERM_PROJECT，Base64 Encoded.

			linkId = user.id
			userData = {}

			const data = new UserData({
				userLink: linkId,
				data: userData,
			})

			await data.save()

			const token = jwt.sign({ userId: user._id }, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")

			res.send({ token, user, userData })

		} catch (e) {

			res.status(422).send("Signup Failed: " + e)
			console.log("[Sign Up]: " + e)
		}
	} else {

		try {
			await user.comparePassword(password)
			const token = jwt.sign({ userId: user._id }, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")

			const userData = await UserData.findOne({ userLink: user.id })

			console.log("userData: " + userData)
			console.log("user: " + user)

			res.send({ token, user, userData })

		} catch (e) {
			return res.status(422).send({ error: "invalid password of email" })
		}
	}
})

router_user.put("/api/travelope/update-user", async (req, res) => {

	const { id, data } = req.body

	try {
		User.updateOne({ id: id },
			{

				email: data.email,
				password: data.password,
				nickname: data.nickname,
				hasRemoteProfilePicture: data.hasRemoteProfilePicture,

				isAppleAccount: data.isAppleAccount
			},
			{},
			(e, res) => {
				console.log("[MATCHED COUNT]: " + res.matchedCount)
			})

		res.sendStatus(200)

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_user.put("/api/travelope/update-user-has-picture", async (req, res) => {

	const { id } = req.body

	try {
		User.updateOne({ id: id },
			{
				hasRemoteProfilePicture: true,
			},
			{},
			(e, res) => {
				console.log("[MATCHED COUNT]: " + res.matchedCount)
			})

		res.sendStatus(200)

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_user.post("/api/travelope/add-friend/:accountID", async (req, res) => {

	const { key, name, pictureURL, tag } = req.body
	const { accountID } = req.params

	try {

		User.findOne({id: accountID}, async (e, user)=> {

			if (e || !user) {
				console.log("ERROR FINDING USER:" + e)
				return res.status(404).send("ERROR")
			}

			if(user.friends.find(item => item.key === key)){

				return res.status(409).send("duplicate")
			}

			user.friends.push({

				key : key,
				name: name,
				pictureURL: pictureURL,
				tag: tag
			})

			await user.save()

			return res.status(200)

		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

router_user.post("/api/travelope/del-friend/:accountID/:key", async (req, res) => {

	const { key, accountID } = req.params

	try {

		User.findOne({id: accountID}, async (e, user)=> {

			if (e || !user) {
				console.log("ERROR FINDING USER:" + e)
				return res.status(404).send("ERROR")
			}

			if(!user.friends.find(item => item.key === key)){

				console.log("ERROR FINDING DEL FRIEND.")
				return res.status(422).send("ERROR")
			}

			let delIndex = user.friends.findIndex(item => item.key === key)
			user.friends.splice(delIndex,1)

			await user.save()

			return res.status(200)
		})

	} catch (e) {

		res.status(422).send("Update Data Failed: " + e)
		console.log("[Update Data Failed]: " + e)
	}

})

module.exports = router_user
