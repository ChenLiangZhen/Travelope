import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, FormControl, Input, KeyboardAvoidingView, Modal, Text, VStack } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { Platform } from "react-native";

const LayoutBase = ({children, avoidKeyboard}) => {


  return(


      avoidKeyboard?

        <SafeAreaProvider>

          <SafeAreaView style={{ flex: 1}}>

            <KeyboardAvoidingView
              keyboardVerticalOffset={1000}
              flex={1}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >

            <Box flex={1} px={20}>

              <LinearGradient

                useAngle={true}
                angle={180}
                // angleCenter={{x: 0.5, y: 0.5}}
                locations={[0, .9]}
                colors={['#ffffff', "#ffffff"]}
                style={{ height: "100%", width: "100%", flex: 1}}
              >
                {children}

              </LinearGradient>

            </Box>


            </KeyboardAvoidingView>
          </SafeAreaView>
        </SafeAreaProvider> :

        <SafeAreaProvider>

          <SafeAreaView style={{ flex: 1}}>
            {/*<KeyboardAvoidingView*/}
            {/*  keyboardVerticalOffset={500}*/}
            {/*  flex={1}*/}
            {/*  behavior={Platform.OS === "ios" ? "padding" : "height"}*/}
            {/*>*/}

            <Box flex={1} px={20}>

              <LinearGradient

                useAngle={true}
                angle={180}
                // angleCenter={{x: 0.5, y: 0.5}}
                locations={[0, .9]}
                colors={['#ffffff', "#ffffff"]}
                style={{ height: "100%", width: "100%", flex: 1}}
              >
                {children}

              </LinearGradient>

            </Box>


            {/*</KeyboardAvoidingView>*/}
          </SafeAreaView>
        </SafeAreaProvider>

  )
}

export default LayoutBase
