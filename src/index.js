import KleineGeste from './scripts/KleineGeste';

let demoPanel = document.querySelector('.panel');

new KleineGeste(demoPanel, {
	touchStart() {
		console.log('touchstart');
	},
	tap() {
		console.log('tap');
	},
	doubleTap() {
		console.log('doubleTap');
	}
});