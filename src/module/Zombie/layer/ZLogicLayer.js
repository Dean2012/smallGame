/**********************
 *  ZLogicLayer.js
 *  游戏逻辑层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ZLogicLayer = D_Layer.extend({

    _zombieNum : [2,6],
    _launchSpeed : 5,

    ctor:function() {
        this._super();

        this._size = cc.winSize;
        this._LayerName_ = "ZLogicLayer";
    },

    onEnter:function() {
        this._super();

        this.launch(0.1);
        this.schedule(this.launch, this._launchSpeed);
    },

    launch:function(dt) {
        var tempNum = parseInt(Math.random()*(this._zombieNum[1]-2)+this._zombieNum[0]+1);  // 2 - 6 随机数
        tempNum = 1
        for (var i = 0; i < tempNum; i++) {
            var b = new ZBaseSprite();
            this.addChild(b);
            b.setPosition(cc.p(parseInt(Math.random()*this._size.width*0.4+this._size.width*0.3), -100));

            var _height = parseInt(Math.random()*(this._size.height*0.9-this._size.height*0.7+1)+this._size.height*0.7);
            var _jump1 = cc.jumpTo(this._launchSpeed, cc.p(b.x, -50), _height, 1);
            var _delay = cc.delayTime(Math.random()*0.5);
            var callback = cc.callFunc(this.removeSpr, this, b);
            var rotateNum = Math.random()>0.5 ? 360 : -360;
            var action = cc.spawn(_jump1, cc.rotateBy(this._launchSpeed, rotateNum));

            var rep = cc.sequence(_delay, action, callback).speed(1);
            rep.tag = 1;
            b.runAction(rep);
        }

    },

    removeSpr:function(spr) {
        if (!spr)
            return ;
        spr.removeFromParent(true);
    },

    onExit:function() {
        this._super();

    }

});