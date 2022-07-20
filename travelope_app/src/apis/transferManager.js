import {apiRequest} from "./api"
import RNFS from "react-native-fs"

export const uploadImage = (accountID, key) => {

	apiRequest("get", `/travelope/get-upload-link/${accountID}/${key}`)
		.then(res => { // 取得授權後的檔案上傳連結

			uploadToURL(res.url, res.name)
			console.log(res)

		}, rej => console.log(rej))


	const files = [ // 設定上傳檔案的本地資訊
		{
			// name: "test1",
			filename: accountID,
			filepath: localPath,
			filetype: "image/*",
		},
	]

	const uploadToURL = async (url, name) => {

		RNFS.uploadFiles({

			binaryStreamOnly: true,
			toUrl: url,
			files: files,

			method: "PUT",
			headers: {
				"Content-Type": "application/octet-stream",
			},

		}).promise.then((response) => {

			if (response.statusCode == 200) {
				console.log("FILES UPLOADED!")

			} else {

				console.log("SERVER ERROR")
			}
		}).catch((err) => {
			if (err.description === "cancelled") {
				console.log("USER CANCELLED")
			}
			console.log(err)
		})
	}
}


export const uploadProfilePicture = (accountID, key, localPath) => {

	apiRequest("get", `/travelope/get-upload-link/${accountID}/${key}`)
		.then(res => { // 取得授權後的檔案上傳連結

			uploadToURL(res.url, res.name)
			console.log(res)

		}, rej => console.log(rej))


	const files = [ // 設定上傳檔案的本地資訊
		{
			// name: "test1",
			filename: accountID,
			filepath: localPath,
			filetype: "image/*",
		},
	]

	const uploadToURL = async (url, name) => {

		RNFS.uploadFiles({

			binaryStreamOnly: true,
			toUrl: url,
			files: files,

			method: "PUT",
			headers: {
				"Content-Type": "application/octet-stream",
			},

		}).promise.then((response) => {

			if (response.statusCode == 200) {
				console.log("FILES UPLOADED!")

			} else {

				console.log("SERVER ERROR")
			}
		}).catch((err) => {
			if (err.description === "cancelled") {
				console.log("USER CANCELLED")
			}
			console.log(err)
		})
	}
}

export const downloadProfilePicture = (accountID, key, localPath) => {

	return new Promise(async (resolve, reject) => {

		apiRequest("get", `/travelope/get-download-link/${accountID}/${key}`)
			.then(res => { // 取得授權後的檔案上傳連結

				downloadFromURL(res.url, res.name)
				console.log(res)

			}, rej => console.log(rej))

		const downloadFromURL = async (url) => {

			RNFS.downloadFile({

				fromUrl: url,            // URL to download file from
				toFile: localPath,       // Local filesystem path to save the file to
				background: true,        // Continue the download in the background after the app terminates (iOS only)
				discretionary: true,     // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
				cacheable: false,        // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)

				readTimeout: 5000,       // supported on Android and iOS
				backgroundTimeout: 5000  // Maximum time (in milliseconds) to download an entire resource (

			}).promise.then((response) => {

				if (response.statusCode == 200) {
					console.log("FILES DOWNLOADED, " + "bytesDownloaded: " + response.bytesWritten)

					resolve("success")

				} else {
					console.log("SERVER ERROR")
				}

			}).catch((err) => {
				if (err.description === "cancelled") {
					console.log("USER CANCELLED")
				}
				console.log(err)
			})
		}

	})

}
