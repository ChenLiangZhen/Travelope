import { Box, HStack, Pressable, Text, useTheme } from "native-base"
import { useEffect, useState } from "react"
import React from "react"
import { View, Image } from "react-native"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import SVG from "../res/AppIcon.svg"
import LinearGradient from "react-native-linear-gradient"
import MaskedView from "@react-native-masked-view/masked-view"
import { IB_ArrowLeft, IB_User } from "./GradientIconButton"
import { useSelector } from "react-redux"
import { selectAccount } from "../globalstate/accountSlice"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { config, animated, useSpring } from "@react-spring/native"

const AppHeader = (props) => {

	const [translatedTitle, setTranslatedTitle] = useState("")
	const account = useSelector(selectAccount)
	const theme = useTheme().colors
	const navigation = useNavigation()
	const [present,  setPresent ] = useState(false)

	const anim = useSpring({
		opacity: present ? 1 : 0,
		top: present ? 0 : 50,
		delay: 0,
		config: config.slow
	})

	useEffect(() => {

		const unsubscribe = navigation.addListener('beforeRemove', () => {
			setPresent(false)
		});

		return unsubscribe;

	}, [navigation]);

	useFocusEffect(
		React.useCallback(() => {

			setPresent(true)

		}, [account])
	)

	useEffect(() => {

		switch (props.title) {
			case "MainScreen":
				setTranslatedTitle("主頁")
				break
			case "CurrentTrip":
				setTranslatedTitle("目前旅程")
				break
			case "NewTrip":
				setTranslatedTitle("新旅程")
				break
			case "TripOverview":
				setTranslatedTitle("旅程總覽")
				break
			case "MemEnvelope":
				setTranslatedTitle("回憶信封")
				break
			case "TripPostcard":
				setTranslatedTitle("旅程紀念卡")
				break
			case "MyZone":
				setTranslatedTitle("我的圈子")
				break
			case "Settings":
				setTranslatedTitle("個人設定")
				break
			case "NewNote":
				setTranslatedTitle("旅遊日記")
				break
			case "LegacyTrip":
				setTranslatedTitle("歷史旅程")
				break
			case "LegacyNote":
				setTranslatedTitle("歷史日記")
				break
			case "SharedWithMe":
				setTranslatedTitle("與我分享的旅程")
				break
			default:
				setTranslatedTitle("尚未翻譯")
		}
	}, [])

	return (

		// <animated.View style={anim}>
			<View
				style={{
					marginBottom: 24,
				}}
			>
				<View
					style={{

						flexDirection: "row",
						paddingRight: 20,
						paddingBottom: 4,
						marginTop: props.paddingTop,
						height: 48,
						backgroundColor: "#fff",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/*{*/}
					{/*	props.title === "MainScreen"?*/}
					{/*		*/}
					{/*	account.info.profilePictureLocalPath !== ""?*/}

					{/*		<Pressable*/}
					{/*			onPress={() => navigation.navigate("Settings")}>*/}
					{/*			<Image*/}
					{/*				style={{*/}
					{/*					borderRadius: 100,*/}
					{/*					height: 26,*/}
					{/*					width: 26,*/}
					{/*				}}*/}
					{/*				source={{ uri: account.info.profilePictureLocalPath }}*/}
					{/*				alt={"userImage"}*/}
					{/*			/></Pressable>*/}

					{/*		: <Pressable*/}
					{/*			onPress={() => navigation.navigate("Settings")}*/}

					{/*		><Feather name={"user"} color={theme.primary.text.purple} size={32} /></Pressable>*/}


					{/*	: <IB_ArrowLeft />*/}

					{/*}*/}

					{
						props.title === "MainScreen"?

							// <Image
							// 	style={{ height: 32 }}
							// 	source={require("../res/AppIcon.svg")}
							// />
							// <SVGImg width={200}/>

							// <HStack ml={4}>

							<Image
								source={require("../res/branding_eng_larger.png")}
								style={{

									resizeMode: "contain",
									// height: 20,
									width: 190,
									marginLeft: 8,

								}}
							/>

							// </HStack>


							:

							<MaskedView
								style={{ width: 200, justifyContent: "center", alignItems: "flex-start" }}
								maskElement={
									<HStack flex={1} ml={28}justifyContent={"flex-start"} alignItems={"center"}>
										<Text letterSpacing={1} fontWeight={"bold"} fontSize={20}>
											{translatedTitle}
										</Text>
									</HStack>
								}>

								<LinearGradient
									useAngle={true}
									angle={170}
									angleCenter={{ x: 0.2, y: 0.7 }}
									locations={[0.2, 1]}
									colors={["#6575ff", "#e159ff"]}
									style={{ height: "100%", width: "100%" }}
								/>
							</MaskedView>

					}

					<Pressable

						style={{
							zIndex: 100,
							height: 32,
							width: 32,
						}}
						onPress={() => {
							props.navigation.openDrawer()
						}}>

						<MaskedView

							style={{ flex: 1, flexDirection: "row", height: 32}}
							maskElement={
								<View
									style={{
										flex: 1,
										backgroundColor: "transparent",
										justifyContent: "center",
										alignItems: "center",
									}}>
									<Feather
										name={"menu"}
										size={24}
									/>
								</View>
							}>
							<LinearGradient
								useAngle={true}
								angle={170}
								angleCenter={{ x: 0.5, y: 0.7 }}
								locations={[0, 0.6]}
								colors={["#6675ff", "#bf67ff"]}
								style={{ flex: 1 }}
							/>
						</MaskedView>
					</Pressable>
				</View>

				{/*<LinearGradient*/}

				{/*	useAngle={true}*/}
				{/*	angle={90}*/}
				{/*	// angleCenter={{x: 0.5, y: 0.5}}*/}
				{/*	locations={[0, .9]}*/}
				{/*	colors={["#a79aff", "#ce99ff"]}*/}
				{/*	style={{ height: 1, width: "100%" }}*/}

				{/*/>*/}

			</View>
		// </animated.View>

	)
}

export default AppHeader
