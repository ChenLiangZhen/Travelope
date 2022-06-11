import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Pressable, Text } from "native-base";

const GradientButton = ({ h, w, color, title, fs, onPress }) => {

  return (

    <Pressable
      onPress={()=> onPress}
    >
      <LinearGradient
        useAngle={true}
        angle={160}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1]}
        colors={["#8b7fff", "#db7fff"]}
        style={{
          height: h ? h : 32,
          width: w ? w : 72,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}>

        <Text
          fontSize={fs? fs: 15}
          fontWeight={"bold"}
          color={color? color: "white"}
        >
          {title}
        </Text>

      </LinearGradient>
    </Pressable>

  );

};

export default GradientButton;
