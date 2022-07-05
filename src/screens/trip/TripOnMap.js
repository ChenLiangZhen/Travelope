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
import {GradientButton} from "../../components/GradientButton";
import {useIsFocused} from "@react-navigation/native";

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

const TripOnMap = ({navigation}) => {

	const mapRef = useRef()

	const [msg, setMsg] = useState("Waiting...");
	const [onCurrentLocation, setOnCurrentLocation] = useState(false);
	const [pressedNote, setPressedNote] = useState({})

	const theme = useTheme().colors
	const isFocused = useIsFocused()

	// const [markerData, setMarkerData] = useState(accountData.)

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

	const [noteLocationData, setNoteLocationData] = useState([])

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

		// var reformattedArray = kvArray.map(function(obj) {
		// 	var rObj = {};
		// 	rObj[obj.key] = obj.value;
		// 	return rObj;
		// });

		getLocation();

		const locationArray = accountData.trips[accountData.trips.length - 1].tripNotes.map( item => {
			return {
				data: item,

				key: item.noteID,
				lon: item.lon,
				lat: item.lat,
			}
		})

		console.log(locationArray)
		setNoteLocationData(locationArray)

		// await new Promise(resolve => setTimeout(resolve, 5000))

	},[isFocused]);

	const {
		isOpen,
		onOpen,
		onClose
	} = useDisclose();

	return (

		<SafeAreaView style={{ flex: 1}}>

			<HStack bg={"transparent"} px={18} justifyContent={"flex-end"} h={48} w={"100%"} zIndex={100} position={"absolute"} top={60}>

					<GradientButton w={100} title={"返回旅程"} onPress={ () => {
						navigation.goBack()
					}}/>

			</HStack>

				<Actionsheet
					isOpen={isOpen} onClose={onClose}
				>
					<Actionsheet.Content
						background={"white"}
					>
						<View style={{
							padding: 16,
							height: 256,
							width: "100%",
							flexDirection: "column",
							backgroundColor: "white"
						}}>
							<Text style={{
								marginLeft: 8,
								fontSize: 26,
								color: theme.primary.text.purple,
								fontWeight: "bold"
							}}>
								{pressedNote.title}

							</Text>

						</View>
					</Actionsheet.Content>
				</Actionsheet>

				<Box flex={1}>
					<MapView
						onRegionChangeComplete={onRegionChangeComplete}
						// customMapStyle={require("../../res/mapStyle.json")}
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
						// mapType={"mutedStandard"}
						ref={ mapRef }
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

						{ noteLocationData? noteLocationData.map((location) => (

							<Marker
								tracksViewChanges={false}
								coordinate={{ latitude: location.lat, longitude: location.lon }}
								key={`${location.key}`}
								// title={site.sna}
								description={location.address}
								onPress={() => {

									onOpen()

									setPressedNote({
										type: "bike",
										title: location.data.noteTitle,
										description: location.data.noteContent,
										lat: location.lat,
										lon: location.lon,
									})
								}}
							>
								{/*<Center bg={"white"} opacity={.5} borderRadius={60} p={1.5}*/}
								{/*        borderWidth={3}>*/}
								{/*	<FontAwesome5 name={"bicycle"} size={20} color="black" />*/}
								{/*</Center>*/}
								<Callout tooltip>
									<View shadowOpacity={.25} shadowRadius={8} shadowOffset={{height: 1}} p={8} bg={"white"} borderRadius={12}>
										<Text fontSize={14} color={theme.primary.text.purple}>{location.data.noteTitle}</Text>
									</View>
								</Callout>

							</Marker>
						)) : null}

					</MapView>

				</Box>

		</SafeAreaView>
	);

}

export default TripOnMap
