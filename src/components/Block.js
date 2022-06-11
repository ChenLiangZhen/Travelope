import {HStack, Text, VStack} from "native-base";
import React from "react";


const Block = ({children, bdc, bgc, sc, jc, ai, fd, ...props}) => {

	return(

		<VStack

			px={16}
			mb={24}

			borderWidth={2}
			borderRadius={18}

			bg={ bgc? bgc : "#fff" }
			borderColor={ bdc? bdc : "#9B9FC9" }
			shadowColor={sc? sc : "#908dff"}
			shadowRadius={0}
			shadowOpacity={.4}
			shadowOffset={{
				height: 10,
			}}

			flexDirection={fd? fd: "column"}
			justifyContent={jc? jc: "flex-start"}
			alignItems={ai? ai: "flex-start"}

			{...props}
		>

			{children}

		</VStack>
	)
}

export default Block
