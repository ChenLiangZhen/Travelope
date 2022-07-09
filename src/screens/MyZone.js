import React, {useCallback, useEffect, useRef, useState} from "react"
import LayoutBase from "../components/LayoutBase"
import Block from "../components/Block"
import {
	Actionsheet,
	Box,
	Center,
	HStack,
	Input,
	Pressable,
	Select,
	Spinner,
	Text,
	useDisclose,
	useTheme,
	useToast,
	VStack,
} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import {useDispatch, useSelector} from "react-redux"
import {addFriend, delFriend, selectAccount} from "../globalstate/accountSlice"
import {Alert, FlatList, Image, Keyboard, StyleSheet} from "react-native"
import {WIDTH} from "../Util"

import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item"
import Animated, {useAnimatedStyle} from "react-native-reanimated"
import {apiRequest} from "../apis/api"
import {GradientButton} from "../components/GradientButton"

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	row: {
		flexDirection: "row",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontWeight: "bold",
		color: "white",
		fontSize: 32,
	},
	underlayLeft: {
		flex: 1,
		backgroundColor: "transparent",
		justifyContent: "flex-end",
	},
})

const OVERSWIPE_DIST = 0
const NUM_ITEMS = 20

const UnderlayLeft = ({ drag }: { drag: () => void }) => {

	const theme = useTheme().colors
	const dispatch = useDispatch()
	const account = useSelector(selectAccount)

	const { item, percentOpen } = useSwipeableItemParams()

	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
			bottom: 24 - percentOpen.value * 24,
		}),
		[percentOpen],
	)

	const toastInfoRef = useRef()
	const toast = useToast()

	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast(warningText) {
		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo warningText={warningText} />
					)
				},
			})
		}
	}

	const ToastInfo = ({ warningText }) => {

		return (
			<HStack
				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.indigo} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{warningText}</Text>
			</HStack>
		)
	}

	return (

		<Animated.View
			style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
		>

			<Pressable onPress={() => {

				Alert.alert(
					"刪除朋友",
					"你確定要刪除" + item.name + "嗎？",
					[
						{
							text: "取消",
						},
						{
							text: "刪除", onPress: () => {
								dispatch(delFriend(item.key))
								apiRequest("post", `/api/travelope/del-friend/${account.info.id}/${item.key}`)
									.then( async res => {
										addToast("成功移除朋友： " + item.name)
											await new Promise(resolve => setTimeout(resolve, 1500))
										closeInfoToast()
									}, rej => {})
							},
						},
					],
				)

			}}>
				<Block mb={18} borderWidth={1} borderColor={theme.primary.text.indigo} h={64} jc={"center"} ai={"center"}>
					<Feather size={20} name={"trash"} color={theme.primary.text.indigo} />
				</Block>
			</Pressable>

		</Animated.View>
	)
}

function RowItem({ item, itemRefs, drag }) {

	const theme = useTheme().colors

	return (
		<SwipeableItem


			key={item.id}
			item={item}
			ref={(ref) => {
				if (ref && !itemRefs.current.get(item.id)) {
					itemRefs.current.set(item.id, ref)
				}
			}}
			onChange={({ open }) => {
				if (open) {
					// Close all other open items
					[...itemRefs.current.entries()].forEach(([key, ref]) => {
						if (key !== item.id && ref) ref.close()
					})
				}
			}}

			overSwipe={OVERSWIPE_DIST}
			renderUnderlayLeft={() => <UnderlayLeft drag={drag} />}
			snapPointsLeft={[70]}
		>
			<Block borderWidth={1} w={"100%"} h={64} justifyContent={"space-between"} alignItems={"center"}
			       flexDirection={"row"} mb={18}>
				{/*<Image*/}
				{/*  style={{*/}
				{/*    borderRadius: 100,*/}
				{/*    height: 48,*/}
				{/*    width: 48,*/}
				{/*  }}*/}
				{/*  source={{ uri:  }}*/}
				{/*  alt={"userImage"}*/}
				{/*/>*/}

				{/*await downloadProfilePicture(res.data.user.id, res.data.user.id, RNFS.DocumentDirectoryPath + "/travelope/" + res.data.user.id)*/}

				<HStack alignItems={"center"}>

					<HStack borderWidth={2} borderColor={theme.primary.text.purple} borderRadius={100} mr={12} p={1}>
						<Image

							style={{

								borderRadius: 100,
								height: 36,
								width: 36,

							}}

							source={{ uri: item.pictureURL }}
							alt={"userImage"}
						/>
					</HStack>


					<Text numberOfLines={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
						{item.name}
					</Text>

				</HStack>

				<Text numberOfLines={1} color={"#abadff"} fontSize={17}>
					{item.tag}
				</Text>

			</Block>
		</SwipeableItem>
	)
}

const FriendItem = ({ item }) => {

	useEffect(() => {
		console.log("THIS item:")
	})

	return (

		<Block borderRadius={18} w={WIDTH * 0.9} px={20} fd={"row"} mb={16} h={64} sc={"transparent"} bgc={"#edf0ff"}
		       bdc={"transparent"} ai={"center"}
		       jc={"space-between"}>

			<Text numberOfLines={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={18}>
				{item.name}
			</Text>


			<Text numberOfLines={1} color={"#abadff"} fontSize={18}>
				{item.tag}
			</Text>
			{/*<GradientBorderButton w={100} bgc={"#f2f2ff"} color={"#af81ff"} title={item.tag} />*/}
		</Block>

	)
}

const MyZone = () => {

	let [filter, setFilter] = useState("") //friend filter

	const { isOpen, onOpen, onClose } = useDisclose() //open add friend ActionSheet
	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const theme = useTheme().colors
	const [searchID, setSearchID] = useState("")
	const [targetData, setTargetData] = useState({})
	const [targetImageURL, setTargetImageURL] = useState("")

	const [warningMessage, setWarningMessage] = useState("")
	const [canShowResult, setCanShowResult] = useState(false)
	const [asyncImg, setAsyncImg] = useState(false)
	const [asyncData, setAsyncData] = useState(false)
	const itemRefs = useRef(new Map())

	// const [alertOpen, setAlertOpen] = useState(false)
	// const onAlertClose = () => setAlertOpen(false)
	// const cancelAlertRef = useRef(null)

	const renderItem = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs} />
	}, [])

	useEffect(() => {

		setCanShowResult(false)

		if (warningMessage === "OK") {
			setCanShowResult(true)
		}

		if (warningMessage === "找不到用戶") {
			setCanShowResult(true)
		}

	}, [warningMessage])

	useEffect(()=>  {
		console.log(account.friendData.friends)
		console.log(targetData)
	})

	const toastInfoRef = useRef()
	const toast = useToast()

	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast(warningText) {
		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo warningText={warningText} />
					)
				},
			})
		}
	}

	const ToastInfo = ({ warningText }) => {
		return (
			<HStack
				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.indigo} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{warningText}</Text>
			</HStack>
		)
	}

	return (

		<LayoutBase>

			{/*<Center>*/}

			{/*	<Button colorScheme="danger" onPress={() => setAlertOpen(!isOpen)}>*/}
			{/*		Delete Customer*/}
			{/*	</Button>*/}

			{/*	<AlertDialog leastDestructiveRef={cancelAlertRef} isOpen={alertOpen} onClose={onAlertClose}>*/}
			{/*		<AlertDialog.Content>*/}
			{/*			<AlertDialog.CloseButton />*/}
			{/*			<AlertDialog.Header>Delete Customer</AlertDialog.Header>*/}

			{/*			<AlertDialog.Body>*/}
			{/*				This will remove all data relating to Alex. This action cannot be*/}
			{/*				reversed. Deleted data can not be recovered.*/}
			{/*			</AlertDialog.Body>*/}

			{/*			<AlertDialog.Footer>*/}
			{/*				<Button.Group space={2}>*/}
			{/*					<Button variant="unstyled" colorScheme="coolGray" onPress={onAlertClose} ref={cancelAlertRef}>*/}
			{/*						Cancel*/}
			{/*					</Button>*/}
			{/*					<Button colorScheme="danger" onPress={onAlertClose}>*/}
			{/*						Delete*/}
			{/*					</Button>*/}
			{/*				</Button.Group>*/}
			{/*			</AlertDialog.Footer>*/}

			{/*		</AlertDialog.Content>*/}
			{/*	</AlertDialog>*/}

			{/*</Center>*/}

			<Actionsheet

				overflow={"visible"}

				_backdrop={{
					bg: "#4e3e7e",
					opacity: .5,
				}}

				isOpen={isOpen} onClose={onClose}>

				<Actionsheet.Content

					_dragIndicatorWrapper={{
						h: 16,
						justifyContent: "center",
					}}
					_dragIndicator={{
						display: "none",
					}}
				>

					<Box w="100%" h={"100%"} px={16} justifyContent="flex-start">

						<HStack mb={16} justifyContent={"center"} alignItems={"center"}>
							<Text fontSize={18} fontWeight={"bold"} color={"#6e41ff"}>
								尋找朋友
							</Text>
						</HStack>

						{/*<HStack p={12}>*/}
						{/*  <Text mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>*/}
						{/*    讓別人將你加入好友:*/}
						{/*  </Text>*/}
						{/*</HStack>*/}

						<HStack mb={12} bg={"#eeefff"} pl={24} pr={12} h={54} borderRadius={16} alignItems={"center"}
						        justifyContent={"space-between"}>

							<HStack>
								<Text fontWeight={"bold"} mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>
									你的ID:
								</Text>

								<Text fontWeight={"bold"} letterSpacing={1} fontSize="16" color={"#947eff"}>
									{account.info.id}
								</Text>
							</HStack>

							<Pressable
								onPress={() => {}}

								h={36} w={36} justifyContent={"center"} alignItems={"center"}>

								<Feather name={"copy"} size={20} color={theme.primary.text.indigo} />

							</Pressable>

						</HStack>

						{/*<HStack p={12}>*/}
						{/*  <Text mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>*/}
						{/*    以ID搜尋朋友：*/}
						{/*  </Text>*/}
						{/*</HStack>*/}

						<HStack


							mb={48} bg={"#eeefff"} pl={20} pr={12} h={54} borderRadius={16} alignItems={"center"}
							justifyContent={"space-between"}

							borderWidth={1}
							flexDirection={"row"}
							bg={"transparent"}
							borderColor={theme.primary.placeholder.indigo}
						>

							<HStack>

								{asyncImg === true || asyncData === true?
									<Spinner color={"dimgray"} mr={8} size={"sm"}></Spinner> : <></>}

								<Input

									_focus={{
										borderColor: "transparent",
										color: theme.primary.text.indigo,
										bg: "transparent",
									}}

									value={searchID}
									onChangeText={id => setSearchID(prev => id)}
									selectionColor={theme.primary.text.indigo}
									placeholder={"輸入ID以搜尋朋友..."}
									placeholderTextColor={theme.primary.placeholder.indigo}
									borderColor={"transparent"}
									color={theme.primary.text.indigo}
									bg={"transparent"}
									borderWidth={1}
									borderRadius={16}
									fontWeight={"bold"}
									h={36}
									flex={8}
									fontSize={16}
									textAlign={"left"}
								/>


								<Pressable
									onPress={() => {

										Keyboard.dismiss()
										setAsyncImg(true)
										setAsyncData(true)

										apiRequest("get", `/api/travelope/get-download-link/${searchID}/${searchID}`, {})
											.then(res => {setTargetImageURL(res.url), setAsyncImg(false)}, rej => {setAsyncImg(false)})
										apiRequest("get", `/api/travelope/find-user/${searchID}`, {})
											.then(res => {setWarningMessage("OK"), setTargetData(res), setAsyncData(false)}, rej => { setAsyncData(false), setWarningMessage("找不到用戶"), console.log("REJ: " + rej.message) })


										console.log("Searching")

									}}
									justifyContent={"center"} alignItems={"center"} h={36} w={36}>
									<Feather name={"search"} color={theme.primary.text.indigo} size={20} />
								</Pressable>

							</HStack>

						</HStack>

						<VStack mb={36}>

							{

								!canShowResult? <></> :
									warningMessage === "找不到用戶"?

										<HStack w={"100%"} h={64} justifyContent={"center"}>
											<Text fontSize={16} color={theme.primary.placeholder.pink}>{warningMessage}</Text>
										</HStack>

										:

										<>
											<HStack h={100} mb={12} justifyContent={"center"} alignItems={"center"}>
												<Center
													h={96}
													w={96}
													overflow={"hidden"}
													borderRadius={100}
													borderWidth={2}
													borderColor={theme.primary.text.purple}
												>
													{
														account.info.profilePictureLocalPath !== ""?

															<Image

																style={{
																	borderRadius: 100,
																	height: 88,
																	width: 88,
																}}

																source={{ uri: targetImageURL }}
																alt={"userImage"}
															/>
															: <Feather name={"user"} color={theme.primary.text.purple} size={32} />
													}

												</Center>
											</HStack>

											<HStack mb={12} h={24} justifyContent={"center"} alignItems={"center"}>

												<Text fontSize={18} fontWeight={"bold"} color={theme.primary.text.purple}>
													{targetData.nickname}
												</Text>

											</HStack>

											<HStack w={"100%"} justifyContent={"center"}>

												<GradientButton w={96} title={"加朋友"} onPress={() => {

													let friend = account.friendData.friends.findIndex(user => user.key === targetData.key)
														console.log(friend)

													if(friend >= 0){

														setWarningMessage("你們已經是朋友囉！")

													} else {

														dispatch(addFriend({
															key: targetData.id,
															name: targetData.nickname,
															pictureURL: targetImageURL,
															tag: "friend",
														}))

														apiRequest("post", `/api/travelope/add-friend/${account.info.id}`, {

															key: targetData.id,
															name: targetData.nickname,
															tag: "friend",

														}).then(
															async res => {

																setCanShowResult(false)
																setTargetData({})
																setTargetImageURL("")
																setWarningMessage("")
																setSearchID("")

																addToast("成功加入朋友！")
																await new Promise(resolve => setTimeout(resolve, 1500))
																closeInfoToast()

															}
															, async rej => {

																setCanShowResult(false)
																setTargetData({})
																setTargetImageURL("")
																setWarningMessage("")
																setSearchID("")

															})
													}



												}} />

											</HStack>
										</>
							}

						</VStack>

					</Box>
				</Actionsheet.Content>
			</Actionsheet>

			<HStack w={"100%"} alignItems={"center"} h={42} mb={24}>

				<Box flex={5} h={40} mr={16}>

					<Select borderRadius={100}
					        borderColor={"#af81ff"}
					        borderWidth={2}
					        h={36}
					        px={16}
					        color={"#af81ff"}
					        fontSize={15}
					        fontWeight={"bold"}
					        selectedValue={filter} minWidth="200" accessibilityLabel="Choose Service"
					        placeholder="全部朋友"

					        dropdownIcon={

						        <Center mr={6}>
							        <Feather name={"arrow-down-circle"} size={22} color={"#af81ff"} />
						        </Center>
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
								        <Feather name={"check"} size={18} color={"#af81ff"} />
							        </Center>,

					        }} mt={1}

					        onValueChange={itemValue => setFilter(itemValue)}>

						<Select.Item label="朋友" value="朋友" />
						<Select.Item label="家人 Research" value="家人" />
					</Select>
				</Box>

				<Pressable onPress={onOpen}
				           borderColor={"#af81ff"} borderRadius={100} borderWidth={2} h={36} justifyContent={"space-between"}
				           alignItems={"center"} flexDirection={"row"} flex={3}>
					<Text ml={16} color={"#af81ff"} fontSize={15} mr={4} fontWeight={"bold"}>加入朋友</Text>

					<Center mr={6}>
						<Feather color={"#af81ff"} name={"plus-circle"} size={22} />
					</Center>
				</Pressable>

				{/*<GradientButton flex={2}/>*/}
			</HStack>

			<FlatList
				data={account.friendData.friends}
				renderItem={renderItem}
				keyExtractor={item => item.key}
			/>

		</LayoutBase>
	)
}

export default MyZone
