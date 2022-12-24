import '../scss/main.scss';
import { loadBannerLists } from './banner-list';
import { loadProjects } from './projects';

/* Constants */
const BIRTH_DATE 			= new Date("2001-08-05");

/* Elements */
const age 		= document.querySelector("#age");

/**
 * Display current age in the age element
 */
const displayAge = () => {
	const actualDate = new Date();

	let currentAge = actualDate.getFullYear() - BIRTH_DATE.getFullYear();
	const monthDiff = actualDate.getMonth() - BIRTH_DATE.getMonth();

	if (monthDiff < 0 || monthDiff === 0 && actualDate.getDay() < BIRTH_DATE.getDay()) currentAge--;

	// Display age
	age.textContent = currentAge + ' ans';
}

/**
 * Define listener on the main arrow
 */
const loadArrowListener = () => {
	document.getElementById('navigation-arrow').addEventListener('click', (e) => {
		e.preventDefault();

		const courseSection = document.getElementById('course');
		const courseHeight = courseSection.clientHeight;
		
		window.scroll({
			top: courseHeight, 
			left: 0, 
			behavior: 'smooth' 
		});
	});
}

(() => {

	// compute age
	displayAge();

	// Assign event to arrow
	loadArrowListener();

	// Load banner lists
	loadBannerLists();

	// Load projects
	loadProjects();
})();