import React from "react";
import { Input, useTheme } from "native-base";

const InputField = ({ ...props }) => {

  const theme = useTheme().colors;

  return (

    <Input

      _focus={{
        borderColor: "transparent",
        bg: "transparent",
      }}

      autoCapitalize={"none"}
      placeholderTextColor={theme.primary.placeholder.purple}
      selectionColor={"#9380ff"}
      borderColor={"#c5baff"}
      bg={"transparent"}
      borderWidth={2}
      borderRadius={16}
      fontWeight={"bold"}
      h={36}
      px={12}
      fontSize={16}
      // textAlign={"center"}
      {...props}
    />
  );
};
export default InputField;
