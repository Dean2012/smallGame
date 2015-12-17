/**
* Dean
* 单行输入框
*/
var loginInputBox = cc.Node.extend({
	
	box:null,
	maxChar:null,
	_p_params : null,
	
	/**{bg:null,width:200,height:50,defaultText:"默认文字",maxChar:8,color:MyColor.YELLOW,anchorX:0.5}*/
	ctor:function(p_params)
	{
		this._super();

		this._p_params = null;
		this._p_params = p_params;
		
		var normal9SpriteBg = null;
		if( p_params.hasOwnProperty("bg") ){
			normal9SpriteBg= new cc.Scale9Sprite( p_params["bg"] );
		}else{
			normal9SpriteBg = new cc.Sprite(resMain.button);
		}
		
		var width = 250;
		var height = 40;
		if( p_params.hasOwnProperty("width") ){
			width = p_params["width"];
		}
		if( p_params.hasOwnProperty("height") ){
			height = p_params["height"];
		}
		if( p_params.hasOwnProperty("maxChar") ){
			this.maxChar = p_params["maxChar"];
		}
		this.color = MyColor.WHITE;
		if( p_params.hasOwnProperty("color") ){
			this.color = p_params["color"];
		}
		var anchorx = 0;
		if( p_params.hasOwnProperty("anchorX") ){
			anchorx = p_params["anchorX"];
		}

		this.box = new cc.EditBox(cc.size(width, height),normal9SpriteBg,normal9SpriteBg,normal9SpriteBg);
		this.box.name = "inputBox";
		this.box.anchorX = anchorx;
		this.box.setDelegate(this);
		this.box.setFontColor(cc.color(this.color));
		this.addChild(this.box);

		if( p_params.hasOwnProperty("defaultText") ){
			var color = MyColor.GRAY;
			this.box.setFontColor(cc.color(color));
			this.box.setString(p_params["defaultText"]);
		}
	},
	/**js主动调用系统键盘*/
	jsOpenKeyboard:function(){
		this.box.jsOpenKeyboard();
	},
	/**js主动关闭系统键盘*/
	jsCloseKeyboard:function(){
		this.box.jsCloseKeyboard();
	},
	editBoxEditingDidBegin:function(argument) 
	{

		
	},

	editBoxEditingDidEnd:function(editBox) {
		var text = this.box.getString();
		if (text == "") {
			if( this._p_params.hasOwnProperty("defaultText") ){
				var color = MyColor.GRAY;
				this.box.setFontColor(cc.color(color));
				this.box.setString(this._p_params["defaultText"]);
			}
			return ;
		}
		else {
			this.box.setFontColor(cc.color(this.color));
		}
	},
	
	getBoxString:function()
	{
		return this.box.getString();
	},
	
	setBoxString:function(p_str)
	{
		var str = p_str + "";
		if( this.maxChar != null && str.length > this.maxChar ){
			str = str.substring(0, this.maxChar)
		}
		this.box.setString(str);
	}
})