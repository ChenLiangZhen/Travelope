import styled from "styled-components"
import {motion} from "framer-motion";

export const BasicInput = styled(motion.input).attrs(props => ({
	type: 'text',
	text: props.text,
}))`
  border-radius: 3px;
  border: 1px solid palevioletred;
  display: block;
  margin: 0 0 1em;
  padding: ${props => props.padding};
  
  ::placeholder {
    color: palevioletred;
  }
`