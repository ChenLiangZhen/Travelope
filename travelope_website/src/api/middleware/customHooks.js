import React, {useEffect, useState} from 'react';

export function useWindowSize() {

	const [size, setSize] = useState([0, 0]);

	useEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}

		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size
}

export function useJsMediaQuery() {

	let templateMedia = {
		phone: Boolean,
		tablet: Boolean,
		desktop: Boolean
	}

	const [media, setMedia] = useState(templateMedia)

	useEffect(() => {

			function updateMediaQuery() {

				templateMedia = {
					phone: window.matchMedia('(max-width: 480px)').matches,
					tablet: window.matchMedia('(min-width: 480px) and (max-width: 768px)').matches,
					desktop: window.matchMedia('(min-width: 768px)').matches
				}

				setMedia(templateMedia)
			}

			window.matchMedia('(max-width: 480px)').addEventListener('change', updateMediaQuery);
			window.matchMedia('(min-width: 480px) and (max-width: 768px)').addEventListener('change', updateMediaQuery);
			window.matchMedia('(min-width: 768px)').addEventListener('change', updateMediaQuery);

			updateMediaQuery();

			return () => {
				window.matchMedia('(max-width: 480px)').removeEventListener('change', updateMediaQuery);
				window.matchMedia('(min-width: 480px) and (max-width: 768px)').removeEventListener('change', updateMediaQuery);
				window.matchMedia('(min-width: 768px)').removeEventListener('change', updateMediaQuery);
			}
		}, []
	)
	;

	console.log(media.phone)
	return media
}
