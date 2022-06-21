import {Box, HStack, Pressable, Text} from "native-base";
import {useEffect, useState} from "react";
import React from "react";
import {View,  Image} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SVG from "../res/AppIcon.svg"
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { IB_ArrowLeft, IB_User } from "./GradientIconButton";

const AppHeader = (props) => {

	const [translatedTitle, setTranslatedTitle] = useState("")

	useEffect(() => {
		switch (props.title) {
			case 'MainScreen':
				setTranslatedTitle("主頁")
				break
			case 'CurrentTrip':
				setTranslatedTitle("目前旅程")
				break
			case 'NewTrip':
				setTranslatedTitle("新旅程")
				break
			case 'TripOverview':
				setTranslatedTitle("旅程總覽")
				break
			case 'MemEnvelope':
				setTranslatedTitle("回憶信封")
				break
			case 'TripPostcard':
				setTranslatedTitle("旅程紀念卡")
				break
			case 'MyZone':
				setTranslatedTitle("我的圈子")
				break
			case 'Settings':
				setTranslatedTitle("個人設定")
				break
			case 'NewNote':
				setTranslatedTitle("新增遊記")
				break
			default:
				setTranslatedTitle("尚未翻譯")
		}
	}, [])

	return (

		<View
			style={{
				marginBottom: 24,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 18,
					paddingBottom: 4,
					marginTop: props.paddingTop,
					height: 40,
					backgroundColor: "#fff",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				{props.title === "MainScreen"?

					<IB_User/> : <IB_ArrowLeft/>

				}

				{props.title === "MainScreen" ?
					// <Image
					// 	style={{ height: 32 }}
					// 	source={require("../res/AppIcon.svg")}
					// />
					// <SVGImg width={200}/>

					<Image
						source={require("../res/branding_eng_larger.png")}
						style={{
							resizeMode: "contain",
							// height: 20,
							width: 180
						}}
					/>

					:

					<MaskedView
						style={{ width: 200, justifyContent: "center", alignItems: "center"}}
						maskElement={
							<HStack flex={1} justifyContent={"center"} alignItems={"center"}>
								<Text letterSpacing={1} fontWeight={"bold"} fontSize={18}>
									{translatedTitle}
								</Text>
							</HStack>
						}>
						<LinearGradient
							useAngle={true}
							angle={170}
							angleCenter={{x: 0.2, y: 0.7}}
							locations={[0.5, 1]}
							colors={['#4d5dff', "#ad4cff"]}
							style={{ height: "100%", width: "100%"}}
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
						style={{flex: 1, flexDirection: 'row', height: 32}}
						maskElement={
							<View
								style={{
									flex: 1,
									backgroundColor: 'transparent',
									justifyContent: 'center',
									alignItems: 'center',
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
							angleCenter={{x: 0.5, y: 0.7}}
							locations={[0, 0.6]}
							colors={['#6675ff', "#bf67ff"]}
							style={{flex: 1}}
						/>
					</MaskedView>
				</Pressable>
			</View>

			<LinearGradient

				useAngle={true}
				angle={90}
				// angleCenter={{x: 0.5, y: 0.5}}
				locations={[0, .9]}
				colors={['#a79aff', "#ce99ff"]}
				style={{ height: 1, width: "100%"}}

			/>

		</View>
	)
}

export default AppHeader
