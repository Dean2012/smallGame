/**
 * 系统通用弹出框
 * 文本
 * 回调
 * 
 * 样式（0确定按钮,1确定取消按钮）
 * */
var DialogCommon = PopLayer.extend({
    
    _text : "",
    
    ctor:function(text, cb, state)
    {
        this._super();
        this._LayerName = "DialogCommon";
        this._text = text;
        this._cb = cb;
        this._state = state?state:0;
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
//        var text = new Label(this._text+"", null, 0.5, [{color:MyColor.WHITE,size:24}]);
//        this._bg.addChild(text, 10);
//        text.setPos(this._bg.width * 0.5, this._bg.height * 0.6);
        
        
        var lbl = new cc.LabelTTF(this._text+"", GC.FONT, 24);
        lbl.anchorX = 0.5;
        lbl.anchorY = 0.5;
        lbl.boundingWidth = 400;
        lbl.x = this._bg.width * 0.5;
        lbl.y = this._bg.height * 0.6;
        this._bg.addChild(lbl,10);
        

        // button
        var button = new D_Button(resShop.chatBtn_5,resShop.chatBtn_55);
        this._bg.addChild(button, 10);
        button.x = this._bg.width * 0.5;
        button.y = this._bg.height * 0.2;
        button.setButonText({"text":VoManager.getLocalizedString(1)});
        button.setButtonTouch({"msg":"dialogCommonSure","msgData":""});

        var _listener = EventComponent.registerCustomEvent("dialogCommonSure",this.onSureThis.bind(this));
        cc.eventManager.addListener(_listener, this);
        
        if(this._state == 1){
        	// button
        	button.x = this._bg.width * 0.25;
        	var cancel = new D_Button(resShop.chatBtn_5,resShop.chatBtn_55);
        	this._bg.addChild(cancel, 10);
        	cancel.x = this._bg.width * 0.75;
        	cancel.y = this._bg.height * 0.2;
        	cancel.setButonText({"text":VoManager.getLocalizedString(2)});
        	cancel.setButtonTouch({"msg":"dialogCommonCancel","msgData":""});

        	var _listener = EventComponent.registerCustomEvent("dialogCommonCancel",this.onRemoveThis.bind(this));
        	cc.eventManager.addListener(_listener, this);
        }
    },

    onExit:function(argument) 
    {
        this._super();

    },
    onSureThis:function()
    {	
    	this.onRemoveThis();
        if(this._cb)this._cb();
    },
    onRemoveThis:function()
    {
    	this.removeFromParent(true);
    }
})