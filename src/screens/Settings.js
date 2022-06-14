import React, { useState } from "react";
import LayoutBase from "../components/LayoutBase";
import {
  Button, Center,
  FormControl,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import Feather from "react-native-vector-icons/Feather";
import Block from "../components/Block";
import { GradientButton } from "../components/GradientButton";
import { Platform } from "react-native";
import { HEIGHT, WIDTH } from "../Util";
import InputField from "../components/InputField";

function SignModal({ modalVisible, setModalVisible }) {

  const theme = useTheme().colors;
  const [showPassword, setShowPassword] = useState(false);

  return <>
    <Modal isOpen={modalVisible} onClose={() => setModalVisible()} justifyContent="flex-end" bottom={HEIGHT * .35}
           shadowOpacity={.2}
           shadowRadius={24}
           shadowOffset={{
             height: 4
           }}
           _backdrop={{ bg: "#000", opacity: .25 }}
    >

      <KeyboardAvoidingView
        keyboardVerticalOffset={-200}
        // flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Modal.Content borderRadius={24} w={WIDTH * .9} px={20} py={12}>

          <HStack mt={4} h={30} mb={16} justifyContent={"space-between"} alignItems={"center"}>

            <Text ml={8} fontSize={18} fontWeight={"bold"} color={theme.primary.text.purple}>
              登入Travelope
            </Text>

            <Pressable onPress={() => setModalVisible()} justifyContent={"center"} alignItems={"center"} w={28} h={28}>
              <Feather name={"x"} size={20} color={theme.primary.text.purple} />
            </Pressable>

          </HStack>

          {/*<HStack h={4} bg={theme.primary.placeholder.purple}/>*/}

          <VStack h={190} borderRadius={16} justifyContent={"flex-end"}>

            <VStack mb={20} p={8} h={108} borderColor={"gray.200"} borderWidth={1} borderRadius={16} bg={"gray.100"} justifyContent={"space-around"} sdvsd>
              <InputField borderWidth={0} color={theme.primary.text.purple} placeholder={"電子郵件"} />
              <HStack h={1} bg={"gray.300"} />
              <InputField
                secureTextEntry={!showPassword}
                InputRightElement={<Pressable justifyContent={"center"} alignItems={"center"} size="xs" rounded="none"
                                              w="1/6" h="full" onPress={() => setShowPassword(prev => !prev)}>
                  {showPassword ? <Feather name={"eye"} size={18} color={theme.primary.text.purple} /> :
                    <Feather name={"eye-off"} size={18} color={theme.primary.text.purple} />}
                </Pressable>}
                borderWidth={0} color={theme.primary.text.purple} placeholder={"密碼"} type={"password"} />
            </VStack>


            <HStack h={48} alignItems={"center"} w={"100%"} justifyContent={"flex-end"}>

              <Pressable justifyContent={"center"} alignItmes={"center"}>
                <Text fontSize={14} color={theme.primary.placeholder.purple}>
                  註冊帳號
                </Text>
              </Pressable>

              <GradientButton ml={20} w={100} h={34} title={"登入"} onPress={() => {
                setModalVisible(prev => !prev);
              }} />

            </HStack>

          </VStack>

        </Modal.Content>
      </KeyboardAvoidingView>

    </Modal>
  </>;
}

const Settings = () => {

  const theme = useTheme().colors;
  const [modalVisible, setModalVisible] = React.useState(true);

  return (

    <LayoutBase>

      <SignModal modalVisible={modalVisible} setModalVisible={() => setModalVisible(prev => !prev)} />

      <VStack mb={36}>

        <HStack h={96} justifyContent={"center"} alignItems={"center"}>
          <Pressable
            h={72}
            w={72}
            borderRadius={100}
            borderWidth={2}
            borderColor={theme.primary.text.pink}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Feather name={"user"} color={theme.primary.text.pink} size={32} />
          </Pressable>
        </HStack>

        <HStack mb={4} h={24} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={18} fontWeight={"bold"} color={theme.primary.text.pink}>
            未登入
          </Text>
        </HStack>

        <HStack h={24} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={16} fontWeight={"normal"} color={theme.primary.text.purple}>
            ID: 000000000000
          </Text>
        </HStack>

      </VStack>


      <Block pl={24} pr={18} mb={36} borderRadius={32} fd={"row"} h={64} sc={"#9e66ff"} bdc={"#af81ff"} ai={"center"}
             jc={"space-between"}>

        <Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
          啟用同步與朋友功能。
        </Text>
        <GradientButton w={100} h={34} title={"登入"} onPress={() => {
          setModalVisible(prev => !prev);
        }} />

      </Block>

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

    </LayoutBase>);
};

export default Settings;
