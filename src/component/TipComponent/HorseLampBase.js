/**
 * 走马灯 基类
 * author wxy
 */
var HorseLampBase = cc.Node.extend({
	ctor:function()
	{
		this._super();
	},

	onExit:function() {
		this._super();

		TipManager.horseIsRunning = false;
		TipManager.horseList.shift();
        setTimeout(TipManager.horseLampTxt, 2000);
	}
})

HorseLampBase.prototype.content = null; //走马灯的内容
HorseLampBase.prototype.speed = 20;	  //走马灯的速度(系数)
HorseLampBase.prototype.loopTimes = 1;//走马灯循环次数
HorseLampBase.prototype.currentRollTimes = 0; //当前已经滚动的次数

HorseLampBase.prototype.run = function()
{
	
};

HorseLampBase.prototype.destory = function()
{
	this.getParent().removeChild(this);
};