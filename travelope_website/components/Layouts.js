import styled from "styled-components"
import {motion} from "framer-motion";

export const BaseWeb = styled.div`
  background-color: white;
`

export const BaseGrid = styled.div`

  display: grid;
  grid-template-columns: [Left] 15% [vLeft] 26px [vBodyLeft]  1fr [vBodyRight] 26px [vRight] 15% [Right];
  grid-template-rows: [Top] 72px [hBottom] 32px [hContentDivider] auto [hCopyrightDivider] 60px  [Bottom];
  min-height: 100vh;
  width: 100vw;

  @media (max-width: 480px) {
    grid-template-columns: [Left] 12px [vLeft] 20px [vBodyLeft]  1fr [vBodyRight] 20px [vRight] 12px [Right];
    grid-template-rows: [Top] 54px [hBottom] 16px [hContentDivider] auto [hCopyrightDivider] 54px [Bottom];
  }

  @media (min-width: 480px) and (max-width: 960px) {
    grid-template-columns: [Left] 7.5% [vLeft] 26px [vBodyLeft]  1fr [vBodyRight] 26px [vRight] 7.5% [Right];
    grid-template-rows: [Top] 64px [hBottom] 32px [hContentDivider] auto [hCopyrightDivider] 24px  [Bottom];

  }
`

export const Body = styled(motion.div).attrs(props => ({}))`
  //&:before {
  //  content: '';
  //  position: absolute;
  //  width: 100%;
  //  height: 100%;
  //  background-color: rgba(255, 255, 255, 0.75);
  //  backdrop-filter: blur(4px);
  //  -webkit-backdrop-filter: blur(4px);
  //}
  grid-area: hContentDivider / vBodyLeft / Bottom / vBodyRight
`

export const HStack = styled(motion.div)`

  grid-area: ${props => props.$gridArea};

    //display: ${props => props.$display};
    // flex-direction: ${props => props.$flexDirection};

  display: flex;
  flex-direction: row;
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


export const VStack = styled(motion.div).attrs(props => ({}))`

  grid-area: ${props => props.$gridArea};

    //display: ${props => props.$display};
    // flex-direction: ${props => props.$flexDirection};
  display: flex;
  flex-direction: column;
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
