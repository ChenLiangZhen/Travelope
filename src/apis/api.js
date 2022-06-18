import axios from "axios";
import * as Keychain from "react-native-keychain";

export const signupApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 2000,
})

export const signinApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 2000,
})

const request = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
})

const getPassword = async () => {

	try { // Retrieve the credentials
		const credentials = await Keychain.getGenericPassword();
		if (credentials) {
			console.log(
				"Credentials successfully loaded for user " + JSON.stringify(credentials),
			);
			return credentials
		} else {
			console.log("No credentials stored");
		}
	} catch (error) {
		console.log("Keychain couldn't be accessed!", error);
	}
};

export async function apiRequest(method, route, req){

	const token = await getPassword()
	const pureToken = token.password.replace(/['"]+/g, '')

	console.log("token: " + pureToken)

	return new Promise( async (resolve, reject)=>{
		switch(method){

			case "get":
				request.get(route, Object.assign({
					headers: { Authorization: `Bearer ` + pureToken},
				}, req))
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break

			case "post":
				request.post(route, req, {headers: { Authorization: `Bearer ` + pureToken}})
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break

			case "put":
				request.put(route,req, {headers: { Authorization: `Bearer ` + pureToken}})
					.then(res => {
						resolve(res.data)
					}, rej=> {
						reject(rej)
					})
				break
		}
	})
}
