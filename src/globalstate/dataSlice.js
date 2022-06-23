import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialState = {

	currentTrip: {

		isActive: true,
		tripName: "",
		startTime: {},
		endTime: {},
		fellowList: [],

		// fellow: {
		//   name: "",
		//   key: ""
		// },

		tripNotes: [],

		// tripNote: {
		//
		//   recordTime: {},
		//
		//   title: "",
		//   description: "",
		//   mood: "",
		//   imageKey: "",
		//
		//   longitude: "",
		//   latitude: "",
		//
		//   adjPhrases: [],
		//   weather: "",
		// }

	},


	trips: [

		{
			isActive: false,
			tripName: "",
			tripID: "",
			startTime: {},
			endTime: {},
			fellowList: [],

			fellow: {
				name: "",
				key: "",
			},

			tripNotes: [{

				recordTime: {
					y: 2022,
					m: 6,
					d: 24,

				},

				title: "",
				description: "",
				mood: "",
				imageKey: "",

				longitude: "",
				latitude: "",

				adjPhrases: [],
				weather: "",

			}, {

				recordTime: {},

				title: "",
				description: "",
				mood: "",
				imageKey: "",

				longitude: "",
				latitude: "",

				adjPhrases: [],
				weather: "",

			}],

		},
	],


}

const dataSlice = createSlice({

	name: "data",
	initialState,

	reducers: {

		purgeAccountData(state) {
			state.currentTrip = initialState.currentTrip
			state.trips = initialState.trips
		},

		setTrips(state, action) {
			state.trips = action.payload
		},

		pushTrip(state, action) {
			state.trips.push(action.payload)
		},

		setCurrentTrip(state, action) {
			state.currentTrip = action.payload
		},

	},
})

export const selectData = (state) => state.data
export const {

	purgeAccountData,
	setTrips,
	pushTrip,
	setCurrentTrip,
} = dataSlice.actions
export default dataSlice.reducer
