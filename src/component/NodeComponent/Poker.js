/**********************
 *  Poker.js
 *  扑克通用类
 *
 *  For GameFramework
 *  Created by Dean on 15/10/16
 **********************/

var Poker = cc.Node.extend({

    _pokerInfo : null,

    _currentFace : null,
    _currentPoker : null,

    _pokerNum : {
        "2":"poker_2",
        "3":"poker_3",
        "4":"poker_4",
        "5":"poker_5",
        "6":"poker_6",
        "7":"poker_7",
        "8":"poker_8",
        "9":"poker_9",
        "T":"poker_10",
        "J":"poker_J",
        "Q":"poker_Q",
        "K":"poker_K",
        "A":"poker_A",
    },

    _pokerFlower : {
        "s" : "heitao",
        "h" : "hongxin",
        "d" : "fangkuai",
        "c" : "meihua",
    },

    ctor:function(pokerInfo) 
    {
        this._super();

        if (pokerInfo) {
            this._pokerInfo = pokerInfo;
            this._currentFace = GC.POSITIVE;
        }
        else {
            this._pokerInfo = null;
            this._currentFace = GC.NEGATIVE;
        }
    },

    onEnter:function() 
    {
        this._super();

        this.createPoker();
    },

    createPoker:function() 
    {
        if (this._currentPoker) {
            this._currentPoker.removeFromParent();
            this._currentPoker = null;
        };


        if (this._currentFace == GC.POSITIVE) {
            // 正面显示
            if (!this._pokerInfo)
                return ;

            this._currentPoker = new cc.Sprite(res.bg_baise);
            this.addChild(this._currentPoker);
                // this._currentPoker.setColor(cc.color(MyColor.YELLOW));


            var _path = this._pokerNum[this._pokerInfo[0]];
            if (!res[_path])
                return ;

            var _pokerNum = new cc.Sprite(res[_path]);
            this._currentPoker.addChild(_pokerNum);
            _pokerNum.x = 15;
            _pokerNum.y = this._currentPoker.height - 15;
            _pokerNum.setScale(0.8);

            if (this._pokerInfo[1] == "h" || this._pokerInfo[1] == "d") 
                _pokerNum.setColor(cc.color(MyColor.RED));
            else if (this._pokerInfo[1] == "s" || this._pokerInfo[1] == "c") 
                _pokerNum.setColor(cc.color(MyColor.BLACK));

            var _path2 = this._pokerFlower[this._pokerInfo[1]];
            if (!res[_path2])
                return ;

            var _pokerFlower = new cc.Sprite(res[_path2]);
            this._currentPoker.addChild(_pokerFlower);
            _pokerFlower.x = 15;
            _pokerFlower.y = _pokerNum.y - 25;
            _pokerFlower.setScale(0.5);

            var _path3 = null;
            if (this._pokerInfo[0] == 'J' || this._pokerInfo[0] == 'Q' || this._pokerInfo[0] == 'K')
                _path3 = _path2 + "_" + this._pokerInfo[0];
            else
                _path3 = _path2;

            if (!res[_path3])
                return ;

            var _pokerPic = new cc.Sprite(res[_path3]);
            this._currentPoker.addChild(_pokerPic);
            _pokerPic.setAnchorPoint(cc.p(1,0));
            _pokerPic.x = this._currentPoker.width - 3;
            _pokerPic.y = 3;
        }
        else {
            // 反面
            this._currentPoker = new cc.Sprite(res.bgDipai);
            this.addChild(this._currentPoker);
        }
    },

    setPokerInfo:function(pokerInfo) {
        if (!pokerInfo)
            return ;

        this._pokerInfo = pokerInfo;
    },

    transfrom:function()
    {
        this._currentFace = this._currentFace == GC.POSITIVE ? GC.NEGATIVE : GC.POSITIVE;

        var rotateBy = cc.rotateBy(0.3, 0, 90);
        var cb = cc.callFunc(this.createPoker.bind(this));
        this._currentPoker.runAction(cc.Sequence.create(rotateBy,cb));
    },
    getWidth:function()
    {
    	return this._currentPoker.width;
    },
    getHeight:function()
    {
    	return this._currentPoker.height;
    },
    onExit:function() 
    {
        this._super();

    }
});