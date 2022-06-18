import React, { useCallback, useEffect, useRef, useState } from "react"
import LayoutBase from "../components/LayoutBase"
import {
	Center,
	HStack,
	KeyboardAvoidingView,
	Modal,
	Pressable,
	ScrollView,
	Spinner,
	Text,
	useTheme,
	useToast,
	VStack,
} from "native-base"
import Feather from "react-native-vector-icons/Feather"
import Block from "../components/Block"
import { GradientButton } from "../components/GradientButton"
import { Image, Keyboard, Platform } from "react-native"
import { HEIGHT, WIDTH } from "../Util"
import InputField from "../components/InputField"
import { appleAuth, AppleButton } from "@invertase/react-native-apple-authentication"
import { useFocusEffect } from "@react-navigation/native"
import { apiRequest, signinApi, signupApi } from "../apis/api"
import * as Keychain from "react-native-keychain"
import { useDispatch, useSelector } from "react-redux"
import {
	selectAccount,
	setAccountInfo,
	setHasRemoteProfilePicture,
	setProfilePicture,
} from "../globalstate/accountSlice"
import ImagePicker from "react-native-image-crop-picker"
import RNFS from "react-native-fs"
import { profilePictureInit } from "../apis/fileManager"
import { downloadProfilePicture, uploadProfilePicture } from "../apis/transferManager"

function SignModal({ modalVisible, setModalVisible }) {

	const theme = useTheme().colors

	const [warningText, setWarningText] = useState("")
	const [errorText, setErrorText] = useState("")

	const [showPassword, setShowPassword] = useState(false)
	const [isSignin, setIsSignin] = useState(true)

	const [password, setPassword] = useState("")
	const [email, setEmail] = useState("")
	const [nickname, setNickname] = useState("")

	const [async, setAsync] = useState(false)

	const toastInfoRef = useRef()
	const toast = useToast()

	const dispatch = useDispatch()
	const account = useSelector(selectAccount)

	useEffect(() => {

		console.log("Revoke testing")
		// onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
		return appleAuth.onCredentialRevoked(async () => {
			console.warn("User Credentials have been Revoked")
		})

	}, [])

	useFocusEffect(
		useCallback(() => {
			setShowPassword(false)
			setIsSignin(true)

		}, []),
	)

	useEffect(() => {
		setErrorText("")
	}, [isSignin])

	useEffect(() => {

		async function showInfo() {
			addToast()
			await new Promise(resolve => setTimeout(resolve, 1500))
			closeInfoToast()
			setWarningText("")
		}

		if (warningText !== "") {
			showInfo()
		}

	}, [warningText])

	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast() {
		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo />
					)
				},
			})
		}
	}

	const ToastInfo = () => {
		return (
			<HStack

				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.purple} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{warningText}</Text>
			</HStack>
		)
	}

	async function onAppleButtonPress() {

		// performs login request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		})

		// get current authentication state for user
		// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user)

		// use credentialState response to ensure the user is authenticated
		if (credentialState === appleAuth.State.AUTHORIZED) {
			// user is authenticated
		}
	}

	return <>

		{isSignin?

			<Modal isOpen={modalVisible} onClose={() => setModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .35}
			       shadowOpacity={.2}
			       shadowRadius={24}
			       shadowOffset={{
				       height: 4,
			       }}
			       _backdrop={{ bg: "#000", opacity: .25 }}
			>

				<KeyboardAvoidingView
					keyboardVerticalOffset={-200}
					// flex={1}
					behavior={Platform.OS === "ios"? "padding" : "height"}
				>
					<Modal.Content borderRadius={24} w={WIDTH * .9} px={20} py={12}>

						<HStack mt={4} h={30} mb={16} justifyContent={"space-between"} alignItems={"center"}>

							<Text ml={8} fontSize={18} fontWeight={"bold"} color={theme.primary.text.purple}>
								登入Travelope
							</Text>

							<Pressable onPress={() => setModalVisible()} justifyContent={"center"} alignItems={"center"} w={28}
							           h={28}>
								<Feather name={"x"} size={20} color={theme.primary.text.purple} />
							</Pressable>

						</HStack>

						{/*<HStack h={4} bg={theme.primary.placeholder.purple}/>*/}

						<VStack h={240} borderRadius={16} justifyContent={"flex-end"}>

							<VStack mt={12} mb={20} p={8} h={108} borderColor={"gray.200"} borderWidth={1} borderRadius={16}
							        bg={"gray.100"} justifyContent={"space-around"} sdvsd>
								<InputField
									value={email}
									onChangeText={text => {
										setEmail(text)
									}}
									borderWidth={0} color={theme.primary.text.purple} placeholder={"電子郵件"} />
								<HStack h={1} bg={"gray.300"} />
								<InputField
									value={password}
									onChangeText={text => {
										setPassword(text)
									}}
									secureTextEntry={!showPassword}
									InputRightElement={<Pressable justifyContent={"center"} alignItems={"center"} size="xs"
									                              rounded="none"
									                              w="1/6" h="full"
									                              onPress={() => setShowPassword(prev => !prev)}>
										{showPassword? <Feather name={"eye"} size={18} color={theme.primary.text.purple} /> :
											<Feather name={"eye-off"} size={18} color={theme.primary.text.purple} />}
									</Pressable>}
									borderWidth={0} color={theme.primary.text.purple} placeholder={"密碼"} type={"password"} />
							</VStack>


							<HStack h={48} pr={4} alignItems={"center"} w={"100%"} justifyContent={"flex-end"}>

								<Center h={32} w={148} bg={"black"} borderRadius={16} shadowColor={"purple"} shadowOpacity={.2}
								        shadowOffset={{ height: 1 }}
								        shadowRadius={8}>
									<AppleButton
										buttonStyle={AppleButton.Style.BLACK}
										buttonType={AppleButton.Type.SIGN_IN}
										style={{
											width: 128, // You must specify a width
											height: 32, // You must specify a height
										}}
										onPress={() =>
											onAppleButtonPress()
												.catch((e) => {
													console.log(e)
												})

										}
									/>
								</Center>

								<GradientButton ml={20} w={100} h={34} title={"登入"} onPress={() => {

									Keyboard.dismiss()

									if (email === "" || password === "") {
										setErrorText("資料不完整")
									} else {

										if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
											setErrorText("Email格式錯誤")
										} else {

											setAsync(true)

											signinApi.post("/api/travelope/signin", {
												email: email,
												password: password,
											})
											         .then(async res => {

												         await Keychain.setGenericPassword("token", res.data.token)

												         setAsync(false)
												         setModalVisible(prev => !prev)

												         dispatch(setAccountInfo({

													         ...account.info,

													         isLoggedIn: true,
													         id: res.data.user.id,
													         email: res.data.user.email,
													         nickname: res.data.user.nickname,

												         }))

												         if (res.data.user.hasRemoteProfilePicture) {
													         await downloadProfilePicture(res.data.user.id, res.data.user.id, RNFS.DocumentDirectoryPath + "/travelope/" + res.data.user.id)
													         dispatch(setProfilePicture(RNFS.DocumentDirectoryPath + "/travelope/" + res.data.user.id))
												         }

												         setErrorText("")
												         setWarningText("登入成功！")

											         }, rej => {

												         setAsync(false)

												         setErrorText("帳戶資訊錯誤")
												         console.log("Signin Rejected: " + rej)
											         })
										}
									}

								}} />

							</HStack>

							<HStack h={48} px={6} alignItems={"center"} w={"100%"} justifyContent={"space-between"}>

								{async?
									<Spinner size={"sm"} color={"dimgray"} /> :
									<Text fontSize={15} fontWeight={"bold"}
									      color={theme.primary.placeholder.pink}>
										{errorText}
									</Text>}

								<Pressable
									onPress={() => {
										setIsSignin(false)
									}}
									justifyContent={"center"} alignItmes={"center"}>

									<Text textDecorationLine={"underline"} fontSize={15} fontWeight={"bold"}
									      color={theme.primary.placeholder.purple}>
										使用電子郵件註冊帳號
									</Text>
								</Pressable>

							</HStack>

						</VStack>

					</Modal.Content>
				</KeyboardAvoidingView>

			</Modal>

			:

			<Modal isOpen={modalVisible} onClose={() => setModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .35}
			       shadowOpacity={.2}
			       shadowRadius={24}
			       shadowOffset={{
				       height: 4,
			       }}
			       _backdrop={{ bg: "#000", opacity: .25 }}
			>

				<KeyboardAvoidingView
					keyboardVerticalOffset={-200}
					// flex={1}
					behavior={Platform.OS === "ios"? "padding" : "height"}
				>
					<Modal.Content borderRadius={24} w={WIDTH * .9} px={20} py={12}>

						<HStack mt={4} h={30} mb={16} justifyContent={"space-between"} alignItems={"center"}>

							<Text ml={8} fontSize={18} fontWeight={"bold"} color={theme.primary.text.purple}>
								註冊Travelope
							</Text>

							<Pressable onPress={() => setModalVisible()} justifyContent={"center"} alignItems={"center"} w={28}
							           h={28}>
								<Feather name={"x"} size={20} color={theme.primary.text.purple} />
							</Pressable>

						</HStack>

						{/*<HStack h={4} bg={theme.primary.placeholder.purple}/>*/}

						<VStack h={300} borderRadius={16} justifyContent={"flex-end"}>

							<VStack mt={12} mb={20} p={8} h={162} borderColor={"gray.200"} borderWidth={1} borderRadius={16}
							        bg={"gray.100"} justifyContent={"space-around"} sdvsd>

								<InputField
									onChangeText={text => setNickname(text)}
									value={nickname} borderWidth={0} color={theme.primary.text.purple} placeholder={"用戶名稱"} />

								<HStack h={1} bg={"gray.300"} />

								<InputField
									onChangeText={text => setEmail(text)}
									value={email} borderWidth={0} color={theme.primary.text.purple} placeholder={"電子郵件"} />
								<HStack h={1} bg={"gray.300"} />

								<InputField
									value={password}
									onChangeText={text => {
										setPassword(text)
									}}
									secureTextEntry={!showPassword}
									InputRightElement={<Pressable justifyContent={"center"} alignItems={"center"} size="xs"
									                              rounded="none"
									                              w="1/6" h="full"
									                              onPress={() => setShowPassword(prev => !prev)}>
										{showPassword? <Feather name={"eye"} size={18} color={theme.primary.text.purple} /> :
											<Feather name={"eye-off"} size={18} color={theme.primary.text.purple} />}
									</Pressable>}
									borderWidth={0} color={theme.primary.text.purple} placeholder={"密碼"} type={"password"} />
							</VStack>


							<HStack h={48} pr={4} alignItems={"center"} w={"100%"} justifyContent={"flex-end"}>

								<GradientButton ml={20} w={100} h={34} title={"註冊"} onPress={() => {

									Keyboard.dismiss()

									if (email === "" || password === "" || nickname === "") {
										setErrorText("資料不完整")
									} else {

										if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
											setErrorText("Email格式錯誤")
										} else {

											if (password.length < 6) {
												setErrorText("密碼不得少於六個字元")
											} else {

												setAsync(true)

												signupApi.post("/api/travelope/signup", {

													...account.info,
													nickname: nickname,
													email: email,
													id: "" + (new Date().getFullYear() - 2000) + (new Date().getMonth() + 1) + (new Date().getDate()) + (new Date().getMinutes()) + (new Date().getSeconds()) + (new Date().getMilliseconds()),
													password: password,

												})
												         .then(async res => {

													         setErrorText("")
													         setWarningText("註冊成功 !")
													         setIsSignin(true)

													         await Keychain.setGenericPassword("token", res.data.token)

													         setAsync(false)

												         })
												         .catch(rej => {

													         setAsync(false)

													         if (rej.response.data.includes("E11000")) {
														         setErrorText("此電子信箱已經被註冊")
													         } else {
														         setErrorText("出現未知錯誤")

													         }

													         console.log("Signup Rejected: " + JSON.stringify(rej.response.data))
												         })
											}
										}
									}

								}} />

							</HStack>

							<HStack h={48} px={6} alignItems={"center"} w={"100%"} justifyContent={"space-between"}>

								{async?
									<Spinner size={"sm"} color={"dimgray"} /> :
									<Text fontSize={15} fontWeight={"bold"}
									      color={theme.primary.placeholder.pink}>
										{errorText}
									</Text>}

								<Pressable
									onPress={() => {
										setIsSignin(true)
									}}
									justifyContent={"center"} alignItmes={"center"}>

									<Text textDecorationLine={"underline"} fontSize={15} fontWeight={"bold"}
									      color={theme.primary.placeholder.purple}>
										返回登入
									</Text>
								</Pressable>

							</HStack>

						</VStack>

					</Modal.Content>
				</KeyboardAvoidingView>

			</Modal>

		}

	</>
}

const Settings = () => {

	const theme = useTheme().colors
	const [modalVisible, setModalVisible] = useState(false)

	const account = useSelector(selectAccount)
	const dispatch = useDispatch()

	const toastInfoRef = useRef()
	const toast = useToast()

	useFocusEffect(
		useCallback(() => {

			if (account.info.isLoggedIn === true &&
				account.info.profilePictureLocalPath === "" &&
				account.info.hasRemoteProfilePicture === true) {
			}

		}, [account]),
	)

	useEffect(() => {

		return appleAuth.onCredentialRevoked(async () => {
			console.warn("User Credentials have been Revoked")
		})
	}, [])


	function closeInfoToast() {
		if (toastInfoRef.current) {
			toast.close(toastInfoRef.current)
		}
	}

	function addToast(warningText) {
		if (!toast.isActive("warningInfo")) {
			toastInfoRef.current = toast.show({
				id: "warningInfo",
				render: () => {
					return (
						<ToastInfo warningText={warningText} />
					)
				},
			})
		}
	}

	const ToastInfo = ({ warningText }) => {
		return (
			<HStack
				alignItems={"center"} justifyContent={"space-between"} bg={theme.primary.text.purple} w={WIDTH * .9} h={64}
				borderRadius={16} px={24} mb={5}>
				<Text fontWeight={"bold"} fontSize={16} color={"white"}>{warningText}</Text>
			</HStack>
		)
	}


	const updateProfilePicture = async () => {

		ImagePicker.openPicker({
			width: 512,
			height: 512,
			mediaType: "photo",
			cropping: true,
			cropperCircleOverlay: true,

		}).then(async image => {

			console.log("Setting profile image...")

			const accountID = account.info.id
			const prevImgPath = account.info.profilePictureLocalPath
			const URI = await profilePictureInit(image, accountID, prevImgPath)

			console.log("PIC: " + prevImgPath + " AFTER: " + URI)

			dispatch(setProfilePicture(URI))
			dispatch(setHasRemoteProfilePicture())

			uploadProfilePicture(account.info.id, account.info.id, URI)
			apiRequest("put", "/api/travelope/update-user-has-picture", {
				id: accountID
			})
		})
	}


	return (

		<LayoutBase>

			<SignModal modalVisible={modalVisible} setModalVisible={() => setModalVisible(prev => !prev)} />

			<VStack mb={36}>

				<HStack h={100} mb={12} justifyContent={"center"} alignItems={"center"}>
					<Pressable
						onPress={async () => {
							if (!account.info.isLoggedIn) {
								addToast("必須登入才能設定頭像喔！")
								await new Promise(resolve => setTimeout(resolve, 1500))
								closeInfoToast()
								return
							}
							updateProfilePicture()
						}}
						h={96}
						w={96}
						overflow={"hidden"}
						borderRadius={100}
						borderWidth={2}
						borderColor={theme.primary.text.pink}
						justifyContent={"center"}
						alignItems={"center"}
					>
						{
							account.info.profilePictureLocalPath !== ""?

								<Image
									style={{
										borderRadius: 100,
										height: 88,
										width: 88,
									}}
									source={{ uri: account.info.profilePictureLocalPath }}
									alt={"userImage"}
								/>
								: <Feather name={"user"} color={theme.primary.text.pink} size={32} />
						}

					</Pressable>
				</HStack>

				<HStack mb={4} h={24} justifyContent={"center"} alignItems={"center"}>

					{
						account.info.isLoggedIn?

							<Text fontSize={18} fontWeight={"bold"} color={theme.primary.text.pink}>
								{account.info.nickname}
							</Text> :

							<Text fontSize={18} fontWeight={"bold"} color={theme.primary.text.pink}>
								未登入
							</Text>
					}

				</HStack>

				<HStack h={24} justifyContent={"center"} alignItems={"center"}>

					{
						account.info.isLoggedIn?

							<Text fontSize={16} fontWeight={"normal"} color={theme.primary.text.purple}>
								{"用戶ID: " + account.info.id}
							</Text> : <></>
					}

				</HStack>

			</VStack>

			{
				account.info.isLoggedIn?

					<Block pl={24} pr={18} mb={36} borderRadius={32} fd={"row"} h={64} sc={"#9e66ff"} bdc={"#af81ff"}
					       ai={"center"}
					       jc={"space-between"}>

						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							登出帳號
						</Text>
						<GradientButton w={100} h={34} title={"登出"} onPress={() => {

							dispatch(setAccountInfo({

								isLoggedIn: false,
								id: "",
								email: "",
								password: "",
								nickname: "",
								profilePictureLocalPath: "",
								hasRemoteProfilePicture: false,

								appleAccountLink: {},
							}))

						}} />

					</Block> :

					<Block pl={24} pr={18} mb={36} borderRadius={32} fd={"row"} h={64} sc={"#9e66ff"} bdc={"#af81ff"}
					       ai={"center"}
					       jc={"space-between"}>

						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							啟用同步與朋友功能。
						</Text>
						<GradientButton w={100} h={34} title={"登入"} onPress={() => {
							setModalVisible(prev => !prev)
						}} />

					</Block>
			}


			<ScrollView>

				<Block px={12} py={16} borderRadius={32} fd={"column"} h={112} sc={"#9e66ff"} bdc={"#af81ff"}
				       jc={"space-between"}>

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

					<HStack h={2} w={"100%"} opacity={.5} bg={theme.primary.text.pink} />

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

				</Block>

				<Block px={12} py={16} borderRadius={32} fd={"column"} h={112} sc={"#9e66ff"} bdc={"#af81ff"}
				       jc={"space-between"}>

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

					<HStack h={2} w={"100%"} opacity={.5} bg={theme.primary.text.pink} />

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

				</Block>

				<Block px={12} py={16} borderRadius={32} fd={"column"} h={164} sc={"#9e66ff"} bdc={"#af81ff"}
				       jc={"space-between"}>

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

					<HStack h={2} w={"100%"} opacity={.5} bg={theme.primary.text.pink} />

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

					<HStack h={2} w={"100%"} opacity={.5} bg={theme.primary.text.pink} />

					<Pressable flexDirection={"row"} px={10} alignItems={"center"}>
						<Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
							選項
						</Text>
						<Feather name={"arrow-right"} size={22} color={theme.primary.text.purple} />
					</Pressable>

				</Block>

			</ScrollView>

		</LayoutBase>)
}

export default Settings
