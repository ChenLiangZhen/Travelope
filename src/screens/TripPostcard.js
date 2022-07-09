import React, { useEffect, useRef, useState } from "react"
import LayoutBase from "../components/LayoutBase"
import ViewShot from "react-native-view-shot"
import { HStack, Text, useTheme } from "native-base"
import { Image } from "react-native"
import image from "native-base/src/components/primitives/Image"
import { useFocusEffect } from "@react-navigation/native"
import { GradientBorderButton, GradientButton } from "../components/GradientButton"
import Share from 'react-native-share';

const TripPostcard = ({route, navigation}) => {

	const { uri } = route.params

	const theme = useTheme().colors

	const ref = useRef();
	const [imageURI, setImageURI] = useState(uri)
	const [imageReady, setImageReady] = useState(false)

	useFocusEffect(
		React.useCallback(() => {

			setImageURI(uri)
			console.log(uri)

		}, [uri]),
	)

	return (

		<LayoutBase>

			<HStack borderWidth={1} borderColor={theme.primary.text.purple} w={"100%"} borderRadius={18} p={36} h={"80%"} justifyContent={"center"} alignItems={"center"}>

				<Image
					alt={"export_preview"}
					source={{ uri: imageURI }}
					resizeMode={"contain"}
					style={{
						marginTop: 36,
						// borderWidth: 1,
						height: "100%",
						width: "100%",
					}}
				/>

			</HStack>



			<HStack w={"100%"} h={64} mt={32} justifyContent={"center"} alignItems={"center"}>

				<GradientBorderButton color={theme.primary.text.purple} title={"返回"} onPress={()=> {
					navigation.goBack()
				}}/>

				<GradientButton ml={8} w={100} title={"分享圖片"} onPress={()=> {
					Share.open({ url: imageURI })
					     .then((res) => {
						     console.log(res);
					     })
					     .catch((err) => {
						     err && console.log(err);
					     });
				}}/>

			</HStack>

		</LayoutBase>
	)
}

export default TripPostcard
