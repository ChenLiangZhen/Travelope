import styled from "styled-components"
import Link from "next/link"
import {motion} from "framer-motion";

export const BaseButton = styled(motion.button).attrs(props => ({}))`

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

const CLinkButton_ = styled.a.attrs(props => ({
	href: props.href,
}))`
  
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

export function CLinkButton(props) {

	return (
		<Link href={props.href} passHref>
			<CLinkButton_ {...props}>{props.children}</CLinkButton_>
		</Link>
	)

}
