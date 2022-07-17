import LottieView from "lottie-react-native";
import {Box, Center} from "native-base";
import {useEffect} from "react";
import React from "react";


const SplashScreen = ({navigation}) => {

	useEffect(()=>{

	},[])

	return(
		<Center w={"100%"} flex={1} mb={10}>
			<LottieView
				loop
				autoPlay={true}
				style={{
					width: 50,
					height: 50,
				}}
				source={require("../res/applogo_splash.json")}
				onAnimationFinish={(bool)=>{
					console.log(bool)
					console.log("sdgs")
					// navigation.navigate("MainScreen")
				}}
			/>
		</Center>
	)
}

export default SplashScreen
