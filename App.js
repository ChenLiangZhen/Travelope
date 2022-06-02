import {extendTheme, HStack, NativeBaseProvider, Pressable, Text, VStack} from "native-base";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import MainScreen from "./src/screens/MainScreen";
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {getHeaderTitle} from "@react-navigation/elements"
import AppHeader from "./src/components/Header";
import SplashScreen from "./src/screens/SplashScreen";
import {HEIGHT, WIDTH} from "./src/Util";
import CurrentTrip from "./src/screens/CurrentTrip";
import React from "react";
import {View} from "react-native";
import RecentTrip from "./src/screens/RecentTrip";
import MemEnvelope from "./src/screens/MemEnvelope";
import TripPostcard from "./src/screens/TripPostcard";
import MyZone from "./src/screens/MyZone";
import Settings from "./src/screens/Settings"

const defaultTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "white",
	},
};

export default function App() {

	const theme = extendTheme({
		sizes: {
			px: 1,
			1: 4,
			2: 8,
			3: 12,
			4: 16,
			5: 20,
			6: 24,
			7: 28,
			8: 32,
			9: 36,
			10: 40,
			12: 48,
			14: 56,
			16: 64,
			18: 72,
			20: 80,
			22: 88,
			24: 96,
			26: 104,
			28: 112,
			30: 120,
			32: 128,
			36: 144,
			40: 160,
			44: 176,
			48: 192,
			56: 224,
			64: 256,
			72: 288,
			80: 320,
			96: 384,
		}
	});

	return (
		<SafeAreaProvider>
			<NativeBaseProvider theme={theme}>
				<NavigationContainer theme={defaultTheme}>
					<DrawerNavigator/>
				</NavigationContainer>
			</NativeBaseProvider>
		</SafeAreaProvider>
	);
}

const NativeStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const StackNavigator = () => {
	return (
		<NativeStack.Navigator
			screenOptions={{
				headerShown: false,
				initialRouteName: "DrawerNavigator"
			}}
		>
			<NativeStack.Screen component={SplashScreen} name={"SplashScreen"}/>
			<NativeStack.Screen component={DrawerNavigator} name={"DrawerNavigator"}/>
		</NativeStack.Navigator>
	)
}



const DrawerNavigator = () => {

	const insets = useSafeAreaInsets()

	return (
		<Drawer.Navigator
			drawerContent={({state, navigation,descriptors}) => {
				return (
							<View
								style={{
								flex: 1,
								alignItems: "flex-end",
								justifyContent: "center"
							}}>

								<Pressable
									zIndex={1000}
									onPress={()=> {
									navigation.navigate("MainScreen")
								}} w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 0 ? "bold" : "normal"}
									      fontSize={state.index == 0? 22 : 18}
									      color={"#616cea"}
									>
										首頁
									</Text>
								</Pressable>

								<HStack w={12} h={2} mx={4} my={6} bg={"black"} borderRadius={16}
								        bg={"#7f61ea"}
								/>

								<Pressable onPress={()=> {
									navigation.navigate("CurrentTrip")
								}}
								           w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 1 ? "bold" : "normal"}
									      fontSize={state.index == 1? 22 : 18}
									      color={"#6168ea"}

									>
										目前旅程
									</Text>
								</Pressable>

								<Pressable w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 2 ? "bold" : "normal"}
									      fontSize={state.index == 2 ? 22 : 18}
									      color={"#6661ea"}

									>
										近期旅程
									</Text>
								</Pressable>

								<Pressable w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 3 ? "bold" : "normal"}
									      fontSize={state.index == 3 ? 22 : 18}
									      color={"#6f61ea"}

									>
										回憶信封
									</Text>
								</Pressable>

								<Pressable w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 4 ? "bold" : "normal"}
									      fontSize={state.index == 4 ? 22 : 18}
									      color={"#7361ea"}

									>
										旅程紀念卡
									</Text>
								</Pressable>

								<HStack w={12} h={2} mx={4} my={6} bg={"black"} borderRadius={16}
								        bg={"#8f61ea"}
								/>

								<Pressable w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 5? "bold" : "normal"}
									      fontSize={state.index == 5 ? 22 : 18}
									      color={"#7f61ea"}

									>
										我的圈子
									</Text>
								</Pressable>

								<Pressable w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={4} py={2}>
									<Text fontWeight={state.index == 6 ? "bold" : "normal"}
									      fontSize={state.index == 6 ? 22 : 18}
									      color={"#8361ea"}

									>
										個人設定
									</Text>
								</Pressable>
							</View>
				)
			}}

			screenOptions={{
				drawerPosition: "right",
				drawerType: "front",
				drawerItemStyle: {
					margin: 0,
					padding: 0,
				},
				drawerStyle: {
					margin: 0,
					padding: 0,
					width: WIDTH / 2
				},
				header: ({navigation, route, options}) => {
					const title = getHeaderTitle(options, route.name);
					return <AppHeader title={title} paddingTop={insets.top} navigation={navigation}/>;
				},
			}}
		>
			<Drawer.Screen component={MainScreen} name={"MainScreen"}/>
			<Drawer.Screen component={CurrentTrip} name={"CurrentTrip"}/>
			<Drawer.Screen component={RecentTrip} name={"RecentTrip"}/>
			<Drawer.Screen component={MemEnvelope} name={"MemEnvelope"}/>
			<Drawer.Screen component={TripPostcard} name={"TripPostcard"}/>
			<Drawer.Screen component={MyZone} name={"MyZone"}/>
			<Drawer.Screen component={Settings} name={"Settings"}/>
		</Drawer.Navigator>
	)
}

