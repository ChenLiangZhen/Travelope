import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Pressable, Text, View } from "native-base";

export const GradientBorderButton = ({ h, w, color, bgc, title, fs, onPress }) => {

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


        <View bg={bgc? bgc : 'white'}
              borderRadius={100}
              h={h ? h -4 : 28}
              w={w ? w -4 : 72 -4}
              justifyContent={"center"}
              alignItems={"center"}
        >

          <Text
            fontSize={fs? fs: 15}
            fontWeight={"bold"}
            color={color? color: "white"}
          >
            {title}
          </Text>

        </View>


      </LinearGradient>
    </Pressable>

  );

};

export const GradientButton = ({ h, w, color, title, fs, flex, onPress , ...props}) => {

  return (

    <Pressable
      flex={flex}
      onPress={onPress}
      {...props}
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
