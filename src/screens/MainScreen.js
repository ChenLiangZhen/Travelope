import { HStack, Pressable, ScrollView, StatusBar, Text, useTheme, VStack } from "native-base"
import React, { useEffect, useRef, useState } from "react"
import Block from "../components/Block"
import BlockTitle from "../components/BlockTitle"
import LayoutBase from "../components/LayoutBase"
import { GradientButton } from "../components/GradientButton"

import CameraRoll from "@react-native-community/cameraroll"
import { FlatList } from "react-native"
import { selectData } from "../globalstate/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectAccount } from "../globalstate/accountSlice"
import FlatBlock from "../components/FlatBlock"
import Geolocation from "react-native-geolocation-service"
import { weatherForecastRequest, weatherRequest } from "../apis/api"
import Feather from "react-native-vector-icons/Feather"
import { useFocusEffect } from "@react-navigation/native"

const TripsItem = ({ item }) => {

	const theme = useTheme().colors

	return (
		<Block h={84} pl={10} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

			<HStack alignItems={"center"}>
				<Feather name={"navigation-2"} color={theme.primary.placeholder.purple} size={36} />

				<VStack ml={12} justifyContent={"center"} w={200}>
					<Text noOfLines={1} mb={2} mr={16} fontSize={18} color={theme.primary.text.purple}
					      fontWeight={"bold"}>{item.tripName} </Text>
					<Text noOfLines={1} mr={16} fontSize={18} color={theme.primary.text.purple}
					      fontWeight={"normal"}>{item.tripDescription}</Text>
				</VStack>
			</HStack>

			<VStack borderRadius={12} w={68} bg={theme.primary.placeholder.indigo} h={60} alignItems={"center"}
			        justifyContent={"center"}>
				<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(item.startTime).getMonth() + 1 + "月"} </Text>
				<Text fontSize={26} lineHeight={28} letterSpacing={2} color={"white"}
				      fontWeight={"bold"}> {new Date(item.startTime).getDate()} </Text>
			</VStack>

		</Block>
	)

}

const MainScreen = ({ navigation }) => {

	const ref = useRef()

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
			console.log("located! " + JSON.stringify(res))

			weatherForecastRequest(res.coords.longitude, res.coords.latitude)
				.then(res => {
					console.log(res.data)
					setWeatherForecastData(res.data.daily)
				})
			console.log("located! " + JSON.stringify(res))

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


	// useEffect(() => {
	//   // on mount
	//   ref.current.capture()
	//     .then(uri => {
	//       console.log("do something with ", uri);
	//     })
	//     .catch((e) => {
	//       console.log(e)
	//     })
	// }, []);

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
							<Text ml={6} fontSize={20} color={theme.primary.text.purple}
							      fontWeight={"bold"}>{new Date().getMonth() + 1 + "月 "}</Text>
							<Text fontSize={20} color={theme.primary.text.purple}
							      fontWeight={"bold"}>{new Date().getDate() + "日"}</Text>

						</HStack>

						<HStack alignItems={"center"}>

							<Feather name={"thermometer"} size={20} color={theme.primary.text.purple} />
							<Text mr={16} fontSize={18} color={theme.primary.text.purple}
							      fontWeight={"normal"}>{weatherData.temp + "°C"}</Text>

							<Feather name={"cloud"} size={20} color={theme.primary.text.purple} />
							<Text ml={6} fontSize={18} color={theme.primary.text.purple}
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

			<BlockTitle text={"目前的旅程"} icon={"play-circle"} rightElement={false} color={theme.primary.text.pink}/>

			{
				activeTrip?

					<Pressable onPress={()=> {
						navigation.navigate("CurrentTrip")
					}}>

						<Block h={84} pl={10} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

							<HStack alignItems={"center"}>
								<Feather name={"navigation-2"} color={theme.primary.placeholder.purple} size={36} />

								<VStack ml={12} justifyContent={"center"} w={200}>
									<Text noOfLines={1} mb={2} mr={16} fontSize={18} color={theme.primary.text.purple}
									      fontWeight={"bold"}>{activeTrip.tripName} </Text>
									<Text noOfLines={1} mr={16} fontSize={18} color={theme.primary.text.purple}
									      fontWeight={"normal"}>{activeTrip.tripDescription}</Text>
								</VStack>
							</HStack>

						<VStack borderRadius={12} w={68} bg={theme.primary.placeholder.indigo} h={60} alignItems={"center"}

						        justifyContent={"center"}>
								<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(activeTrip.startTime).getMonth() + 1 + "月"} </Text>
								<Text fontSize={26} lineHeight={28} letterSpacing={2} color={"white"}
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

			<BlockTitle text={"歷史旅程"} icon={"compass"} rightElement={true} color={theme.primary.text.pink}/>


			<FlatList
				ListFooterComponent={

					<>

						<VStack h={64} pl={40} w={"100%"} alignItems={"flex-start"} justifyContent={"center"}>
							<Text fontSize={14} color={theme.primary.placeholder.purple}
							      fontWeight={"bold"}>沒有更多紀錄囉！</Text>
							<Text fontSize={14} color={theme.primary.placeholder.purple}
							      fontWeight={"bold"}>出門走走，將旅遊記錄下來吧！</Text>
						</VStack>

					</>
				}
				ListHeaderComponent={

					<>

					</>
				}
				data={accountData.trips.filter(trip => trip.isActive === false)}
				renderItem={renderItemTrip}
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
