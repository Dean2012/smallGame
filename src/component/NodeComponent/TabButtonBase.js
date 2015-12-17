/**********************
 *  TabButtonBase.js
 *  Tab组件的button
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var TabButtonBase = cc.Node.extend({
    bg:null,
    ctor:function(_self)
    {
        this._super();
        this.self = _self;
        this.name = this.self.name;
        this.init();
    },
    init:function(){
    	this.bg = this.getSpriteByName(this.self.common);
        this.state = false;
        this.addChild(this.bg);
        this.bg.setName(this.name);
        this.setText();
        this.setIcon();
    },
    setIcon:function(){
    	if (null != this.self.src) {
    		var icon = this.getSpriteByName(this.self.src);
    		this.bg.addChild(icon);
    		icon.attr({
    			x: this.bg.width*0.5,
    			y: this.bg.height*0.5,
    			anchorX: 0.5,
    			anchorY: 0.5
    		});
    	}
    },
    setSelectedIcon:function(){
        if (null != this.self.srcss) {
            var icon = this.getSpriteByName(this.self.srcss);
            this.bg.addChild(icon);
            icon.attr({
                x: this.bg.width*0.5,
                y: this.bg.height*0.5,
                anchorX: 0.5,
                anchorY: 0.5
            });
        }
    },
    getSpriteByName:function(name){
    	var icon;
    	if ( typeof(name) == "string" )
    		icon = new cc.Sprite(name);
    	else
    		icon = name;
    	return icon;
    },
    setText:function(){
    	if(null != this.self.text && "" != this.self.text){
    		var fsize = 24;
    		if(null != this.self.size) fsize = this.self.size;
            var strMsgTTF = new Label(this.self.text,null,0.5,[{color:MyColor.WHITE,size:fsize}]);
            this.bg.addChild(strMsgTTF);
            strMsgTTF.setPos(this.bg.width*0.5, this.bg.height*0.5);
    		// var strMsgTTF = Util.fontShadow(this.self.text,fsize);
    		// this.bg.addChild(strMsgTTF);
    		// strMsgTTF.attr({
    		// 	x: this.bg.width*0.5 + this.self.tx,
    		// 	y: this.bg.height*0.5 + this.self.ty,
    		// 	anchorX: 0.5,
    		// 	anchorY: 0.5
    		// });
    	}
    },
    changeState:function(_state){
    	if(_state == this.state) return;
    	this.state = _state;
    	this.removeChild(this.bg);
    	if(!this.state) this.bg = this.getSpriteByName(this.self.common);
    	else this.bg = this.getSpriteByName(this.self.choose);
    	this.addChild(this.bg);
    	this.bg.setName(this.name);
    	this.setText();
        if (_state)
    	   this.setSelectedIcon();
        else
            this.setIcon();
    },
    getWidth:function()  	 //获得背景图的宽
    {
        return this.bg.width ;
    },
    getHeight:function()	//获得背景图的高
    {
        return this.bg.height ;
    }
});