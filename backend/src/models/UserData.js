const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Notes = new mongoose.Schema({

	noteID: {
		type: String,
	},

	recordTime: {
		type: Object
	},

	noteTitle: {
		type: String
	},

	noteContent: {
		type: String
	},

	imageList: {
		type: []
	},

	lon: {
		type: String
	},

	lat: {
		type: String
	},

})

const Trip = new mongoose.Schema({

	isActive: {
		type: Boolean
	},

	tripID: {
		type: Object
	},

	tripName: {
		type: String
	},

	tripDescription: {
		type: String
	},

	startTime: {
		type: Object
	},

	endTime: {
		type: Object
	},

	fellowList: {
		type: []
	},

	tripNotes: {
		type: [Notes]
	},
})

const UserDataSchema = new mongoose.Schema({
	userLink: {
		type: String,
		unique: true,
		required: true
	},
	trips: {
		type: [Trip],
	},
}, {
	collection: "user_data"
});

mongoose.model('user_data', UserDataSchema);
