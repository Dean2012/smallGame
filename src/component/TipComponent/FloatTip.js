/**********************
 *  FloatTip.js
 *  悬浮提示框
 *  argument key值（strPath, strMsg, delayTime, detail）
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/
var FloatTip = cc.Sprite.extend({
    strPath:null,
    strMsg:null,
    delayTime:0,
    ctor:function(argument)
    {
        this._super();

        this.strPath = argument.strPath || null;

        this.strMsg = argument.strMsg || "error Msg!";

        this.delayTime = argument.delayTime || 1.0;

        this.initSprite();
    },

    initSprite:function()
    {
        var size = cc.winSize;

        if (this.strPath == null)
            this.spriteBackGround = new cc.Sprite(res.TipBG);
        else 
            this.spriteBackGround = new cc.Sprite(this.strPath);

        this.spriteBackGround.x = size.width * 0.5;
        this.spriteBackGround.y = size.height * 0.5;
        this.addChild(this.spriteBackGround);
        this.spriteBackGround.setScale(1.0);

        var strMsgTTF = new Label(this.strMsg,null,0.5,[{color:'#ffffff',size:20}]);
        this.spriteBackGround.addChild(strMsgTTF);
        strMsgTTF.setPos(this.spriteBackGround.width*0.5
            , this.spriteBackGround.height*0.5);

        //action
        var actionDelay = cc.delayTime(this.delayTime*0.5);
        var actionSpawnIn = cc.spawn(
              cc.fadeIn(0.3),
              cc.moveBy(0.3, cc.p(0,50)));
        var actionSpawnOut = cc.spawn(
              cc.fadeOut(1),
              cc.moveBy(1, cc.p(0,50))
        );
        var actionCall = cc.callFunc(this.onSetRunning, this);
        var actionCallback = cc.callFunc(this.onRemoveThis, this);
        var actionSequence = cc.sequence
        (
            actionDelay,
            actionSpawnIn,
            actionCall,
            actionSpawnOut,
            actionCallback
        );

        this.spriteBackGround.runAction(actionSequence);
    },

    onSetRunning:function()
    {
        TipManager.isRunning = false;
    },

    onRemoveThis:function()
    {
        this.removeFromParent(true);
    }
})