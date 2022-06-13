import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { View } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { Pressable } from "native-base";
import { useNavigation } from "@react-navigation/native";

export const IB_ArrowLeft = () => {

  const navigation = useNavigation()

  return(

      <Pressable
        onPress={()=> {
          navigation.goBack()
        }}
        style={{
          zIndex: 100,
          height: 32,
          width: 32,
        }}
      >
        <MaskedView
          style={{flex: 1, flexDirection: 'row', height: 32}}
          maskElement={
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>

                <Feather name={"arrow-left"} size={24}/>

            </View>
          }>
          <LinearGradient
            useAngle={true}
            angle={170}
            angleCenter={{x: 0.2, y: 0.7}}
            locations={[0, 0.6]}
            colors={['#3346ff', "#a138ff"]}
            style={{flex: 1}}
          />
        </MaskedView>
      </Pressable>
  )
}

export const IB_User = () => {

  const navigation = useNavigation()


  return(

      <Pressable
        onPress={()=> {
          navigation.navigate("Settings")
        }}
        style={{
          zIndex: 100,
          height: 32,
          width: 32,
        }}
      >
        <MaskedView
          style={{flex: 1, flexDirection: 'row', height: 32}}
          maskElement={
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>


                <Feather
                  name={"user"}
                  size={24}
                />

            </View>
          }>
          <LinearGradient
            useAngle={true}
            angle={170}
            angleCenter={{x: 0.2, y: 0.7}}
            locations={[0, 0.6]}
            colors={['#3346ff', "#a138ff"]}
            style={{flex: 1}}
          />
        </MaskedView>
      </Pressable>
  )
}
