const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")

const router = express.Router()

router.post("/api/signup", async (req, res) => {

	const { nickname ,email, password } = req.body
	let linkId, userData

	try{

		if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return res.status(400).send("Signup Failed: Email Invalid.")
		}

		//以 User Model 建立新的使用者，並儲存使用者至資料庫
		const user = new User({ nickname ,email, password })
		await user.save()


		//使用用戶 id 與伺服器端私鑰產生 Json Web Token，並回傳。 回傳的 Token 必須存放於使用者裝置。
		//SECRET_KEY_OF_MIDTERM_PROJECT，Base64 Encoded.

		linkId = user._id
		userData = {
			noteData: [
				{
					id: "0",
					title: "心情好好～～",
					content: "從來沒想過會遇到這麼雞掰的一天．．．",
					createdAt: {
						year: 2022,
						month: 4,
						day: 4
					},
					noteMood: 1
				},
				{
					id: "1",
					title: "今天超雞掰！！！",
					content: "心情怎麼可以這麼好 wow",
					createdAt: {
						year: 2022,
						month: 4,
						day: 5
					},
					noteMood: 1
				},
			],
			setting: {
				userName: nickname,
				userEmail: email,
				displayBackground: false,
				background: "bigcookie",
				accessibility: false,
				noteDisplayTwoColumn : false,
				tabBarDisplayFloat: false,
			}
		}

		const data = new UserData({
			userLink :linkId ,
			data: userData})
		await data.save()

		const token = jwt.sign({userId: user._id}, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")
		res.send({ token })

	} catch(e){

		res.status(422).send("Signup Failed: " + e)
		console.log("[Sign Up]: " + e)
	}

})

router.post('/api/signin', async(req, res) => {
	const {email, password } = req.body

	if(!email || !password){
		return res.status(422).send({ error: "must provide email and password."})
	}
	//尋找該 email 的使用者是否存在。 若不在則回傳錯誤。
	const user = await User.findOne({ email })
	if(!user){
		return res.status(422).send({ error: "invalid password of email"})
	}

	try{
		await user.comparePassword(password)
		const token = jwt.sign({ userId: user._id }, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=")

		const userData = await UserData.findOne({userLink: user._id})

		res.send({ token, userData })
	}catch (e){
		return res.status(422).send({ error: "invalid password of email"})
	}
})

module.exports = router