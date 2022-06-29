import React, { useState } from "react"
import LayoutBase from "../../components/LayoutBase"
import { selectAccount } from "../../globalstate/accountSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectData } from "../../globalstate/dataSlice"
import {
	Center,
	CheckIcon,
	Divider,
	HamburgerIcon,
	HStack,
	Menu,
	Pressable,
	Select,
	Text,
	useTheme,
	VStack,
} from "native-base"
import Feather from "react-native-vector-icons/Feather"


const MemEnvelope = ({route}) => {

	// const { tripID } = route.params

	const theme = useTheme().colors

	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const dispatch = useDispatch()

	const [paperStyle, setPaperStyle] = useState("")
	const [fontFamily, setFontFamily] = useState("")

	return (

		<LayoutBase>

			<HStack h={48} justifyContent={"flex-end"}>

				{/*<Select bg={"white"} shadow={ 1 }  py={12} borderRadius={12} mt={4} w={96} selectedValue={position} mx={{*/}
				{/*	base: 0,*/}
				{/*	md: "auto"*/}
				{/*}} accessibilityLabel="Select your favorite programming language" placeholder="Select your favorite programming language" onValueChange={nextValue => setPosition(nextValue)} _selectedItem={{*/}
				{/*	bg: "cyan.600",*/}
				{/*	endIcon: <CheckIcon size={24} />*/}
				{/*}}>*/}
				{/*	*/}
				{/*	<Select.Item h={32} pl={12} justifyContent={"center"} label="auto" value="auto" />*/}
				{/*	<Select.Item label="Top Left" value="top left" />*/}
				{/*	<Select.Item label="Top" value="top" />*/}
				{/*	<Select.Item label="Top Right" value="top right" />*/}

				{/*</Select>*/}

				<Select borderRadius={100}
				        borderColor={"#af81ff"}
				        borderWidth={2}
				        h={36}
				        px={16}
				        mr={6}
				        w={84}
				        textAlign={"center"}
				        // alignItems={"center"}
				        color={"#af81ff"}
				        fontSize={15}
				        fontWeight={"bold"}
				        selectedValue={fontFamily} accessibilityLabel="Choose Service"
				        placeholder="字體"

				        dropdownIcon={ <></>

					        // <Center mr={6}>
						      //   <Feather name={"arrow-down-circle"} size={22} color={"#af81ff"} />
					        // </Center>
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
						        </Center>

				        }} mt={1}

				        onValueChange={itemValue => setFontFamily(itemValue)}>

					<Select.Item label="系統" value="系統" />
					<Select.Item label="明體" value="明體" />
					<Select.Item label="宋體" value="宋體" />
				</Select>

				<Select borderRadius={100}
				        borderColor={"#af81ff"}cx
				        borderWidth={2}
				        h={36}
				        px={16}
				        w={84}
				        textAlign={"center"}
				        // alignItems={"center"}
				        color={"#af81ff"}
				        fontSize={15}
				        fontWeight={"bold"}
				        selectedValue={paperStyle} accessibilityLabel="Choose Service"
				        placeholder="紙質"

				        dropdownIcon={ <></>

					        // <Center mr={6}>
						      //   <Feather name={"arrow-down-circle"} size={22} color={"#af81ff"} />
					        // </Center>
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

				        onValueChange={itemValue => setPaperStyle(itemValue)}>

					<Select.Item label="無紙質" value="無紙質" />
					<Select.Item label="輕磅紙" value="輕磅紙" />
				</Select>
			</HStack>

			<VStack borderRadius={18} h={"90%"} w={"100%"} bg={theme.primary.darker_bg.purple}>



				<HStack justifyContent={"center"} alignItems={"center"} w={"100%"} h={64}>
					<Text fontSize={16} fontWewight={"bold"} color={theme.primary.text.purple}>
						跟家人出去玩
					</Text>
				</HStack>

				<HStack>

				</HStack>

			</VStack>

		</LayoutBase>
	)
}

export default MemEnvelope
