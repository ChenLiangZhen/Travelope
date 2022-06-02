import {Box, HStack, Image, Pressable, Text} from "native-base";
import {useEffect, useState} from "react";
import React from "react";
import {View} from "react-native";
import SVGImg from "../res/AppIcon.svg";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

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
			case 'RecentTrip':
				setTranslatedTitle("近期旅程")
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
			default:
				setTranslatedTitle("尚未翻譯")
		}
	}, [])

	return (

		<View
			style={{
				marginBottom: 8,
				shadowColor: "#AAA7CC",
				shadowOpacity: 1,
				shadowRadius: 0,
				shadowOffset: {
					height: 9
				}
			}}
		>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 18,
					marginTop: props.paddingTop,
					height: 42,
					backgroundColor: "#fff",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
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
									name={"user"}
									size={24}
								/>
							</View>
						}>
						<LinearGradient
							useAngle={true}
							angle={170}
							angleCenter={{x: 0.2, y: 0.7}}
							locations={[0, 0.6]}
							colors={['#3346ff', "#a138ff"]}
							style={{flex: 1}}
						/>
					</MaskedView>
				</Pressable>

				{props.title === "MainScreen" ?
					// <Image
					// 	style={{ height: 32 }}
					// 	source={require("../res/AppIcon.svg")}
					// />
					<SVGImg width={150}/>
					:

					<MaskedView
						style={{ width: 200, justifyContent: "center", alignItems: "center"}}
						maskElement={
							<HStack flex={1} justifyContent={"center"} alignItems={"center"}>
								<Text fontWeight={"bold"} fontSize={20}>
									{translatedTitle}
								</Text>
							</HStack>
						}>
						<LinearGradient
							useAngle={true}
							angle={170}
							angleCenter={{x: 0.2, y: 0.7}}
							locations={[0.5, 1]}
							colors={['#3346ff', "#a138ff"]}
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
							colors={['#3346ff', "#a138ff"]}
							style={{flex: 1}}
						/>
					</MaskedView>
				</Pressable>
			</View>

			<View
				style={{
					height: 2,
					width: "100%",
					backgroundColor: "#6961C6"
				}}
			/>
		</View>
	)
}

export default AppHeader
