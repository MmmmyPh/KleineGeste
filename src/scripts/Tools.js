/**
 * 工具函数类
 * 
 * @export
 * @class Tools
 */
export default class Tools{
	/**
	 * 返回两点之间的距离
	 * 
	 * @param {Object} prevT 
	 * @param {Object} t 
	 * @returns {Number}
	 * @memberof Tools
	 */
	getDist(t1, t2) {
		let deltaX = t2.x - t1.x,
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
	getMinusAbs(x, y) {
		return Math.abs( x -y );
	}

	/**
	 * 返回滑动方向
	 * 
	 * @param {Object} t1 
	 * @param {Object} t2 
	 * @memberof Tools
	 */
	getDir(t1, t2) {
		let deltaX = t2.x - t1.x;
		let deltaY = t2.y - t1.y;

		// 暂时用这种方式计算方向,仍有优化空间,积分?
		return Math.abs(deltaX) > Math.abs(deltaY) ?
				(deltaX > 0 ? 'right' : 'left' ) :
				(deltaY > 0 ? 'down' : 'up');
	}

	/**
	 * 取得两个手势方向向量的向量积
	 * 
	 * @param {Object} v1 
	 * @param {Object} v2 
	 * @memberof Tools
	 */
	getCross(v1, v2){
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
	getRotate(v1, v2){
		let v1Len, v2Len, vCross, vSquare;

		vCross = this.getCross(v1, v2);
	}
}