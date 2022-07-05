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

		// {
		// 	isActive: false,
		// 	tripName: "",
		// 	tripID: "",
		// 	startTime: {},
		// 	endTime: {},
		// 	fellowList: [],
		//
		// 	fellow: {
		// 		name: "",
		// 		key: "",
		// 	},
		//
		// 	tripNotes: [{
		//
		// 		title: "",
		// 		description: "",
		// 		mood: "",
		// 		imageKey: "",
		//
		// 		longitude: "",
		// 		latitude: "",
		//
		// 		adjPhrases: [],
		// 		weather: "",
		//
		// 	}, {
		//
		// 		recordTime: {},
		//
		// 		title: "",
		// 		description: "",
		// 		mood: "",
		// 		imageKey: "",
		//
		// 		longitude: "",
		// 		latitude: "",
		//
		// 		adjPhrases: [],
		// 		weather: "",
		//
		// 	}],
		//
		// },
	],

}

const dataSlice = createSlice({

	name: "data",
	initialState,

	reducers: {

		purgeAccountData(state) { //用於登出用。

			console.log("PURGE DATA")
			state.trips = []
		},

		setTrips(state, action) { //用於第一次載入，從後端擷取資料用。

			console.log("SET TRIPS")
			state.trips = action.payload
		},

		setCurrentTrip(state, action) { //用於更新目前的旅程用。 最新的旅程為旅程陣列的最後一個元素。

			console.log("SET CURRENT TRIP")
			state.trips[state.trips.length - 1] = action.payload
		},

		pushTrip(state, action) { //建立一個新的旅程，一個新的旅程只會執行一次這個函式。

			console.log("PUSH TRIP")
			state.trips.push(action.payload)
		},

		pushTripNote(state, action) { //在當前旅程新增遊記。

			console.log("PUSH TRIP NOTE")
			state.trips[state.trips.length - 1].tripNotes.push(action.payload)
		},

		updateTripNote(state, action) { //在當前旅程新增遊記。

			console.log("UPDATE TRIP NOTE")
			const targetID = state.trips[state.trips.length - 1].tripNotes.findIndex( note => note.noteID  === action.payload.noteID)
			state.trips[state.trips.length - 1].tripNotes[targetID] = action.payload.item
		},

		delTripNote(state, action) {

			console.log("DEL TRIP NOTE")
			let targetIndex = state.trips[state.trips.length - 1].tripNotes.findIndex(trip => trip.recordTime === action.payload)
			state.trips[state.trips.length - 1].tripNotes.splice(targetIndex, 1)
		},

		setInactive(state) {
			state.trips[state.trips.length - 1].isActive = false
		},
	},
})

export const selectData = (state) => state.data
export const {

	purgeAccountData,
	setTrips,
	setInactive,
	pushTrip,
	pushTripNote,
	delTripNote,
	setCurrentTrip,
	updateTripNote

} = dataSlice.actions

export default dataSlice.reducer
