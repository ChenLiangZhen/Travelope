import React from "react";
import LinearGradient from "react-native-linear-gradient";
import { Pressable, Text, useTheme, View } from "native-base"
import Feather from "react-native-vector-icons/Feather"

export const GradientBorderButton = ({ icon, iconSize, iconColor, h, w, color, bgc, title, fs, onPress, ...props}) => {

  const theme = useTheme().colors

  return (

    <Pressable
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
          height:h? h : 32,
          width: w?  w : 72,
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}>


        <View bg={bgc? bgc : 'white'}
              borderRadius={100}
              flexDirection={"row"}
              h={ h? h -4 : 28}
              w={ w? w -4: 72 -4}
              justifyContent={"center"}
              alignItems={"center"}

        >

          {icon? <Feather name={icon} size={iconSize} color={iconColor} /> : <></>}

           {title === "" ? <></> :
              <Text
                 ml={icon? 6 : 0}
                 mr={icon? 2 : 0}
                 fontSize={fs? fs: 14}
                 fontWeight={"bold"}
                 color={color? color: "white"}
              >
                 {title}
              </Text>
           }


        </View>


      </LinearGradient>
    </Pressable>

  );

};

export const GradientButton = ({ pureIcon, flex, icon, iconSize, iconColor, h, w, color, bgc, title, fs, onPress, ...props }) => {

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
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>

        {icon? <Feather name={icon} size={iconSize} color={iconColor} /> : <></>}

         {pureIcon? <></> :

            <Text
               ml={icon? 6 : 0}
               mr={icon? 2 : 0}
               fontSize={fs? fs: 14}
               fontWeight={"bold"}
               color={color? color: "white"}
            >
               {title}
            </Text>

         }


      </LinearGradient>
    </Pressable>

  );

};
