import {HStack, Pressable, Text, useTheme, VStack} from "native-base";
import {Alert, Animated, FlatList, StyleSheet} from "react-native";
import React, {useCallback, useRef} from "react";
import Block from "../components/Block";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from "react-redux";
import SwipeableItem, {useSwipeableItemParams} from "react-native-swipeable-item";
import {selectAccount} from "../globalstate/accountSlice";
import {delTrip, selectData} from "../globalstate/dataSlice";
import {useAnimatedStyle} from "react-native-reanimated";
import {apiRequest} from "../apis/api";
import {useNavigation} from "@react-navigation/native";
import LayoutBase from "../components/LayoutBase";

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

					Alert.alert(
						"刪除歷史旅程",
						"你確定要刪除「" + item.tripName + "」嗎？",

						[
							{
								text: "取消",
							},
							{
								text: "刪除", onPress: () => {
									dispatch(delTrip(item.tripID))
									apiRequest("post", `/travelope/del-trip/${account.info.id}/${item.tripID}`, {})

								},
							},
						],
					)

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

	console.log(item)

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
			<Pressable onPress={()=> {
				navigation.navigate("LegacyTrip", { item: item })
			}} borderWidth={2} borderRadius={18} px={12} borderColor={theme.primary.placeholder.purple} sc={"white"} mb={12} h={64} pl={14} flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>

				<HStack alignItems={"center"}>
					<Feather name={"package"} color={theme.primary.text.purple} size={32} />

					<VStack ml={12} justifyContent={"center"} w={200}>
						<Text noOfLines={1} mb={2} mr={16} fontSize={16} color={theme.primary.text.purple}
						      fontWeight={"bold"}>{item.tripName} </Text>
						<Text noOfLines={1} mr={16} fontSize={14} fontWeight={"light"} color={theme.primary.text.purple}
						      fontWeight={"normal"}>{item.fromAccountNickname}</Text>
					</VStack>
				</HStack>

				<HStack borderRadius={12} w={64} bg={theme.primary.placeholder.indigo} h={42} alignItems={"center"}
				        justifyContent={"center"}>
					<Text fontSize={18} color={"white"} fontWeight={"bold"}> {new Date(item.startTime).getMonth() + 1 + " /"} </Text>
					<Text fontSize={18} lineHeight={22} color={"white"}
					      fontWeight={"bold"}> {new Date(item.startTime).getDate()} </Text>
				</HStack>

			</Pressable>

		</SwipeableItem>
	)
}

const SharedWithMe = ({navigation}) => {

	const itemRefs = useRef(new Map())

	const theme = useTheme().colors

	const accountData = useSelector(selectData)

	const renderItemTripSlide = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs}/>
	}, [])

	return(

		<LayoutBase>

			<FlatList

				style={{
				}}

				ListFooterComponent={

					<>
						{ accountData.sharedTrips.length !== 0?

							<></> :
							<VStack h={240} w={"100%"} alignItems={"center"} justifyContent={"center"}>
								<Feather name={"package"} size={96} color={theme.primary.darker_bg.purple}/>
								<Text ml={8} fontSize={14} mt={16} color={theme.primary.placeholder.purple}
								      fontWeight={"bold"}>還沒有朋友與你分享旅程哦！</Text>
							</VStack>
						}
					</>

				}

				ListHeaderComponent={

					<>

					</>
				}

				keyExtractor={item => item.tripID}
				data={accountData.sharedTrips}
				renderItem={renderItemTripSlide}
			/>

		</LayoutBase>


	)
}

export default SharedWithMe
