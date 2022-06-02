import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Box, HStack, Pressable, ScrollView, Text, View} from "native-base";
import AppHeader from "../components/Header";
import SVGImg from "../res/AppIcon.svg";
import LottieView from "lottie-react-native";
import {WIDTH} from "../Util";
import React from "react";
import Block from "../components/Block";
import BlockTitle from "../components/BlockTitle";

const MainScreen = () => {
	return (
		<SafeAreaProvider>
			<ScrollView flex={1}>

				<Block h={20} mt={4}>
					<Text>
						dfbnlkfsjn
					</Text>
				</Block>

				<BlockTitle text={"近期旅程"} color={"#00f"} icon={"send"}/>

				<Block h={30}>

				</Block>

				<BlockTitle text={"回憶信封"} color={"#00f"} icon={"send"}/>

				<Block h={30}>

				</Block>

				<BlockTitle text={"旅程紀念卡"} color={"#00f"} icon={"send"}/>

				<Block h={30}>

				</Block>
			</ScrollView>
		</SafeAreaProvider>
	)
}

export default MainScreen
