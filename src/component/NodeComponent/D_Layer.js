/**********************
 *  D_Layer.js
 *  层级通用类
 *  可以设置层级通用功能
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var D_Layer = cc.Layer.extend({

    _LayerName : null,
    _isListener : false, // 初始化的时候关掉触摸监听
    _touchEnable : true, // 存在监听的情况下关闭触摸

    _D_isSeleted : false,

    _bg : null,

    ctor:function() {
        this._super();
    },

    onEnter:function() {
        this._super();

        // D_log.tip(this._LayerName + " Layer IN" + this._isListener);

        if (this._isListener)
            this.initListener();
    },

    onExit:function() {
        this._super();

        // D_log.tip(this._LayerName + " Layer EXIT");

        cc.eventManager.removeListeners(this);
    },

    removeThis:function() {
        if (!this._touchEnable) 
            return false;

        if (this._bg) {
            this.backAction();
            return ;
        };

        this.removeFromParent();
    },

    backAction:function() {
        this.removeFromParent();
    },

    greyLayer:function() {
        this.greyLayer = new cc.LayerColor(cc.color(0, 0, 0, 100));
        this.addChild(this.greyLayer);
    },

    setTouch:function(b) {
        var _b = b || false;
        this._touchEnable = _b;  
    },

    initListener:function() {
        var _listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(_listener, this);
    },

    onTouchBegan:function(touch, event)
    {
        // cc.log(this._LayerName + "D_Layer onTouchBegan");

        this._D_isSeleted = true;
        return true;
    },

    onTouchMoved:function(touch, event) 
    {
        // cc.log(this._LayerName + "D_Layer onTouchMoved");

        return true;
    },

    onTouchEnded:function(touch, event) 
    {
        // cc.log(this._LayerName + "D_Layer onTouchEnded");

        if (this._D_isSeleted) {
            this._D_isSeleted = false;
            this.removeThis();
        };
        return true;
    }
});