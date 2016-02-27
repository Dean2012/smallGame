/**********************
 *  PPicLayer.js
 *  图片原层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var PPicLayer = D_Layer.extend({

    _pic : null,
    _pic1 : null,

    _grayPicList : [],
    _canTouch : false,

    ctor:function() {
        this._super();
    },

    onEnter:function() {
        this._super();

        var json = ccs.load("res/PPicLayer.json");
        this.addChild(json.node, 1, 1);

        this._pic = this.getChildByTag(1);
        this._pic.setAnchorPoint(cc.p(0.5,0.5));
        this._pic.setPosition(cc.p(cc.winSize.width*0.5, cc.winSize.height*0.5));

        //var test = new cc.Sprite.createGraySprite("res/Puzzle/test_01.png");
        //this.addChild(test);
        //test.setPosition(cc.p(cc.winSize.width*0.5, cc.winSize.height*0.5));

        this._grayPicList = [];

        for (var i = 1; i <= this._pic.getChildrenCount(); i++) {
            var graySpr = new cc.Sprite.createGraySprite("res/Puzzle/test_0"+i+".png");
            var tempSpr = this._pic.getChildByTag(i);
            tempSpr.addChild(graySpr, 10, 1);
            graySpr.setPosition(cc.p(tempSpr.getContentSize().width*0.5, tempSpr.getContentSize().height*0.5));

            this._grayPicList.push(graySpr);
        }

        //this.addTouchEventListener(this.cbFunc.bind(this), this);
        // 多点触摸 只有在显示的时候可以放大缩小
        cc.eventManager.addListener(cc.EventListener.create({
            event:cc.EventListener.TOUCH_ALL_AT_ONCE,
            swallowTouches : false,
            onTouchesBegan: this.onTouchesBegan.bind(this),
            onTouchesMoved: this.onTouchesMoved.bind(this),
            onTouchesEnded: this.onTouchesEnded.bind(this)
        }) ,this);

        // 单点触摸 用来判断点击在哪个框内
        //cc.eventManager.addListener(cc.EventListener.create({
        //    event:cc.EventListener.TOUCH_ONE_BY_ONE,
        //    swallowTouches : false,
        //    onTouchBegan: this.onTouchBegan.bind(this),
        //    onTouchMoved: this.onTouchMoved.bind(this),
        //    onTouchEnded: this.onTouchEnded.bind(this)
        //}) ,this);
    },

    onExit:function() {
        this._super();
    },

    _posdis : 0,

    onTouchesBegan:function(Touches, event) {
        if (Touches.length != 2 || !this.isVisible())
            return false;
        this._posdis = this.countPosDis(Touches);
        return true;
    },

    onTouchesMoved:function(Touches, event) {
        if (Touches.length != 2 || !this.isVisible())
            return false;
        var disT = this.countPosDis(Touches);
        var scaleNum = disT/this._posdis > 1.5 ? 1.5 : disT/this._posdis;
        scaleNum = scaleNum < 0.5 ? 0.5 : scaleNum;
        this._pic.setScale(scaleNum);
        return true;
    },

    onTouchesEnded:function(Touches, event) {
        if (Touches.length != 2 || !this.isVisible())
            return false;
        var disT = this.countPosDis(Touches);
        var scaleNum = disT/this._posdis > 1.5 ? 1.5 : disT/this._posdis;
        scaleNum = scaleNum < 0.5 ? 0.5 : scaleNum;
        this._pic.setScale(scaleNum);
        this._posdis = 0;
        return true;
    },

    countPosDis:function(Touches) {
        if (Touches.length < 2) return;

        var touch1 = Touches[0].getLocation();
        var touch2 = Touches[1].getLocation();
        var dis = (touch1.x - touch2.x)*(touch1.x - touch2.x) + (touch1.y - touch2.y)*(touch1.y - touch2.y);
        dis = Math.sqrt(dis);
        return dis;
    },

    onTouchBegan : function(Touch, event) {
        if (!this._canTouch)
            return true;

        //for (var i = 0; i < this._grayPicList.length; i++) {
        //    var grayspr = this._grayPicList[i];
        //    var ptWorld = grayspr.convertToNodeSpace(Touch.getLocation());
        //    var rect = grayspr.getBoundingBox();
        //
        //    if (cc.rectContainsPoint(rect, ptWorld)) {
        //        grayspr.setVisible(false);
        //    }
        //    else {
        //        grayspr.setVisible(true);
        //    }
        //}
        return true;
    },

    onTouchMoved : function(Touch, event) {
        if (!this._canTouch)
            return true;

        return true;
    },

    onTouchEnded : function(Touch, event) {
        if (!this._canTouch)
            return true;

        return true;
    },

    checkTouchMoved:function(Touch) {
        for (var i = 0; i < this._grayPicList.length; i++) {
            var grayspr = this._grayPicList[i];
            var ptWorld = grayspr.convertToNodeSpace(Touch.getLocation());
            var rect = grayspr.getBoundingBox();

            if (cc.rectContainsPoint(rect, ptWorld)) {
                grayspr.setVisible(false);
            }
            else {
                grayspr.setVisible(true);
            }
        }
        return true;
    },

    checkTouchEnded:function(Touch) {
        for (var i = 0; i < this._grayPicList.length; i++) {
            var grayspr = this._grayPicList[i];
            var ptWorld = grayspr.convertToNodeSpace(Touch.getLocation());
            var rect = grayspr.getBoundingBox();

            if (cc.rectContainsPoint(rect, ptWorld)) {
                grayspr.setVisible(false);
                this._grayPicList.splice(i, 1);
                return true;
            }
            grayspr.setVisible(true);
            return false;
        }
    }

});