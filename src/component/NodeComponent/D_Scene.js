/**********************
 *  D_Scene.js
 *  层级通用类
 *  可以设置层级通用功能
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var D_Scene = cc.Scene.extend({
    _SceneName : null,

    ctor:function() {
        this._super();

    },

    onEnter:function() {
        this._super();

        // D_log.tip(this._SceneName + " Scene IN");
    },

    onExit:function() {
        this._super();
        // D_log.tip(this._SceneName + " Scene EXIT");
        cc.eventManager.removeListeners(this);
    }
});