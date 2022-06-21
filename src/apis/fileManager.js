import RNFS from "react-native-fs"

export const profilePictureInit = async (image, accountID, prevImgPath) => {

	console.log("fire function.")

	return new Promise(async (resolve, reject) => {

		const randomName = accountID + new Date().getTime()

		if (prevImgPath != "") {

			console.log("Previous profile picture found. Delete.")
			await RNFS.unlink(prevImgPath)
		}

		RNFS.moveFile(image.path, RNFS.DocumentDirectoryPath + "/travelope/" + randomName, {
			NSURLIsExcludedFromBackupKey: false,
		})
		    .then(() => {

			    console.log("fire function 4")

			    resolve(RNFS.DocumentDirectoryPath + "/travelope/" + randomName)
		    })
	})
}

