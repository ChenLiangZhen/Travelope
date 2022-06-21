import React, { useEffect, useRef, useState } from "react"
import LayoutBase from "../../components/LayoutBase"
import FlatBlock from "../../components/FlatBlock"
import { HStack, Input, Modal, Pressable, Text, useTheme, useToast, View, VStack } from "native-base"
import Block from "../../components/Block"
import DatePicker from "react-native-date-picker"
import Feather from "react-native-vector-icons/Feather"
import { GradientBorderButton, GradientButton } from "../../components/GradientButton"
import { selectAccount } from "../../globalstate/accountSlice"
import { FlatList } from "react-native"
import { HEIGHT, WIDTH } from "../../Util"
import { useDispatch, useSelector } from "react-redux"
import { appleAuth } from "@invertase/react-native-apple-authentication"

const NewTrip = () => {

	const theme = useTheme().colors
	const [hasFellow, setHasFellow] = useState(false)
	const [tripName, setTripName] = useState("")
	const [tripDescription, setTripDescription] = useState("")
	const [modalVisible, setModalVisible] = useState(false)
	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)

	const [selectedFriendsArray, setSelectedFriendsArray] = useState([])

	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const toastInfoRef = useRef()
	const toast = useToast()

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

	const ToastInfo = () => {
		return (
			<HStack

				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.indigo} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{warningText}</Text>
			</HStack>
		)
	}

	const FriendSelect = ({ item }) => {

		// const [selected, setSelected] = useState(false)

		return (

			<Pressable

				onPress={() => {

					let result = selectedFriendsArray.find( selected => selected.id === item.id)

					if(!result){
						setSelectedFriendsArray(prev => [...prev, { id: item.id, name: item.name } ])

					} else {
						console.log("found duplicate")
						setSelectedFriendsArray( prev => prev.filter( selected => selected.id !== item.id ))
					}
				}}

				borderRadius={18} borderWidth={2} w={"100%"} px={20} flexDirection={"row"} mb={12} h={48} backgroundColor={"gray.100"} alignItems={"center"}
				borderColor={ selectedFriendsArray.find( selected => selected.id === item.id) ? theme.primary.placeholder.indigo : "transparent" }
				justifyContent={"space-between"}>

				<Text numberOfLines={1} color={selectedFriendsArray.find( selected => selected.id === item.id) ? theme.primary.text.indigo : theme.primary.text.midgray } fontWeight={"bold"} fontSize={15}>
					{item.name}
				</Text>


				<Text numberOfLines={1} color={selectedFriendsArray.find( selected => selected.id === item.id) ? theme.primary.placeholder.indigo : theme.primary.text.midgray } fontSize={15}>
					{item.tag}
				</Text>

			</Pressable>

		)
	}

	const FriendTag = ({ item }) => {

		useEffect(() => {
			console.log("THIS item:")
		})

		return (

			<Pressable borderRadius={18} w={40 + item.name.length * 12} px={20} flexDirection={"row"} mb={8} h={32}
			           backgroundColor={"gray.100"}
			           borderColor={"transparent"} alignItems={"center"}
			           justifyContent={"center"}>

				<Text numberOfLines={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={15}>
					{item.name}
				</Text>

			</Pressable>

		)
	}

	const renderItemSelectFriend = ({ item }) => <FriendSelect item={item} />
	const renderItemTagFriend = ({ item }) => <FriendTag item={item} />

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

					<FlatList
						data={account.friendData.friends}
						renderItem={renderItemSelectFriend}
					/>

					<HStack mt={4} h={20} mb={16} justifyContent={"space-between"} alignItems={"center"}>

						<Text ml={8} fontSize={16} fontWeight={"bold"} color={theme.primary.text.midgray}>
							{"已選擇：" + selectedFriendsArray.length}
						</Text>

						<GradientButton title={"確認"} onPress={() => setModalVisible()}/>

					</HStack>

				</Modal.Content>

			</Modal>

			<DatePicker
				modal
				mode={"date"}
				title={"選擇旅遊的日期"}
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
				>名稱</Text>

				<Input
					_focus={{
						borderColor: theme.primary.text.purple,
						color: theme.primary.text.purple,
						bg: theme.primary.bg.purple,
					}}

					value={tripName}
					onChangeText={name => setTripName(name)}
					selectionColor={theme.primary.text.indigo}
					borderColor={"transparent"}
					color={theme.primary.text.purple}
					bg={theme.primary.bg.smoke}
					borderWidth={1}
					borderRadius={16}
					fontWeight={"bold"}
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
				>日期</Text>

				<Input
					_focus={{
						borderColor: theme.primary.text.purple,
						color: theme.primary.text.purple,
						bg: theme.primary.bg.purple,
					}}
					value={date.getFullYear() + " - " + (date.getMonth() + 1) + " - " + date.getDate()}
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

			{

				hasFellow?  //新增同行友人

					<FlatBlock
						h={selectedFriendsArray.length === 0 ? 64 : 64 + 40 * (selectedFriendsArray.length - 1)}
						mb={16}
						borderWidth={1}
						flexDirection={"row"}
						justifyContent={"space-between"}
						bg={"white"}
						shadowColor={theme.primary.bg.litgray}
						borderColor={theme.primary.text.purple}
						ai={"center"}
					>


						<HStack alignItems={"center"}>

							<Text
								color={theme.primary.text.purple}
								fontSize={16}
								fontWeight={"bold"}
								mr={14}
							>同行</Text>

							<View h={32 + (selectedFriendsArray.length - 1) * 32} w={4} borderRadius={10}
							      bg={theme.primary.placeholder.purple} />

							<VStack mx={18} justifyConten={"center"} flex={1} h={96} justifyContent={"center"} alignItems={"center"}
							        borderRadius={18}>

								<FlatList
									style={{

										paddingTop: 8,
										width: "100%",
										// marginLeft: 24,
									}}

									contentContainerStyle={{
										justifyContent: "center",
										height: 88,

									}}

									data={selectedFriendsArray}
									renderItem={renderItemTagFriend}
								/>

							</VStack>

							<Pressable h={32} justifyContent={"center"} onPress={() => setModalVisible(true)}>
								<Feather name={"plus-circle"} color={theme.primary.text.indigo} size={20} />
							</Pressable>

						</HStack>


					</FlatBlock> : <></>

			}

			<HStack mb={12} w={"100%"} justifyContent={"flex-end"}>
				<GradientBorderButton w={96} color={theme.primary.text.purple} title={hasFellow? "移除同行" : "新增同行"}
				                      onPress={() => setHasFellow(prev => !prev)} />
			</HStack>


			<Block mt={36} pl={24} pr={18} mb={36} borderRadius={18} fd={"row"} h={64} sc={"#9e66ff"}
			       bdc={theme.primary.text.purple}
			       ai={"center"}
			       jc={"space-between"}>

				<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
					開始紀錄旅程！
				</Text>

				<GradientButton w={100} h={34} title={"建立旅程"} onPress={() => {}} />

			</Block>


		</LayoutBase>
	)
}

export default NewTrip
