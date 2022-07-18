import {HStack} from "../Layouts";
import styled from "styled-components";
import {motion} from "framer-motion";
import {CLinkButton} from "../Buttons";
import Image from "next/image";

const Header = styled(motion.div)`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  //padding: 0 0 0 8px;
  z-index: 5;
  opacity: 0.5;
  grid-area: Top / vLeft / hBottom / vRight;

  @media (max-width: 480px) {
    background-color: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(12px);
    display: flex;
    position: fixed;
    padding: 10px 10px 10px 14px;
    width: 100vw;
    //grid-template-columns: [Left] 12px [vLeft] 20px [vBodyLeft]  1fr [vBodyRight] 20px [vRight] 12px [Right];
    //grid-template-rows: [Top] 54px [hBottom] 16px [hContentDivider] auto [hCopyrightDivider] 54px [Bottom];
  }
`

export function SiteHeader(props) {

	return (
		<Header initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}}
		        transition={{type: "spring", bounce: 0.4, duration: 1.5}}>
			<HStack $alignItems={"center"}>

				{/*<SunIcon size={24}/>*/}

				<CLinkButton href="/"
				             $height={40}
				             $alignItems={"center"}
				             $justifyContent={"center"}
				             {...props}>

					<Image src={require("../../res/travelope_logo_eng_svg.svg")}
					       height={40}
					       width={180}
					       style={{
						       padding: 0,
						       margin: 0
					       }}
					/>
				</CLinkButton>
			</HStack>

			{/*<MobileMenu/>*/}
			{/*<HStack>*/}
			{/*	<CButton margin="2px 0 0 0" fontWeight={300} fontFamily="Noto Sans TC" width={80} fontSize={16} border="none" backgroundColor="transparent" onClick={props.info}>詳細資訊</CButton>*/}
			{/*</HStack>*/}
		</Header>
	)
}
