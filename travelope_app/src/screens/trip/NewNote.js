import React, {useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import {HStack, Input, Pressable, ScrollView, Text, useTheme, useToast} from "native-base"
import Block from "../../components/Block"
import DatePicker from "react-native-date-picker"
import Feather from "react-native-vector-icons/Feather"
import {GradientBorderButton, GradientButton} from "../../components/GradientButton"
import {selectAccount} from "../../globalstate/accountSlice"
import {FlatList, Image, Keyboard} from "react-native"
import {WIDTH} from "../../Util"
import {useDispatch, useSelector} from "react-redux"
import {pushTripNote, selectData, updateTripNote} from "../../globalstate/dataSlice"
import {apiRequest, geocodingRequest} from "../../apis/api"
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

const NewNote = ({navigation, route}) => {

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
	const isFocused = useIsFocused()


	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const toastInfoRef = useRef()
	const toast = useToast()

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
								console.log("??????????????????")

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

	}, [noteTitle, noteContent, namedLocation, codedLocation, imageList, noteLocation])

	useEffect(() => {

		console.log("NOTE OBJECT NOW: " + JSON.stringify(noteObject))

	}, [noteObject])

	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast(info) {

		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo info={info}/>
					)
				},
			})
		}
	}

	const ToastInfo = ({info}) => {
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
				title={"????????????"}
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

				<Pressable onPress={() => Keyboard.dismiss()}>

					<animated.View style={wave1Anim}>

						<HStack justifyContent={"flex-end"}>


							{hasImage ?

								<GradientButton w={72} color={"white"} title={"??????"} onPress={() => {

									setHasImage(prev => !prev)
								}}
								/> :

								<GradientBorderButton w={72} color={theme.primary.text.purple} title={"??????"} onPress={() => {

									setHasImage(prev => !prev)
								}}
								/>

							}

							{/*{hasMood ?*/}
							{/*	<GradientButton ml={8} w={72} color={"white"} title={"??????"} onPress={() => {*/}

							{/*		setHasImage(prev => !prev)*/}
							{/*	}}*/}
							{/*	/> :*/}
							{/*	<GradientBorderButton ml={8} w={72} color={theme.primary.text.purple} title={"??????"} onPress={() => {*/}

							{/*		setHasImage(prev => !prev)*/}
							{/*	}}*/}
							{/*	/>*/}
							{/*}*/}

						</HStack>

						{hasImage ?

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

									<Feather name={"image"} size={22} color={theme.primary.placeholder.indigo}/>

								</Pressable>
							</HStack> : <></>
						}

					</animated.View>

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
							placeholder={"??????"}
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
							placeholder={"??????"}
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
							>??????</Text>

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
							>??????</Text>

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
							>??????</Text>

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

						<Block pl={24} pr={18} mb={36} borderRadius={18} fd={"row"} h={64} sc={"#9e66ff"}
						       bdc={theme.primary.text.purple}
						       ai={"center"}
						       jc={"space-between"}>

							<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
								????????????
							</Text>

							<GradientBorderButton w={72} color={theme.primary.text.purple} title={"??????"} onPress={() => {

								navigation.navigate("CurrentTrip")
								// navigation.goBack()
							}}
							/>

							<GradientButton ml={8} w={96} h={34} title={"????????????"} onPress={() => {

								if (noteTitle === "" || noteContent === "" || namedLocation === "") {

									addToast("????????????????????????")

								} else {

									if (!isNew) {

										apiRequest("put", `/travelope/update-trip-note/${account.info.id}/${item.noteID}`, noteObject)
										dispatch(updateTripNote({
											noteID: item.noteID,
											item: noteObject
										}))
										navigation.navigate("CurrentTrip")


									} else {

										apiRequest("post", `/travelope/new-trip-note/${account.info.id}`, noteObject)
											.then(res => {
											}, rej => {
												// console.log(JSON.stringify(rej))
											})

										dispatch(pushTripNote(noteObject))
										navigation.navigate("CurrentTrip")

									}
								}
							}}/>
						</Block>



					</animated.View>


					<HStack h={384}></HStack>



				</Pressable>
				{/*</KeyboardAvoidingView>*/}





			</ScrollView>

		</LayoutBase>
	)
}

export default NewNote
