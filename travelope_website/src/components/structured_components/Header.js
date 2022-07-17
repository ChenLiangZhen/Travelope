import {HStack} from "../Layouts";
import {SunIcon} from "../Icons";
import styled from "styled-components";
import {motion} from "framer-motion";
import {CLinkButton} from "../Buttons";

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
			<HStack>
				<SunIcon size={24}/>
				<CLinkButton href="/" $color="black" $fontSize="20px" $fontFamily="Noto Sans TC" $fontWeight={300}
				             $letterSpacing="2px" $margin="0px 0 3px 4px"
				             {...props}>

				</CLinkButton>
			</HStack>

			{/*<MobileMenu/>*/}
			{/*<HStack>*/}
			{/*	<CButton margin="2px 0 0 0" fontWeight={300} fontFamily="Noto Sans TC" width={80} fontSize={16} border="none" backgroundColor="transparent" onClick={props.info}>詳細資訊</CButton>*/}
			{/*</HStack>*/}
		</Header>
	)
}
