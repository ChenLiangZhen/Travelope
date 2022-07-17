import axios from "axios";

const MapboxAuthorizationKey = "pk.eyJ1IjoibGlnaHRpaWNoZW4iLCJhIjoiY2t5YngyeGdtMGRoazMxcGkyN3l6cjdoYiJ9.4u0_rMb8Wk7Upg5bkliGTg"

export const CWBAuthorizationKey = "CWB-8B24F07D-48E1-4238-B2F5-EFAE29E7005B"
let cwbQueryEndpoint

const axios_mapbox = axios.create({
	baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
})

const axios_cwb = axios.create({
	baseURL: "https://opendata.cwb.gov.tw/api/v1/rest/datastore",
})

export function getMapboxAPI(lon, lat) {
	return new Promise((resolve, reject) => {
		axios_mapbox("/" + lon.toString() + "," + lat.toString() + ".json?country=tw&types=place%2Clocality%2Cdistrict&language=zh-Hant&limit=1&access_token=" + MapboxAuthorizationKey)
			.then(res => {
				resolve(res)
			}, rej => {
				reject(rej)
				console.log(rej.message)
			})
	})
}

export function getCwbAPI(endpoint, options) {
	return new Promise((resolve, reject) => {
		axios_cwb("/" + endpoint + "?Authorization=" + CWBAuthorizationKey + options)
			.then(res => {
				resolve(res)
			}, rej => {
				reject(rej)
				console.log(rej.message)
			})
	})
}
