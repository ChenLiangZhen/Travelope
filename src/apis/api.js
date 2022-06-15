import axios from "axios";
import {API_BASE_URL} from "@env"

console.log(API_BASE_URL)

export const signupApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 2000,
})

export const signinApi = axios.create({
	baseURL: "https://lightii.ap.ngrok.io",
	timeout: 2000,
})

