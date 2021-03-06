import React, {useCallback, useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import {HStack, Modal, Pressable, Text, useTheme, VStack} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import {GradientBorderButton, GradientButton} from "../../components/GradientButton"
import Block from "../../components/Block"
import {useDispatch, useSelector} from "react-redux"
import {selectAccount} from "../../globalstate/accountSlice"
import {FlatList, StyleSheet} from "react-native"
import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item"
import Animated, {useAnimatedStyle} from "react-native-reanimated"
import {delTripNote, selectData, setInactive} from "../../globalstate/dataSlice"
import {useFocusEffect, useIsFocused, useNavigation} from "@react-navigation/native"
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
				           navigation.navigate("NewNote", {item: item, isNew: false})
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

				{/*<Text fontSize={16} fontWeight={"bold"} color={theme.primary.text.purple}>{"" + (new Date(item.recordTime).getMonth() + 1) + "???" + new Date(item.recordTime).getDate() + "???" + new Date(item.recordTime).getHours() + new Date(item.recordTime).getMinutes()}</Text>*/}
			</Pressable>

		</SwipeableItem>
	)
}

const CurrentTrip = () => {

	const theme = useTheme().colors
	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)

	const [activeTrip, setActiveTrip] = useState({})

	const itemRefs = useRef(new Map())

	const dispatch = useDispatch()

	const isFocused = useIsFocused()

	const [modalVisible, setModalVisible] = useState(false)

	const anim = useSpring({
		loop: false,
		to: {opacity: 1, color: '#ffaaee'},
		from: {opacity: 0, color: 'red'},
	})

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

	//ANIMATION CONTROLLER

	const navigation = useNavigation()

	// const [present, setPresent] = useState(false)
	//
	// const anim = useSpring({
	// 	opacity: present ? 1 : 0,
	// 	top: present ? 0 : 50,
	// 	delay: 0,
	// 	config: config.slow
	// })
	//
	// useEffect(() => {
	//
	// 	console.log("Navigation State Changed!")
	// 	const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
	// 		// Prevent default behavior
	// 		e.preventDefault();
	//
	// 		setPresent(false)
	// 		console.log("RESET!!!")
	// 	});
	//
	// 	return unsubscribe;
	// }, []);
	//
	// useFocusEffect(
	// 	React.useCallback(() => {
	//
	// 		setPresent(true)
	//
	// 	}, ),
	// )

	// ANIMATION CONTROLLER

	useFocusEffect(
		React.useCallback(() => {

			let trip = accountData.trips.find(item => item.isActive === true)
			trip ? setActiveTrip(trip) : setActiveTrip(null)

		}, [isFocused, accountData]),
	)

	useEffect(() => {

	}, [accountData])

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
								????????????
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
							      color={theme.primary.placeholder.indigo}>?????? ID???</Text>
							<Text fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{activeTrip ? activeTrip.tripID : ""}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={32} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>???????????????</Text>
							<Text noOfLines={2} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{activeTrip ? activeTrip.tripName : ""}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={64} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>???????????????</Text>
							<Text w={200} noOfLines={3} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{activeTrip ? activeTrip.tripDescription : ""}</Text>

						</HStack>

						<HStack px={16} w={"100%"} h={32} alignItems={"flex-start"}>

							<Text mr={12} fontSize={14} fontWeight={"bold"}
							      color={theme.primary.placeholder.indigo}>???????????????</Text>
							<Text fontSize={14} fontWeight={"bold"}
							      color={theme.primary.bg.gray}>{activeTrip ? "" + new Date(activeTrip.startTime).getFullYear() + "???" + (new Date(activeTrip.startTime).getMonth() + 1) + "???" + new Date(activeTrip.startTime).getDate() + "???  " + new Date(activeTrip.startTime).getHours() + "???" + new Date(activeTrip.startTime).getMinutes() : ""}</Text>

						</HStack>

					</VStack>

				</Modal.Content>

			</Modal>

			{activeTrip ?
				<>

					<animated.View style={wave1Anim}>

						<HStack h={36} w={"100%"} mb={12} justifyContent={"flex-end"}>

							<GradientBorderButton
								w={112} title={"????????????"}
								onPress={() => navigation.navigate("TripOnMap")} flexDrection={"row"} ml={8}
								icon={"map"} iconSize={16} iconColor={theme.primary.text.purple}
								color={theme.primary.text.purple} title={"????????????"}/>

							<GradientButton //?????????????????????????????????inactive???
								onPress={() => {

									console.log("setInactive")
									dispatch(setInactive())

									apiRequest("put", `/travelope/set-trip-inactive/${account.info.id}/${activeTrip.tripID}`, {})

									setActiveTrip(null)

									// await new Promise(resolve => setTimeout(resolve, 1500))

									// navigation.reset({
									// 	index: 0,
									// 	routes: [
									// 		{
									// 			name: 'CurrentTrip',
									// 			params: {},
									// 		},
									// 	],
									// })

									navigation.navigate("MainScreen")

								}}

								flexDrection={"row"} ml={8}
								icon={"x-circle"} iconSize={18} iconColor={"white"} w={80}
								color={"white"} title={"??????"}/>

						</HStack>

						<Block h={120} w={"100%"} py={12} flexDirection={"column"} justifyContent={"space-between"}>

							<HStack h={32} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>

								<HStack flex={1} mr={24} alignItems={"center"}>
									<Feather name={"send"} size={20} color={theme.primary.text.purple}/>
									<Text numberOfLines={1} fontWeight={"bold"} ml={8} fontSize={17}
									      color={theme.primary.text.purple}>{activeTrip.tripName}</Text>
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
								      fontSize={14}>{activeTrip.tripDescription}</Text>
							</HStack>

						</Block>

						{accountData.trips[accountData.trips.length - 1].tripNotes.length !== undefined ?

							<>
							</>

							:

							<Pressable

								onPress={() => navigation.navigate("NewNote", {item: null, isNew: true})}

								h={64}
								w={"100%"}
								mb={32}
								flexDirection={"row"}
								justifyContent={"center"}
								alignItems={"center"}
								borderRadius={18}
								borderStyle={"dashed"}
								borderWidth={2}
								borderColor={theme.primary.placeholder.indigo}
							>

								<Feather name={"plus-circle"} size={22} color={theme.primary.placeholder.indigo}/>

								<Text fontSize={16} fontWeight={"bold"} letterSpacing={1}
								      color={theme.primary.placeholder.indigo}
								      ml={8}>
									?????????
								</Text>

							</Pressable>
						}

						<FlatList

							style={{marginBottom: 24}}

							contentContainerStyle={{

								marginBottom: 48
							}}

							ListFooterComponent={
								<>
								{  accountData.trips[accountData.trips.length - 1].tripNotes.length === 0?
									<VStack h={240} w={"100%"} alignItems={"center"} justifyContent={"center"}>
										<Feather name={"feather"} size={96} color={theme.primary.darker_bg.purple}/>
										<Text ml={8} fontSize={14} mt={16} color={theme.primary.placeholder.purple}
										      fontWeight={"bold"}>????????????????????????</Text>
									</VStack> : <></>}
								{ accountData.trips[accountData.trips.length - 1].tripNotes.length !== undefined ?

									<HStack mt={16} w={"100%"} justifyContent={"center"} alignItems={"center"}>

										<GradientButton onPress={() => navigation.navigate("NewNote", {item: null, isNew: true})
										} pureIcon h={36} w={36} icon={"plus"} iconSize={24} iconColor={"white"}/>
									</HStack> : <></>}


								</>

							}

							renderItem={renderItem}
							data={activeTrip.tripNotes}
							keyExtractor={item => item.noteID}
						/>


					</animated.View>

				</>

				:

				<>

				</>

			}

		</LayoutBase>


	)
}

export default CurrentTrip
