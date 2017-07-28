/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class KleineGeste
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */


var _Tools = __webpack_require__(1);

var _Tools2 = _interopRequireDefault(_Tools);

var _GestureAdmin = __webpack_require__(2);

var _GestureAdmin2 = _interopRequireDefault(_GestureAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var handleWrap = function handleWrap(el, handler) {
	var gestureAdmin = new _GestureAdmin2.default(el);

	gestureAdmin.add(handler);

	return gestureAdmin;
};

// 工具对象
var tools = new _Tools2.default();

var KleineGeste = function () {
	function KleineGeste(el, option) {
		_classCallCheck(this, KleineGeste);

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

	_createClass(KleineGeste, [{
		key: 'bindEvents',
		value: function bindEvents() {
			var _this = this;

			var nullFunc = function nullFunc() {};

			this.touchStart = handleWrap(this.ele, this.option.touchStart || nullFunc);
			this.tap = handleWrap(this.ele, this.option.tap || nullFunc);
			this.doubleTap = handleWrap(this.ele, this.option.doubleTap || nullFunc);
			this.longTap = handleWrap(this.ele, this.option.longTap || nullFunc);
			this.moving = handleWrap(this.ele, this.option.moving || nullFunc);
			this.swipe = handleWrap(this.ele, this.option.swipe || nullFunc);
			this.scale = handleWrap(this.ele, this.option.scale || nullFunc);
			this.rotate = handleWrap(this.ele, this.option.rotate || nullFunc);

			this.ele.addEventListener('touchstart', function (e) {
				_this.start(e);
			}, false);
			this.ele.addEventListener('touchmove', function (e) {
				_this.move(e);
			}, false);
			this.ele.addEventListener('touchend', function (e) {
				_this.end(e);
			}, false);
		}
	}, {
		key: 'start',
		value: function start(e) {
			var _this2 = this;

			e.preventDefault();

			this.t.x = e.touches[0].pageX;
			this.t.y = e.touches[0].pageY;

			if (e.touches.length > 1) {
				// 多点触碰
				// 阻止longTapTimeout及tapTimeout
				clearTimeout(this.longTapTimeout);
				clearTimeout(this.tapTimeout);
				// 第二根手指位置
				this.prevT.x = e.touches[1].pageX;
				this.prevT.y = e.touches[1].pageY;

				this.startLen = tools.getDist(this.t, this.prevT);

				// 获取旋转使用的初始向量v1
				this.v1 = {
					x: this.prevT.x - this.t.x,
					y: this.prevT.y - this.t.y
				};
			} else {
				this.touchStart.dispatch(e);
				this.startTime = Date.now();

				// 两次touchstart距离小于10px,间隔时间小于300ms, doubleTap触发条件更改
				if (this.prevT.x !== null) {
					if (tools.getMinusAbs(this.t.x, this.prevT.x) < 10 && tools.getMinusAbs(this.t.y, this.prevT.y) < 10 && Math.abs(this.startTime - this.prevStartTime) < 200) {
						this.isDoubleTap = true;
					}
				}

				this.prevT.x = this.t.x;
				this.prevT.y = this.t.y;

				this.prevStartTime = this.startTime;
				// 开始longtap定时
				this.longTapTimeout = setTimeout(function () {
					_this2.longTap.dispatch(e);
				}, 700);
			}
		}
	}, {
		key: 'move',
		value: function move(e) {
			e.preventDefault();

			this.moveT.x = e.touches[0].pageX;
			this.moveT.y = e.touches[0].pageY;

			// 双指事件
			if (e.touches.length > 1) {
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
			if (tools.getDist(this.moveT, this.t) > 10) {
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
	}, {
		key: 'end',
		value: function end(e) {
			var _this3 = this;

			// 一旦touchend发生,也会阻止longtap定时
			clearTimeout(this.longTapTimeout);

			this.endTime = Date.now();
			if (this.moveT.x !== null && tools.getMinusAbs(this.moveT.x, this.t.x) > 10 || this.moveT.y !== null && tools.getMinusAbs(this.moveT.y, this.t.y) > 10) {
				// 触碰产生位移大于10px，非tap事件
				e.direction = tools.getDir(this.t, this.moveT);
				e.distance = {
					x: this.moveT.x - this.t.x,
					y: this.moveT.y - this.t.y
				};
				this.swipe.dispatch(e);
			} else {
				if (tools.getMinusAbs(this.endTime, this.startTime) < 300) {
					e.tapCenter = {
						x: this.t.x,
						y: this.t.y
					};
					this.doubleTapTimeout = setTimeout(function () {
						// 立即触发doubletap,并阻止tap
						if (_this3.isDoubleTap) {
							_this3.doubleTap.dispatch(e);
							clearTimeout(_this3.tapTimeout);
							_this3.isDoubleTap = false;
						}
					}, 0);

					if (!this.isDoubleTap) {
						this.tapTimeout = setTimeout(function () {
							_this3.tap.dispatch(e);
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
	}]);

	return KleineGeste;
}();

exports.default = KleineGeste;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 工具函数类
 * 
 * @export
 * @class Tools
 */
var Tools = function () {
	function Tools() {
		_classCallCheck(this, Tools);
	}

	_createClass(Tools, [{
		key: 'getDist',

		/**
   * 返回两点之间的距离
   * 
   * @param {Object} prevT 
   * @param {Object} t 
   * @returns {Number}
   * @memberof Tools
   */
		value: function getDist(t1, t2) {
			var deltaX = t2.x - t1.x,
			    deltaY = t2.y - t1.y;

			return Math.hypot(deltaX, deltaY);
		}

		/**
   * 返回两数差的绝对值
   * 
   * @param {Number} x 
   * @param {Number} y 
   * @returns 
   * @memberof Tools
   */

	}, {
		key: 'getMinusAbs',
		value: function getMinusAbs(x, y) {
			return Math.abs(x - y);
		}

		/**
   * 返回滑动方向
   * 
   * @param {Object} t1 
   * @param {Object} t2 
   * @memberof Tools
   */

	}, {
		key: 'getDir',
		value: function getDir(t1, t2) {
			var deltaX = t2.x - t1.x;
			var deltaY = t2.y - t1.y;

			// 暂时用这种方式计算方向,仍有优化空间,积分?
			return Math.abs(deltaX) > Math.abs(deltaY) ? deltaX > 0 ? 'right' : 'left' : deltaY > 0 ? 'down' : 'up';
		}

		/**
   * 取得两个手势方向向量的内积
   * 
   * 选定用内积的方式，是因为，利用内积计算cos(Theta)<0为大于90°，否则用外积无法得到是否大于90°，或方法也许过于复杂
   * 
   * @param {Object} v1 
   * @param {Object} v2 
   * @memberof Tools
   */

	}, {
		key: 'getDotProduct',
		value: function getDotProduct(v1, v2) {
			return v1.x * v2.x + v1.y * v2.y;
		}

		/**
   * 取得两个手势方向向量的外
   * 
   * 外积可以用来判断旋转方向
   * 
   * @param {Object} v1 
   * @param {Object} v2 
   * @memberof Tools
   */

	}, {
		key: 'getCrossProduct',
		value: function getCrossProduct(v1, v2) {
			return v1.x * v2.y - v1.y * v2.x;
		}

		/**
   * 获取旋转的角度，带方向
   * 
   * 传入V1，V2为向量
   * 
   * @param {Object} v1 
   * @param {Object} v2 
   * @memberof Tools
   */

	}, {
		key: 'getRotate',
		value: function getRotate(v1, v2) {
			var vLenMultiply = void 0,
			    vInnerProd = void 0,
			    vCrossProd = void 0,
			    vDir = void 0,
			    vCos = void 0,
			    vTheta = void 0;

			vLenMultiply = Math.hypot(v1.x, v1.y) * Math.hypot(v2.x, v2.y);
			vInnerProd = this.getDotProduct(v1, v2);
			vCrossProd = this.getCrossProduct(v1, v2);
			vCos = vInnerProd / vLenMultiply;

			if (vLenMultiply === 0) {
				return 0;
			}

			// 在做缩放时，不进行旋转。将rotate和scale隔离
			if (vCos > 1) {
				vCos = 1;
			}

			if (vCos < -1) {
				vCos = -1;
			}

			vDir = vCrossProd < 0 ? -1 : 1;
			vTheta = vDir * Math.acos(vCos) * 180 / Math.PI;

			return vTheta;
		}
	}]);

	return Tools;
}();

exports.default = Tools;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 手势动作函数的添加，删除，触发
 * 
 * @export
 * @class GestureAdmin
 */
var GestureAdmin = function () {
	function GestureAdmin(el) {
		_classCallCheck(this, GestureAdmin);

		this.el = el;
		this.gHandlers = [];
	}

	_createClass(GestureAdmin, [{
		key: 'add',
		value: function add(gHandler) {
			this.gHandlers.push(gHandler);
		}

		// 删除指定手势的指定动作

	}, {
		key: 'delete',
		value: function _delete(gHandler) {
			// 传空参数，清空当前手势中所有动作函数
			if (!gHandler) {
				this.gHandlers = [];
			}

			this.gHandlers.forEach(function (handler, index, gArr) {
				if (gHandler === handler) {
					gArr.splice(index, 1);
				}
			});
		}

		// 触发指定手势的所有动作函数

	}, {
		key: 'dispatch',
		value: function dispatch() {
			var _this = this;

			for (var _len = arguments.length, handlers = Array(_len), _key = 0; _key < _len; _key++) {
				handlers[_key] = arguments[_key];
			}

			this.gHandlers.forEach(function (handlerItem) {
				var gHandler = handlerItem;

				if (typeof gHandler === 'function') {
					gHandler.apply(_this.el, handlers);
				}
			});
		}
	}]);

	return GestureAdmin;
}();

exports.default = GestureAdmin;

/***/ })
/******/ ]);