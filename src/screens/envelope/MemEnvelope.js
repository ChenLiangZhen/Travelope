import React, {useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import {selectAccount} from "../../globalstate/accountSlice"
import {useDispatch, useSelector} from "react-redux"
import {selectData} from "../../globalstate/dataSlice"
import {
	Center,
	CheckIcon,
	Divider,
	HamburgerIcon,
	HStack,
	Menu,
	Pressable, ScrollView,
	Select,
	Text,
	useTheme,
	VStack,
} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import {useFocusEffect, useIsFocused} from "@react-navigation/native"
import ViewShot from "react-native-view-shot"
import LottieView from "lottie-react-native";
import Lottie from 'lottie-react-native';
import {GradientButton} from "../../components/GradientButton";
import {animated, config, useSpring} from "@react-spring/native";
import {HEIGHT} from "../../Util";
import {Image} from "react-native";


const MemEnvelope = ({navigation, route}) => {

	const { item } = route.params

	const theme = useTheme().colors

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const [trip, setTrip] = useState({})

	const [paperStyle, setPaperStyle] = useState("")
	const [fontFamily, setFontFamily] = useState("")
	const [hasBGColor, setHasBGColor] = useState(false)
	const [showColorPanel, setShowColorPanel] = useState(false)
	const [selectedBGColor, setSelectedBGColor] = useState("white")

	const [enteredEnvelope, setEnteredEnvelope] = useState(false)

	const [imageURI, setImageURI] = useState()
	const [imageReady, setImageReady] = useState()

	const isFocused = useIsFocused()

	const ref = useRef()
	const animationRef = useRef(null)

	const envelopeAnimation = useSpring({
		marginTop: 12,
		opacity: enteredEnvelope ? 1 : 0,
		top: enteredEnvelope ? 0 : 200,
		delay: 250,
		config: config.slow
	})

	const [wave1, setWave1] = useState(false)
	const [wave2, setWave2] = useState(false)

	const wave1Anim = useSpring({
		opacity: wave1 ? 1 : 0,
		top: wave1 ? 0 : -64,
		config: config.wobbly
	})

	const wave2Anim = useSpring({

		height: wave2? 0: 144,
		opacity: wave2 ? 0 : 1,
		delay: 150,
		config: config.default
	})

	const wave3Anim = useSpring({
		opacity: wave1 ? 1 : 0,
		top: wave1 ? 0 : -64,
		delay: 300,

		config: config.wobbly
	})

	const wave4Anim = useSpring({
		opacity: wave1 ? 1 : 0,
		top: wave1 ? 0 : -64,
		delay: 450,

		config: config.wobbly
	})

	useEffect(() => {

		setTrip(item)

		if (isFocused) {

			setWave1(true)
		}

	}, [isFocused])

	useEffect(() => {

		const unsubscribe = navigation.addListener('blur', () => {
			console.log("LEAVING EVENT EMITTER")
			setWave1(false)
			setWave2(false)
			setEnteredEnvelope(false)
		});

		return unsubscribe;

	}, [navigation])

	useEffect(() => {

		if(enteredEnvelope){

			// ref.current.capture().then(uri => {
			// 	setImageURI(uri)
			// 	console.log("ViewShotCompleted.")T

			// })
		}

	}, [enteredEnvelope])

	useFocusEffect(
		React.useCallback(async () => {

			if (imageURI !== "") {

				console.log(imageURI)
				setImageReady(true)

				// await new Promise(resolve => setTimeout(resolve, 1500))
				// navigation.navigate("TripPostcard", { uri: imageURI } )
			}

		}, [imageURI]),
	)

	return (

		<LayoutBase>

			{enteredEnvelope ?

				<>
					<VStack>

						<HStack mb={12} justifyContent={"flex-end"} alignItems={"center"}>

							<Select borderRadius={100}
							        borderColor={theme.primary.placeholder.purple}
							        borderWidth={1}
							        h={34}
							        mr={6}
							        w={64}
							        textAlign={"center"}
								// alignItems={"center"}
								     color={"#af81ff"}
								     fontSize={14}
								     fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"}
								     fontWeight={"bold"}
								     selectedValue={fontFamily} accessibilityLabel="Choose Service"
								     placeholder="字體"

								     dropdownIcon={<></>

									     // <Center mr={6}>
									     //   <Feather name={"arrow-down-circle"} size={22} color={"#af81ff"} />
									     // </Center>
								     }

								     placeholderTextColor={"#af81ff"}

								     _actionSheetBody={{
									     p: 12,
								     }}

								     _actionSheetContent={{

									     _dragIndicatorWrapper: {
										     h: 16,
										     justifyContent: "center",
										     // bg: "gray.200"
									     },
									     _dragIndicator: {
										     bg: "#a180ff",
										     h: 4,
										     w: 48,
									     },
								     }}

								     _item={{
									     _text: {
										     color: "#7f54ff",
									     },
									     _pressed: {
										     bg: "#f2f2ff",
									     },
									     my: 8,
								     }}

								     _selectedItem={{
									     _text: {
										     color: "#7f54ff",
										     fontSize: 16,
										     fontWeight: "bold",
									     },
									     bg: "#e9e9ff",
									     px: 12,
									     h: 48,
									     justifyContent: "center",
									     borderRadius: 8,
									     startIcon:

										     <Center mr={6}>
											     <Feather name={"check"} size={18} color={theme.primary.text.purple}/>
										     </Center>

								     }} mt={1}

								     onValueChange={itemValue => setFontFamily(itemValue)}>

								<Select.Item label="系統" value="default"/>
								<Select.Item label="宋體" value="STSongti-TC-Regular"/>
							</Select>

							<Pressable

								flexDirection={"row"}
								onPress={() => {
									setShowColorPanel(prev => !prev)
								}}

								borderRadius={100}
								borderColor={theme.primary.placeholder.purple}
								borderWidth={1}
								h={36}
								w={96}
								textAlign={"center"}
								color={"#af81ff"}
								fontSize={14}
								fontWeight={"bold"}
								alignItems={"center"}
								justifyContent={"center"}
							>

								<Text color={theme.primary.text.purple} fontWeight={"normal"} textAlign={"center"}>
									背景色
								</Text>

								<HStack borderWidth={1} borderColor={theme.primary.text.purple} w={16} h={16} ml={6}
								        bg={selectedBGColor}
								        borderRadius={8}/>

							</Pressable>

						</HStack>

						{showColorPanel ?

							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								h={40}
								_contentContainerStyle={{
									h: 40,
								}}
							>


								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "white" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("white")} p={2} w={32} h={32}
									           borderColor={"gray.300"}
									           borderWidth={1} bg={"white"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "gray.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("gray.50")} p={2} w={32} h={32}
									           borderColor={"gray.300"}
									           borderWidth={1} bg={"gray.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "gray.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("gray.100")} p={2} w={32} h={32}
									           borderColor={"gray.300"}
									           borderWidth={1} bg={"gray.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "red.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("red.50")} p={2} w={32} h={32} borderWidth={1}
									           borderColor={"gray.300"} bg={"red.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "orange.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("orange.50")} p={2} w={32} h={32}
									           borderWidth={1} borderColor={"gray.300"} bg={"orange.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "yellow.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("yellow.50")} p={2} w={32} h={32}
									           borderWidth={1} borderColor={"gray.300"} bg={"yellow.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "green.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("green.50")} p={2} w={32} h={32} borderWidth={1}
									           borderColor={"gray.300"} bg={"green.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "blue.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("blue.50")} p={2} w={32} h={32} borderWidth={1}
									           borderColor={"gray.300"} bg={"blue.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "indigo.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("indigo.50")} p={2} w={32} h={32}
									           borderWidth={1} borderColor={"gray.300"} bg={"indigo.50"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "purple.50" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("purple.50")} p={2} w={32} h={32}
									           borderWidth={1} borderColor={"gray.300"} bg={"purple.50"}
									           borderRadius={6}></Pressable>
								</HStack>


								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "red.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("red.100")} p={2} w={32} h={32} bg={"red.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "orange.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("orange.100")} p={2} w={32} h={32}
									           bg={"orange.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "yellow.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("yellow.100")} p={2} w={32} h={32}
									           bg={"yellow.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "green.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("green.100")} p={2} w={32} h={32}
									           bg={"green.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "blue.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("blue.100")} p={2} w={32} h={32} bg={"blue.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "indigo.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("indigo.100")} p={2} w={32} h={32}
									           bg={"indigo.100"}
									           borderRadius={6}></Pressable>
								</HStack>

								<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
								        borderColor={selectedBGColor === "purple.100" ? "gray.400" : "transparent"}>
									<Pressable onPress={() => setSelectedBGColor("purple.100")} p={2} w={32} h={32}
									           bg={"purple.100"}
									           borderRadius={6}></Pressable>
								</HStack>

							</ScrollView> :

							<></>

						}

					</VStack>

					<animated.View style={envelopeAnimation}>

						<ViewShot
							style={{
								justifyContent: "center",
								alignItems: "center"
							}}

							ref={ref} options={{
							fileName: "Your-File-Name",
							format: "jpg",
							quality: 1,
							// width: 2000,
							// height: 500
						}}>

							<VStack p={24} borderWidth={1} borderColor={"lightgray"} borderRadius={18} w={"100%"}
							        bg={selectedBGColor} justifyContent={"flex-start"}>

								<HStack justifyContent={"center"} alignItems={"center"} w={"100%"}>
									<Text fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={20}
									      fontWeight={"bold"} color={theme.primary.text.purple}>
										{item.tripName}
									</Text>
								</HStack>

								<HStack justifyContent={"center"} alignItems={"center"} w={"100%"} mb={32}>
									<Text fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={16}
									      fontWeight={"bold"} color={theme.primary.text.purple}>
										{new Date(item.startTime).getFullYear() + "年 " + (new Date(item.startTime).getMonth() + 1) + "月 " + new Date(item.startTime).getDate() + "日"}
									</Text>
								</HStack>

								<HStack justifyContent={"space-between"} alignItems={"center"} w={"100%" } mb={24} h={120}>

									<Image
										style={{
											borderRadius: 18,
											height: 120,
											width: 120,
										}}

										resizeMode={"contain"}
										source={{uri: item.tripNotes[0].imageList[0].uri}}
										alt={"userImage"}
									/>

									<VStack ml={16} borderWidth={1} borderColor={theme.primary.placeholder.purple} borderRadius={18} flex={2} h={120} alignItems={"flex-start"} justifyContent={"space-between"} p={8}>


									<Text fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={14}
										      fontWewight={"normal"} color={theme.primary.text.purple}>
											{item.tripNotes[0].noteContent}
										</Text>

										<HStack width={"100%"} alignItems={"center"} justifyContent={"flex-start"}>

											<Feather name={"map-pin"} color={theme.primary.text.purple} size={14}/>

											<Text ml={4} fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={14}
											      fontWeight={"bold"} color={theme.primary.text.purple}>
												{item.tripNotes[0].namedLocation}
											</Text>

										</HStack>
									</VStack>
								</HStack>

								<HStack justifyContent={"space-between"} alignItems={"center"} w={"100%" } mb={16} h={120}>

									<VStack borderWidth={1} borderColor={theme.primary.placeholder.purple} borderRadius={18} flex={2} mr={16} h={120} alignItems={"flex-start"} justifyContent={"space-between"} p={8}>
										<Text fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={14}
										      fontWewight={"normal"} color={theme.primary.text.purple}>
											{item.tripNotes[1].noteContent}
										</Text>


										<HStack alignItems={"center"}>

											<Feather name={"map-pin"} color={theme.primary.text.purple} size={14}/>
											<Text ml={4} fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={14}
											      fontWeight={"bold"} color={theme.primary.text.purple}>
												{item.tripNotes[1].namedLocation}
											</Text>
										</HStack>

									</VStack>

									<Image
										style={{
											borderRadius: 18,
											height: 120,
											width: 120,
										}}

										resizeMode={"contain"}
										source={{uri: item.tripNotes[1].imageList[0].uri}}
										alt={"userImage"}
									/>

								</HStack>

								<HStack>

								</HStack>

							</VStack>

						</ViewShot>

					</animated.View>


					<animated.View style={wave3Anim}>

						<HStack w={"100%"} justifyContent={"flex-end"} mt={16}>
							<GradientButton w={108} title={"輸出為卡片"} onPress={()=> {
								ref.current.capture().then(uri => {
									setImageURI(uri)

									// await new Promise(resolve => setTimeout(resolve, 1500))
									navigation.navigate("TripPostcard", { uri: uri } )

									console.log("ViewShotCompleted.")
									})
							}}/>
						</HStack>

					</animated.View>

				</>

				:

				<VStack h={HEIGHT * .6} alignItems={"center"} justifyContent={"center"}>

					<Lottie

						loop={false}
						ref={animationRef}

						style={{

							width: 256,
							height: 256,

						}}

						source={require("../../res/travelope-final.json")}

						onAnimationFinish={() => {
							setEnteredEnvelope(true)
						}}
					/>

					<animated.View style={wave2Anim}>
						<GradientButton mt={84} w={96} onPress={()=> {
							setWave2(true)
							animationRef.current?.play()
						}} title={"開啟信封"}/>
					</animated.View>

				</VStack>

			}


		</LayoutBase>
	)
}

export default MemEnvelope
