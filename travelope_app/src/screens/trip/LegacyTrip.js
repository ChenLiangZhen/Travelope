import React, {useCallback, useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import {HStack, Modal, Pressable, Spinner, Text, useTheme, useToast, VStack} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import {GradientBorderButton, GradientButton} from "../../components/GradientButton"
import Block from "../../components/Block"
import {useDispatch, useSelector} from "react-redux"
import {selectAccount} from "../../globalstate/accountSlice"
import {FlatList, StyleSheet} from "react-native"
import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item"
import Animated, {useAnimatedStyle} from "react-native-reanimated"
import {delTripNote, selectData} from "../../globalstate/dataSlice"
import {useIsFocused, useNavigation} from "@react-navigation/native"
import {animated, config, useSpring} from "@react-spring/native"
import {HEIGHT, WIDTH} from "../../Util";
import {apiRequest} from "../../apis/api";

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

const UnderlayLeft = ({drag}: { drag: () => void }) => {

	const theme = useTheme().colors
	const dispatch = useDispatch()
	const {item, percentOpen} = useSwipeableItemParams()

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)

	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
			bottom: 32 - percentOpen.value * 32,
		}),
		[percentOpen],
	)

	return (

		<Animated.View
			style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
		>

			<Block mb={12} px={2} h={64} w={58} sc={"#fff"} borderWidth={2} borderColor={theme.primary.placeholder.pink}>

				<Pressable flex={1} w={52} justifyContent={"center"} alignItems={"center"} onPress={() => {
					dispatch(delTripNote(item.recordTime))
					apiRequest("post", `/travelope/del-trip-note/${account.info.id}/${item.noteID}`, {})

				}}>

					<Feather size={20} name={"trash"} color={theme.primary.text.pink}/>
				</Pressable>

			</Block>

		</Animated.View>
	)
}

function RowItem({item, itemRefs, drag}) {

	const theme = useTheme().colors
	const navigation = useNavigation()

	return (

		<SwipeableItem

			key={item.id}
			item={item}
			ref={(ref) => {
				if (ref && !itemRefs.current.get(item.id)) {
					itemRefs.current.set(item.id, ref)
				}
			}}

			onChange={({open}) => {
				if (open) {
					// Close all other open items
					[...itemRefs.current.entries()].forEach(([key, ref]) => {
						if (key !== item.id && ref) ref.close()
					})
				}
			}}

			overSwipe={OVERSWIPE_DIST}
			renderUnderlayLeft={() => <UnderlayLeft drag={drag}/>}
			snapPointsLeft={[70]}
		>
			<Pressable pl={18} pr={16} borderRadius={18} borderColor={theme.primary.placeholder.purple} mb={12}
			           justifyContent={"space-between"} alignItems={"center"} flexDirection={"row"}
			           bdc={theme.primary.placeholder.purple} borderWidth={2} h={64}

			           onPress={() => {
				           navigation.navigate("LegacyNote", {item: item, isNew: false})
			           }}

			           onPressIn={drag}
			>
				<Text noOfLines={1} w={"50%"} fontSize={16} fontWeight={"bold"}
				      color={theme.primary.text.purple}>{item.noteTitle}</Text>

				<HStack w={100} justifyContent={"flex-end"} alignItems={"center"}>
					<Feather name={"map-pin"} color={theme.primary.text.purple} size={18}/>
					<Text noOfLines={1} ml={4} fontSize={16} fontWeight={"bold"}
					      color={theme.primary.text.purple}>{item.namedLocation}</Text>
				</HStack>

				{/*<Text fontSize={16} fontWeight={"bold"} color={theme.primary.text.purple}>{"" + (new Date(item.recordTime).getMonth() + 1) + "月" + new Date(item.recordTime).getDate() + "日" + new Date(item.recordTime).getHours() + new Date(item.recordTime).getMinutes()}</Text>*/}
			</Pressable>

		</SwipeableItem>
	)
}

const LegacyTrip = ({navigation, route}) => {

	const {item} = route.params

	const theme = useTheme().colors
	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)

	const itemRefs = useRef(new Map())

	const dispatch = useDispatch()

	const isFocused = useIsFocused()

	const [modalVisible, setModalVisible] = useState(false)
	const [shareModalVisible, setShareModalVisible] = useState(false)
	const [selectedFriend, setSelectedFriend] = useState(false)

	const [async, setAsync] = useState()

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

	const FriendSelect = ({ item }) => {

		// const [selected, setSelected] = useState(false)

		useEffect(() => {

			console.log(accountData.currentTrip)

		}, [accountData])

		return (

			<Pressable

				onPress={() => {
					setSelectedFriend(item)
				}}

				borderRadius={18} borderWidth={2} w={"100%"} px={20} flexDirection={"row"} mb={12} h={48}
				backgroundColor={"gray.100"} alignItems={"center"}
				borderColor={selectedFriend.key === item.key? theme.primary.placeholder.indigo : "transparent"}
				justifyContent={"space-between"}>

				<Text numberOfLines={1}
				      color={selectedFriend.key === item.key? theme.primary.text.indigo : theme.primary.text.midgray}
				      fontWeight={"bold"} fontSize={15}>
					{item.name}
				</Text>


				<Text numberOfLines={1}
				      color={selectedFriend.key === item.key? theme.primary.placeholder.indigo : theme.primary.text.midgray}
				      fontSize={15}>
					{item.tag}
				</Text>

			</Pressable>

		)
	}

	const renderItemSelectFriend = ({ item }) => <FriendSelect item={item} />


	const anim = useSpring({

		loop: false,
		to: {opacity: 1, color: '#ffaaee'},
		from: {opacity: 0, color: 'red'},
	})

	useEffect(() => {

		console.log("The trip:" + JSON.stringify(item))

	}, [isFocused])

	const renderItem = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs}/>
	}, [])

	return (


		<LayoutBase>

			<Modal
				isOpen={modalVisible} onClose={() => setModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .3}
			       shadowOpacity={.2}
			       shadowRadius={24}
			       shadowOffset={{
				       height: 4,
			       }}
			       _backdrop={{bg: "#000", opacity: .25}}
			>

				<Modal.Content borderRadius={24} w={WIDTH * .9} px={20} h={HEIGHT * .35} alignSelf={"center"} py={12}>

					<HStack mt={4} h={30} mb={20} justifyContent={"space-between"} alignItems={"center"}>

						<HStack alignItems={"center"}>
							<Feather name={"info"} color={theme.primary.text.indigo} size={20}/>
							<Text ml={8} fontSize={16} letterSpacing={1} fontWeight={"bold"} color={theme.primary.text.indigo}>
								旅程資訊
							</Text>
						</HStack>

						<Pressable alignItems={"center"} juatifyContent={"center"} onPress={async () => {
							setModalVisible()

						}} justifyContent={"center"} alignItems={"center"} w={28}
						           h={28}>
							<Feather name={"x"} size={20} color={theme.primary.text.indigo}/>
						</Pressable>

					</HStack>

					<VStack mt={4} h={20} mb={16} justifyContent={"space-between"} alignItems={"center"}>

						<HStack px={16} w={"100%"} h={32} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>旅程 ID：</Text>
							<Text fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{item.tripID}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={32} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>旅程名稱：</Text>
							<Text noOfLines={2} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{item.tripName}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={64} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>旅程描述：</Text>
							<Text w={200} noOfLines={3} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{item.tripDescription}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={32} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>開始時間：</Text>
							<Text fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{"" + new Date(item.startTime).getFullYear() + "年" + (new Date(item.startTime).getMonth() + 1) + "月" + new Date(item.startTime).getDate() + "日  " + new Date(item.startTime).getHours() + "：" + new Date(item.startTime).getMinutes()}</Text>

						</HStack>

					</VStack>

				</Modal.Content>

			</Modal>

			<Modal isOpen={shareModalVisible} onClose={() => setShareModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .3}
			       shadowOpacity={.2}
			       shadowRadius={24}
			       shadowOffset={{
				       height: 4,
			       }}
			       _backdrop={{ bg: "#000", opacity: .25 }}
			>

				<Modal.Content borderRadius={24} w={WIDTH * .9} px={20} h={HEIGHT * .4} alignSelf={"center"} py={12}>

					<HStack mt={4} h={30} mb={20} justifyContent={"space-between"} alignItems={"center"}>

						<Text ml={8} fontSize={18} letterSpacing={1} fontWeight={"bold"} color={theme.primary.text.indigo}>
							分享旅程
						</Text>

						<Pressable onPress={ () => {

							setShareModalVisible()

						}} justifyContent={"center"} alignItems={"center"} w={28}
						           h={28}>
							<Feather name={"x"} size={20} color={theme.primary.text.indigo} />
						</Pressable>

					</HStack>

					<FlatList
						data={account.friendData.friends}
						renderItem={renderItemSelectFriend}
					/>

					<HStack mt={4} h={20} mb={16} justifyContent={"space-between"} alignItems={"center"}>


						{async?
							<Spinner size={"sm"} color={"dimgray"} /> : <HStack></HStack>}

						<GradientButton

							w={128} title={"分享旅程！"}

							onPress={ async () => {

								console.log(selectedFriend.key + '  ' + account.info.id + '  ' + account.info.nickname)
								setAsync(true)

								apiRequest("post", `/travelope/new-shared-trip/${selectedFriend.key}/${account.info.id}/${account.info.nickname}`, item)
								.then( async res => {

									console.log("成功分享旅程")

									setAsync(false)

									addToast("成功分享旅程！")
									await new Promise(resolve => setTimeout(resolve, 1500))
									closeInfoToast()

								}, async rej => {

									console.log(rej)

									setAsync(false)

									addToast("出現錯誤！")
									await new Promise(resolve => setTimeout(resolve, 1500))
									closeInfoToast()
								})

							}}

							flexDrection={"row"} ml={8}
							icon={"package"} iconSize={16} iconColor={"white"}
							color={"white"}/>
					</HStack>

				</Modal.Content>

			</Modal>

			<animated.View style={wave1Anim}>

				<HStack h={36} w={"100%"} mb={12} justifyContent={"flex-end"}>

					<GradientBorderButton
						w={48} title={""}
						onPress={() => navigation.navigate("MemEnvelope", {item : item})} flexDrection={"row"} ml={8}
						icon={"mail"} iconSize={18} iconColor={theme.primary.text.purple}
						color={theme.primary.text.purple}/>

					<GradientBorderButton
						w={48} title={""}
						onPress={() => navigation.navigate("TripOnMap")} flexDrection={"row"} ml={8}
						icon={"map"} iconSize={17} iconColor={theme.primary.text.purple}
						color={theme.primary.text.purple}/>

					<GradientButton
						w={84} title={"分享"}
						onPress={() => setShareModalVisible(prev => !prev)} flexDrection={"row"} ml={8}
						icon={"package"} iconSize={18} iconColor={"white"}
						color={"white"}/>

					{/*<GradientButton //結束旅程並設定此旅程為inactive。*/}
					{/*	onPress={() => {*/}

					{/*		console.log("setInactive")*/}
					{/*		dispatch(setInactive())*/}

					{/*		setActiveTrip(null)*/}

					{/*		// await new Promise(resolve => setTimeout(resolve, 1500))*/}

					{/*		// navigation.reset({*/}
					{/*		// 	index: 0,*/}
					{/*		// 	routes: [*/}
					{/*		// 		{*/}
					{/*		// 			name: 'CurrentTrip',*/}
					{/*		// 			params: {},*/}
					{/*		// 		},*/}
					{/*		// 	],*/}
					{/*		// })*/}

					{/*		navigation.navigate("MainScreen")*/}

					{/*	}}*/}

					{/*	flexDrection={"row"} ml={8}*/}
					{/*	icon={"x-circle"} iconSize={18} iconColor={"white"} w={80}*/}
					{/*	color={"white"} title={"結束"}/>*/}

				</HStack>

				<Block h={120} w={"100%"} py={12} flexDirection={"column"} justifyContent={"space-between"}>

					<HStack h={32} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>

						<HStack flex={1} mr={24} alignItems={"center"}>
							<Feather name={"send"} size={20} color={theme.primary.text.purple}/>
							<Text numberOfLines={1} fontWeight={"bold"} ml={8} fontSize={17}
							      color={theme.primary.text.purple}>{item.tripName}</Text>
						</HStack>

						<Pressable onPress={() => {
							setModalVisible(true)
						}} h={32} w={32} alignItems={"center"} justifyContent={"center"}
						           flexDirection={"row"}>
							<Feather name={"info"} size={22} color={theme.primary.text.purple}/>
						</Pressable>

					</HStack>

					<HStack h={48} px={8} w={"100%"} borderRadius={12} alignItems={"center"} borderWidth={2}
					        borderColor={theme.primary.placeholder.purple} borderStyle={"dotted"}
					        bg={theme.primary.bg.indigo}>
						<Text numberOfLines={1} ml={8} color={theme.primary.text.purple}
						      fontSize={14}>{item.tripDescription}</Text>
					</HStack>

				</Block>

				<FlatList

					style={{marginBottom: 24}}

					contentContainerStyle={{

						marginBottom: 48
					}}

					renderItem={renderItem}
					data={item.tripNotes}
					keyExtractor={item => item.noteID}
				/>


			</animated.View>

		</LayoutBase>


	)
}

export default LegacyTrip
