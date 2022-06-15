// import React,{  useCallback, useEffect, useRef } from "react";
// import { Button, HStack, Text, useColorModeValue, useTheme, useToast } from "native-base";
// import { WIDTH } from "../Util";
//
//
// const Pop = ({id, type, content, show, onPressBtn1, onPressBtn2}) => {
//
//   const toast = useToast()
//   const toastInfoRef = useRef()
//   const toastButtonRef = useRef()
//
//   const theme = useTheme().colors
//
//   useEffect(()=> {
//
//       addToast()
//
//   },[])
//
//   useEffect(()=> {
//
//     if(!show){
//       if(type === "info"){
//         closeInfoToast()
//       } else {
//         closeButtonToast()
//       }
//     }
//   }, [show])
//
//   function closeInfoToast() {
//     if (toastInfoRef.current) {
//       toast.close(toastInfoRef.current);
//     }
//   }
//
//   function closeButtonToast() {
//     if (toastButtonRef.current) {
//       toast.close(toastButtonRef.current);
//     }
//   }
//
//   function addToast() {
//
//     if(type === "info"){
//       if (!toast.isActive("alert")) {
//         toastInfoRef.current = toast.show({
//           id: id,
//           render: () => {
//             return (
//               <ToastInfo/>
//             )
//           }
//         });}
//     }else {
//       if (!toast.isActive("confirm")) {
//         toastButtonRef.current = toast.show({
//           id: toastButtonRef,
//           render: () => {
//             return (
//               <ToastButton/>
//             )
//           }
//         });}
//     }
//   }
//
//   const ToastInfo = () => {
//     return(
//       <HStack alignItems={"center"} justifyContent={"space-between"} bg={"white"} w={WIDTH * .9} h={16} borderRadius={16} px={6} py="1"  mb={5}>
//         <Text fontWeight={"bold"} fontSize={16} color={theme.primary.placeholder.purple}>{content}</Text>
//       </HStack>
//     )
//   }
//
//   const ToastButton = () => {
//     return(
//       <HStack alignItems={"center"} justifyContent={"space-between"} bg={useColorModeValue("light.midgray", "dark.white")} w={WIDTH * .9} h={16} borderRadius={16} px={6} py="1"  mb={5}>
//         <Text fontWeight={"bold"} fontSize={16} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>確定刪除日記嗎？</Text>
//
//         <HStack>
//           <Button
//             onPress={onPressBtn1}
//             _pressed={{ bg: useColorModeValue("light.darkgray", "dark.darkgray") }}
//             borderWidth={1} color={useColorModeValue("light.primary", "dark.primary")} bg={useColorModeValue("light.midgray", "transparent")} borderColor={useColorModeValue("light.primary", "dark.flat_bg")} borderRadius={8} mr={2}>
//
//             <Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.primary", "dark.flat_bg")}>刪除</Text>
//           </Button>
//
//           <Button
//             onPress={onPressBtn2}
//             _pressed={{ bg: useColorModeValue("light.darkgray", "dark.darkgray") }}
//             bg={useColorModeValue("light.primary", "dark.primary")} borderRadius={8}>
//             <Text fontSize={16} fontWeight={"bold"} color={useColorModeValue("light.flat_bg", "dark.flat_bg")}>取消</Text>
//
//           </Button>
//         </HStack>
//       </HStack>
//     )
//   }
//
//   return(
//
//
//     <ToastInfo/>
//
//   )
// }
//
// export default Pop
