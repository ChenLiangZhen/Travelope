import React from "react"
import Head from "next/head";
import Script from "next/script";
import {BaseGrid, BaseWeb, HStack, VStack} from "../components/Layouts";
import {SiteHeader} from "../components/structured_components/Header";
import {SiteBody} from "../components/structured_components/Body";
import SiteFooter from "../components/structured_components/Footer";
import {BaseText} from "../components/Typography";

function PolicyTemplate(props) {
	return (
		<VStack {...props}
		        margin="0 0 16px 0"
		><BaseText fontFamily="Noto Sans TC"
		           fontWeight={500}
		           fontSize={18}
		           lineHeight="48px"
		           letterSpacing="1px"
		>{props.title}</BaseText>
			<BaseText padding="0 0 0 42px" lineHeight="23px" letterSpacing="1px" fontFamily="Noto Sans TC" fontSize={16}
			          fontWeight={300}>
				{props.content}
			</BaseText>
		</VStack>
	)
}

const TermsOfUse = () => {

	return (
		<>
			<Head>
				<title>Taiwan Weather 台灣天氣</title>
			</Head>
			<Script type='text/javascript'
			        src='//font.arphic.com/FontSubsetOutput/1642523883319/B2DF88D8BA84F2076780EDBB70B310FB/1642523883319.JS?9458856266'/>

			<BaseWeb>
				<BaseGrid>
					<SiteHeader info={() => {

					}}/>

					<SiteBody>
						<VStack>
							<HStack initial={{x: -100, opacity: 0}}
							        animate={{x: 0, opacity: 1}}
							        transition={{delay: 0.4}}
							        margin="0 0 16px 0"
							>
								{/*<PolicyIcon size={32}/>*/}
								<BaseText fontFamily="Noto Sans TC"
								          fontWeight={600}
								          fontSize={22}
								          lineHeight="48px"
								          letterSpacing="1px"
								>使用條款</BaseText>
							</HStack>


							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 0.6}} title="一、隱私權政策適用範圍"
							                content="隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 0.7}} title="二、個人資料的蒐集與利用方式" content="當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，必須使用您的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您同意，本網站不會將個人資料用於其他用途。
							本網站在您使用的使用者回饋問卷調查等互動性功能時，會保留您所提供的電子郵件地址、聯絡方式及發送時間等。
							於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、地理資訊、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，決不對外公佈。
							為提供精確的服務，我們會將收集的問卷調查內容進行統計與分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公佈統計數據及說明文字，但不涉及特定個人之資料。
							您可以隨時向我們提出請求，以更正或刪除本網站所蒐集您錯誤或不完整的個人資料。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 0.8}} title="三、資料之保護" content="本網站主機由第三方機構託管，並設有相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，如有違反保密義務者，將會受到相關的法律處分。
							如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 0.9}} title="四、網站對外的相關連結"
							                content="本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 1}} title="五、與第三人共用個人資料之政策" content="本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
							前項但書之情形包括不限於：
							一、經由您同意。
							二、法律明文規定。
							三、為免除您生命、身體、自由或財產上之危險。
							四、與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。
							五、當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。
							六、有利於您的權益。
							七、本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 1.1}} title="六、Cookie與LocalStorage之使用"
							                content="為了提供您最佳的服務，本網站會在您的電腦中儲存並取用我們的Cookie與LocalStorage，您可調整瀏覽器功能項中的隱私權等級設定以防止資料的儲存與取用，但可能會導至網站某些功能無法正常執行 。"/>

							<PolicyTemplate initial={{x: -100, opacity: 0}}
							                animate={{x: 0, opacity: 1}}
							                transition={{delay: 1.2}} title="七、隱私權政策修正"
							                content="本網站隱私權政策將因應需求隨時進行修正，並於此處刊登最新版本。"/>
							<HStack margin="0 0 60px 0"></HStack>
						</VStack>
					</SiteBody>
					<SiteFooter/>
				</BaseGrid>
			</BaseWeb>
		</>
	)
}

export default TermsOfUse
