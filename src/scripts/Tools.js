/**
 * 工具函数类
 * 
 * @export
 * @class Tools
 */
export default class Tools{
	/**
     * 计算两点之间的距离
     * 
     * @param {Object} prevT 
     * @param {Object} t 
     * @returns {Number}
     * @memberof Tools
     */
    getDist(prevT, t) {
		let deltaX = t.x - prevT.x,
            deltaY = t.y - prevT.y;
        
        return Math.sqrt(deltaX ** 2 + deltaY ** 2);
	}
}