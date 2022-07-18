import {Body} from "../Layouts";
import MobileMenu from "./MobileMenu";

export function SiteBody({children}) {

	return (
		<Body>

			<MobileMenu/>

			{children}

		</Body>
	)
}
