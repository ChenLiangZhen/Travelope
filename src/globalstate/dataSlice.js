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

			state.trips = []
		},

		setTrips(state, action) { //用於第一次載入，從後端擷取資料用。
			state.trips = action.payload
		},

		setCurrentTrip(state, action) { //用於更新目前的旅程用。 最新的旅程為旅程陣列的最後一個元素。
			state.trips[state.trips.length - 1] = action.payload
		},

		pushTrip(state, action) { //建立一個新的旅程，一個新的旅程只會執行一次這個函式。
			state.trips.push(action.payload)
		},

		pushTripNote(state, action) { //在當前旅程新增遊記。
			state.trips[state.trips.length - 1].tripNotes.push(action.payload)
		},

		delTripNote(state, action) {
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
} = dataSlice.actions
export default dataSlice.reducer
