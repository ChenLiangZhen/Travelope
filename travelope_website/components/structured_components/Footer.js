import React from "react"
import {HStack, VStack} from "../Layouts";
import {BaseText} from "../Typography";
import {CLinkButton} from "../Buttons";

const SiteFooter = () => {


	return (

		<VStack $margin={"16px 0 0 0"} $width="100%" $justifyContent="center" $alignItems="center"
		        $gridArea="hCopyrightDivider / vLeft / Bottom / vRight">
			<BaseText $fontFamily="Noto Sans TC" $fontSize="14px" $letterSpacing="1px" $fontWeight="200" $lineHeight="24px"
			          $color="gray">© 2022 LightHope - TRAVELOPE 旅信</BaseText>
			<HStack>

				<CLinkButton $hoverCursor="pointer" $border="none" $backgroundColor="transparent"
				             $fontSize="14px" $letterSpacing="1px" $fontFamily="Noto Sans TC" $fontWeight={200}
				             $color="#888"
				             $textDecoration="underline"
				             href="/PrivacyPolicy"
				>隱私權政策</CLinkButton>

			</HStack>
		</VStack>
	)
}

export default SiteFooter
