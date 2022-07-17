import styled from "styled-components";
import {motion} from "framer-motion";
import {BsSun} from "react-icons/bs"
import {CgFileDocument} from "react-icons/cg"

export const Sun = styled(motion.div)`
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  //filter: drop-shadow(0 0 0.06rem black);

`
const Policy = styled(motion.div)`
  //margin-top: 2px;
  //margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`

export function SunIcon({size}) {
	return (
		<Sun animate={{rotate: 360}} transition={{ease: "linear", duration: 6, repeat: Infinity}}><BsSun size={size}
		                                                                                                 color="#000"/></Sun>
	)
}

export function PolicyIcon({size}) {
	return (
		<Policy initial={{opacity: 0.4}} animate={{opacity: 1}}
		        transition={{ease: "linear", duration: 1, repeat: Infinity}}><CgFileDocument size={size}
		                                                                                     color="#222"/></Policy>
	)
}
