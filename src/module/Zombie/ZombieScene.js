/**********************
 *  ZombieScene.js
 *  切僵尸游戏主场景
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ZombieScene = D_Scene.extend({
    _dataLayer : null,
    _logicLayer : null,

    ctor:function() {
        this._super();

        this._SceneName = "ZombieScene";

        cc.spriteFrameCache.addSpriteFrames(resZombie.corpse);
    },

    onEnter:function() {
        this._super();

        if (this._dataLayer)
            this._dataLayer.removeFromParent(true);

        if (this._logicLayer)
            this._logicLayer.removeFromParent(true);

        this._dataLayer = new ZDataLayer();
        this.addChild(this._dataLayer, 10, 1);

        this._logicLayer = new ZLogicLayer();
        this.addChild(this._logicLayer, 10, 2);

        // 显示刀
        var _listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: this.onTouchesBegan.bind(this),
            onTouchesMoved: this.onTouchesMoved.bind(this),
            onTouchesEnded: this.onTouchesEnded.bind(this)
        });
        cc.eventManager.addListener(_listener1, this);
    },

    start:function() {
        if (!this._dataLayer)
            return;

        this._dataLayer.start();
    },

    end:function(s) {
        if (this._logicLayer)
            this._logicLayer.removeFromParent(true);

        var layer = new GResultLayer(s);
        this.addChild(layer, 15, 3);
    },

    // touch event
    onTouchesBegan:function(touches, event) {
        this._streak = new cc.MotionStreak(0.5, 10, 25, cc.color.WHITE, "res/Zombie/sword/blade_5.png");
        this.addChild(this._streak, 100);

        return true;
    },
    onTouchesMoved:function(touches, event) {
        if (touches.length == 0)
            return;

        var touch = touches[0];
        var touchLocation = touch.getLocation();
        var streak = event.getCurrentTarget()._streak;
        streak.x = touchLocation.x;
        streak.y = touchLocation.y;
        return true;
    },
    onTouchesEnded:function(touches, event) {
        return true;
    },

    onExit:function() {
        this._super();

    }

});