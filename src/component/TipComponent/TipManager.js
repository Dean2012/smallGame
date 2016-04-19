/**********************
 *  TipManager.js
 *  悬浮提示框管理模块
 *  文本提示：TipManager.floatTip(TipType.FT_TXT,'提示文本');
 *  
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/
var TipManager = TipManager || {};

TipManager.MessageQueue = [];
TipManager.isRunning = false;
TipManager.tipLayer = null;

TipManager.floatTip = function (dataType, value)
{
    if (TipManager.tipLayer == null) {
        var currentScene = cc.director.getRunningScene();
        TipManager.tipLayer = new FloatTipLayer();
        currentScene.addChild(TipManager.tipLayer, 1000);
    };

    var tempList = [];
	tempList["type"] = dataType;
	tempList["value"] = value;
    TipManager.MessageQueue.push(tempList);

    TipManager.showTipSameTime();
};

TipManager.showTipSameTime = function () 
{
    if (TipManager.MessageQueue.length == 0 || TipManager.isRunning || TipManager.tipLayer == null)
        return ;
    else
        setTimeout(TipManager.showTipSameTime, 1000);

    TipManager.isRunning = true;

    var type = TipManager.MessageQueue[0]["type"];
    var value = TipManager.MessageQueue[0]["value"];

    TipManager.checkType(type, value);

    TipManager.MessageQueue.shift();
};

TipManager.checkType = function(type, value) 
{
    if (type == TipType.FT_TXT) {
        var temptip = new FloatTip({"strMsg":value});
        TipManager.tipLayer.addChild(temptip);
        return ;
    }
};

// ******************跑马灯*************************** 
TipManager.horseList = [];
TipManager.horseIsRunning = false;

// 手动输入格式 
// TipManager.horseManager({'tp':HORSE_TYPE_SYSTEM}); tp类型
TipManager.horseManager = function(arg)
{
    var type = arg.id;
    if (type == null)
        return ;

    // 系统公告往前插入
    if (type == HORSE_TYPE_SYSTEM)
        TipManager.horseList.unshift(arg);
    else
        TipManager.horseList.push(arg);

    TipManager.horseLampTxt();
}

TipManager.horseLampTxt = function() 
{
    if (TipManager.horseIsRunning || TipManager.horseList.length == 0)
        return ;

    var currentScene = cc.director.getRunningScene();
    var content = TipManager.horseList[0];

    var currentSceneName = currentScene.getName();

    if (!content || !currentScene) {
        TipManager.horseIsRunning = false;
        TipManager.horseList.shift();
        setTimeout(TipManager.horseLampTxt, 2500);
        return;
    };

    // var playTimeList = [1,1,4,1,4,1,2,2,1,1,1,2,2,3,3];
    // var playTime = content.tp && content.tp < playTimeList.length ? playTimeList[content.tp] : 1;

    var lamp = new HorseLampTxt(content, 1);
    lamp.x = (cc.winSize.width - lamp.getClipperWidth())/2;
    lamp.y = cc.winSize.height - 30;
    currentScene.addChild(lamp, 10000);
}
// ********************************************* 


var FloatTipLayer = cc.Layer.extend({
    ctor:function()
    {
        this._super();
    },

    onExit:function()
    {
        this._super();
        TipManager.tipLayer = null;
        TipManager.isRunning = false;
        TipManager.MessageQueue = [];
    }
});