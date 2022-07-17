import React from "react"
import {HStack, VStack} from "../Layouts";
import {BaseText} from "../Typography";
import {CLinkButton} from "../Buttons";

const SiteFooter = () => {
	return (
		<VStack $width="100%" $justifyContent="center" $alignItems="center"
		        $gridArea="hCopyrightDivider / vLeft / Bottom / vRight">
			<BaseText $fontFamily="Noto Sans TC" $fontSize="14px" $letterSpacing="1px" $fontWeight="200" $lineHeight="20px"
			          $color="gray">© 2022 Lightiichen - Horizons Studio.</BaseText>
			<HStack>
				<CLinkButton $hoverCursor="pointer" $margin="0 6px 0 6px" $border="none" $backgroundColor="transparent"
				             $fontSize="14px" $letterSpacing="1px" $fontWeight={200} $color="#888"
				             $textDecoration="underline"
				             href="/TermsOfUse"
				>使用條款</CLinkButton>
				<CLinkButton $hoverCursor="pointer" $margin="0 6px 0 6px" $border="none" $backgroundColor="transparent"
				             $fontSize="14px" $letterSpacing="1px" $fontWeight={200} $color="#888"
				             $textDecoration="underline"
				             href="/PrivacyPolicy"
				>隱私權政策</CLinkButton>
			</HStack>
		</VStack>
	)
}

export default SiteFooter
