/**********************
 *  GDataLayer.js
 *  游戏数据层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GDataLayer = D_Layer.extend({

    _score : 0,
    _time : 100,

    ctor:function() {
        this._super();

        this._LayerName = "GDataLayer";
    },

    onEnter:function() {
        this._super();

        var scoreTTF = new Label("得分 : "+this._score, null, 0, [{color:MyColor.WHITE,size:30},{color:MyColor.RED,size:30}]);
        this.addChild(scoreTTF, 10, 1);
        scoreTTF.setPos(scoreTTF.getContentSize().width*0.5, cc.winSize.height-scoreTTF.getHeight()*0.5);

        var tt = Util.getTimeNum(this._time);
        var timeTTF = new Label("剩余时间 : " + tt, null, 0, [{color:MyColor.WHITE,size:30},{color:MyColor.RED,size:30}]);
        this.addChild(timeTTF, 10, 2);
        timeTTF.setPos(cc.winSize.width*0.5-timeTTF.getWidth()*0.5, cc.winSize.height-timeTTF.getHeight()*0.5);

        this.schedule(this.updateTime.bind(this), 0.1);
    },

    updateTime:function(dt) {
        this._time -= dt;
        if (this._time <= 0) {
            this.getParent().end();
            this.unschedule(this.updateTime.bind(this));
            return;
        }

        if (this.getChildByTag(2) == null) return ;
        var tt = Util.getTimeNum(this._time);
        var timeTTF = this.getChildByTag(2);
        timeTTF.setString("剩余时间 : " + tt);
    },

    addScore:function(s) {
        if (this.getChildByTag(1) == null) return ;
        if (s == null) return;

        this._score += s;
        var scoreTTF = this.getChildByTag(1);
        scoreTTF.setString("得分 : " + this._score);
    },

    onExit:function() {
        this._super();

    }

});