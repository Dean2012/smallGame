/**********************
 *  PopLayer.js
 *  层级通用类
 *  可以设置层级通用功能
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var PopLayer = D_Layer.extend({

    ctor:function() {
        this._super();

        this._isListener = true;
    },

    onEnter:function() {
        this._super();

        // 弹窗效果
        this.popAction();

        this.initBgListener();
    },

    popAction:function() {
        if (!this._bg)
            return ;

        this._bg.setScale(0.8);
        this._touchEnable = false;

        var action = cc.ScaleTo(0.1, 1.0);//.easing(cc.easeBackOut());
        var spawn = cc.spawn(cc.ScaleTo(0.1, 1.0), cc.fadeIn(0.1));
        var cb = cc.callFunc(this.setTouch.bind(this), this, true);
        this._bg.runAction(cc.sequence(spawn,cb));
    },

    backAction:function() {
        if (!this._bg)
            return ;

        this._touchEnable = false;

        // var action = cc.ScaleTo(0.2, 0.1).easing(cc.easeBackIn());
        var spawn = cc.spawn(cc.ScaleTo(0.1, 0.8), cc.fadeOut(0.1));
        var cb = cc.callFunc(this.dremove.bind(this), this);
        this._bg.runAction(cc.sequence(spawn,cb));
    },

    dremove:function() {
        this.removeFromParent();
    },

    initCloseBtn:function() {
        if (!this._bg) 
            return ;

        var _listener = EventComponent.registerCustomEvent("back"+this._LayerName,this.removeThis.bind(this));
        cc.eventManager.addListener(_listener, this);

        var close_btn = new D_Button(res.btn_close1, res.btn_close11);
        this._bg.addChild(close_btn);
        close_btn.x = this._bg.width * 0.96;
        close_btn.y = this._bg.height * 0.87;
        close_btn.setButtonTouch({"msg":"back"+this._LayerName});
    },

    initBgListener:function() {
        if (!this._bg)
            return ;

        var _listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onBgTouchBegan.bind(this),
            onTouchMoved: this.onBgTouchMoved.bind(this),
            onTouchEnded: this.onBgTouchEnded.bind(this)
        });
        cc.eventManager.addListener(_listener, this._bg);
    },

    onBgTouchBegan:function(touch, event)
    {
        // cc.log("PopLayer onBgTouchBegan");
        var _x = touch.getLocation().x;
        var _y = touch.getLocation().y;
        var rect = cc.rect(this._bg.x - this._bg.width * 0.5,
                           this._bg.y - this._bg.height * 0.5,
                           this._bg.x + this._bg.width * 0.5,
                           this._bg.y + this._bg.height * 0.5);

        // 超出范围 消灭本层
        if (_x < rect.x || _x > rect.width || _y < rect.y || _y > rect.height) {
            return false;
        };

        return true;
    },

    onBgTouchMoved:function(touch, event) 
    {
        // cc.log("PopLayer onBgTouchMoved");
        return true;
    },

    onBgTouchEnded:function(touch, event) 
    {
        // cc.log("PopLayer onBgTouchEnded");

        return true;
    },

    onExit:function() {
        this._super();

    }
});