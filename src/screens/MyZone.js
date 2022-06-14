import React, { useEffect, useState } from "react";
import LayoutBase from "../components/LayoutBase";
import Block from "../components/Block";
import {
  Actionsheet,
  Box,
  Center,
  CheckIcon,
  HStack,
  Input,
  Pressable,
  Select,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import { GradientBorderButton } from "../components/GradientButton";
import Feather from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import { selectAccount } from "../globalstate/accountSlice";
import { FlatList } from "react-native";
import { WIDTH } from "../Util";

const FriendItem = ({ item }) => {

  useEffect(()=> {
    console.log("THIS item:")
  })

  return(

      <Block borderRadius={18} w={WIDTH* 0.9} px={20} fd={"row"} mb={16} h={64} sc={"transparent"} bgc={"#edf0ff"} bdc={"transparent"} ai={"center"}
             jc={"space-between"}>

        <Text numberOfLines={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={18}>
          {item.name}
        </Text>


        <Text numberOfLines={1} color={"#abadff"} fontSize={18}>
          {item.tag}
        </Text>
        {/*<GradientBorderButton w={100} bgc={"#f2f2ff"} color={"#af81ff"} title={item.tag} />*/}
      </Block>

  )
}

const MyZone = () => {

  let [filter, setFilter] = useState(""); //friend filter
  const { isOpen, onOpen, onClose } = useDisclose(); //open add friend ActionSheet
  const account = useSelector(selectAccount)

  const renderItem = ({ item }) => <FriendItem item={item}/>

  useEffect(()=> {
    console.log(account.friendData)
  }, [account])

  return (

    <LayoutBase>
      <Actionsheet

        overflow={"visible"}

        _backdrop={{
          bg: "#4e3e7e",
          opacity: .5,
        }}

        isOpen={isOpen} onClose={onClose}>

        <Actionsheet.Content

          _dragIndicatorWrapper={{
            h: 16,
            justifyContent: "center",
          }}
          _dragIndicator={{
            display: "none",
          }}
        >

          <Box w="100%" h={1000} px={16} justifyContent="flex-start">

            <HStack mb={16} justifyContent={"center"} alignItems={"center"}>
              <Text fontSize={18} fontWeight={"bold"} color={"#6e41ff"}>
                尋找朋友
              </Text>
            </HStack>

            <HStack p={12}>
              <Text mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>
                讓別人將你加入好友:
              </Text>
            </HStack>

            <VStack mb={8} bg={"#eeefff"} p={24} borderRadius={16} justifyContent={"flex-start"} alignItems={"flex-start"}>

              <HStack>
                <Text fontWeight={"bold"} mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>
                  你的ID:
                </Text>

                <Text fontWeight={"bold"} letterSpacing={1} fontSize="16" color={"#947eff"}>
                  2103247983
                </Text>
              </HStack>

            </VStack>

            <HStack p={12}>
              <Text mr={4} letterSpacing={1} fontSize="16" color={"#9781ff"}>
                以ID搜尋並加入朋友：
              </Text>
            </HStack>

            <VStack bg={"#eeefff"} p={24} borderRadius={16}>

              <HStack>

                <Input
                  _focus={{
                    borderColor: "transparent",
                    color: "white"
,                    bg: "#c5baff"
                  }}
                  selectionColor={"#9380ff"}
                  borderColor={"#c5baff"}
                  color={"#9380ff"}
                  bg={"#e7e2ff"}
                  borderWidth={2}
                  borderRadius={16}
                  fontWeight={"bold"}
                  h={36}
                  flex={8}
                  px={12}
                  fontSize={16}
                  textAlign={"center"}
                />
                <Center ml={8} flex={1} letterSpacing={1} fontSize="16" color={"#947eff"}>
                  <Feather name={"search"} color={"#947eff"} size={22}/>
                </Center>

              </HStack>

            </VStack>

          </Box>
        </Actionsheet.Content>
      </Actionsheet>

      <HStack w={"100%"} alignItems={"center"} h={42} mb={24}>
        <Box flex={5} h={40} mr={16}>

          <Select borderRadius={100}
                  borderColor={"#af81ff"}
                  borderWidth={2}
                  h={36}
                  px={16}
                  color={"#af81ff"}
                  fontSize={15}
                  fontWeight={"bold"}
                  selectedValue={filter} minWidth="200" accessibilityLabel="Choose Service"
                  placeholder="全部朋友"

                  dropdownIcon={

                    <Center mr={6}>
                      <Feather name={"arrow-down-circle"} size={22} color={"#af81ff"} />
                    </Center>
                  }

                  placeholderTextColor={"#af81ff"}

                  _actionSheetBody={{
                    p: 12,
                  }}

                  _actionSheetContent={{

                    _dragIndicatorWrapper: {
                      h: 16,
                      justifyContent: "center",
                      // bg: "gray.200"
                    },
                    _dragIndicator: {
                      bg: "#a180ff",
                      h: 4,
                      w: 48,
                    },
                  }}

                  _item={{
                    _text: {
                      color: "#7f54ff",
                    },
                    _pressed: {
                      bg: "#f2f2ff",
                    },
                    my: 8,
                  }}

                  _selectedItem={{
                    _text: {
                      color: "#7f54ff",
                      fontSize: 16,
                      fontWeight: "bold",
                    },
                    bg: "#e9e9ff",
                    px: 12,
                    h: 48,
                    justifyContent: "center",
                    borderRadius: 8,
                    startIcon:
                      <Center mr={6}>
                        <Feather name={"check"} size={18} color={"#af81ff"} />
                      </Center>
                    ,

                  }} mt={1}

                  onValueChange={itemValue => setFilter(itemValue)}>

            <Select.Item label="朋友" value="朋友" />
            <Select.Item label="家人 Research" value="家人" />
          </Select>
        </Box>

        <Pressable onPress={onOpen}
                   borderColor={"#af81ff"} borderRadius={100} borderWidth={2} h={36} justifyContent={"space-between"}
                   alignItems={"center"} flexDirection={"row"} flex={3}>
          <Text ml={16} color={"#af81ff"} fontSize={15} mr={4} fontWeight={"bold"}>加入朋友</Text>
          <Center mr={6}>
            <Feather color={"#af81ff"} name={"plus-circle"} size={22} />
          </Center>
        </Pressable>

        {/*<GradientButton flex={2}/>*/}
      </HStack>

        <FlatList
          contentContainerStyle={{
            flex: 1
          }}
          data={account.friendData.friends}
          renderItem={renderItem}
          keyExtractor={item=> item.id}
        />



    </LayoutBase>
  );
};

export default MyZone;
