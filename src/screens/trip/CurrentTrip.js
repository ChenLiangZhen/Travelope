import React, { useCallback, useEffect, useRef, useState } from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import { HStack, Pressable, Text, useTheme, View } from "native-base"
import Feather from "react-native-vector-icons/Feather"
import { GradientBorderButton, GradientButton } from "../../components/GradientButton"
import Block from "../../components/Block"
import { useSelector } from "react-redux"
import { selectAccount } from "../../globalstate/accountSlice"
import { FlatList } from "react-native"
import SwipeableItem, { useSwipeableItemParams } from "react-native-swipeable-item"
import { StyleSheet, TouchableOpacity } from "react-native"
import Animated, { useAnimatedStyle } from "react-native-reanimated"
import { selectData } from "../../globalstate/dataSlice"

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

	const { item, percentOpen } = useSwipeableItemParams()

	const animStyle = useAnimatedStyle(
		() => ({
			opacity: percentOpen.value,
			bottom: 32 - percentOpen.value * 32
		}),
		[percentOpen],
	)

	return (
		<Animated.View
			style={[styles.row, styles.underlayLeft, animStyle]} // Fade in on open
		>
			<Block borderWidth={1} borderColor={theme.primary.text.indigo} h={64} jc={"center"} ai={"center"}>
				<Feather size={20} name={"trash"} color={theme.primary.text.indigo}/>
			</Block>
		</Animated.View>
	)
}

function RowItem({ item, itemRefs, drag }) {

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
			<Block borderWidth={1} h={64}>
				<TouchableOpacity onPressIn={drag}>
					<Text style={styles.text}>{item.name}</Text>
				</TouchableOpacity>
			</Block>
		</SwipeableItem>
	)
}

const CurrentTrip = ({navigation}) => {

	const theme = useTheme().colors
	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)

	const [activeTrip, setActiveTrip] = useState({})

	const [data, setData] = useState(accountData.currentTrip.tripNotes)
	const itemRefs = useRef(new Map())

	useEffect(()=> {
		let trip = accountData.trips.find(item => item.isActive === true)
		setActiveTrip(trip)
	},[])

	const renderItem = useCallback((params) => {
		return <RowItem {...params} itemRefs={itemRefs} />
	}, [])

	return (

		<LayoutBase>

			<Block h={"auto"} w={"100%"} pb={14} flexDirection={"column"} justifyContent={"space-between"}>

				<HStack h={52} w={"100%"} alignItems={"center"} justifyContent={"space-between"}>

					<HStack flex={1} mr={24} alignItems={"center"}>
						<Feather name={"send"} size={20} color={theme.primary.text.purple} />
						<Text numberOfLines={1} fontWeight={"bold"} ml={8} fontSize={17}
						      color={theme.primary.text.purple}>{activeTrip.tripName}</Text>
					</HStack>

					<GradientBorderButton //結束旅程並設定此旅程為inactive。
						onPress={()=> {



						}}
						icon={"x-circle"} iconSize={18} iconColor={theme.primary.text.purple} w={80}
					                      color={theme.primary.text.purple} title={"結束"} />

				</HStack>

				{/*<View w={"100%"} h={1} bg={theme.primary.placeholder.indigo} />*/}

				<HStack h={48} px={8} w={"100%"} borderRadius={12} alignItems={"center"} borderWidth={2} borderColor={theme.primary.placeholder.purple} borderStyle={"dotted"} bg={theme.primary.bg.indigo}>
					<Text numberOfLines={1} ml={8} color={theme.primary.text.purple} fontSize={16}>{activeTrip.tripDescription}</Text>
				</HStack>

			</Block>

			<HStack px={4} mb={16}>

				<GradientButton w={100} title={"開啟地圖"} onPress={()=> navigation.navigate("TripOnMap")}/>

			</HStack>

			<Pressable

				onPress={()=> navigation.navigate("NewNote")}

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

				<Text fontSize={16} fontWeight={"bold"} letterSpacing={1} color={theme.primary.placeholder.indigo} ml={8}>
					寫遊記
				</Text>

			</Pressable>

			<FlatList

				style={{
					height: 100,
				}}

				renderItem={renderItem}
				data={data}
				keyExtractor={item => item.key}
			/>

		</LayoutBase>
	)
}

export default CurrentTrip
