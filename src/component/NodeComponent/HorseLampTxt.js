/**
 * 纯文本的走马灯
 * author wxy
 */

HORSE_TYPE_SYSTEM = 0; // 系统公告
HORSE_TYPE_1 = 1; //当日精灵王登陆游戏
HORSE_TYPE_2 = 2; //阿卡迪兽开启前5分钟	
HORSE_TYPE_3 = 3; //阿卡迪兽开启
HORSE_TYPE_4 = 4; //残酷兽开启前5分钟
HORSE_TYPE_5 = 5; //残酷兽开启
HORSE_TYPE_6 = 6; //阿卡迪兽被击杀
HORSE_TYPE_7 = 7; //残酷兽被击杀
HORSE_TYPE_8 = 8; //玩家合成7星宠物并且暴击X3
HORSE_TYPE_9 = 9; //玩家合成7星宠物并且暴击X2
HORSE_TYPE_10 = 10; //玩家合成7星宠物无暴击=X1
HORSE_TYPE_11 = 11; //角斗大赛第一名
HORSE_TYPE_12 = 12; //玩家创建公会
HORSE_TYPE_13 = 13; //竞技场第一名
HORSE_TYPE_14 = 14; //组队战第一名

var HorseLampTxt = HorseLampBase.extend({
	txt:null,
	clipper:null,
	contentWidth : 0,
	ctor:function(p_txt,p_loop)
	{
		this._super();
		cc.log("HorseLampTxt ctor");

		this.txt = p_txt;
		if( p_loop ){
			this.loopTimes = p_loop;
		}
		this.clipper = new cc.ClippingNode();
		this.clipper.width = 621;
		this.clipper.height = 30;
		this.addChild(this.clipper);
		
		var stencil = new cc.DrawNode();
		var rectangle = [cc.p(0, 0),cc.p(this.clipper.width, 0),
		                 cc.p(this.clipper.width, this.clipper.height),
		                 cc.p(0, this.clipper.height)];
		var white = cc.color(255, 255, 255, 255);
		stencil.drawPoly(rectangle, white, 1, white);
		this.clipper.stencil = stencil;
		
		this.content = this.setContent(this.txt);
		this.clipper.addChild(this.content, 1);

		// bg
		var bg = new cc.Sprite(res.bg_paomadeng);
		bg.x = 310;
		bg.y = 15;
		this.clipper.addChild(bg, 0);
	},
	setContent:function(p_txt)
	{
		var type = p_txt.tp;
		var content = p_txt.param;
		if(type == null || content == null)
			return ;

		var temptxt = cc.Node();
		temptxt._setAnchorX(0);
		temptxt._setAnchorY(0);
		temptxt.x = this.clipper.width;
		temptxt.y = 0;

		this.createContent(temptxt, content, type);

		return temptxt;
	},

	createContent:function(parent, content, type) 
	{
		if (type == HORSE_TYPE_SYSTEM) {
			// 输出文字
			var name = content[0] ? content[0] : "系统公告" + type;
			var text1 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;
			return ;
		};

		if (type == HORSE_TYPE_1) {
			var text1 = new cc.LabelTTF(VoManager.getLocalizedString(500), GC.FONT_HYCYJ, 22);
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;

			var name = content[0] ? content[0] : "玩家";
			var text2 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text2.setFontFillColor(cc.color(MyColor.RED));
			text2._setAnchorX(0);
			text2._setAnchorY(0);
			text2.x = text1.x + text1.width;
			parent.addChild(text2);
			this.contentWidth += text2.width;

			var text3 = new cc.LabelTTF(VoManager.getLocalizedString(501), GC.FONT_HYCYJ, 22);
			text3._setAnchorX(0);
			text3._setAnchorY(0);
			text3.x = text2.x + text2.width;
			parent.addChild(text3);
			this.contentWidth += text3.width;
		}
		else if (type == HORSE_TYPE_2 || type == HORSE_TYPE_3 || type == HORSE_TYPE_4 || type == HORSE_TYPE_5) {

			var tempText = "";
			if (type == HORSE_TYPE_2)
				tempText = VoManager.getLocalizedString(516);
			else if (type == HORSE_TYPE_3)
				tempText = VoManager.getLocalizedString(517);
			else if (type == HORSE_TYPE_4)
				tempText = VoManager.getLocalizedString(518);
			else if (type == HORSE_TYPE_5)
				tempText = VoManager.getLocalizedString(519);

			var text1 = new cc.LabelTTF(tempText, GC.FONT_HYCYJ, 22);
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;
		}
		else if (type == HORSE_TYPE_6 || type == HORSE_TYPE_7) {
			var text1 = new cc.LabelTTF(VoManager.getLocalizedString(502), GC.FONT_HYCYJ, 22);
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;

			var name = content[0] ? content[0] : "玩家";
			var text2 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text2.setFontFillColor(cc.color(MyColor.RED));
			text2._setAnchorX(0);
			text2._setAnchorY(0);
			text2.x = text1.x + text1.width;
			parent.addChild(text2);
			this.contentWidth += text2.width;

			var tempText = type == HORSE_TYPE_6? VoManager.getLocalizedString(503) : VoManager.getLocalizedString(504) 
			var text3 = new cc.LabelTTF(tempText, GC.FONT_HYCYJ, 22);
			text3._setAnchorX(0);
			text3._setAnchorY(0);
			text3.x = text2.x + text2.width;
			parent.addChild(text3);
			this.contentWidth += text3.width;
		}
		else if (type == HORSE_TYPE_8 || type == HORSE_TYPE_9 || type == HORSE_TYPE_10) {
			var name = content[0] ? content[0] : "玩家";
			var text1 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text1.setFontFillColor(cc.color(MyColor.RED));
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;

			var tempText = "";
			if (type == HORSE_TYPE_8)
				tempText = VoManager.getLocalizedString(505);
			else if (type == HORSE_TYPE_9)
				tempText = VoManager.getLocalizedString(506);
			else if (type == HORSE_TYPE_10)
				tempText = VoManager.getLocalizedString(507);

			var text2 = new cc.LabelTTF(tempText, GC.FONT_HYCYJ, 22);
			text2._setAnchorX(0);
			text2._setAnchorY(0);
			text2.x = text1.x + text1.width;
			parent.addChild(text2);
			this.contentWidth += text2.width;
		}
		else if (type == HORSE_TYPE_11 || type == HORSE_TYPE_13 || type == HORSE_TYPE_14) {
			var tempText1 = "";
			if (type == HORSE_TYPE_11)
				tempText1 = VoManager.getLocalizedString(508);
			else if (type == HORSE_TYPE_13)
				tempText1 = VoManager.getLocalizedString(509);
			else if (type == HORSE_TYPE_14)
				tempText1 = VoManager.getLocalizedString(510);

			var text1 = new cc.LabelTTF(tempText1, GC.FONT_HYCYJ, 22);
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;

			var name = content[0] ? content[0] : "玩家";
			var text2 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text2.setFontFillColor(cc.color(MyColor.RED));
			text2._setAnchorX(0);
			text2._setAnchorY(0);
			text2.x = text1.x + text1.width;
			parent.addChild(text2);
			this.contentWidth += text2.width;

			var tempText2 = "";
			if (type == HORSE_TYPE_11)
				tempText2 = VoManager.getLocalizedString(511);
			else if (type == HORSE_TYPE_13)
				tempText2 = VoManager.getLocalizedString(512);
			else if (type == HORSE_TYPE_14)
				tempText2 = VoManager.getLocalizedString(513);

			var text3 = new cc.LabelTTF(tempText2, GC.FONT_HYCYJ, 22);
			text3._setAnchorX(0);
			text3._setAnchorY(0);
			text3.x = text2.x + text2.width;
			parent.addChild(text3);
			this.contentWidth += text3.width;
		}
		else if (type == HORSE_TYPE_12) {
			var name = content[0] ? content[0] : "玩家";
			var text1 = new cc.LabelTTF(name, GC.FONT_HYCYJ, 22);
			text1.setFontFillColor(cc.color(MyColor.RED));
			text1._setAnchorX(0);
			text1._setAnchorY(0);
			parent.addChild(text1);
			this.contentWidth += text1.width;

			var text2 = new cc.LabelTTF(VoManager.getLocalizedString(514), GC.FONT_HYCYJ, 22);
			text2._setAnchorX(0);
			text2._setAnchorY(0);
			text2.x = text1.x + text1.width;
			parent.addChild(text2);
			this.contentWidth += text2.width;

			var guildname = content[1] ? content[1] : "公会名字";
			var text3 = new cc.LabelTTF(guildname, GC.FONT_HYCYJ, 22);
			text3.setFontFillColor(cc.color(MyColor.RED));
			text3._setAnchorX(0);
			text3._setAnchorY(0);
			text3.x = text2.x + text2.width;
			parent.addChild(text3);
			this.contentWidth += text3.width;

			var text4 = new cc.LabelTTF(VoManager.getLocalizedString(515), GC.FONT_HYCYJ, 22);
			text4._setAnchorX(0);
			text4._setAnchorY(0);
			text4.x = text3.x + text3.width;
			parent.addChild(text4);
			this.contentWidth += text4.width;
		}	
	},

	run:function()
	{
		TipManager.horseIsRunning = true;
		var move = cc.MoveBy(this.speed + this.speed / this.clipper.width * this.content.width,cc.p( - this.clipper.width - this.contentWidth, 0));
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