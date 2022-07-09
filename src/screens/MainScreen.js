import { HStack, Pressable, ScrollView, StatusBar, Text, useTheme, VStack } from "native-base"
import React, {useCallback, useEffect, useRef, useState} from "react"
import Block from "../components/Block"
import BlockTitle from "../components/BlockTitle"
import LayoutBase from "../components/LayoutBase"
import { GradientButton } from "../components/GradientButton"

import CameraRoll from "@react-native-community/cameraroll"
import {FlatList, StyleSheet, Animated, Alert} from "react-native"
import {delTrip, delTripNote, selectData} from "../globalstate/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import {delFriend, selectAccount} from "../globalstate/accountSlice"
import FlatBlock from "../components/FlatBlock"
import Geolocation from "react-native-geolocation-service"
import {apiRequest, weatherForecastRequest, weatherRequest} from "../apis/api"
import Feather from "react-native-vector-icons/Feather"
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {useAnimatedStyle} from "react-native-reanimated";

import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item"

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 32,
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
	},
})

const OVERSWIPE_DIST = 0
const NUM_ITEMS = 20

const UnderlayLeft = ({drag}: { drag: () => void }) => {

	const theme = useTheme().colors
	const dispatch = useDispatch()
	const {item, percentOpen} = useSwipeableItemParams()

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)

	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
			bottom: 32 - percentOpen.value * 32,
		}),
		[percentOpen],
	)

	return (

		<Animated.View
			style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
		>

			<Block mb={12} px={2} h={64} w={58} sc={"#fff"} borderWidth={2} borderColor={theme.primary.placeholder.pink}>

				<Pressable flex={1} w={52} justifyContent={"center"} alignItems={"center"} onPress={() => {


					Alert.alert(
						"刪除歷史旅程",
						"你確定要刪除「" + item.tripName + "」嗎？",
						[
							{
								text: "取消",
							},
							{
								text: "刪除", onPress: () => {
									dispatch(delTrip(item.tripID))
									apiRequest("post", `/api/travelope/del-trip/${account.info.id}/${item.tripID}`, {})

								},
							},
						],
					)

				}}>

					<Feather size={20} name={"trash"} color={theme.primary.text.pink}/>
				</Pressable>

			</Block>

		</Animated.View>
	)
}

function RowItem({item, itemRefs, drag}) {

	const theme = useTheme().colors
	const navigation = useNavigation()

	return (

		<SwipeableItem

			key={item.id}
			item={item}
			ref={(ref) => {
				if (ref && !itemRefs.current.get(item.id)) {
					itemRefs.current.set(item.id, ref)
				}
			}}

			onChange={({open}) => {
				if (open) {
					// Close all other open items
					[...itemRefs.current.entries()].forEach(([key, ref]) => {
						if (key !== item.id && ref) ref.close()
					})
				}
			}}

			overSwipe={OVERSWIPE_DIST}
			renderUnderlayLeft={() => <UnderlayLeft drag={drag}/>}
			snapPointsLeft={[70]}
		>
			<Pressable onPress={()=> {
				navigation.navigate("LegacyTrip", { item: item })
			}} borderWidth={2} borderRadius={18} px={12} borderColor={theme.primary.placeholder.purple} sc={"white"} mb={12} h={64} pl={14} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

				<HStack alignItems={"center"}>
					<Feather name={"mail"} color={theme.primary.text.purple} size={32} />

					<VStack ml={12} justifyContent={"center"} w={200}>
						<Text noOfLines={1} mb={2} mr={16} fontSize={16} color={theme.primary.text.purple}
						      fontWeight={"bold"}>{item.tripName} </Text>
						{/*<Text noOfLines={1} mr={16} fontSize={14} fontWeight={"light"} color={theme.primary.text.purple}*/}
						{/*      fontWeight={"normal"}>{item.tripDescription}</Text>*/}
					</VStack>
				</HStack>

				<HStack borderRadius={12} w={64} bg={theme.primary.placeholder.indigo} h={42} alignItems={"center"}
				        justifyContent={"center"}>
					<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(item.startTime).getMonth() + 1 + " /"} </Text>
					<Text fontSize={18} lineHeight={22} color={"white"}
					      fontWeight={"bold"}> {new Date(item.startTime).getDate()} </Text>
				</HStack>

			</Pressable>

		</SwipeableItem>
	)
}

const TripsItem = ({ item }) => {

	const theme = useTheme().colors

	return (

		<Block borderColor={theme.primary.placeholder.purple} sc={"white"} mb={12} h={64} pl={14} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

			<HStack alignItems={"center"}>
				<Feather name={"mail"} color={theme.primary.text.purple} size={32} />

				<VStack ml={12} justifyContent={"center"} w={200}>
					<Text noOfLines={1} mb={2} mr={16} fontSize={16} color={theme.primary.text.purple}
					      fontWeight={"bold"}>{item.tripName} </Text>
					{/*<Text noOfLines={1} mr={16} fontSize={14} fontWeight={"light"} color={theme.primary.text.purple}*/}
					{/*      fontWeight={"normal"}>{item.tripDescription}</Text>*/}
				</VStack>
			</HStack>

			<HStack borderRadius={12} w={64} bg={theme.primary.placeholder.indigo} h={42} alignItems={"center"}
			        justifyContent={"center"}>
				<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(item.startTime).getMonth() + 1 + " /"} </Text>
				<Text fontSize={18} lineHeight={22} color={"white"}
				      fontWeight={"bold"}> {new Date(item.startTime).getDate()} </Text>
			</HStack>

		</Block>
	)

}

const MainScreen = ({ navigation }) => {

	const ref = useRef()
	const itemRefs = useRef(new Map())


	const theme = useTheme().colors

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const [activeTrip, setActiveTrip] = useState(null)

	const [weatherData, setWeatherData] = useState({
		temp: " - ",
		desc: " - ",
	})

	const [weatherForecastData, setWeatherForecastData] = useState([])

	const renderItemTrip = ({ item }) => <TripsItem item={item} />
	const renderItemTripSlide = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs}/>
	}, [])

	const getLocation = async () => {

		console.log("exec")

		let status = await Geolocation.requestAuthorization("whenInUse")

		if (status !== "granted") {
			return
		}

		Geolocation.getCurrentPosition((res) => {

			weatherRequest(res.coords.longitude, res.coords.latitude)
				.then(res => {
					console.log(res.data.weather[0].description + Math.round(res.data.main.temp))
					setWeatherData({
						temp: Math.round(res.data.main.temp),
						desc: res.data.weather[0].description,
					})
				})

			weatherForecastRequest(res.coords.longitude, res.coords.latitude)
				.then(res => {
					setWeatherForecastData(res.data.daily)
				})

		}, rej => console.log(rej))

	}

	useFocusEffect(

		React.useCallback(() => {

			let trip = accountData.trips.find(item => item.isActive)
			trip? setActiveTrip(trip) : setActiveTrip(null)
			getLocation()

		}, [accountData]),
	);

	useEffect(() => {

	}, [location])

	useEffect(() => {
		CameraRoll.getPhotos()
	}, [])

	return (

		<LayoutBase>

			{/*<ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>*/}
			{/*  <Text>...Something to rasterize...</Text>*/}
			{/*</ViewShot>*/}

			<Block borderRadius={18} p={0} pb={14} fd={"row"} h={144} sc={"#9e66ff"} bdc={"#af81ff"}>

				<VStack flex={1}>

					<HStack px={4} flex={4} justifyContent={"space-between"}>

						<HStack alignItems={"center"}>

							<Feather name={"calendar"} size={20} color={theme.primary.text.purple} />
							<Text ml={6} fontSize={18} color={theme.primary.text.purple}
							      fontWeight={"bold"}>{new Date().getMonth() + 1 + "月 "}</Text>
							<Text fontSize={18} color={theme.primary.text.purple}
							      fontWeight={"bold"}>{new Date().getDate() + "日"}</Text>

						</HStack>

						<HStack alignItems={"center"}>

							<Feather name={"thermometer"} size={18} color={theme.primary.text.purple} />
							<Text mr={16} fontSize={18} color={theme.primary.text.purple}
							      fontWeight={"normal"}>{weatherData.temp + "°C"}</Text>

							<Feather name={"cloud"} size={20} color={theme.primary.text.purple} />
							<Text ml={6} fontSize={16} color={theme.primary.text.purple}
							      fontWeight={"normal"}>{weatherData.desc}</Text>

						</HStack>

					</HStack>


					<HStack flex={5} justifyContent={"space-between"}>

						<VStack alignItems={"center"} mr={10} flex={1} borderRadius={12}
						        bg={theme.primary.darker_bg.purple} justifyContent={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"thermometer"} size={14} color={theme.primary.text.purple} />

								<Text letterSpacing={2} fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[1]?.dt * 1000).getMonth() + 1 + "/"}</Text>
								<Text fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[1]?.dt * 1000).getDate()}</Text>
							</HStack>

							<HStack>
								<Text fontSize={18} color={theme.primary.text.indigo}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[1]?.temp?.night)}</Text>
								<Text ml={6} fontSize={18} color={theme.primary.text.pink}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[1]?.temp?.day)}</Text>
							</HStack>


						</VStack>

						<VStack alignItems={"center"} mr={10} flex={1} borderRadius={12}
						        bg={theme.primary.darker_bg.purple} justifyContent={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"thermometer"} size={14} color={theme.primary.text.purple} />

								<Text letterSpacing={2} fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[2]?.dt * 1000).getMonth() + 1 + "/"}</Text>
								<Text fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[2]?.dt * 1000).getDate()}</Text>
							</HStack>

							<HStack>
								<Text fontSize={18} color={theme.primary.text.indigo}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[2]?.temp?.night)}</Text>
								<Text ml={6} fontSize={18} color={theme.primary.text.pink}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[2]?.temp?.day)}</Text>
							</HStack>


						</VStack>

						<VStack alignItems={"center"} mr={10} flex={1} borderRadius={12}
						        bg={theme.primary.darker_bg.purple} justifyContent={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"thermometer"} size={14} color={theme.primary.text.purple} />

								<Text letterSpacing={2} fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[3]?.dt * 1000).getMonth() + 1 + "/"}</Text>
								<Text fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[3]?.dt * 1000).getDate()}</Text>
							</HStack>

							<HStack>
								<Text fontSize={18} color={theme.primary.text.indigo}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[3]?.temp?.night)}</Text>
								<Text ml={6} fontSize={18} color={theme.primary.text.pink}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[3]?.temp?.day)}</Text>
							</HStack>


						</VStack>

						<VStack alignItems={"center"} flex={1} borderRadius={12}
						        bg={theme.primary.darker_bg.purple} justifyContent={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"thermometer"} size={14} color={theme.primary.text.purple} />

								<Text letterSpacing={2} fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[4]?.dt * 1000).getMonth() + 1 + "/"}</Text>
								<Text fontSize={16} color={theme.primary.text.purple}
								      fontWeight={"normal"}>{new Date(weatherForecastData[4]?.dt * 1000).getDate()}</Text>
							</HStack>

							<HStack>
								<Text fontSize={18} color={theme.primary.text.indigo}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[4]?.temp?.night)}</Text>
								<Text ml={6} fontSize={18} color={theme.primary.text.pink}
								      fontWeight={"bold"}>{Math.round(weatherForecastData[4]?.temp?.day)}</Text>
							</HStack>


						</VStack>

					</HStack>


				</VStack>


				{/*<GradientButton w={100} h={34} title={"進入旅程"} />*/}
			</Block>

			<BlockTitle pl={12}  borderRadius={18} text={"目前的旅程"} icon={"play-circle"} rightElement={false} color={theme.primary.text.pink}/>

			{
				activeTrip?

					<Pressable onPress={()=> {
						navigation.navigate("CurrentTrip")
					}}>

						<Block bdc={theme.primary.text.pink} sc={"#fff"} h={84} pl={12} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"navigation-2"} color={theme.primary.placeholder.pink} size={36} />

								<VStack ml={12} justifyContent={"center"} w={200}>
									<Text noOfLines={1} mb={2} mr={16} fontSize={16} color={theme.primary.text.pink}
									      fontWeight={"bold"}>{activeTrip.tripName} </Text>
									<Text noOfLines={1} mr={16} fontSize={14} color={theme.primary.text.pink}
									      fontWeight={"normal"}>{activeTrip.tripDescription}</Text>
								</VStack>
							</HStack>

							<VStack borderRadius={12} w={68} bg={theme.primary.placeholder.pink} h={60} alignItems={"center"}
							        justifyContent={"center"}>
								<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(activeTrip.startTime).getMonth() + 1 + "月"} </Text>
								<Text fontSize={24} lineHeight={22} letterSpacing={2} color={"white"}
								      fontWeight={"bold"}> {new Date(activeTrip.startTime).getDate()} </Text>
							</VStack>

						</Block>

					</Pressable>


					:

					<Pressable

						onPress={() => navigation.navigate("NewTrip")}

						h={78}
						w={"100%"}
						mb={32}
						flexDirection={"row"}
						justifyContent={"center"}
						alignItems={"center"}
						borderRadius={18}
						borderStyle={"dashed"}
						borderWidth={2}
						borderColor={theme.primary.placeholder.indigo}
					>

						<Feather name={"plus-circle"} size={22} color={theme.primary.placeholder.indigo} />
						<Text fontSize={16} fontWeight={"bold"} letterSpacing={1} color={theme.primary.placeholder.indigo} ml={8}>
							新旅遊
						</Text>

					</Pressable>
			}

			<BlockTitle text={"歷史旅程"} icon={"compass"} rightElement={true} color={theme.primary.text.purple}/>


			<FlatList
				ListFooterComponent={

					<>

						{accountData.trips.filter(trip => trip.isActive === true)?
						<></> :
							<VStack h={64} pl={40} w={"100%"} alignItems={"flex-start"} justifyContent={"center"}>
								<Text fontSize={14} color={theme.primary.placeholder.purple}
								      fontWeight={"bold"}>沒有旅程紀錄，出去走走吧！</Text>
							</VStack>
						}



					</>
				}
				ListHeaderComponent={

					<>

					</>
				}

				keyExtractor={item => item.tripID}
				data={accountData.trips.filter(trip => trip.isActive === false)}
				renderItem={renderItemTripSlide}
			/>


			{/*<BlockTitle onPress={() => {*/}
			{/*  navigation.navigate("TripOverview");*/}
			{/*}} text={"旅程總覽"} color={"#5959ff"} icon={"send"} />*/}

			{/*<Block h={80} bdc={"#8080ff"}>*/}

			{/*</Block>*/}

			{/*<BlockTitle onPress={() => {*/}
			{/*  navigation.navigate("MemEnvelope");*/}
			{/*}} text={"回憶信封"} color={"#7859ff"} icon={"mail"} />*/}

			{/*<Block h={80} bdc={"#9780ff"}>*/}

			{/*</Block>*/}

			{/*<BlockTitle onPress={() => {*/}
			{/*  navigation.navigate("TripPostcard");*/}
			{/*}} text={"旅程紀念卡"} color={"#9959ff"} icon={"image"} />*/}

			{/*<Block h={80} bdc={"#ae7dff"}>*/}

			{/*</Block>*/}

		</LayoutBase>

	)
}

export default MainScreen
