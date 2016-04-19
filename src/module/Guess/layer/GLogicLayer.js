/**********************
 *  GLogicLayer.js
 *  游戏逻辑层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GLogicLayer = D_Layer.extend({

    status : 0, // 1竖直 2向上 3向下
    numList : [],

    readyNum : 3,
    _pv : null,

    ctor:function() {
        this._super();

        this._LayerName_ = "GLogicLayer";
    },

    onEnter:function() {
        this._super();

        var layer = ccs.load("res/guess.json");
        this.addChild(layer.node, 10, 1);

        var pv = layer.node.getChildByName("pv");
        if (!pv) return;
        this._pv = pv;
        //this._pv.setTouchEnabled(false);

        this.readyStart();
        this.addListener();
        // 重力感应
        cc.inputManager.setAccelerometerEnabled(true);

        //todo :增加触摸遮罩

        //pv.addTouchEventListener(this.cbFunc.bind(this), this);
        //this.schedule(this.update, this, -1, 5);
    //    test
    //    this.schedule(this.test.bind(this), 5);
    },

    readyStart:function() {
        var layout = new ccui.Layout();
        layout.setContentSize(cc.size(240, 130));

        this.readyText = new Label("游戏准备", null, 0.5, [{color: MyColor.WHITE, size: 100}, {color: MyColor.WHITE, size: 100}]);
        this.readyText.setPos(this._pv.getContentSize().width*0.5, this._pv.getContentSize().height*0.5);
        layout.addChild(this.readyText, 10, 1);

        this._pv.addPage(layout);

        this.readyNum = 4;
        this.schedule(this.updateStar, 1.0);
    },

    updateStar:function(dt) {
        if (this.readyNum < 1) {
            this.unschedule(this.updateStar);

            if (!this._pv) return ;
            var curCount = this._pv.getCurPageIndex();
            this.loadSbuject();
            this._pv.scrollToPage(++curCount);
            this.getParent().start();

            return ;
        }

        if (this.readyNum < 2) {
            SoundManager.playEffect("star");
            this.readyText.setString("开始!");
            this.readyNum--;
            return;
        }

        SoundManager.playEffect("second");
        this.readyNum--;
        this.readyText.setString(this.readyNum+"");
    },

    loadSbuject:function() {
        var layout = new ccui.Layout();
        layout.setContentSize(cc.size(240, 130));
        //cc.log("begin *************");
        var text = this.getText();

        var ts = text.length > 4 ? 85 : 100;
        ts = text.length > 6 ? 75 : ts;
        ts = text.length > 8 ? 65 : ts;
        var test1 = new Label(text, null, 0.5, [{color: MyColor.WHITE, size: ts}, {color: MyColor.WHITE, size: ts}]);
        test1.setPos(this._pv.getContentSize().width*0.5, this._pv.getContentSize().height*0.5);
        layout.addChild(test1, 10, 1);

        this._pv.addPage(layout);
    },

    addListener:function() {
        this._listener = cc.EventListener.create({
            event: cc.EventListener.ACCELERATION,
            b : false,
            count : 0,
            callback: function(acc, event) {
                var target = event.getCurrentTarget();
                var status = target.status;

                var test = false;

                if (!test) {
                    //切换下一题时 如果重新变回竖直状态 可以回归状态1
                    if (status == 4) {
                        //cc.log("4 ---- 切换题目状态");
                        if (acc.y < -0.75 && -0.35 < acc.z && acc.z < 0.35) {
                            //cc.log("4 ---- 竖直状态");
                            target.status = 1;
                            return;
                        }
                        return;
                    }

                    // 竖直状态
                    if (acc.y < -0.7 && -0.8 < acc.z && acc.z < 0.8) {
                        //cc.log("1 ---- 竖直状态");
                        target.status = 1;
                        return;
                    }

                    if (acc.y > -0.6 && acc.z < -0.9) {
                        //cc.log("2 ---- 向上翻");
                        target.status = 2;
                    }

                    if (acc.y > -0.6 && acc.z > 0.9) {
                        //cc.log("3 ---- 向下翻");
                        target.status = 3;
                    }

                    target.actionByStatus();
                }
                else {
                    // test
                    count++;
                    if (count > 100) {
                        count = 0;
                        this.b = false;
                    }
                    if (this.b) return;
                    this.b = true;

                    for (var key in acc) {
                        cc.log(key + ' ' + acc[key]);
                    }
                    cc.log("***********************");
                    cc.log(acc.x + " " + acc.y + " " + acc.z);
                }
            }
        });
        cc.eventManager.addListener(this._listener, this);
    },

    actionByStatus:function() {
        if (this.status == 1 || this.status == 4) return;

        var score = this.status == 2 ? 0 : 1;
        EventComponent.sendCustomEvent("GDataLayer", score);

        this.status = 4; // 新状态 切换下一题中

        // 下一题
        if (!this._pv) return ;
        var curCount = this._pv.getCurPageIndex();
        this.loadSbuject();
        this._pv.scrollToPage(++curCount);
    },

    getText:function() {
        var text = "";

        if (this.numList.length == GD.round.length) {
            this.getParent().end(this.numList.length);
            TipManager.floatTip(TipType.FT_TXT, "词库用完了!");
            return "词库用完了!";
        }

        var random = Util.getRandomNum(GD.round.length);
        //cc.log("getText = " + random);
        if (this.checkRandomNum(random)) {
            this.numList.push(random);
            if  (random >= GD.round.length)
                return "发生错误";

            text = GD.round[random];
            return text;
        }
        else {
            text = this.getText();
            return text;
        }
    },

    checkRandomNum:function(_r) {
        for (var i = 0; i < this.numList.length; i++) {
            if (_r == this.numList[i])
                return false;
        }
        return true;
    },

    test:function(dt) {

    },

    cbFunc:function(render, type) {
        var tag = render.getTag();

        if (ccui.Widget.TOUCH_BEGAN == type) {
            D_log.tip("TOUCH_BEGAN ");
        }
        else if (ccui.Widget.TOUCH_MOVED == type) {
            D_log.tip("TOUCH_MOVED ");
        }
        else if (ccui.Widget.TOUCH_ENDED == type) {
            D_log.tip("TOUCH_ENDED tag = " + tag);
        }
        else if (ccui.Widget.TOUCH_CANCELED == type) {
            D_log.tip("TOUCH_CANCELED ");
        }
    },

    onExit:function() {
        this._super();

    }

});