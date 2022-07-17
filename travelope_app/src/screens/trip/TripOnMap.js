import React, {useEffect, useRef, useState} from "react"
import MapView, {Callout, LatLng, Marker, PROVIDER_GOOGLE} from "react-native-maps"
import axios from "axios"
import {Actionsheet, Box, Center, HStack, Pressable, Text, useDisclose, useTheme, View, VStack} from "native-base"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import LayoutBase from "../../components/LayoutBase"
import {WIDTH} from "../../Util"
import {SafeAreaView} from "react-native-safe-area-context"
import Feather from "react-native-vector-icons/Feather"
import {useDispatch, useSelector} from "react-redux"
import {delTripNote, selectData} from "../../globalstate/dataSlice"
import {selectAccount} from "../../globalstate/accountSlice"
import Geolocation from 'react-native-geolocation-service'
import Block from "../../components/Block"
import {GradientBorderButton, GradientButton} from "../../components/GradientButton";
import {useIsFocused} from "@react-navigation/native";

const getUbike = async () => {
	return await axios.get("https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=200")
}

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

	const getLocation = async () => {

		console.log("exec")

		let status = await Geolocation.requestAuthorization("whenInUse");

		if (status !== 'granted') {
			setMsg('Permission to access location was denied');
			return;
		}

		Geolocation.getCurrentPosition((res) => {
			setRegionAndMarker(res);
			console.log("located! " + JSON.stringify(res))
		}, rej => console.log(rej));

		setOnCurrentLocation(true);
	}

	useEffect(() => {

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

		const locationArray = accountData.trips[accountData.trips.length - 1].tripNotes.map(item => {
			return {
				data: item,

				key: item.noteID,
				lon: item.lon,
				lat: item.lat,
			}
		})

		setNoteLocationData(locationArray)

		// await new Promise(resolve => setTimeout(resolve, 5000))

	}, [isFocused]);

	useEffect(()=> {

		const locationArray = accountData.trips[accountData.trips.length - 1].tripNotes.map(item => {
			return {
				data: item,

				key: item.noteID,
				lon: item.lon,
				lat: item.lat,
			}
		})

		setNoteLocationData(locationArray)

	}, [accountData])

	const {
		isOpen,
		onOpen,
		onClose
	} = useDisclose();

	return (

		<SafeAreaView style={{flex: 1}}>

			<HStack bg={"transparent"} px={18} justifyContent={"flex-end"} h={48} w={"100%"} zIndex={100}
			        position={"absolute"} top={60}>

				<GradientButton w={100} title={"返回旅程"} onPress={() => {
					navigation.goBack()
				}}/>

			</HStack>

			<Actionsheet
				isOpen={isOpen} onClose={onClose}

			>
				<Actionsheet.Content
					h={320}
					pt={8}
					background={"white"}
					_dragIndicatorWrapper={{
						h: 16,
						justifyContent: "center",
					}}
					_dragIndicator={{
						display: "none",
					}}
				>
					<VStack
						px={32}
						h={255}
						w={"100%"}
						alignItems={"center"}
						justifyContent={"space-between"}
					>

						<VStack alignItems={"flex-start"}>

							<Text
								mb={4}
								letterSpacing={1}
								fontSize={24}
								fontWeight={"bold"}
								color={theme.primary.text.purple}
							>
								{pressedNote.noteTitle}

							</Text>

							<HStack alignItems={"center"} justifyContent={"center"}>

								<Feather name={"map-pin"} size={18} color={theme.primary.bg.mmidgray}/>

								<Text
									ml={6}
									fontSize={14}
									fontWeight={"normal"}
									color={theme.primary.bg.mmidgray}
								>
									{pressedNote.codedLocation}

								</Text>

							</HStack>

							<HStack>
								<HStack mt={24} borderRadius={18} w={"100%"} p={8} borderWidth={1} borderColor={theme.primary.placeholder.indigo} borderStyle={"dashed"} alignItems={"center"}
								        justifyContent={"center"}>

									<Text
										noOfLines={3}
										ml={4}
										fontSize={16}
										fontWeight={"normal"}
										color={theme.primary.text.indigo}
									>
										{pressedNote.noteContent}
									</Text>

								</HStack>
							</HStack>

						</VStack>


						<HStack w={"100%"} borderRadius={18} px={8} w={"100%"} alignItems={"center"}
						        justifyContent={"flex-end"}>

							<GradientButton w={84} title={"刪除日記"} />

						</HStack>

					</VStack>
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
					ref={mapRef}
					style={{flex: 1}}
					// provider="apple"
					// customMapStyle={mapStyle}
				>

					{noteLocationData ? noteLocationData.map((location) => (

						<Marker
							tracksViewChanges={false}
							coordinate={{latitude: location.lat, longitude: location.lon}}
							key={`${location.key}`}
							// title={site.sna}
							description={location.address}
							onPress={() => {

								onOpen()

								//    noteID: "" + date.getTime(),
								//
								// 	recordTime: date,
								// 	noteTitle: noteTitle,
								// 	noteContent: noteContent,
								//
								// 	namedLocation: namedLocation,
								// 	codedLocation: codedLocation,
								//
								// 	hasImage: hasImage,
								// 	hasMood: hasMood,
								//
								// 	imageList: imageList,
								//
								// 	lon: noteLocation.lon,
								// 	lat: noteLocation.lat,

								setPressedNote({

									noteID: location.data.noteID,

									recordTime: location.data.recordTime,
									noteTitle: location.data.noteTitle,
									noteContent: location.data.noteContent,

									codedLocation: location.data.codedLocation,
									namedLocation: location.data.namedLocation,

									hasImage: location.data.hasImage,
									hasMood: location.data.hasMood,

									imageList: location.data.imageList,

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
								<View shadowOpacity={.25} shadowRadius={8} shadowOffset={{height: 1}} p={8} bg={"white"}
								      borderRadius={12}>
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
