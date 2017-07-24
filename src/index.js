import KleineGeste from './scripts/KleineGeste';

let demoPanel = document.querySelector('.inner');

new KleineGeste(demoPanel, {
	// touchStart() {
	// 	this.innerHTML = '';
	// 	this.innerHTML += 'touchstart</br>';
	// },
	// tap(e) {
	// 	this.innerHTML += 'tap</br>';
	// },
	// doubleTap(e) {
	// 	this.innerHTML += 'doubleTap</br>';
	// },
	// longTap(e) {
	// 	this.innerHTML += 'longTap</br>';
	// },
	// moving(e) {
	// 	this.style.transform = 'translate3d(' +e.distance.x+ 'px, ' +e.distance.y+ 'px, 0)';
	// },
	// swipe(e) {
	// 	console.log('swipe ' + e.direction);
	// },
	scale(e) {
		// this.innerHTML += e.scaleBase + '</br>';
		this.style.transform = 'scale(' + e.scaleBase + ')';
	}
});