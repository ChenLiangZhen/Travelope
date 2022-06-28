import { HStack, Text, useTheme, VStack } from "native-base"
import React from "react";


const Block = ({children, bdc, bgc, sc, jc, ai, fd, px, ...props}) => {

	const theme = useTheme().colors

	return(

		<VStack

			px={px? px : 16}
			mb={24}

			borderWidth={2}
			borderRadius={18}

			bg={ bgc? bgc : "#fff" }
			borderColor={ bdc? bdc : theme.primary.text.purple }
			shadowColor={sc? sc : "#908dff"}
			shadowRadius={0}
			shadowOpacity={.4}
			shadowOffset={{
				height: 8,
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
