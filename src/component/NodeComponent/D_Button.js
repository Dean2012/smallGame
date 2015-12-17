/**********************
 *  D_Button.js
 *  按钮二次封装类
 * 
 *  For GameFramework
 *  Created by Dean on 15/10/12
 **********************/

var D_Button = cc.Node.extend({

    _ButtonName : "Button",

    _data_child : null,

    _button : null,
    _isSelected : false,
    _isScale : true,
    _scaleNum : 1,
    _canTouch : true,
    _cd : 0,

    _btnPic1 : null,
    _btnPic2 : null,
    _btnPic3 : null,

    ctor:function(btnPic1, btnPic2, btnPic3) {
        this._super();

        this._btnPic1 = btnPic1;
        this._btnPic2 = btnPic2;
        this._btnPic3 = btnPic3;
    },

    onEnter:function() {
        this._super();

        // D_log.tip(this._ButtonName + " D_Button IN");
        this.initButton();
    },

    initButton:function() {
        if (this._btnPic1 == null) {
            var pic1 = res.button1;
            var pic2 = res.button2;
            var pic3 = "";
        }
        else {
            var pic1 = this._btnPic1 || res.button1;
            var pic2 = this._btnPic2 || res.button2;

            if (this._btnPic1 && !this._btnPic2)
                pic2 = pic1; 
            
            var pic3 = this._btnPic3 || "";
        }

        this._button = new ccui.Button();
        this._button.loadTextures(pic1, pic2, pic3);
        this._button.x = 0;
        this._button.y = 0;
        this._button.anchorX = 0.5;
        this._button.anchorY = 0.5;
        this.addChild(this._button);
    },

    cbFunc:function(render, type) {
        //D_log.tip("button cbFunc " + this._cb + " " + type + " " + render);

        // ccui.Widget.TOUCH_BEGAN = 0;
        // ccui.Widget.TOUCH_MOVED = 1;
        // ccui.Widget.TOUCH_ENDED = 2;
        // ccui.Widget.TOUCH_CANCELED = 3;

        if (!this._canTouch)
            return ;
            
        if (ccui.Widget.TOUCH_BEGAN == type) {
            // D_log.tip("TOUCH_BEGAN ");
            this._isSelected = true;

            if (this._isScale)
                this.setScale(this._scaleNum*0.95);
        }
        else if (ccui.Widget.TOUCH_MOVED == type) {
            // D_log.tip("TOUCH_MOVED ");

        }
        else if (ccui.Widget.TOUCH_ENDED == type) {
            // D_log.tip("TOUCH_ENDED ");
            if (this._isScale)
            	this.setScale(this._scaleNum*1);

            if (!this._isSelected) {
                this._isSelected = false;
                return ;
            }

            if (this._cb) {
                // this.closeTouch(this._cd);
                EventComponent.sendCustomEvent(this._cb, this._cbData);
            }
        }
        else if (ccui.Widget.TOUCH_CANCELED == type) {
            // D_log.tip("TOUCH_CANCELED ");
            if (this._isScale)
                this.setScale(this._scaleNum*1);

            this._isSelected = false;
        }
    },

    // 增加按钮Touch事件
    setButtonTouch:function(arg) {
        if (!arg || !this._button) 
            return ;

        this._cb = arg["msg"] || "";
        this._cbData = arg["msgData"] || "";

        this._button.addTouchEventListener(this.cbFunc.bind(this), this);
    },

    // 在按钮上增加文字
    setButonText:function(arg) {
        if (!arg || !this._button) 
            return ;

        var _textContent = arg["text"] || "Button";
        var _textFont = arg["font"] || GC.FONT_HYCYJ;
        var _textSize = arg["size"] || 24;
        var _textcolor = arg["color"] || MyColor.WHITE;

        this._button.setTitleText(_textContent);
        this._button.setTitleFontSize(_textSize);
        this._button.setTitleFontName(_textFont);
        this._button.setTitleColor(cc.color(_textcolor));
    },

    setCDTime:function(sec) {
        this._cd = sec ? sec : 0;  
    },

    closeTouch:function(sec) {
        this._canTouch = false;

        if (sec != null) {
            this.scheduleOnce(this.openTouch, sec);
        }
    },

    openTouch:function() {
        this._canTouch = true;  
    },

    setScaleNum:function(num) {
        var _num = num || this._scaleNum;
        this._scaleNum = _num;
        this.setScale(this._scaleNum);
    },

    setIsScale:function(isScale) {
        this._isScale = isScale == null ? true : isScale;  
    },

    getWidth:function() {
        if (this._button)
            return this._button.width;
        else
            return 0;
    },

    getHeight:function() {
        if (this._button)
            return this._button.height;
        else
            return 0;
    },

    onExit:function() {
        this._super();
        // D_log.tip(this._LayerName + " D_Button EXIT");
    }
});