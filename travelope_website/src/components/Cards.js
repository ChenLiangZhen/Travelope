import React from "react";
import styled from "styled-components"
import {motion} from "framer-motion";
import {useJsMediaQuery} from "../api/middleware/customHooks";

export const BaseCard = styled(motion.div)`
  
  display: ${props => props.$display};
  flex-direction: ${props => props.$flexDirection};
  justify-content: ${props => props.$justifyContent};
  align-items: ${props => props.$alignItems};

  position: ${props => props.$position};

  height: ${props => props.$height};
  width: ${props => props.$width};

  margin: ${props => props.$margin};
  padding: ${props => props.$padding};
  border: ${props => props.$border};
  border-radius: ${props => props.$borderRadius};
  outline: ${props => props.$outline};

  color: ${props => props.$color};
  background-color: ${props => props.$backgroundColor};

  font-size: ${props => props.$fontSize};
  font-family: ${props => props.$fontFamily};
  font-weight: ${props => props.$fontWeight};

  letter-spacing: ${props => props.$letterSpacing};
  line-height: ${props => props.$lineHeight};
  text-decoration: ${props => props.$textDecoration};

  box-shadow: ${props => props.$boxShadow};
  opacity: ${props => props.$opacity};

  transform: ${props => props.$transform};
  z-index: ${props => props.$zIndex};

  left: ${props => props.$left};
  right: ${props => props.$right};
  top: ${props => props.$top};
  bottom: ${props => props.$bottom};

  :hover {
    cursor: ${props => props.$hoverCursor};
    background-color: ${props => props.$hoverColor};
  }
`

export function HCard({children}) {

	const media = useJsMediaQuery();

	return (
		<>
			{media.phone ?
				<BaseCard
					initial={{x: "-50%", y: 100, opacity: 0}} transition={{initial: {delay: 2}}}
					animate={{x: "-50%", y: 0, opacity: 1, duration: 4,}} exit={{x: "-50%", y: 100, opacity: 0}}

					$display="flex" $boxShadow="0 0 8px lightgray" $borderRadius="12px" $position="fixed" $zIndex={1}
					$left="50%" $bottom="60px" $backgroundColor="white"
					$width="90vw" $height="auto" $padding="12px"
				>
					{children}
				</BaseCard>
				: <BaseCard
					initial={{x: "-50%", y: 100, opacity: 0}} transition={{initial: {delay: 2}}}
					animate={{x: "-50%", y: 0, opacity: 1, duration: 4,}} exit={{x: "-50%", y: 100, opacity: 0}}

					$display="flex" $boxShadow="0 0 8px lightgray" $borderRadius="12px" $position="fixed" $zIndex={1}
					$left="50%" $bottom="60px" $backgroundColor="white"
					$width="400px" $height="auto" $padding="18px"
				>
					{children}
				</BaseCard>}
		</>
	)
}

export function VCard() {
	return (
		<BaseCard>

		</BaseCard>
	)

}

