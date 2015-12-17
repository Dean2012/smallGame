/**
 * 纯文本的走马灯
 * author wxy
 */

HORSE_TYPE_SYSTEM = 0; // 系统公告
HORSE_TYPE_WIN = 1; // 获得游戏币
HORSE_TYPE_EXCHANGE = 2; // 兑换
HORSE_TYPE_CHARGE = 3; // 充值

var HorseLampTxt = HorseLampBase.extend({
	txt:null,
	clipper:null,
	contentWidth : 0,
	ctor:function(p_txt,p_loop)
	{
		this._super();

		this.txt = p_txt;
		if( p_loop ){
			this.loopTimes = p_loop;
		}

		this.clipper = new cc.ClippingNode();
		this.clipper.width = cc.winSize.width;
		this.clipper.height = 30;
		this.addChild(this.clipper);
	},

	onEnter:function() 
	{
		this._super();
		
		var stencil = new cc.DrawNode();
		var rectangle = [cc.p(0, 0),cc.p(this.clipper.width, 0),
		                 cc.p(this.clipper.width, this.clipper.height),
		                 cc.p(0, this.clipper.height)];
		var white = cc.color(255, 255, 255, 255);
		stencil.drawPoly(rectangle, white, 1, white);
		this.clipper.setStencil(stencil);// .stencil = stencil;
		
		this.content = this.setContent(this.txt);
		this.clipper.addChild(this.content, 1);

		// bg
		var bg = new cc.Sprite(res.TipBG);
		bg.x = cc.winSize.width*0.5;
		bg.y = cc.winSize.height-30;
		this.clipper.addChild(bg, 0);

    	this.run();
	},

	setContent:function(p_txt)
	{
		var type = p_txt.id;
		var content = p_txt.v;
		if(type == null || content == null)
			return ;

		var temptxt = cc.Node();
		temptxt._setAnchorX(0);
		temptxt._setAnchorY(0);
		temptxt.x = this.clipper.width;
		temptxt.y = 0;

		var textlist = content.split("|");
		this.createContent(temptxt, textlist, type);

		return temptxt;
	},

	createContent:function(parent, content, type) 
	{
		if (type == HORSE_TYPE_SYSTEM) {
			// 输出文字
			// var name = content[0] ? content[0] : "系统公告" + type;
			// var text1 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			// text1._setAnchorX(0);
			// text1._setAnchorY(0);
			// parent.addChild(text1);
			// this.contentWidth += text1.width;
			return ;
		};

		if (type == HORSE_TYPE_WIN) {
			var game = 17000+parseInt(content[1]);

			var text = new D_component.ColorfulLabel([
				{text:VoManager.getLocalizedString(16000),color:"#ffffff",size:"20"},
		     	{text:content[0],color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(16001),color:"#ffffff",size:"20"},
		     	{text:VoManager.getLocalizedString(game),color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(16002),color:"#ffffff",size:"20"},
		     	{text:content[2],color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(6),color:"#fecb6a",size:"20"}
		     ]);
		}
		else if (type == HORSE_TYPE_EXCHANGE) {
			var text = new D_component.ColorfulLabel([
				{text:VoManager.getLocalizedString(16000),color:"#ffffff",size:"20"},
		     	{text:content[0],color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(16003),color:"#ffffff",size:"20"},
		     	{text:content[1],color:"#fecb6a",size:"20"}
		     ]);
		}
		else if (type == HORSE_TYPE_CHARGE) {
			var text = new D_component.ColorfulLabel([
		     	{text:content[0],color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(16004),color:"#ffffff",size:"20"},
		     	{text:content[1],color:"#fecb6a",size:"20"},
		     	{text:VoManager.getLocalizedString(16005),color:"#ffffff",size:"20"}
		     ]);
		}

		text.y = 10;
		parent.addChild(text, 10);

		this.contentWidth += text.getWidth();
	},

	run:function()
	{
		TipManager.horseIsRunning = true;
		var move = cc.MoveBy(this.speed + this.speed / this.clipper.width * this.content.width,
			cc.p( -this.clipper.width-this.contentWidth, 0));
		var sq = cc.Sequence(move,cc.callFunc(this.resetPos,this));
		this.content.runAction(sq);
	},

	resetPos:function()
	{
		this.currentRollTimes++;
		if(this.currentRollTimes >= this.loopTimes){
			this.destory();
			return;
		}
		this.content.x = this.clipper.width;
		this.run();
	},

	getClipperWidth:function()
	{
		return this.clipper.width;
	},

	disable:function(isDisable) {
		this.setVisible(isDisable);
	}
})

//使用方法
//var lamp = new HorseLampTxt("哈哈嘿嘿嘻嘻呵呵",3);
//lamp.x = (cc.winSize.width - lamp.getClipperWidth())/2;
//lamp.y = cc.winSize.height - 30;
//this.addChild(lamp,100);
//lamp.run();