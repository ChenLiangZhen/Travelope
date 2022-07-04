import React, {useCallback, useEffect, useRef, useState} from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import {HStack, Pressable, Text, useTheme, View} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import {GradientBorderButton, GradientButton} from "../../components/GradientButton"
import Block from "../../components/Block"
import {useDispatch, useSelector} from "react-redux"
import {selectAccount} from "../../globalstate/accountSlice"
import {FlatList} from "react-native"
import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item"
import {StyleSheet, TouchableOpacity} from "react-native"
import Animated, {useAnimatedStyle} from "react-native-reanimated"
import {delTripNote, selectData, setInactive} from "../../globalstate/dataSlice"
import {useFocusEffect, useNavigation} from "@react-navigation/native"
import {config, useSpring, animated} from "@react-spring/native"

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

			<Block px={2} h={72} w={58} sc={"#fff"} borderWidth={1} borderColor={theme.primary.text.indigo}>

				<Pressable flex={1} w={52} justifyContent={"center"} alignItems={"center"} onPress={() => {
					dispatch(delTripNote(item.recordTime))
				}}>

					<Feather size={20} name={"trash"} color={theme.primary.text.indigo}/>
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
			<Block sc={"#fff"} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"row"}
			       bdc={theme.primary.placeholder.purple} borderWidth={2} h={72}>
				<Pressable flex={1} flexDirection={"row"} justifyContent={"space-between"} flex={1}

				           onPress={() => {
					           navigation.navigate("NewNote", { item: item })
				           }}

				           onPressIn={drag}
				>
					<Text fontSize={16} fontWeight={"bold"} color={theme.primary.text.purple}>{item.title}</Text>

					<HStack alignItems={"center"}>
						<Feather name={"map-pin"} color={theme.primary.text.purple} size={18}/>
						<Text ml={4} fontSize={16} fontWeight={"bold"}
						      color={theme.primary.text.purple}>{item.namedLocation}</Text>
					</HStack>

					{/*<Text fontSize={16} fontWeight={"bold"} color={theme.primary.text.purple}>{"" + (new Date(item.recordTime).getMonth() + 1) + "月" + new Date(item.recordTime).getDate() + "日" + new Date(item.recordTime).getHours() + new Date(item.recordTime).getMinutes()}</Text>*/}
				</Pressable>
			</Block>
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

	const anim = useSpring({
		loop: false,
		to: {opacity: 1, color: '#ffaaee'},
		from: {opacity: 0, color: 'red'},
	})

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

		}, [accountData]),
	)

	const renderItem = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs}/>
	}, [])

	return (


		<LayoutBase>


			{activeTrip ?
				<>

					<animated.View style={anim}>

						<HStack h={32} w={"100%"} alignItems={"center"} mb={12} justifyContent={"flex-end"}>

							<GradientBorderButton
								w={112} title={"地圖檢視"}
								onPress={() => navigation.navigate("TripOnMap")} flexDrection={"row"} ml={8}
								icon={"map"} iconSize={16} iconColor={theme.primary.text.purple}
								color={theme.primary.text.purple} title={"地圖檢視"}/>

							<GradientButton //結束旅程並設定此旅程為inactive。
								onPress={() => {

									console.log("setInactive")
									dispatch(setInactive())

									// await new Promise(resolve => setTimeout(resolve, 1500))

									navigation.navigate("MainScreen")
								}}

								flexDrection={"row"} ml={8}
								icon={"x-circle"} iconSize={18} iconColor={"white"} w={80}
								color={"white"} title={"結束"}/>

						</HStack>

						<Block h={132} w={"100%"} py={16} flexDirection={"column"} justifyContent={"space-between"}>

							<HStack h={32} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>

								<HStack flex={1} mr={24} alignItems={"center"}>
									<Feather name={"send"} size={20} color={theme.primary.text.purple}/>
									<Text numberOfLines={1} fontWeight={"bold"} ml={8} fontSize={17}
									      color={theme.primary.text.purple}>{activeTrip.tripName}</Text>
								</HStack>

								<GradientBorderButton //結束旅程並設定此旅程為inactive。
									onPress={() => {

										console.log("setInactive")
										dispatch(setInactive())

										navigation.navigate("MainScreen")

									}}
									flexDrection={"row"} ml={8}
									icon={"align-left"} iconSize={18} iconColor={theme.primary.text.purple} w={80}
									color={theme.primary.text.purple} title={"資訊"}/>

							</HStack>

							{/*<View w={"100%"} h={1} bg={theme.primary.placeholder.indigo} />*/}

							<HStack h={48} px={8} w={"100%"} borderRadius={12} alignItems={"center"} borderWidth={2}
							        borderColor={theme.primary.placeholder.purple} borderStyle={"dotted"}
							        bg={theme.primary.bg.indigo}>
								<Text numberOfLines={1} ml={8} color={theme.primary.text.purple}
								      fontSize={14}>{activeTrip.tripDescription}</Text>
							</HStack>

						</Block>

						{/*<HStack px={4} mb={16}>*/}


						{/*</HStack>*/}

						<Pressable

							onPress={() => navigation.navigate("NewNote")}

							h={72}
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

							<Text fontSize={16} fontWeight={"bold"} letterSpacing={1} color={theme.primary.placeholder.indigo}
							      ml={8}>
								寫遊記
							</Text>

						</Pressable>

						<FlatList

							style={{}}

							renderItem={renderItem}
							data={activeTrip.tripNotes}
							keyExtractor={item => item.key}
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
