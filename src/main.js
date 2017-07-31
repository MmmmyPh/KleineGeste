/**
 * 
 * 
 * @class KleineGeste
 */
import Tools from './scripts/Tools';
import GestureAdmin from './scripts/GestureAdmin';

let handleWrap = (el, handler) => {
	let gestureAdmin = new GestureAdmin(el);
    
	gestureAdmin.add(handler);

	return gestureAdmin;
};

// 工具对象
const tools = new Tools();

class KleineGeste{
	constructor(el, option) {
		this.ele = typeof el === 'string' ? document.querySelector(el) : el;
		this.option = option;

		// 保存上一次touchstart位置
		this.prevT = {
			x: null,
			y: null
		};
		// 保存touchstart位置
		this.t = {
			x: null,
			y: null
		};
		// 保存touchmove位置
		this.moveT = {
			x: null,
			y: null
		};
		// 双指接触时第二个手指位置
		this.secFingerT = {
			x: null,
			y: null
		};

		// 记录touchstart和touchend时间以及前次touchstart时间
		this.prevStartTime = null;
		this.startTime = null;
		this.endTime = null;

        // 缩放状态
		this.scaleBase = 1;
		this.startLen = null;
		this.moveLen = null;
		this.deltaLen = null;

		// 旋转状态
		this.rotateBase = 0;

        // 是否双击
		this.isDoubleTap = false;


		this.bindEvents();
	}
    
	bindEvents() {
		let nullFunc = () => {};

		this.touchStart = handleWrap(this.ele, this.option.touchStart || nullFunc);
		this.tap = handleWrap(this.ele, this.option.tap || nullFunc);
		this.doubleTap = handleWrap(this.ele, this.option.doubleTap || nullFunc);
		this.longTap = handleWrap(this.ele, this.option.longTap || nullFunc);
		this.moving = handleWrap(this.ele, this.option.moving || nullFunc);
		this.swipe = handleWrap(this.ele, this.option.swipe || nullFunc);
		this.scale = handleWrap(this.ele, this.option.scale || nullFunc);
		this.rotate = handleWrap(this.ele, this.option.rotate || nullFunc);

		this.ele.addEventListener('touchstart', (e) => { this.start(e); }, false);
		this.ele.addEventListener('touchmove', (e) => { this.move(e); }, false);
		this.ele.addEventListener('touchend',(e) => { this.end(e); }, false);
	}
    
	start(e) {
		e.preventDefault();
		
		this.t.x = e.touches[0].pageX;
		this.t.y = e.touches[0].pageY;

		if( e.touches.length > 1 ){
			// 多点触碰
			// 阻止longTapTimeout及tapTimeout
			clearTimeout( this.longTapTimeout );
			clearTimeout( this.tapTimeout );
			// 第二根手指位置
			this.prevT.x = e.touches[1].pageX;
			this.prevT.y = e.touches[1].pageY;

			this.startLen = tools.getDist(this.t, this.prevT);

			// 获取旋转使用的初始向量v1
			this.v1 = {
				x: this.prevT.x - this.t.x,
				y: this.prevT.y - this.t.y
			};

		}else{
			e.touchCenter = {
				x: this.t.x,
				y: this.t.y
			};

			this.touchStart.dispatch(e);
			this.startTime = Date.now();
			
			// 两次touchstart距离小于10px,间隔时间小于300ms, doubleTap触发条件更改
			if( this.prevT.x !== null ){
				if( tools.getMinusAbs( this.t.x, this.prevT.x ) < 10 &&
					tools.getMinusAbs( this.t.y, this.prevT.y ) < 10 &&
					Math.abs(this.startTime - this.prevStartTime ) < 200 ){
					this.isDoubleTap = true;
				}
			}

			this.prevT.x = this.t.x;
			this.prevT.y = this.t.y;
			
			this.prevStartTime = this.startTime;
			// 开始longtap定时
			this.longTapTimeout = setTimeout( () => {
				e.longTapCenter = {
					x: this.t.x,
					y: this.t.y
				};
				this.longTap.dispatch(e);
			}, 700);
		}
	}

	move(e) {
		e.preventDefault();
		
		this.moveT.x = e.touches[0].pageX;
		this.moveT.y = e.touches[0].pageY;

		// 双指事件
		if( e.touches.length > 1 ){
			this.secFingerT.x = e.touches[1].pageX;
			this.secFingerT.y = e.touches[1].pageY;

			this.moveLen = tools.getDist(this.moveT, this.secFingerT);

			// scale 
			e.scales = this.moveLen / this.startLen;
			this.scale.dispatch(e);

			// rotate
			this.v2 = {
				x: this.secFingerT.x - this.moveT.x,
				y: this.secFingerT.y - this.moveT.y
			};
			e.rotates = tools.getRotate(this.v1, this.v2);
			this.rotate.dispatch(e);
		}

		// 一旦产生移动,就阻止doubleTap
		if( tools.getDist(this.moveT, this.t) > 10 ) {
			clearTimeout(this.longTapTimeout);
		}
		// moving事件,swipe仅作为松手瞬间触发
		// 传出参数，事件e，e.direction方向，e.distance距离
		e.direction = tools.getDir(this.t, this.moveT);
		e.distance = {
			x: this.moveT.x - this.t.x,
			y: this.moveT.y - this.t.y
		};
		this.moving.dispatch(e);
	}

	end(e) {
		// 一旦touchend发生,也会阻止longtap定时
		clearTimeout(this.longTapTimeout);

		this.endTime = Date.now();
		if( this.moveT.x !== null && tools.getMinusAbs( this.moveT.x, this.t.x ) > 10 ||
			this.moveT.y !== null && tools.getMinusAbs( this.moveT.y, this.t.y ) > 10 ){
			// 触碰产生位移大于10px，非tap事件
			e.direction = tools.getDir(this.t, this.moveT);
			e.distance = {
				x: this.moveT.x - this.t.x,
				y: this.moveT.y - this.t.y
			};
			this.swipe.dispatch(e);
		}else{
			if( tools.getMinusAbs(this.endTime, this.startTime ) < 300 ){
				e.tapCenter = {
					x: this.t.x,
					y: this.t.y
				};
				this.doubleTapTimeout = setTimeout( () => {
					// 立即触发doubletap,并阻止tap
					if (this.isDoubleTap) {
						this.doubleTap.dispatch(e);
						clearTimeout(this.tapTimeout);
						this.isDoubleTap = false;
					}
				}, 0);

				if (!this.isDoubleTap){
					this.tapTimeout = setTimeout( () => {
						this.tap.dispatch(e);
					}, 200);
				}
			}
		}

		this.t.x = null;
		this.t.y = null;
		// 抹去moveT,防止在move后再次点击时出现问题
		this.moveT.x = null;
		this.moveT.y = null;
	}
}

if( typeof module !== 'undefined' && typeof exports === 'object' && define.cmd ){
	module.export = KleineGeste;
}else{
	window.KleineGeste = KleineGeste;
}

export default KleineGeste;