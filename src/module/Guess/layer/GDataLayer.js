/**********************
 *  GDataLayer.js
 *  游戏数据层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GDataLayer = D_Layer.extend({

    _score : 0,
    _time : 60,

    ctor:function() {
        this._super();

        this._LayerName = "GDataLayer";
    },

    onEnter:function() {
        this._super();

        var scoreTTF = new Label("得分 : "+this._score, null, 0, [{color:MyColor.WHITE,size:40},{color:MyColor.RED,size:40}]);
        this.addChild(scoreTTF, 10, 1);
        scoreTTF.setPos(scoreTTF.getContentSize().width*0.5, cc.winSize.height-scoreTTF.getHeight()*0.5);

        var tt = Util.getTimeNum(this._time);
        var timeTTF = new Label("剩余时间 : " + tt, null, 0, [{color:MyColor.WHITE,size:40},{color:MyColor.RED,size:40}]);
        this.addChild(timeTTF, 10, 2);
        timeTTF.setPos(cc.winSize.width*0.5-timeTTF.getWidth()*0.5, cc.winSize.height-timeTTF.getHeight()*0.5);

        this.schedule(this.addListener, 0.1);
    },

    start:function() {
        this.schedule(this.updateTime, 0.1);
    },

    addListener:function(dt) {
        this.unschedule(this.addListener);

        var _listener = EventComponent.registerCustomEvent(this._LayerName,this.getData.bind(this));
        cc.eventManager.addListener(_listener, this);
    },

    updateTime:function(dt) {
        this._time -= dt;
        if (this._time <= 0) {
            SoundManager.stopMusic();
            this.getParent().end(this._score);
            this.unschedule(this.updateTime);
            return;
        }

        if (this.getChildByTag(2) == null) return ;
        var tt = Util.getTimeNum(this._time);

        if (this._time <= 10)
            SoundManager.playMusic("timetick", false);

        var timeTTF = this.getChildByTag(2);
        timeTTF.setString("剩余时间 : " + tt);
    },

    getData:function(arg) {
        var s = arg.getUserData();
        if (this.getChildByTag(1) == null) return ;

        if (s == 1)
            SoundManager.playEffect("get");
        else
            SoundManager.playEffect("miss");

        if (s == null) return;

        this._score += s;
        var scoreTTF = this.getChildByTag(1);
        scoreTTF.setString("得分 : " + this._score);
    },

    onExit:function() {
        this._super();

    }

});