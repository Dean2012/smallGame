/**********************
 *  GResultLayer.js
 *  游戏数据层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GResultLayer = D_Layer.extend({

    _t : 0,
    _s : 0,
    _ls : null,

    ctor:function(s) {
        this._super();

        this._LayerName = "GResultLayer";

        this._s = s ? s : 0;
        this._t = 60;

        this._ls = cc.sys.localStorage;
    },

    onEnter:function() {
        this._super();

    //    恭喜您
        var text1 = new Label("恭喜您", null, 0.5, [{color: MyColor.RED, size: 60}, {color: MyColor.RED, size: 60}]);
        text1.setPos(cc.winSize.width*0.5, cc.winSize.height*0.75);
        this.addChild(text1, 10, 1);

    //    多少秒内
        var text2 = new Label("您在"+this._t+"内完成了"+this._s+"题目!", null, 0.5, [{color: MyColor.WHITE, size: 40}, {color: MyColor.WHITE, size: 40}]);
        text2.setPos(cc.winSize.width*0.5, cc.winSize.height*0.55);
        this.addChild(text2, 10, 2);

        this.scheduleOnce(this.addText, 3);

        var best = this._ls.getItem("bestScore");
        if (!best) {
            this._ls.setItem("bestScore", this._s);
            //    本机最高得分是
            var text3 = new Label("恭喜您获得最高分!!", null, 0.5, [{color: MyColor.RED, size: 60}, {color: MyColor.RED, size: 60}]);
            text3.setPos(cc.winSize.width*0.5, cc.winSize.height*0.45);
            this.addChild(text3, 10, 3);

            //    如果破了纪录
            var text4 = new Label("本机历史最高得分为"+this._t+"内完成了"+this._s+"题目!", null, 0.5, [{color: MyColor.WHITE, size: 40}, {color: MyColor.WHITE, size: 40}]);
            text4.setPos(cc.winSize.width*0.5, cc.winSize.height*0.25);
            this.addChild(text4, 10, 4);
        }
        else {
            //    本机最高得分是
            var text3 = new Label("本机历史最高得分为"+this._t+"内完成了"+best+"题目!", null, 0.5, [{color: MyColor.WHITE, size: 40}, {color: MyColor.WHITE, size: 40}]);
            text3.setPos(cc.winSize.width*0.5, cc.winSize.height*0.45);
            this.addChild(text3, 10, 3);

            if (this._s > best) {
                this._ls.setItem("bestScore", this._s);
                //    如果破了纪录
                var text4 = new Label("恭喜您完成了新的纪录!!", null, 0.5, [{color: MyColor.RED, size: 60}, {
                    color: MyColor.RED,
                    size: 60
                }]);
                text4.setPos(cc.winSize.width * 0.5, cc.winSize.height * 0.25);
                this.addChild(text4, 10, 4);
            }
        }
    },

    addText:function(dt) {
        //    点击屏幕重新退出游戏
        var text5 = new Label("点击屏幕任意位置退出游戏!!", null, 0.5, [{color: MyColor.RED, size: 30}, {color: MyColor.RED, size: 30}]);
        text5.setPos(cc.winSize.width*0.5, cc.winSize.height*0.15);
        this.addChild(text5, 10, 5);

        var _listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onBgTouchBegan.bind(this),
            onTouchEnded: this.onBgTouchEnded.bind(this)
        });
        cc.eventManager.addListener(_listener, this);
    },

    onBgTouchBegan:function(touch, event) {

        return true;
    },

    onBgTouchEnded:function(touch, event) {
        ClientManager.sendNotice(ClientName.MAIN_SCENE);
        return true;
    },

    onExit:function() {
        this._super();

    }

});