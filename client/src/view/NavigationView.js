import View from './View.js';

export default class NavigationView extends View {
	constructor(element) {
		super(element);

		window.addEventListener('scroll', () => {
			const offset = window.pageYOffset;
			if (offset > 160) this.element.classList.add('scroll');
			else this.element.classList.remove('scroll');
		});
	}
}
