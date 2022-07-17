import React, {useContext} from "react"
import {HCard, VCard} from "../Cards";
import {BaseText} from "../Typography";
import {FontSize} from "../../misc/Utilities";
import {HStack, VStack} from "../Layouts";
import {BaseButton, CLinkButton} from "../Buttons";
import AppContext from "../../context/contexts";
import {PolicyIcon} from "../Icons";

export function CookieCard() {
	const {toAcceptCookies} = useContext(AppContext)

	return (
		<>
			<HCard>
				<PolicyIcon size={40}/>

				<VStack>
					<VStack>
						<BaseText $fontFamily="Noto Sans TC" $fontWeight={300} $letterSpacing="1px"
						          $fontSize="14px">繼續瀏覽網站表示您同意台灣天氣的使用條款及隱私權政策。</BaseText>
					</VStack>
					<HStack $alignItems="center" $width="100%" $height="auto" $justifyContent="space-between">
						<CLinkButton $color="black" $fontFamily="Noto Sans TC" $fontWeight={400} $border="none"
						             $backgroundColor="transparent"
						             $textDecoration="underline"
						             $fontSize="12px" $padding="6px 0 6px 0"
						             href="/PrivacyPolicy">更多資訊...</CLinkButton>
						<BaseButton $color="black" $hoverColor='pink' $fontFamily="Noto Sans TC" $fontWeight={400}
						            $fontSize="13px"
						            $padding="6px 8px 6px 8px" $border="none"
						            $borderRadius="8px"
						            onClick={() => toAcceptCookies(true)}>不再顯示</BaseButton>
					</HStack>
				</VStack>
			</HCard>
		</>

	)
}

export function DevInfoCard(props) {
	return (

		<VCard key="DevInfo" initial={{y: 100, opacity: 0}}
		       animate={{y: 0, opacity: 1, duration: 4}} exit={{y: 80, opacity: 0}}
		       height="auto" width="auto" boxshadow="0 0 8px lightgray" padding="24px" drag>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={600}
			          margin="0 0 12px 0">詳細資訊</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">緯度: &nbsp;{props.latitude}</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">精度: &nbsp;{props.longitude}</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">精確度: &nbsp;{props.accuracy}</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">城市: &nbsp;{props.city}</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">區域: &nbsp;{props.district}</BaseText>
			<BaseText fontSize={FontSize.paragraph} fontFamily="Noto Sans TC" fontWeight={300}
			          margin="0 0 4px 0">鄰里: &nbsp;{props.village}</BaseText>
			<textarea style={{
				width: "auto",
				height: "500px"
			}} value={props.cwbData}
			          readOnly/>
		</VCard>
	)
}
