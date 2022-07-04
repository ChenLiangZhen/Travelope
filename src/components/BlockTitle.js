import { HStack, Pressable, Text } from "native-base";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { useNavigation } from "@react-navigation/native";

const BlockTitle = ({text, color, icon, onPress, rightElement, ...props}) => {

	const navigation = useNavigation()

	return(

		<HStack w={"100%"}
		        h={42}
		        mb={6}
		        px={4}
		        justifyContent={"space-between"}
		        alignItems={"center"}
		        {...props}
		>
			{/*<MaskedView*/}
			{/*	style={{ width: 200, justifyContent: "center", alignItems: "center"}}*/}
			{/*	maskElement={*/}
			{/*		<HStack flex={1} justifyContent={"center"} alignItems={"center"}>*/}
			{/*			<Text fontWeight={"bold"} fontSize={20}>*/}
			{/*				njio3njoi*/}
			{/*			</Text>*/}
			{/*		</HStack>*/}
			{/*	}>*/}
			{/*	<LinearGradient*/}
			{/*		useAngle={true}*/}
			{/*		angle={170}*/}
			{/*		angleCenter={{x: 0.2, y: 0.7}}*/}
			{/*		locations={[0.5, 1]}*/}
			{/*		colors={['#3346ff', "#a138ff"]}*/}
			{/*		style={{ height: "100%", width: "100%"}}*/}
			{/*	/>*/}
			{/*</MaskedView>*/}

			<HStack alignItems={"center"}>

				<Feather name={icon} size={24} color={color}/>
				<Text fontSize={18}
				      fontWeight={"bold"}
				      ml={12}
				      color={color}
				>
					{text}
				</Text>
			</HStack>

			{rightElement?

				<Pressable
					onPress={onPress}
				>
					<Feather name={"arrow-right-circle"} size={24} color={color}/>
				</Pressable>

				: <></>}


		</HStack>
	)
}

export default BlockTitle
