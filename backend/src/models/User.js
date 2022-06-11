const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema({
	nickname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
}, {
	collection: "user_account"
});

UserSchema.pre("save", function(next){
	const user = this;

	//如果密碼沒有改變，則進行下下一步
	if(!user.isModified("password")){
		return next()
	}

	//產生加鹽代碼
	bcrypt.genSalt(10, (err, salt) => {
		if(err){
			return next("genSalt: " + err)
		}

		//加鹽
		bcrypt.hash(user.password, salt, (err, hash) =>{
			if(err) {
				return next("hash: " + err)
			}

			user.password = hash
			next()
		})
	})
})

UserSchema.methods.comparePassword = function(userInputPassword){
	const user = this

	return new Promise((res, rej) => {
		bcrypt.compare(userInputPassword, user.password, (err, isMatch)=> {
			if(err){
				return (err)
			}

			if(!isMatch){
				return rej(false)
			}

			res(true)
		})
	})
}

mongoose.model('user_account', UserSchema);
