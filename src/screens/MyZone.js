import React from "react";
import LayoutBase from "../components/LayoutBase";
import Block from "../components/Block";
import { Text } from "native-base";
import GradientButton from "../components/GradientButton";


const MyZone = () => {
	return (
		<LayoutBase>

			<Block borderRadius={100} fd={"row"} h={64} sc={"#9e66ff"} bdc={"#af81ff"} ai={"center"} jc={"space-between"}>

				<Text numberOfLines={1} flex={1} color={"#7f54ff"} fontWeight={"bold"} fontSize={18}>
					跟高中朋友去高雄玩～ 皮皮
				</Text>
				<GradientButton w={100} h={34} title={"進入旅程"}/>

			</Block>

		</LayoutBase>
	)
}

export default MyZone
