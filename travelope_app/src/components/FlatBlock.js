import { Box, HStack, Text, VStack } from "native-base";
import React from "react";


const FlatBlock = ({children, borderColor, bg, jc, ai, fd, ...props}) => {

  return(

    <Box

      px={16}
      mb={24}

      borderWidth={2}
      borderRadius={18}

      bg={ bg? bg : "#fff" }
      borderColor={ borderColor? borderColor : "#9B9FC9" }

      flexDirection={fd? fd: "row"}
      justifyContent={jc? jc: "flex-start"}
      alignItems={ai? ai: "flex-start"}

      {...props}
    >

      {children}

    </Box>
  )
}

export default FlatBlock
