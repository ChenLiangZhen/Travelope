import { ScrollView, StatusBar, Text } from "native-base";
import React, { useEffect, useRef } from "react";
import Block from "../components/Block";
import BlockTitle from "../components/BlockTitle";
import LayoutBase from "../components/LayoutBase";
import { GradientButton } from "../components/GradientButton";

import CameraRoll from "@react-native-community/cameraroll";

const MainScreen = ({ navigation }) => {

  const ref = useRef()

  useEffect(()=> {

    // Share.open({ message: "dfgdg"})
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     err && console.log(err);
    //   });
    //
    //   // on mount
    //   ref.current.capture()
    //     .then(uri => {y
    //       console.log("do something with ", uri);
    //     })
    //     .catch((e) => {
    //       console.log(e)
    //     })

  },[])



  // useEffect(() => {
  //   // on mount
  //   ref.current.capture()
  //     .then(uri => {
  //       console.log("do something with ", uri);
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }, []);

  useEffect(()=> {
    CameraRoll.getPhotos()
  },[])

  return (

    <LayoutBase>

      <ScrollView flex={1}>

        {/*<ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>*/}
        {/*  <Text>...Something to rasterize...</Text>*/}
        {/*</ViewShot>*/}

        <Block borderRadius={100} fd={"row"} h={64} sc={"#9e66ff"} bdc={"#af81ff"} ai={"center"} jc={"space-between"}>

          <Text mr={8} numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={17}>
            目前旅程：owerjpoiejfoijpewrs
          </Text>
          <GradientButton w={100} h={34} title={"進入旅程"} />

        </Block>

        <BlockTitle onPress={() => {
          navigation.navigate("TripOverview");
        }} text={"旅程總覽"} color={"#5959ff"} icon={"send"} />

        <Block h={80} bdc={"#8080ff"}>

        </Block>

        <BlockTitle onPress={() => {
          navigation.navigate("MemEnvelope");
        }} text={"回憶信封"} color={"#7859ff"} icon={"mail"} />

        <Block h={80} bdc={"#9780ff"}>

        </Block>

        <BlockTitle onPress={() => {
          navigation.navigate("TripPostcard");
        }} text={"旅程紀念卡"} color={"#9959ff"} icon={"image"} />

        <Block h={80} bdc={"#ae7dff"}>

        </Block>
      </ScrollView>

    </LayoutBase>

  );
};

export default MainScreen;
