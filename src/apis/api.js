import axios from "axios"
import * as Keychain from "react-native-keychain"

export const signupApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 10000,
})

export const signinApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 10000,
})

export const request = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 10000,
})

export const geocodingApi = axios.create({
	baseURL: "https://maps.googleapis.com",
	timeout: 10000,
})

export const weatherApi = axios.create({
	baseURL: "https://api.openweathermap.org",
	timeout: 10000,
})

export const weatherRequest = (lon, lat) => {

	return new Promise(async (resolve, reject) => {
		weatherApi.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&lang=zh_TW&units=metric&appid=82967bb4dc2077d0480f07bd6391016f`)
		          .then(res=> resolve(res), rej=> {reject(rej)})
	})
}

export const weatherForecastRequest = (lon, lat) => {

	return new Promise(async (resolve, reject) => {
		weatherApi.get(`/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=zh_TW&units=metric&exclude=current,minutely,hourly,alerts&appid=82967bb4dc2077d0480f07bd6391016f`)
		          .then(res=> resolve(res), rej=> {reject(rej)})
	})
}


export const geocodingRequest = (lon, lat) => {

	return new Promise(async (resolve, reject) => {
		geocodingApi.get(`/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyBHArxoJk3LwO5cn8q52ej-cn9v_2dyo4o&language=zh_TW&result_type=street_address`)
		            .then(res => resolve(res), rej => {reject(rej)})
	})
}

//https://maps.googleapis.com/maps/api/geocode/json?latlng=25.031845092773438,121.46505476503532&key=AIzaSyBHArxoJk3LwO5cn8q52ej-cn9v_2dyo4o&language=zh_TW

const getPassword = async () => {

	try { // Retrieve the credentials
		const credentials = await Keychain.getGenericPassword()
		if (credentials) {
			console.log(
				"Credentials successfully loaded",
			)
			return credentials
		} else {
			console.log("No credentials stored")
		}
	} catch (error) {
		console.log("Keychain couldn't be accessed!", error)
	}
}


export async function apiRequest(method, route, req) {

	const token = await getPassword()
	const pureToken = token.password.replace(/['"]+/g, "")

	// console.log("token: " + pureToken)

	return new Promise(async (resolve, reject) => {
		switch (method) {

			case "get":
				request.get(route, Object.assign({
					headers: {
						Authorization: `Bearer ` + pureToken,
						"Cache-Control": "no-cache",
						"Pragma": "no-cache",
						"Expires": "0",
					},
				}, req))
				       .then(res => {
					       resolve(res.data)
				       }, rej => {
					       reject(rej)
				       })
				break

			case "post":
				request.post(route, req, {
					headers: {
						Authorization: `Bearer ` + pureToken,
						"Cache-Control": "no-cache",
						"Pragma": "no-cache",
						"Expires": "0",
					},
				})
				       .then(res => {
					       resolve(res.data)
				       }, rej => {
					       reject(rej)
				       })
				break

			case "put":
				request.put(route, req, {
					headers: {
						Authorization: `Bearer ` + pureToken,
						"Cache-Control": "no-cache",
						"Pragma": "no-cache",
						"Expires": "0",
					},
				})
				       .then(res => {
					       resolve(res.data)
				       }, rej => {
					       reject(rej)
				       })
				break
		}
	})
}
