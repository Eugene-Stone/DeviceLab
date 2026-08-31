'use client';
import { useState, useEffect } from 'react';

export const scrollToTop = () => {
	window.scrollTo({
		top: 0,
		behavior: 'smooth', // Smooth scrolling behavior
	});
};

const ButtonScrollTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	const toggleVisibility = () => {
		if (window.pageYOffset > 300) {
			// Show button after scrolling 300px
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	return (
		<button onClick={scrollToTop} className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
			&uarr;
		</button>
	);
};

export default ButtonScrollTop;
