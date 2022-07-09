import React, {useRef, useState} from "react"
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
import {useFocusEffect} from "@react-navigation/native"
import ViewShot from "react-native-view-shot"
import LottieView from "lottie-react-native";


const MemEnvelope = ({navigation, route}) => {

	// const { item } = route.params

	const theme = useTheme().colors

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const [paperStyle, setPaperStyle] = useState("")
	const [fontFamily, setFontFamily] = useState("")
	const [hasBGColor, setHasBGColor] = useState(false)
	const [showColorPanel, setShowColorPanel] = useState(false)
	const [selectedBGColor, setSelectedBGColor] = useState("white")

	const [imageURI, setImageURI] = useState()
	const [imageReady, setImageReady] = useState()

	const ref = useRef()

	useFocusEffect(
		React.useCallback(() => {

			ref.current.capture().then(uri => {
				setImageURI(uri)
				console.log("ViewShotCompleted.")
			})

		}, []),
	)

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

			<LottieView
				loop
				autoPlay={true}
				style={{
					width: 200,
					height: 200,
				}}
				source={require("../../res/envelope-travelope.lottie.json")}
				onAnimationFinish={(bool)=>{
					console.log(bool)
					console.log("sdgs")
					// navigation.navigate("MainScreen")
				}}
			/>

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

						<HStack borderWidth={1} borderColor={theme.primary.text.purple} w={16} h={16} ml={6} bg={selectedBGColor}
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
							<Pressable onPress={() => setSelectedBGColor("white")} p={2} w={32} h={32} borderColor={"gray.300"}
							           borderWidth={1} bg={"white"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "gray.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("gray.50")} p={2} w={32} h={32} borderColor={"gray.300"}
							           borderWidth={1} bg={"gray.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "gray.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("gray.100")} p={2} w={32} h={32} borderColor={"gray.300"}
							           borderWidth={1} bg={"gray.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "red.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("red.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"red.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "orange.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("orange.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"orange.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "yellow.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("yellow.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"yellow.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "green.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("green.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"green.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "blue.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("blue.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"blue.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "indigo.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("indigo.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"indigo.50"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "purple.50" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("purple.50")} p={2} w={32} h={32} borderWidth={1} borderColor={"gray.300"} bg={"purple.50"}
							           borderRadius={6}></Pressable>
						</HStack>


						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "red.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("red.100")} p={2} w={32} h={32} bg={"red.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "orange.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("orange.100")} p={2} w={32} h={32} bg={"orange.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "yellow.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("yellow.100")} p={2} w={32} h={32} bg={"yellow.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "green.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("green.100")} p={2} w={32} h={32} bg={"green.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "blue.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("blue.100")} p={2} w={32} h={32} bg={"blue.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "indigo.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("indigo.100")} p={2} w={32} h={32} bg={"indigo.100"}
							           borderRadius={6}></Pressable>
						</HStack>

						<HStack p={3} mr={6} borderRadius={8} borderWidth={1}
						        borderColor={selectedBGColor === "purple.100" ? "gray.400" : "transparent"}>
							<Pressable onPress={() => setSelectedBGColor("purple.100")} p={2} w={32} h={32} bg={"purple.100"}
							           borderRadius={6}></Pressable>
						</HStack>

					</ScrollView> :

					<></>

				}
			</VStack>

			<ViewShot
				style={{
					justifyContent: "center",
					alignItems: "center"
				}}

				ref={ref} options={{
				fileName: "Your-File-Name",
				format: "jpg",
				quality: 1,
				width: 2000,
				height: 500
			}}>

				<VStack bg={"black"} borderWidth={1}  borderColor={"lightgray"} borderRadius={18} mt={12} w={"100%"} bg={selectedBGColor} justifyContent={"flex-start"}>

					<HStack justifyContent={"center"} alignItems={"center"} w={"100%"} h={64}>
						<Text fontFamily={fontFamily === "default" ? null : "STSongti-TC-Regular"} fontSize={16} fontWewight={"bold"} color={theme.primary.text.purple}>
							跟家人出去玩
						</Text>
					</HStack>

					<HStack>

					</HStack>

				</VStack>

			</ViewShot>

		</LayoutBase>
	)
}

export default MemEnvelope
