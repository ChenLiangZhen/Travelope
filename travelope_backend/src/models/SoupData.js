const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const SoupDataSchema = new mongoose.Schema({
	soupId: {
		type: String,
		unique: true,
		required: true
	},
	soupType: {
		type: String,
		required: true
	},
	data: {
		type: Object,
		required: true
	},
}, {
	collection: "soup_data"
});

mongoose.model('soup_data', SoupDataSchema);
