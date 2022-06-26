import React, { useEffect, useRef, useState } from "react"
import MapView, { Callout, LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import axios from "axios"
import { Actionsheet, Box, Center, HStack, Pressable, Text, useDisclose, useTheme, View } from "native-base"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import LayoutBase from "../../components/LayoutBase"
import { WIDTH } from "../../Util"
import { SafeAreaView } from "react-native-safe-area-context"
import Feather from "react-native-vector-icons/Feather"
import { useDispatch, useSelector } from "react-redux"
import { selectData } from "../../globalstate/dataSlice"
import { selectAccount } from "../../globalstate/accountSlice"
import Geolocation from 'react-native-geolocation-service'
import Block from "../../components/Block"

const getUbike = async () => {
	return await axios.get("https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=200")
}

// const MarkerMemo = (site) => useMemo(() => {
// 	return (
// 		<Marker
// 			coordinate={{latitude: site.latitude, longitude: site.longitude}}
// 			key={`${site.id}${site.line}`}
// 			title={site.name}
// 			description={site.address}
// 		>
// 			<Center bg={site.line === "南港、板橋、土城線" ? "#7777ff" : "white"} borderRadius={60} p={1.5} borderWidth={3}>
// 				<MaterialIcons name={"train"} size={24} color="black"/>
// 			</Center>
// 		</Marker>
// 	)
// }, site)

const TripOnMap = () => {

	const mapRef = useRef()

	const [msg, setMsg] = useState("Waiting...");
	const [onCurrentLocation, setOnCurrentLocation] = useState(false);

	const theme = useTheme().colors

	const accountData = useSelector(selectData)
	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const [stationBike, setStationBike] = useState({
			total: 24,
			bikes: 17
		}
	);
	const [zoomRatio, setZoomRatio] = useState(1);

	const [station, setStation] = useState({
		type: "",
		title: "",
		description: "",
		lat: "",
		lon: "",
	})

	const [region, setRegion] = useState({

		// longitude: 121.544637,
		// latitude: 25.024624,

		// longitude: 121.46505263178251,
		// latitude: 25.031829833984375,

		longitudeDelta: 0.02,
		latitudeDelta: 0.04,
	})

	const [marker, setMarker] = useState({
		coord: {
			longitude: 121.544637,
			latitude: 25.024624,
		},
		// name: "國立臺北教育大學",
		// address: "台北市和平東路二段134號",
	});

	const [ubikeData, setUbikeData] = useState()

	const onRegionChangeComplete = (rgn) => {
		if (rgn.longitudeDelta > 0.02)
			setZoomRatio(0.02 / rgn.longitudeDelta);
		else
			setZoomRatio(1);
	}

	const setRegionAndMarker = (location) => {

		setRegion({
			...region,
			longitude: location.coords.longitude,
			latitude: location.coords.latitude,
		});

		setMarker({
			...marker,
			coord: {
				longitude: location.coords.longitude,
				latitude: location.coords.latitude,
			},
		});
	};

	// const getUbikeData = async () => {
	// 	const bikeData = await getUbike();
	// 	setUbikeData(bikeData);
	// };


	const getLocation = async () => {

		console.log("exec")

		let status = await Geolocation.requestAuthorization("whenInUse");

		if (status !== 'granted') {
			setMsg('Permission to access location was denied');
			return;
		}

		Geolocation.getCurrentPosition((res)=> {
			setRegionAndMarker(res);
			console.log("located! " + JSON.stringify(res))
		}, rej => console.log(rej));

		setOnCurrentLocation(true);
	}

	useEffect(()=> {

		mapRef.current.animateCamera({

			center: region,
			altitude: 2500
		})

	}, [region])


	useEffect(() => {

		getLocation();

		// await new Promise(resolve => setTimeout(resolve, 5000))

	},[]);

	const {
		isOpen,
		onOpen,
		onClose
	} = useDisclose();

	return (

		<SafeAreaView style={{ flex: 1}}>

			<HStack bg={"transparent"} px={"5%"} justifyContent={"center"} h={48} w={"100%"} zIndex={100} position={"absolute"} top={60}>
				<Block opacity={.8} flexDirection={"row"} justifyContent={"space-between"} px={14} alignItems={"center"} h={48} w={"100%"} borderRadius={18}>

					<HStack flex={1} alignItems={"center"}>

						<Pressable mr={4} h={24} w={24} alignItems={"center"} justifyContent={"center"}>
							<Feather name={"send"} color={theme.primary.text.purple} size={18}/>
						</Pressable>

						<Text noOfLines={1} letterSpacing={1} w={"60%"} fontSize={18} fontWeight={"bold"} color={theme.primary.text.purple}>
							{/*{accountData.currentTrip.tripName}*/}
							跟同學去宜蘭玩三天
						</Text>

					</HStack>

					<Pressable h={24} w={24} alignItems={"center"} justifyContent={"center"}>
						<Feather name={"arrow-left-circle"} color={theme.primary.text.purple} size={22}/>
					</Pressable>

					{/*<Pressable  h={24} w={24}>*/}
					{/*	/!*<Feather name={"arrow-left-circle"} size={24}/>*!/*/}
					{/*</Pressable>*/}

				</Block>
			</HStack>

				<Actionsheet
					isOpen={isOpen} onClose={onClose}
				>
					<Actionsheet.Content
						background={"#222"}
					>
						<View style={{
							padding: 16,
							height: 256,
							width: "100%",
							flexDirection: "column",

							backgroundColor: "#222"
						}}>
							<Text style={{
								marginLeft: 8,
								fontSize: 26,
								color: "#eee",
								fontWeight: "bold"
							}}>
								{station.type === "mrt"?
									"捷運" + station.title + "站" : "UBike" + station.title + "站"
								}
							</Text>

							<Text style={{
								marginLeft: 8,
								color: "#eee",

								fontSize: 16,
								fontWeight: "normal",
								paddingTop: 8,
								letterSpacing: .5,
							}}>
								{station.description}
							</Text>

							<View style={{
								height: "auto",
								width: "100%",
								borderRadius: 24,
								marginTop: 24,
								backgroundColor: "#222",
								borderColor: "#fff",
								borderWidth: 2,
								padding: 16,
							}}>
								<Text style={{

									color: "#eee",
									paddingLeft: 4,


									fontSize: 16,
									fontWeight: "normal",

									letterSpacing: .5,
								}}>
									{"Longitude : " + station.lon}
								</Text>

								<Text style={{

									color: "#eee",
									paddingLeft: 4,

									fontSize: 16,
									fontWeight: "normal",

									letterSpacing: .5,
								}}>
									{"Latitude : " + station.lat}
								</Text>
								{station.type !== "mrt"?
									<View style={{
										borderRadius: 64,

										marginTop: 16,
										overflow: "hidden",
										flexDirection: "row",
										width: "100%",
										height: 32,
										backgroundColor: "#00f",
										// zIndex: 100
									}}>
										<Text style={{
											top: 6,
											left: 16,
											position: "absolute",
											fontSize: 16,
											fontWeight: "bold",
											color: "#ffffff",
											zIndex: 1000
										}}>
											{"可租  " + (stationBike.bikes)}
										</Text>

										<Text style={{
											top: 6,
											right: 16,
											position: "absolute",
											fontSize: 16,
											fontWeight: "bold",
											color: "#000000",
											zIndex: 1000
										}}>
											{"空位 " + (stationBike.total - stationBike.bikes)}
										</Text>

										<View style={{
											flexDirection: "row",
											width: (WIDTH - 80) * ((stationBike.bikes) / (stationBike.total)),
											height: 32,
											backgroundColor: "#ff0076"
										}} />
										<View style={{
											flexDirection: "row",
											width: (WIDTH - 80) * ((stationBike.total - stationBike.bikes) / (stationBike.total)),
											height: 32,
											backgroundColor: "#d2d2d2"
										}} />

									</View>

									: <></>}


							</View>
						</View>
					</Actionsheet.Content>
				</Actionsheet>

				<Box flex={1}>
					<MapView
						onRegionChangeComplete={onRegionChangeComplete}
						customMapStyle={require("../../res/mapStyle.json")}
						// provider={PROVIDER_GOOGLE}
						// initialCamera={{ center: region, altitude: 2500 }}
						// camera={{
						// 	// center: region,
						// 	altitude: 2500
						// }}
					// 	center: LatLng;
					// heading: number;
					// pitch: number;
					// zoom: number;
					// altitude: number;
						userInterfaceStyle={"light"}
						mapType={"mutedStandard"}
						ref={mapRef}
						style={{ flex: 1 }}
						// provider="apple"
						// customMapStyle={mapStyle}
					>

						{/*<Callout*/}
						{/*	tooltip={}*/}
						{/*>*/}
						{/*	<View>*/}
						{/*		<Block bg={"white"} h={48} w={48} borderRadius={60} opacity={.8}*/}
						{/*		       borderWidth={2} px={0} py={0} justifyContent={"center"} alignItems={"center"}>*/}
						{/*			<Feather name={"map-pin"} size={24} color={theme.primary.text.purple} />*/}
						{/*		</Block>*/}
						{/*	</View>*/}


						{/*</Callout>*/}

						<Marker
							tracksViewChanges={false}
							coordinate={{ latitude: 25.031845092773438, longitude: 121.46505476503532 }}
							key={"edwf"}
							title={"yay"}
							description={"yay"}
							onPress={() => {

								setRegion({
									...region,
									latitude: 25.031845092773438,
									longitude: 121.46505476503532
								})
							}}
						>
								<Callout tooltip>
									<View>
										<Text>This is ridiculous</Text>
									</View>
								</Callout>
						</Marker>

						{(zoomRatio > 0.25) && ubikeData? ubikeData.data.map((site) => (


							<Marker
								tracksViewChanges={false}
								coordinate={{ latitude: site.lat, longitude: site.lng }}
								key={`${site.sno}`}
								title={site.sna}
								description={site.address}
								onPress={() => {
									onOpen()
									setStation({
										type: "bike",
										title: site.sna,
										description: site.ar,
										lat: site.lat,
										lon: site.lng,
										slot: {
											available: site.sbi,
											empties: site.bemp
										}
									})

									setStationBike({
										total: site.tot,
										bikes: site.sbi
									})
								}}
							>

								<Center bg={"white"} opacity={.5} borderRadius={60} p={1.5}
								        borderWidth={3}>
									<FontAwesome5 name={"bicycle"} size={20} color="black" />
								</Center>

							</Marker>
						)) : null}

					</MapView>

				</Box>

		</SafeAreaView>
	);

}

export default TripOnMap
