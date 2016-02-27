/**********************
 *  PuzzleScene.js
 *  拼图游戏主场景
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/


var PIC_TAG = 1;
var PUZZLE_TAG = 2;

var PuzzleScene = D_Scene.extend({
    _dataLayer : null,
    _picLayer : null,
    _puzzleLayer : null,

    ctor:function() {
        this._super();

        this._SceneName = "PuzzleScene";
    },

    onEnter:function() {
        this._super();

        this._dataLayer = new PDataLayer();
        this.addChild(this._dataLayer, 1, 3);

        this._picLayer = new PPicLayer();
        this.addChild(this._picLayer, 1, 1);

        this._puzzleLayer = new PPuzzleLayer();
        this.addChild(this._puzzleLayer, 1, 2);

        this.showLayer(PIC_TAG);
        //this.showLayer(PUZZLE_TAG);

        cc.eventManager.addListener(cc.EventListener.create({
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : false,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        }) ,this);
    },

    onExit:function() {
        this._super();
    },

    showLayer:function(pageNum) {
        if (!this.getChildByTag(pageNum))
            return ;

        if (pageNum == PIC_TAG) {
            //this._picLayer.setTouchEnabled(true);
            this._picLayer.setVisible(true);

            //this._puzzleLayer.setTouchEnabled(false);
            this._puzzleLayer.setVisible(false);
        }
        else if (pageNum == PUZZLE_TAG) {
            //this._puzzleLayer.setTouchEnabled(true);
            this._puzzleLayer.setVisible(true);
            this._puzzleLayer.showLayer();

            //this._picLayer.setTouchEnabled(false);
            this._picLayer.setVisible(false);
        }
    },

    finish:function() {
        D_log.tip("win!");
    },

    _curTag : 0,
    _firstPos : null,

    onTouchBegan : function(Touch, event) {
        D_log.tip("scene Touch Began");
        this._firstPos = Touch.getLocation();

        if (this._puzzleLayer.isVisible() && this._puzzleLayer.checkTouchBegan(Touch, event)) {
            return true;
        }

        return false;
    },

    onTouchMoved : function(Touch, event) {
        D_log.tip("scene Touch Moved");
        // 如果移动范围大于多少 就把这一层关闭然后显示另外一层

        this._picLayer.setVisible(true);
        this._picLayer._canTouch = true;
        this._picLayer.checkTouchMoved(Touch);

        // 把多余图标消失
        this._puzzleLayer.disappearLayer();
        // 跟着鼠标走
        this._puzzleLayer._curSpr.setPosition(Touch.getLocation());
        // 缩小百分之50
        this._puzzleLayer._curSpr.setScale(0.5);

        return true;
    },

    onTouchEnded : function(Touch, event) {
        D_log.tip("scene Touch Ended");

        // 检测是否放在规定位置
        if (this._picLayer.checkTouchEnded(Touch)) {
            cc.log(1);
            // 成功 图片消失删除, 拼图层删除灰色一块
            if (this._puzzleLayer._curSpr) {
                this._puzzleLayer._curSpr.removeFromParent();
                this._puzzleLayer.removeCurSpr();
            }
            this._dataLayer.showBtn(PIC_TAG);
        }
        else {
            cc.log(2);

            // 失败 重置
            this._puzzleLayer.checkTouchEnded();
            this._puzzleLayer.showLayer();

            this._picLayer._canTouch = false;
            this._picLayer.setVisible(false);

            this._dataLayer.showBtn(PUZZLE_TAG);
        }

        // 拼图全部好了
        if (this._picLayer._grayPicList.length == 0)
            this.finish();

        return true;
    }

});