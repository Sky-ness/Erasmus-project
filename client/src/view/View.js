export default class View {
	element;
	constructor(element) {
		this.element = document.querySelector(element);
	}
	show() {
		this.element.style.display = 'block';
	}
	hide() {
		this.element.style.display = 'none';
	}
}
