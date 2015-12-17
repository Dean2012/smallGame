/**
 * 简易对话框
 * @author Dean
 * title 如果没有就不显示  
 * content 内容
 * cb 回调
 * e.g 
 */ 
var DialogBox = PopLayer.extend({
    
    _text : "null",

    ctor:function(text, msg)
    {
        this._super();

        this._text = text;
        this._msg = msg;
    },

    onEnter:function(argument) 
    {
        this.greyLayer();

        // create bg
        this._bg = new cc.Sprite(res.popupBg_694x381);
        this.addChild(this._bg, 10);
        this._bg.x = cc.winSize.width * 0.5;
        this._bg.y = cc.winSize.height * 0.5;

        this._super();

        this.createLayer();
        this.initCloseBtn();
    },

    createLayer:function() 
    {
        // text
        var text = new Label(this._text+"", null, 0.5, [{color:MyColor.WHITE,size:24}]);
        this._bg.addChild(text, 10);
        text.setPos(this._bg.width * 0.5, this._bg.height * 0.6);

        // button
        var button = new D_Button(resShop.chatBtn_5,resShop.chatBtn_55);
        this._bg.addChild(button, 10);
        button.x = this._bg.width * 0.5;
        button.y = this._bg.height * 0.2;
        button.setButonText({"text":"确定"});
        button.setButtonTouch({"msg":this._msg,"msgData":""});

        var _listener = EventComponent.registerCustomEvent(this._msg,this.onRemoveThis.bind(this));
        cc.eventManager.addListener(_listener, this);
    },

    onExit:function(argument) 
    {
        this._super();

    },

    onRemoveThis:function()
    {
        this.removeFromParent(true);
    }
})