const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const UserDataSchema = new mongoose.Schema({
	userLink: {
		type: String,
		unique: true,
		required: true
	},
	data: {
		type: Object,
		required: true
	},
}, {
	collection: "user_data"
});

mongoose.model('user_data', UserDataSchema);