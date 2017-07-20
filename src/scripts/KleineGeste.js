import Tools from './Tools';
import GestureAdmin from './GestureAdmin';

let handleWrap = (el, handler) => {
	let gestureAdmin = new GestureAdmin(el);
    
	gestureAdmin.add(handler);

	return gestureAdmin;
};

export default class KleineGeste{
	constructor(el, option) {
		this.ele = typeof el === 'string' ? document.querySelector(el) : el;
		this.option = option;

		this.t = {
			x: null,
			y: null
		};

		this.prevT = {
			x: null,
			y: null
		};

        // 记录touchstart和touchend时间
		this.startTime = null;
		this.endTime = null;

        // 初始状态
		this.scale = 1;
		this.rotate = 0;
		this.delta = null;
		this.pinchLen = null;
        // 是否双击
		this.isDoubleTap = false;

		this.bindEvents();
	}
    
	bindEvents() {
		let nullFunc = () => {};

		this.ele.addEventListener('touchstart', (e) => { this.start(e); }, false);
		this.ele.addEventListener('touchmove', (e) => { this.move(e); }, false);
		this.ele.addEventListener('touchend',(e) => { this.end(e); }, false);

		this.touchStart = handleWrap(this.ele, this.option.touchStart || nullFunc);
		this.tap = handleWrap(this.ele, this.option.tap || nullFunc);
		this.doubleTap = handleWrap(this.ele, this.option.doubleTap || nullFunc);
		this.swap = handleWrap(this.ele, this.option.swap || nullFunc);
		this.pinch = handleWrap(this.ele, this.option.pinch || nullFunc);
		this.spread = handleWrap(this.ele, this.option.spread || nullFunc);
	}
    
	start(e) {
		this.startTime = Date.now();
		this.touchStart.dispatch();
	}

	move(e) {

	}

	end(e) {
        
	}
}