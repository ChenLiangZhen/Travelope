import React, {useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import {HStack, Input, Pressable, ScrollView, Text, useTheme, useToast} from "native-base"
import DatePicker from "react-native-date-picker"
import Feather from "react-native-vector-icons/Feather"
import {GradientButton} from "../../components/GradientButton"
import {selectAccount} from "../../globalstate/accountSlice"
import {FlatList, Image, Keyboard} from "react-native"
import {WIDTH} from "../../Util"
import {useDispatch, useSelector} from "react-redux"
import {selectData} from "../../globalstate/dataSlice"
import {geocodingRequest} from "../../apis/api"
import Geolocation from "react-native-geolocation-service"
import ImagePicker from "react-native-image-crop-picker"
import {uploadImageInit} from "../../apis/fileManager"
import {useIsFocused} from "@react-navigation/native";
import {animated, config, useSpring} from "@react-spring/native";

const ImageItem = (props) => {

	const accountData = useSelector(selectData)
	const account = useSelector(selectAccount)

	const theme = useTheme().colors

	return (
		<HStack mr={8} borderRadius={14} borderColor={theme.primary.text.purple} p={2} borderWidth={2}>
			<Image

				style={{

					height: 66,
					width: 66,
					borderRadius: 12,

				}}

				alt={"image"}
				source={{uri: props.props.uri}}
			/>
		</HStack>
	)
}

const LegacyNote = ({navigation, route}) => {

	// const { title, content, noteLoc, codeLoc, hasImage } = route.params

	const {item, isNew} = route.params

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

	const isFocused = useIsFocused()

	const [wave1, setWave1] = useState(false)

	const wave1Anim = useSpring({
		opacity: wave1 ? 1 : 0,
		top: wave1 ? 0 : -64,
		config: config.wobbly
	})

	const wave2Anim = useSpring({
		opacity: wave1 ? 1 : 0,
		top: wave1 ? 0 : -64,
		delay: 150,
		config: config.wobbly
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

		if (isFocused) {

			setWave1(true)
		}

	}, [isFocused])

	useEffect(() => {

		const unsubscribe = navigation.addListener('blur', () => {
			console.log("LEAVING EVENT EMITTER")
			setWave1(false)
		});

		return unsubscribe;

	}, [navigation])

	const getLocation = async () => {

		console.log("exec")
		let status = await Geolocation.requestAuthorization("whenInUse")
		if (status !== "granted") {
			return
		}
		Geolocation.getCurrentPosition((res) => {
			setNoteLocation({lat: res.coords.latitude, lon: res.coords.longitude})
		}, rej => console.log(rej))
	}

	const renderItemImage = props => <ImageItem props={props.item}/>

	useEffect(() => {

		if (isNew) {

			console.log("isNewNote: " + isNew)

			setNoteTitle("")
			setNoteContent("")
			setNoteLocation({})
			setNamedLocation("")
			setCodedLocation("")
			setImageList([])

			setDate(new Date())

			getLocation()
				.then(res => {
					geocodingRequest(noteLocation.lon, noteLocation.lat)
						.then(res => {

								setCodedLocation(res.data.results[0].formatted_address)
								console.log("已經進行定位")

							},
							rej => console.log(rej))
				})

		} else {

			console.log("isNewNote: " + isNew)

			setNoteTitle(item.noteTitle)
			setNoteContent(item.noteContent)
			setNoteLocation({lon: item.lon, lat: item.lat})
			setNamedLocation(item.namedLocation)
			setCodedLocation(item.codedLocation)
			setImageList(item.imageList)
		}

	}, [isFocused])

	// useFocusEffect(
	//
	// 	React.useCallback(() => {
	//
	//
	//
	// 	}, []),
	// )

	useEffect(() => {

		setNoteObject({

			noteID: "" + date.getTime(),

			recordTime: date,
			noteTitle: noteTitle,
			noteContent: noteContent,

			namedLocation: namedLocation,
			codedLocation: codedLocation,

			hasImage: hasImage,
			hasMood: hasMood,

			imageList: imageList,

			lon: noteLocation.lon,
			lat: noteLocation.lat,
		})

	}, [noteTitle, noteContent, namedLocation, codedLocation])

	useEffect(() => {

		console.log("NOTE OBJECT NOW: " + JSON.stringify(noteObject))

	}, [noteObject])

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
						<ToastInfo/>
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

			const accountID = account.info.id
			const URI = await uploadImageInit(image, accountID)

			setImageList((prev) => [...prev, {uri: URI}])

			// uploadProfilePicture(account.info.id, account.info.id, URI)

			// apiRequest("put", "/travelope/update-user-has-picture", {
			// 	id: accountID,
			// })
		})
	}

	return (

		<LayoutBase>

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

				<animated.View style={wave1Anim}>

					{item.imageList.length > 0 ?

						<HStack w={"100%"} mt={16} alignItems={"center"} justifyContent={"flex-end"}>

							<FlatList
								inverted
								horizontal={true}
								// keyExtractor={item => item.uri}
								data={imageList}
								renderItem={renderItemImage}
							/>
						</HStack> : <></>
					}

				</animated.View>

				<Pressable onPress={() => Keyboard.dismiss()}>

					<animated.View style={wave2Anim}>

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
					</animated.View>

					<animated.View style={wave3Anim}>

						<FlatBlock
							h={64}
							mb={16}
							borderWidth={2}
							pr={8}
							flexDirection={"row"}
							bg={"white"}
							shadowColor={theme.primary.bg.litgray}
							borderColor={theme.primary.placeholder.purple}
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

						</FlatBlock>

						<FlatBlock
							h={64}
							mb={16}
							borderWidth={2}
							pr={8}
							flexDirection={"row"}
							bg={"white"}
							shadowColor={theme.primary.bg.litgray}
							borderColor={theme.primary.placeholder.purple}
							ai={"center"}
						>
							<Text
								color={theme.primary.text.purple}
								fontSize={16}
								fontWeight={"bold"}
								mr={20}
							>地址</Text>

							<Text flex={1} noOfLines={1} fontSize={16} color={theme.primary.text.purple}>
								{codedLocation}
							</Text>

						</FlatBlock>

						<FlatBlock
							h={64}
							mb={36}
							borderWidth={2}
							flexDirection={"row"}
							bg={"white"}
							shadowColor={theme.primary.bg.litgray}
							borderColor={theme.primary.placeholder.purple}
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
								<Feather name={"calendar"} color={theme.primary.text.indigo} size={20}/>
							</Pressable>

						</FlatBlock>

					</animated.View>

					<animated.View style={wave4Anim}>
						<HStack borderRadius={18} fd={"row"} h={32} sc={"#9e66ff"}
						        bdc={theme.primary.text.purple} alignItems={"center"} justifyContent={"flex-end"}>

							<GradientButton w={72} color={"white"} title={"返回"} onPress={() => {

								navigation.goBack()
							}}
							/>

						</HStack>
					</animated.View>








				</Pressable>


			</ScrollView>

		</LayoutBase>
	)
}

export default LegacyNote
