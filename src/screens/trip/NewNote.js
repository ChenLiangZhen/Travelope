import React, { useEffect, useRef, useState } from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import { HStack, Input, Modal, Pressable, ScrollView, Text, useTheme, useToast } from "native-base"
import Block from "../../components/Block"
import DatePicker from "react-native-date-picker"
import Feather from "react-native-vector-icons/Feather"
import { GradientBorderButton, GradientButton } from "../../components/GradientButton"
import { selectAccount } from "../../globalstate/accountSlice"
import { FlatList, Image, Keyboard } from "react-native"
import { HEIGHT, WIDTH } from "../../Util"
import { useDispatch, useSelector } from "react-redux"
import { pushTripNote, selectData } from "../../globalstate/dataSlice"
import { apiRequest, geocodingRequest } from "../../apis/api"
import Geolocation from "react-native-geolocation-service"
import ImagePicker from "react-native-image-crop-picker"
import { uploadImageInit } from "../../apis/fileManager"
import RNFS from "react-native-fs"


const ImageItem = (props) => {

	const accountData = useSelector(selectData)
	const account = useSelector(selectAccount)

	const theme = useTheme().colors
	useEffect(() => {
		console.log("this is props: " + JSON.stringify(props))
	}, [])

	return (
		<HStack mr={8} borderRadius={14} borderColor={theme.primary.text.purple} p={1} borderWidth={2}>
			<Image

				style={{
					borderWidth: 1,
					height: 68,
					width: 68,
					borderRadius: 12,

				}}

				alt={"image"}
				source={{ uri: props.props.uri }}
			/>
		</HStack>
	)
}

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

	const [hasImage, setHasImage] = useState(false)
	const [hasMood, setHasMood] = useState(false)

	const [imageList, setImageList] = useState([])
	const [mood, setMood] = useState()

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

	const renderItemImage = props => <ImageItem props={props.item} />

	useEffect(() => {

		getLocation()
	}, [])

	useEffect(() => {

		setNoteObject({

			noteID: "" + date.getTime(),
			recordTime: date,
			title: noteTitle,
			content: noteContent,

			namedLocation: namedLocation,
			codedLocation: codedLocation,

			imageKey: imageList,

			lon: noteLocation.lon,
			lat: noteLocation.lat,
		})

	}, [noteTitle, noteContent, namedLocation, codedLocation])

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

	const updateImage = async () => {

		ImagePicker.openPicker({
			width: 512,
			height: 512,
			mediaType: "photo",
			cropping: true,

		}).then(async image => {

			console.log("Setting profile image...")

			const accountID = account.info.id
			const URI = await uploadImageInit(image, accountID)

			setImageList((prev) => [...prev, { uri: URI }])

			// uploadProfilePicture(account.info.id, account.info.id, URI)

			// apiRequest("put", "/api/travelope/update-user-has-picture", {
			// 	id: accountID,
			// })
		})
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

				{/*<KeyboardAvoidingView flex={1} pb={400}>*/}

				<HStack justifyContent={"flex-end"}>


					{hasImage?
						<GradientButton w={72} color={"white"} title={"照片"} onPress={() => {

							setHasImage(prev => !prev)
						}}
						/> :
						<GradientBorderButton w={72} color={theme.primary.text.purple} title={"照片"} onPress={() => {

							setHasImage(prev => !prev)
						}}
						/>
					}

					{hasMood?
						<GradientButton ml={8} w={72} color={"white"} title={"心情"} onPress={() => {

							setHasImage(prev => !prev)
						}}
						/> :
						<GradientBorderButton ml={8} w={72} color={theme.primary.text.purple} title={"心情"} onPress={() => {

							setHasImage(prev => !prev)
						}}
						/>
					}

				</HStack>

				{hasImage?

					<HStack w={"100%"} mt={16} alignItems={"center"} justifyContent={"flex-end"}>

						<FlatList
							inverted
							horizontal={true}
							// keyExtractor={item => item.uri}
							data={imageList}
							renderItem={renderItemImage}
						/>

						<Pressable

							onPress={() => {
								updateImage()
							}}

							h={72}
							w={72}
							ml={8}
							flexDirection={"row"}
							justifyContent={"center"}
							alignItems={"center"}
							borderRadius={12}
							borderStyle={"dashed"}
							borderWidth={2}
							borderColor={theme.primary.placeholder.indigo}
						>

							<Feather name={"image"} size={22} color={theme.primary.placeholder.indigo} />

						</Pressable>
					</HStack> : <></>
				}

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
						mt={24}
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
							onChangeText={(location) => setNamedLocation(location)}
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

						<GradientBorderButton w={72} color={theme.primary.text.purple} title={"取消"} onPress={() => {

							navigation.navigate("CurrentTrip")
						}}
						/>

						<GradientButton ml={8} w={96} h={34} title={"儲存遊記"} onPress={() => {

							dispatch(pushTripNote(noteObject))

							apiRequest("post", `/api/travelope/new-trip-note/${account.info.id}`, noteObject)

							navigation.navigate("CurrentTrip")

						}} />

					</Block>

				</Pressable>
				{/*</KeyboardAvoidingView>*/}

				<HStack h={384}></HStack>

			</ScrollView>

		</LayoutBase>
	)
}

export default NewTrip
