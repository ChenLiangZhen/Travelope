import {HStack, Text, VStack} from "native-base";
import React from "react";


const Block = ({children,h, mt, mb, pt, pb}) => {

	return(
		<VStack
			h={h}
			p={2}
			mx={4}
			mt={mt | 0}
			mb={mb | 6}
			pt={pt}
			pb={pb}
			borderColor={"#9B9FC9"}
			borderWidth={2}
			borderRadius={20}
			bg={"#fff"}
			shadowColor={"#5f5db1"}
			shadowRadius={0}
			shadowOpacity={.25}
			shadowOffset={{
				height: 10,
			}}
		>
			{children}
		</VStack>
	)
}

export default Block
