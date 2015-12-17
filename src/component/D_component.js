/**********************
 *  D_component.js
 *  组件工厂类
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var D_component = D_component || {};

// 通用悬浮框
D_component.tipMsgManager = function(msg) {
    var _msg = msg || "无提示";
    TipManager.floatTip(TipType.FT_TXT, _msg);
}