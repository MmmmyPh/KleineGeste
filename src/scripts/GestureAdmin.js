/**
 * 手势动作函数的添加，删除，触发
 * 
 * @export
 * @class GestureAdmin
 */
export default class GestureAdmin {
	constructor(el) {
		this.el = el;
		this.gHandlers = [];
	}
    
	add(gHandler) {
		this.gHandlers.push(gHandler);
	}
    
    // 删除指定手势的指定动作
	delete(gHandler) {
        // 传空参数，清空当前手势中所有动作函数
		if( !gHandler ){
			this.gHandlers = [];
		}
        
		this.gHandlers.forEach( (handler, index, gArr) => {
			if( gHandler === handler ) {
				gArr.splice(index, 1);
			}
		} );
	}
    
    // 触发指定手势的所有动作函数
	dispatch(...handlers) {
		this.gHandlers.forEach( (handlerItem) => {
			let gHandler = handlerItem;

			if( typeof gHandler === 'function' ){
				gHandler.apply( this.el, handlers );
			}
		} );
	}
}