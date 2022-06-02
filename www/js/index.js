import { loadProjects } from './projects';
import '../scss/style.scss';

/* Constants */
const BIRTH_DATE 			= new Date("2001-08-05");
const LP_START_DATE 		= new Date("2021-09-13");
const LP_END_DATE			= new Date("2022-09-16");

/* Elements */
const body 		= document.querySelector("body");
const age 		= document.querySelector("#age");
const man		= document.querySelector("#running-man");
const manSpan	= man.querySelector("span");

/**
 * Compute the difference in days between 2 dates
 * @param {Date} date1 The most recent date
 * @param {Date} date2 The oldest date
 */
const getDayDifference = (date1, date2) => {

	if (date1.getTime() < date2.getTime()) throw Error("Date 1 must be more recent than date2")

	const timeDifference = date1.getTime() - date2.getTime();
	return Math.ceil(timeDifference / (1000 * 3600 * 24));
}
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

		const studiesSection = document.getElementById('studies');
		const studiesHeight = studiesSection.clientHeight;
		
		window.scroll({
			top: studiesHeight, 
			left: 0, 
			behavior: 'smooth' 
		});
	});
}

/**
 * Function which permit to create an intersection observer with a specific callback
 * @param {function} callback Function called when intersect is fired
 * @returns The IntersectionObserver
 */
const createIntersectionObserver = (callback) => {
		return new IntersectionObserver(function(entries) {
			if(entries[0].isIntersecting === true) {
				callback();
			}
		}, { threshold: [1] });
}
(() => {

	// compute age
	displayAge();

	// Load project section
	loadProjects();

	// Assign event to arrow
	loadArrowListener();

	// Load footer year
	document.getElementById('currentYear').textContent = new Date().getFullYear();

	// Assign observer to man
	createIntersectionObserver(() => {
		setTimeout(() => {
			const formationDuration = getDayDifference(LP_END_DATE, LP_START_DATE);
			const realizedDays = getDayDifference(new Date(), LP_START_DATE);

			const rateDone = realizedDays / formationDuration;

			const barWidth = document.getElementsByClassName("black-line")[0].clientWidth;

			man.style.transform = "translate(" + barWidth * rateDone + "px, -100%)";
			// Wait end of transformation
			setTimeout(() => {
				const percentageDone = Math.ceil(rateDone * 100);
				manSpan.textContent = percentageDone + "%";
				manSpan.title = percentageDone + "% de la formation réalisée";
				manSpan.style.visibility = "visible";
			}, 2000);
		}, 500);
	}).observe(man);


	for (const element of document.querySelectorAll('h1, h2, h3, img, ul, a, p, span')) {
		createIntersectionObserver(() => {
			setTimeout(() => {
				element.classList.add('show')
			}, 100);
		}).observe(element);
	}
})();