import {HStack, Text} from "native-base";
import React from "react";
import Feather from "react-native-vector-icons/Feather";

const BlockTitle = ({text, color, icon}) => {
	return(
		<HStack w={"100%"}
		        h={10}
		        px={6}
		        justifyContent={"flex-start"}
		        alignItems={"center"}
		>
			<Feather name={icon} size={22} color={color}/>
			<Text fontSize={18}
			      fontWeight={"bold"}
			      ml={2}
			      color={color}
			>
				{text}
			</Text>
		</HStack>
	)
}

export default BlockTitle
