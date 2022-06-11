const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = mongoose.model("user_account")
const UserData = mongoose.model("user_data")

module.exports= (req, res, next) => {
	const { authorization } = req.headers

	if(!authorization){
		console.log("[userAuth]: Invalid JWT Token")
		return res.status(401).send({ error: "You must be logged in."})
	}

	const token = authorization.replace("Bearer ", "")
	jwt.verify(token, "U0VDUkVUX0tFWV9PRl9NSURURVJNX1BST0pFQ1Q=", async(err, payload) => {
		if(err){
			console.log("[userAuth]: Invalid JWT Token")
			return res.status(401).send({ error: "You must be logged in." })
		}

		const { userId } = payload;

		req.user = await User.findById(userId)
		req.data = await UserData.findOne({userLink: userId}, (err, doc)=>{

			if (err){
				return res.status(404).send({ error: "Document not found" })
			}

			return doc
		}).clone().catch(err=>{
			console.log("[GET]: " + err)
		})
		next()
	})
}