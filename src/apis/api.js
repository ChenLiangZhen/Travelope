import axios from "axios";
import {API_BASE_URL} from "@env"

export const signupApi = axios.create({
	baseURL: API_BASE_URL,
	timeout: 2000,
})

export const signinApi = axios.create({
	baseURL: API_BASE_URL,
	timeout: 2000,
})

export const signinApi = axios.create({
	baseURL: API_BASE_URL,
	timeout: 2000,
})
