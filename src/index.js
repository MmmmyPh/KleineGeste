import KleineGeste from './scripts/KleineGeste';

let demoPanel = document.querySelector('.inner');

new KleineGeste(demoPanel, {
	touchStart() {
		this.innerHTML = '';
		this.innerHTML += 'touchstart</br>';
	},
	tap(e) {
		this.innerHTML += 'tap</br>';
	},
	doubleTap(e) {
		this.innerHTML += 'doubleTap</br>';
	},
	longTap(e) {
		this.innerHTML += 'longTap</br>';
	},
	moving(e) {
		this.style.transform = 'translate3d(' +e.distance.x+ 'px, ' +e.distance.y+ 'px, 0)';
	},
	swipe(e) {
	},
	scale(e) {
		this.style.transform = 'scale(' + e.scales + ')';
	},
	rotate(e) {
		this.style.transform = 'rotate(' + e.rotates + 'deg)';
	}
});