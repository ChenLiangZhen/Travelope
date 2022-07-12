import {extendTheme, HStack, Image, NativeBaseProvider, Pressable, StatusBar, Text, useTheme, VStack} from "native-base"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {createDrawerNavigator} from "@react-navigation/drawer"
import MainScreen from "./src/screens/MainScreen"
import {SafeAreaProvider, useSafeAreaInsets} from "react-native-safe-area-context"
import {DefaultTheme, NavigationContainer} from "@react-navigation/native"
import {getHeaderTitle} from "@react-navigation/elements"
import AppHeader from "./src/components/Header"
import SplashScreen from "./src/screens/SplashScreen"
import {HEIGHT, WIDTH} from "./src/Util"
import CurrentTrip from "./src/screens/trip/CurrentTrip"
import React, {useEffect, useState} from "react"
import {LogBox, View} from "react-native"
import TripOverview from "./src/screens/trip/TripOverview"
import MemEnvelope from "./src/screens/envelope/MemEnvelope"
import TripPostcard from "./src/screens/TripPostcard"
import MyZone from "./src/screens/MyZone"
import Settings from "./src/screens/Settings"
import {store} from "./src/globalstate/store"
import {Provider, useSelector} from "react-redux"
import NewTrip from "./src/screens/trip/NewTrip"
import {SSRProvider} from "react-aria"
import RNFS from "react-native-fs"
import NewNote from "./src/screens/trip/NewNote"
import TripOnMap from "./src/screens/trip/TripOnMap"
import {selectData} from "./src/globalstate/dataSlice"
import LegacyTrip from "./src/screens/trip/LegacyTrip";
import LegacyNote from "./src/screens/trip/LegacyNote";
import SharedWithMe from "./src/screens/SharedWithMe";
import {selectAccount} from "./src/globalstate/accountSlice";

LogBox.ignoreLogs(["Require cycle"])

// const App = () => {
//
//   useEffect(() => {
//     Share.open({message: "vsdfb"})
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         err && console.log(err);
//       });
//   }, []);
//
//   // const onShare = async () => {
//   //   try {
//   //     const result = await Share.share({
//   //       message:
//   //         'React Native | A framework for building native apps using React',
//   //     });
//   //     if (result.action === Share.sharedAction) {
//   //       if (result.activityType) {
//   //         // shared with activity type of result.activityType
//   //       } else {
//   //         // shared
//   //       }
//   //     } else if (result.action === Share.dismissedAction) {
//   //       // dismissed
//   //     }
//   //   } catch (error) {
//   //     alert(error.message);
//   //   }
//   return (
//     <ExampleCaptureOnMountManually/>
//     // <View/>
//   );
// }
//
// function ExampleCaptureOnMountManually() {
//   const ref = useRef();
//
//   useEffect(() => {
//     // on mount
//     ref.current.capture()
//       .then(uri => {
//         console.log("do something with ", uri);
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }, []);
//
//   return (
//
//     <View/>
//     // <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
//     //   <Text>...Something to rasterize...</Text>
//     // </ViewShot>
//   );
// }
//
//
// export default App


const defaultTheme = {
	...DefaultTheme, colors: {
		...DefaultTheme.colors, background: "white",
	},
}

export default function App() {

	const theme = extendTheme({
		space: {
			px: 1,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			12: 12,
			14: 14,
			16: 16,
			18: 18,
			20: 20,
			22: 22,
			24: 24,
			26: 26,
			28: 28,
			30: 30,
			32: 32,
			36: 36,
			40: 40,
			44: 44,
			48: 48,
			56: 56,
			64: 64,
			72: 72,
			80: 80,
			96: 96,
		},
		sizes: {
			px: 1,
			1: 1,
			2: 2,
			3: 3,
			4: 4,
			5: 5,
			6: 6,
			7: 7,
			8: 8,
			9: 9,
			10: 10,
			12: 12,
			14: 14,
			16: 16,
			18: 18,
			20: 20,
			22: 22,
			24: 24,
			26: 26,
			28: 28,
			30: 30,
			32: 32,
			36: 36,
			40: 40,
			44: 44,
			48: 48,
			56: 56,
			64: 64,
			72: 72,
			80: 80,
			96: 96,
		},
		colors: {
			// Add new color
			primary: {

				bg: {
					indigo: "#f4f2ff",
					purple: "#f5f1ff",
					pink: "#faf2ff",
					smoke: "#f4f4f4",
					lightgray: "#eee",
					midgray: "#ccc",
					mmidgray: "#aaa",
					gray: "#888",
				},

				darker_bg: {
					indigo: "#e8e6ff",
					purple: "#eee6ff",
					pink: "#f5e6ff",
					lightgray: "#eee",
					gray: "#888",
				},

				placeholder: {
					indigo: "#b0a6ff",
					purple: "#c4a7ff",
					pink: "#dba6ff",
					lightgray: "#eee",
					gray: "#888",
				},

				text: {
					indigo: "#7667ff",
					purple: "#9f67ff",
					pink: "#c267ff",
					lightgray: "#eee",
					midgray: "#aaa",
					gray: "#888",
				},
			},
		},
	})

	return (
		<SSRProvider>

			<StatusBar barStyle={"dark-content"}/>

			<Provider store={store}>
				<SafeAreaProvider>
					<NativeBaseProvider theme={theme}>
						<NavigationContainer theme={defaultTheme}>
							<StackNavigator/>
						</NavigationContainer>
					</NativeBaseProvider>
				</SafeAreaProvider>
			</Provider>

		</SSRProvider>

	)
}

const NativeStack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

const StackNavigator = () => {

	return (

		<NativeStack.Navigator
			initialRouteName="DrawerNavigator"
			screenOptions={{
				headerShown: false,
			}}
		>
			<NativeStack.Screen component={SplashScreen} name={"SplashScreen"}/>
			<Drawer.Screen component={TripOnMap} name={"TripOnMap"}/>
			<NativeStack.Screen component={DrawerNavigator} name={"DrawerNavigator"}/>
		</NativeStack.Navigator>)
}


const DrawerNavigator = () => {

	const insets = useSafeAreaInsets()
	const account = useSelector(selectAccount)
	const accountData = useSelector(selectData)
	const [activeTrip, setActiveTrip] = useState()


	const theme = useTheme().colors

	useEffect(() => {


		console.log("refresh side list")
		let trip = accountData.trips.find(item => item.isActive === true)
		trip ? setActiveTrip(trip) : setActiveTrip(null)
	})

	useEffect(() => { // ＡＰＰ整體初始設定

		RNFS.exists(RNFS.DocumentDirectoryPath + "/travelope")
			.then(async result => {

				if (!result) {   // 若使用者手機沒有ＴＲＡＶＥＬＯＰＥ資料夾，建立一個

					console.log("Travelope directory not found. Create one.")
					await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/travelope")
				}
			})

		console.log(account.friendData.friends)

	}, [])

	return (

		<Drawer.Navigator

			initialRouteName={"MainScreen"}

			backBehavior="history"
			drawerContent={({state, navigation, descriptors}) => {

				return (

					<View
						style={{

							backgroundColor: 'white',
							borderRadius: 16,
							marginTop: 180
							, flex: 1, alignItems: "flex-end", justifyContent: "space-between",
						}}>

						<VStack alignItems={"flex-end"}>

							<Image
								source={require("./src/res/branding_tc.png")}
								resizeMode={"contain"}
								alt={"旅信"}
								w={108}
								h={108}
							/>

							<Pressable onPress={() => {
								navigation.navigate("MainScreen")
							}} w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}>
								{
									state.index == 0 ?

										<HStack h={32} w={64} justifyContent={"center"} borderRadius={10} alignItems={"center"} bg={theme.primary.bg.purple}>
											<Text fontWeight={ "bold"}
											      fontSize={state.index == 6 ? 18 : 17}
											      color={"#8361ea"}

											>
												主頁
											</Text>
										</HStack> :

										<Text fontWeight={"normal"}
										      fontSize={state.index == 6 ? 18 : 17}
										      color={"#8361ea"}

										>
											主頁
										</Text>
								}
							</Pressable>

							{
								activeTrip ? <Pressable onPress={() => {
									navigation.navigate("CurrentTrip")
								}}
								                        w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20}
								                        py={8}>
									{
										state.index == 1 ?

											<HStack h={32} w={90} justifyContent={"center"} borderRadius={10} alignItems={"center"} bg={theme.primary.bg.purple}>
												<Text fontWeight={ "bold"}
												      fontSize={state.index == 6 ? 18 : 17}
												      color={"#8361ea"}

												>
													目前旅程
												</Text>
											</HStack> :

											<Text fontWeight={"normal"}
											      fontSize={state.index == 6 ? 18 : 17}
											      color={"#8361ea"}

											>
												目前旅程
											</Text>
									}
								</Pressable> : <></>
							}

							<HStack w={24} h={6} mx={24} my={20} bg={"black"} borderRadius={16}
							        bg={"#946aff"}
							/>

							{/*<Pressable onPress={() => {*/}
							{/*	navigation.navigate("MemEnvelope")*/}
							{/*}} w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}>*/}
							{/*	<Text fontWeight={state.index == 5 ? "bold" : "normal"}*/}
							{/*	      fontSize={state.index == 3 ? 18 : 17}*/}
							{/*	      color={"#6f61ea"}*/}

							{/*	>*/}
							{/*		回憶信封*/}
							{/*	</Text>*/}
							{/*</Pressable>*/}

							{/*<Pressable onPress={() => {*/}
							{/*	navigation.navigate("TripPostcard")*/}
							{/*}} w={WIDTH / 2} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}>*/}
							{/*	<Text fontWeight={state.index == 6? "bold" : "normal"}*/}
							{/*	      fontSize={state.index == 4? 18 : 17}*/}
							{/*	      color={"#7361ea"}*/}

							{/*	>*/}
							{/*		旅程紀念卡*/}
							{/*	</Text>*/}
							{/*</Pressable>*/}

							{/*<HStack w={24} h={6} mx={24} my={20} bg={"black"} borderRadius={16}*/}
							{/*        bg={"#b16bff"}*/}
							{/*/>*/}

							<Pressable onPress={() => {
								navigation.navigate("MyZone")
							}} w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}>
								{
									state.index == 9 ?

										<HStack h={32} w={90} justifyContent={"center"} borderRadius={10} alignItems={"center"} bg={theme.primary.bg.purple}>
											<Text fontWeight={ "bold"}
											      fontSize={state.index == 6 ? 18 : 17}
											      color={"#8361ea"}

											>
												我的圈子
											</Text>
										</HStack> :

										<Text fontWeight={"normal"}
										      fontSize={state.index == 6 ? 18 : 17}
										      color={"#8361ea"}

										>
											我的圈子
										</Text>
								}
							</Pressable>

							<Pressable onPress={() => {
								navigation.navigate("SharedWithMe")
							}} w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}>
								{
									state.index == 10 ?

										<HStack h={32} w={90} justifyContent={"center"} borderRadius={10} alignItems={"center"} bg={theme.primary.bg.purple}>
											<Text fontWeight={ "bold"}
											      fontSize={state.index == 6 ? 18 : 17}
											      color={"#8361ea"}

											>
												與我分享
											</Text>
										</HStack> :

										<Text fontWeight={"normal"}
										      fontSize={state.index == 6 ? 18 : 17}
										      color={"#8361ea"}

										>
											與我分享
										</Text>
								}
							</Pressable>

							<HStack w={24} h={6} mx={24} my={20} bg={"black"} borderRadius={16}
							        bg={"#946aff"}
							/>

							<Pressable onPress={() => {
								navigation.navigate("Settings")
							}} w={WIDTH * 2 / 6} flexDirection={"row"} justifyContent={"flex-end"} px={20} py={8}
							>

								{
									state.index == 11 ?

										<HStack h={32} w={64} justifyContent={"center"} borderRadius={10} alignItems={"center"} bg={theme.primary.bg.purple}>
											<Text fontWeight={"bold"}
											      fontSize={state.index == 6 ? 18 : 17}
											      color={"#8361ea"}

											>
												帳號
											</Text>
										</HStack> :

										<Text fontWeight={"normal"}
										      fontSize={state.index == 6 ? 18 : 17}
										      color={"#8361ea"}

										>
											帳號
										</Text>
								}

							</Pressable>

						</VStack>



						<VStack mr={18} mb={60} mt={84} alignItems={"flex-end"}>
							<Image
								alt={"branding"}
								style={{
									borderRadius: 12,
									marginBottom: 8,
								}}
								source={require("./src/res/image/1024.png")}
								height={32}
								width={32}
							/>
							<Text fontSize={12} fontWeight={"bold"} color={theme.primary.text.purple}> v1.12.4</Text>
						</VStack>


					</View>)
			}}

			screenOptions={{

				drawerPosition: "right", drawerType: "slide", drawerItemStyle: {
					margin: 0, padding: 0,

				}, drawerStyle: {

					padding: 0, width: WIDTH * 2 / 5,

				}, header: ({navigation, route, options}) => {
					const title = getHeaderTitle(options, route.name)
					return <AppHeader title={title} paddingTop={insets.top} navigation={navigation}/>
				},
			}}
		>
			<Drawer.Screen component={MainScreen} name={"MainScreen"}/>
			<Drawer.Screen component={CurrentTrip} name={"CurrentTrip"}/>
			<Drawer.Screen component={LegacyTrip} name={"LegacyTrip"}/>
			<Drawer.Screen component={NewTrip} name={"NewTrip"}/>
			<Drawer.Screen component={NewNote} name={"NewNote"}/>
			<Drawer.Screen component={LegacyNote} name={"LegacyNote"}/>
			<Drawer.Screen component={TripOverview} name={"TripOverview"}/>
			<Drawer.Screen component={MemEnvelope} name={"MemEnvelope"}/>
			<Drawer.Screen component={TripPostcard} name={"TripPostcard"}/>
			<Drawer.Screen component={MyZone} name={"MyZone"}/>
			<Drawer.Screen component={SharedWithMe} name={"SharedWithMe"}/>
			<Drawer.Screen component={Settings} name={"Settings"}/>
		</Drawer.Navigator>)
}

