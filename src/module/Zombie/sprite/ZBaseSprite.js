/**********************
 *  ZBaseSprite.js
 *  僵尸和炸弹的基类
 *  sprite tag 1 = 本体, 2 = 头, 3 = 身体
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ZBaseSprite = cc.Node.extend({

    _path : "",
    _head : "_head",
    _body : "_body",
    _png : ".png",

    ctor:function() {
        this._super();

        D_log.tip("enter Zb");
        this._path = "#zoobi_1";
    },

    onEnter:function() {
        this._super();

        this.createZombie();
    },

    createZombie:function() {
        //zoobi_1
        var sprite = new cc.Sprite(this._path+this._png);
        this.addChild(sprite, 0, 1);

        // furit listener
        var _fruitlistener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
               return true;
            },
            onTouchMoved: function (touch, event) {
                var target = event.getCurrentTarget();
                var zb = target.getParent();
                var ptWorld = zb.convertToNodeSpace(touch.getLocation());
                var rect = target.getBoundingBox();

                if (cc.rectContainsPoint(rect,ptWorld))
                    zb.beCuted();
            }
        });
        cc.eventManager.addListener(_fruitlistener, sprite);
    },

    beCuted:function() {
        if (this.getChildByTag(1) != null)
            this.removeChildByTag(1);

        //if (this.getActionByTag(1))
        //    this.stopActionByTag(1);

        this.cHeadAndBody();
        this.playEffect();
    },

    cHeadAndBody:function() {
        var head = new cc.Sprite(this._path + this._head + this._png);
        this.addChild(head, 0, 2);
        head.setPosition(50, 20);

        var body = new cc.Sprite(this._path + this._body + this._png);
        this.addChild(body, 0, 3);
        head.setPosition(-50, 20);

        var px = this.getPosition().x;
        var py = this.getPosition().y;
    //  action
        var controlPoints = [ cc.p(px-80, py-50),
            cc.p(px-120, py-400),
            cc.p(px-160, py-1000) ];

        var bezierForward = cc.bezierTo(0.8, controlPoints);
        var callback = cc.callFunc(this.removeSpr, this, head);
        var action = cc.spawn(bezierForward, cc.rotateBy(0.8, -45));

        var rep = cc.sequence(bezierForward, callback);
        //head.runAction(rep);

        var controlPoints2 = [ cc.p(px+80, py+50),
            cc.p(px+120, py-400),
            cc.p(px+160, py-1000) ];

        cc.log("x = %d,%d,%d", px+80, px+120, px+160);
        cc.log("y = %d,%d,%d",py, py-400, py-1000);

        var bezierForward2 = cc.bezierTo(0.8, controlPoints2);
        var callback2 = cc.callFunc(this.removeSpr, this, body);
        var action2 = cc.spawn(bezierForward2, cc.rotateBy(0.8, 45));

        var rep2 = cc.sequence(bezierForward2, callback2);
        //body.runAction(rep2);
    },

    playEffect:function() {
        var _emitter = new cc.ParticleSystem(resZombie.effect1);
        this.addChild(_emitter);
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