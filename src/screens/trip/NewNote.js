import React, { useEffect, useRef, useState } from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import {
	HStack,
	Input,
	Modal,
	Pressable,
	ScrollView,
	Text,
	TextArea,
	useTheme,
	useToast,
	View,
	VStack,
} from "native-base"
import Block from "../../components/Block"
import DatePicker from "react-native-date-picker"
import Feather from "react-native-vector-icons/Feather"
import { GradientBorderButton, GradientButton } from "../../components/GradientButton"
import { selectAccount } from "../../globalstate/accountSlice"
import { FlatList, Keyboard } from "react-native"
import { HEIGHT, WIDTH } from "../../Util"
import { useDispatch, useSelector } from "react-redux"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import { pushTrip, pushTripNote, selectData, setCurrentTrip } from "../../globalstate/dataSlice"
import { apiRequest, geocodingRequest } from "../../apis/api"
import Geolocation from "react-native-geolocation-service"

const NewTrip = ({ navigation }) => {

	const theme = useTheme().colors

	const [noteTitle, setNoteTitle] = useState("")
	const [noteContent, setNoteContent] = useState("")
	const [modalVisible, setModalVisible] = useState(false)

	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)

	const [noteLocation, setNoteLocation] = useState({})
	const [codedLocation, setCodedLocation] = useState("")
	const [namedLocation, setNamedLocation] = useState("")

	const [noteObject, setNoteObject] = useState({})

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const toastInfoRef = useRef()
	const toast = useToast()

	const getLocation = async () => {

		console.log("exec")

		let status = await Geolocation.requestAuthorization("whenInUse")

		if (status !== "granted") {
			console.log("Permission to access location was denied")
			return
		}

		Geolocation.getCurrentPosition((res) => {

			setNoteLocation({ lat: res.coords.latitude, lon: res.coords.longitude })

			console.log("located! " + JSON.stringify(res))
		}, rej => console.log(rej))

	}

	useEffect(() => {

		getLocation()
	}, [])

	useEffect(() => {

		console.log(noteLocation)
	}, [noteLocation])

	useEffect(() => {

		setNoteObject({

			noteID: ""+ date.getTime(),
			recordTime: date,
			title: noteTitle,
			content: noteContent,
			imageKey: [],

			lon: noteLocation.lon,
			lat: noteLocation.lat,
		})

	}, [noteTitle, noteContent])

	useEffect(()=> {
		console.log(accountData.trips)
	},[accountData])

	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast() {
		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo />
					)
				},
			})
		}
	}

	const ToastInfo = (info) => {
		return (
			<HStack

				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.indigo} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{info}</Text>
			</HStack>
		)
	}

	return (

		<LayoutBase>

			<Modal isOpen={modalVisible} onClose={() => setModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .25}
			       shadowOpacity={.2}
			       shadowRadius={24}
			       shadowOffset={{
				       height: 4,
			       }}
			       _backdrop={{ bg: "#000", opacity: .25 }}
			>

				<Modal.Content borderRadius={24} w={WIDTH * .9} px={20} h={HEIGHT * .5} alignSelf={"center"} py={12}>

					<HStack mt={4} h={30} mb={20} justifyContent={"space-between"} alignItems={"center"}>

						<Text ml={8} fontSize={18} letterSpacing={1} fontWeight={"normal"} color={theme.primary.text.indigo}>
							選擇朋友
						</Text>

						<Pressable onPress={() => setModalVisible()} justifyContent={"center"} alignItems={"center"} w={28}
						           h={28}>
							<Feather name={"x"} size={20} color={theme.primary.text.indigo} />
						</Pressable>

					</HStack>

				</Modal.Content>

			</Modal>

			<DatePicker
				modal
				theme={"light"}
				mode={"datetime"}
				title={"撰寫時間"}
				open={open}
				date={date}
				onConfirm={(date) => {
					setOpen(false)
					setDate(date)
				}}
				onCancel={() => {
					setOpen(false)
				}}
			/>


			<ScrollView
				showsVerticalScrollIndicator={false}
				flex={1}
			>

				<Pressable onPress={() => Keyboard.dismiss()}>

					<Input
						_focus={{
							borderColor: theme.primary.text.purple,
							placeholderTextColor: theme.primary.placeholder.purple,

							color: theme.primary.text.purple,
							bg: theme.primary.bg.purple,
						}}

						value={noteTitle}
						letterSpacing={1}
						placeholder={"名稱"}
						letterSpacing={1}

						onChangeText={title => setNoteTitle(title)}
						selectionColor={theme.primary.text.indigo}
						borderColor={"transparent"}
						color={theme.primary.text.purple}
						bg={theme.primary.bg.smoke}
						borderWidth={1}
						borderRadius={16}
						fontWeight={"bold"}
						h={48}
						mt={12}
						mb={16}
						px={14}
						py={12}
						fontSize={16}
						textAlign={"left"}
					/>

					{/*</FlatBlock>*/}

					{/*<FlatBlock*/}
					{/*	h={104}*/}
					{/*	mb={16}*/}
					{/*	borderWidth={1}*/}
					{/*	flexDirection={"row"}*/}
					{/*	bg={"white"}*/}
					{/*	shadowColor={theme.primary.bg.litgray}*/}
					{/*	borderColor={theme.primary.text.purple}*/}
					{/*	ai={"center"}*/}
					{/*>*/}

					<Input
						_focus={{
							borderColor: theme.primary.text.purple,
							placeholderTextColor: theme.primary.placeholder.purple,
							color: theme.primary.text.purple,
							bg: theme.primary.bg.purple,
						}}

						multiline={true}
						value={noteContent}
						placeholder={"描述"}
						onChangeText={content => setNoteContent(content)}

						letterSpacing={1}
						selectionColor={theme.primary.text.indigo}
						borderColor={"transparent"}
						color={theme.primary.text.purple}
						bg={theme.primary.bg.smoke}
						borderWidth={1}
						borderRadius={16}
						fontWeight={"bold"}
						mb={32}

						h={120}
						px={14}
						py={12}
						fontSize={16}
						textAlign={"left"}
					/>

					{/*</FlatBlock>*/}

					<FlatBlock
						h={64}
						mb={16}
						borderWidth={1}
						pr={8}
						flexDirection={"row"}
						bg={"white"}
						shadowColor={theme.primary.bg.litgray}
						borderColor={theme.primary.text.purple}
						ai={"center"}
					>
						<Text
							color={theme.primary.text.purple}
							fontSize={16}
							fontWeight={"bold"}
							mr={20}
						>地點</Text>

						<Input
							onPress={() => console.log("gjreo")}
							_focus={{
								borderColor: theme.primary.text.purple,
								color: theme.primary.text.purple,
								bg: theme.primary.bg.purple,
							}}
							value={namedLocation}
							onChangeText={(location)=> setNamedLocation(location)}
							selectionColor={theme.primary.text.purple}
							placeholderTextColor={theme.primary.placeholder.indigo}
							borderColor={"transparent"}
							color={theme.primary.text.purple}
							bg={theme.primary.bg.smoke}
							borderWidth={1}
							borderRadius={16}
							fontWeight={"bold"}
							mr={16}
							h={36}
							flex={8}
							px={20}

							fontSize={16}
							textAlign={"left"}
						/>

						{/*<Pressable h={32} justifyContent={"center"} onPress={async () => {*/}
						{/*	geocodingRequest(noteLocation.lon, noteLocation.lat)*/}
						{/*		.then(res => {*/}
						{/*				setCodedLocation(res.data.results[0].formatted_address)*/}
						{/*				console.log(res.data.results[0].formatted_address)*/}
						{/*			},*/}
						{/*			rej => console.log(rej))*/}
						{/*}}>*/}

						{/*	<Feather name={"map-pin"} color={theme.primary.text.indigo} size={20} />*/}
						{/*</Pressable>*/}

					</FlatBlock>

					<FlatBlock
						h={64}
						mb={16}
						borderWidth={1}
						flexDirection={"row"}
						bg={"white"}
						shadowColor={theme.primary.bg.litgray}
						borderColor={theme.primary.text.purple}
						ai={"center"}
					>
						<Text
							color={theme.primary.text.purple}
							fontSize={16}
							fontWeight={"bold"}
							mr={20}
						>位置</Text>

						<Input
							onPress={() => console.log("gjreo")}
							_focus={{
								borderColor: theme.primary.text.purple,
								color: theme.primary.text.purple,
								bg: theme.primary.bg.purple,
							}}
							value={codedLocation}
							selectionColor={theme.primary.text.purple}
							placeholderTextColor={theme.primary.placeholder.indigo}
							borderColor={"transparent"}
							color={theme.primary.text.purple}
							bg={theme.primary.bg.smoke}
							borderWidth={1}
							borderRadius={16}
							fontWeight={"bold"}
							mr={16}
							h={36}
							flex={8}
							px={20}
							fontSize={16}
							textAlign={"left"}
						/>

						<Pressable h={32} justifyContent={"center"} onPress={async () => {
							geocodingRequest(noteLocation.lon, noteLocation.lat)
								.then(res => {
										setCodedLocation(res.data.results[0].formatted_address)
										console.log(res.data.results[0].formatted_address)
									},
									rej => console.log(rej))
						}}>

							<Feather name={"map-pin"} color={theme.primary.text.indigo} size={20} />
						</Pressable>

					</FlatBlock>

					<FlatBlock
						h={64}
						mb={36}
						borderWidth={1}
						flexDirection={"row"}
						bg={"white"}
						shadowColor={theme.primary.bg.litgray}
						borderColor={theme.primary.text.purple}
						ai={"center"}
					>
						<Text
							color={theme.primary.text.purple}
							fontSize={16}
							fontWeight={"bold"}
							mr={20}
						>時間</Text>

						<Input
							_focus={{
								borderColor: theme.primary.text.purple,
								color: theme.primary.text.purple,
								bg: theme.primary.bg.purple,
							}}
							value={date.getFullYear() + " - " + (date.getMonth() + 1) + " - " + date.getDate() + "   " + date.getHours() + " : " + date.getMinutes()}
							selectionColor={theme.primary.text.purple}
							borderColor={"transparent"}
							color={theme.primary.text.purple}
							bg={theme.primary.bg.smoke}
							borderWidth={1}
							borderRadius={16}
							fontWeight={"bold"}
							mr={16}
							h={36}
							flex={8}
							px={20}
							fontSize={16}
							textAlign={"left"}
						/>

						<Pressable h={32} justifyContent={"center"} onPress={() => setOpen(true)}>
							<Feather name={"calendar"} color={theme.primary.text.indigo} size={20} />
						</Pressable>

					</FlatBlock>

					<Block pl={24} pr={18} mb={36} borderRadius={18} fd={"row"} h={64} sc={"#9e66ff"}
					       bdc={theme.primary.text.purple}
					       ai={"center"}
					       jc={"space-between"}>

						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							寫完了嗎？
						</Text>

						<GradientButton w={100} h={34} title={"儲存遊記"} onPress={() => {

							dispatch(pushTripNote(noteObject))

							apiRequest("post", `/api/travelope/new-trip-note/${account.info.id}`, noteObject)

							// navigation.navigate("CurrentTrip")

						}} />

					</Block>

				</Pressable>

			</ScrollView>





			{/*</Pressable>*/}


		</LayoutBase>
	)
}

export default NewTrip
