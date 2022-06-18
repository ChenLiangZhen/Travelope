import RNFS from "react-native-fs"

export const profilePictureInit = async (image, accountID, prevImgPath) => {

	console.log("fire function.")

	return new Promise(async (resolve, reject) => {

		const randomName = accountID + new Date().getTime()

		RNFS.exists(RNFS.DocumentDirectoryPath + "/travelope")

		    .then(async result => {

			    console.log("fire function 1")

			    if (!result) {   // 若使用者手機沒有ＴＲＡＶＥＬＯＰＥ資料夾，建立一個

				    console.log("Travelope directory not found. Create one.")
				    await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/travelope")

			    }

					if(prevImgPath != ""){

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

		    }, rej => reject(rej))
	})
}

