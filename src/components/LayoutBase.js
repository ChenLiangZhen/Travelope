import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Box } from "native-base";
import LinearGradient from "react-native-linear-gradient";

const LayoutBase = ({children}) => {
  return(

    <SafeAreaProvider>
      <SafeAreaView>
        <Box px={20}>

          <LinearGradient

            useAngle={true}
            angle={180}
            // angleCenter={{x: 0.5, y: 0.5}}
            locations={[0, .9]}
            colors={['#ffffff', "#ffffff"]}
            style={{ height: "100%", width: "100%"}}
          >
            {children}

          </LinearGradient>

        </Box>
      </SafeAreaView>
    </SafeAreaProvider>

  )
}

export default LayoutBase
