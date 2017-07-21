import KleineGeste from './scripts/KleineGeste';

let demoPanel = document.querySelector('.inner');

new KleineGeste(demoPanel, {
	// touchStart() {
	// 	console.log('touchstart');
	// },
	tap() {
		console.log('tap ' + Date.now());
	},
	doubleTap() {
		console.log('doubleTap ' + Date.now());
	},
	longTap() {
		console.log('longTap');
	},
	moving(e){
		console.log('moving ' + e.direction);
	},
	// swipe(e){
	// 	console.log('swipe ' + e.direction);
	// }
});