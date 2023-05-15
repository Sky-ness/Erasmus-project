import View from './View.js';

export default class NavigationView extends View {
	constructor(element) {
		super(element);
		this.region = this.element.querySelectorAll('.nav-item a');

		// this.window.addEventListener('scroll', function () {
		// 	const offset = this.window.pageYOffset;
		// 	if (offset > 160) this.element.classList.add('scroll');
		// 	else this.element.classList.remove('scroll');
		// });
	}
}
