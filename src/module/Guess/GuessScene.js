/**********************
 *  GuessScene.js
 *  猜猜看游戏主场景
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GuessScene = D_Scene.extend({
    _dataLayer : null,
    _logicLayer : null,

    ctor:function() {
        this._super();

        this._SceneName = "GuessScene";
    },

    onEnter:function() {
        this._super();

        if (this._dataLayer)
            this._dataLayer.removeFromParent(true);

        if (this._logicLayer)
            this._logicLayer.removeFromParent(true);

        this._dataLayer = new GDataLayer();
        this.addChild(this._dataLayer, 10, 1);

        this._logicLayer = new GLogicLayer();
        this.addChild(this._logicLayer, 10, 2);
    },

    start:function() {
        if (!this._dataLayer)
            return;

        this._dataLayer.start();
    },

    end:function(s) {
    //    游戏结束统计分数
        if (this._logicLayer)
            this._logicLayer.removeFromParent(true);

        var layer = new GResultLayer(s);
        this.addChild(layer, 15, 3);
    },

    onExit:function() {
        this._super();

    }

});