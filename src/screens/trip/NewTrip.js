import React, { useEffect } from "react";
import LayoutBase from "../../components/LayoutBase";
import FlatBlock from "../../components/FlatBlock";
import { Input, Text, useTheme } from "native-base";

const NewTrip = () => {

  const theme = useTheme().colors;

  useEffect(() => {
    // console.log(theme)
  }, []);

  return (
    <LayoutBase>

      <FlatBlock
        h={64}
        mb={16}
        bg={theme.primary.bg_purple}
        borderColor={"transparent"}
        ai={"center"}
      >
        <Text
          color={theme.primary.txt_purple}
          fontSize={16}
          fontWeight={"bold"}
          mr={16}
        >旅程名稱</Text>

        <Input
          _focus={{
            borderColor: "transparent",
            color: "white",
            bg: "#c5baff",
          }}
          selectionColor={"#9380ff"}
          borderColor={"#c5baff"}
          color={theme.primary.txt_pink}
          bg={theme.primary.section_pink}
          borderWidth={2}
          borderRadius={16}
          fontWeight={"bold"}
          h={36}
          flex={8}
          px={12}
          fontSize={16}
          textAlign={"center"}
        />

      </FlatBlock>

      <FlatBlock
        h={64}
        mb={16}
        bg={"#e4e3ff"}
        borderColor={"transparent"}
        ai={"center"}
      >
        <Text>旅程時間</Text>
      </FlatBlock>

      <FlatBlock
        h={64}
        mb={16}
        bg={"#e4e3ff"}
        borderColor={"transparent"}
        ai={"center"}
      >
        <Text>同行者</Text>
      </FlatBlock>

      <FlatBlock
        h={64}
        mb={16}
        bg={"#e4e3ff"}
        borderColor={"transparent"}
        ai={"center"}
      >
        <Text>同行者</Text>
      </FlatBlock>

    </LayoutBase>
  );
};

export default NewTrip;
