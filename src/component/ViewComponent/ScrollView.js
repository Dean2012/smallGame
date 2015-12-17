/**********************
 *  ScrollView.js
 *  滑动页面
 *
 * 	可以传入node 但是因为事后add node 所以事先所有事件注册和new都不会做 只能用来显示内容 不能做什么功能
 *  也可以外面弄好加载在_sv上 这样可以正常使用
 *  todo: 有时间完善 
 *
 *  For GameFramework
 *  Created by Dean on 15/10/16
 **********************/
var ScrollView = cc.Node.extend({

    _sv : null,
    _child : null,

	ctor:function(child) {
		this._super();

        this._child = child;
	},

	onEnter:function() {
		this._super();

        // 废弃 感觉没什么用 类先放着 以后看有没有能改进的
        // this.createScrollview();
	},

    createScrollview:function() 
    {
        if (this._sv) {
            this._sv.removeFromParent();
            this._sv = null;
        }

        this._sv = new ccui.ScrollView();
        this._sv.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this._sv.setTouchEnabled(true);
        this._sv.setBounceEnabled(true);
        this.addChild(this._sv);

        if (this._child)
            this._sv.addChild(this._child);

        // test
        // this._sv.setBackGroundColor(cc.color(MyColor.GOLD));
        // this._sv.setContentSize(cc.size(cc.winSize.width*0.5, cc.winSize.height*0.5));
        // this._sv.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this._sv.x = cc.winSize.width * 0.25;
        // this._sv.y = cc.winSize.height * 0.25;
        // this._sv.setInnerContainerSize(cc.size(cc.winSize.width, cc.winSize.height));
    },

    setContentPos:function(x, y) 
    {
        if (!x || !y || !this._sv) 
            return ;
        this._sv.x = x;
        this._sv.y = y;
    },

    setContentSize:function(width, height) 
    {
        if (!width || !height || !this._sv)
            return ;
        this._sv.setContentSize(cc.size(width, height));
    },

    setInnerContentSize:function(width, height) 
    {
        if (!width || !height || !this._sv)
            return;    
        this._sv.setInnerContainerSize(cc.size(width, height));
    },

    setContentColor:function(color) 
    {
        if (!color || !this._sv)
            return ;
        this._sv.setBackGroundColor(cc.color(color));
    },

    setDirection:function(dir) 
    {
        if (!dir || !this._sv) 
            return ;
        if (dir == GC.VERTICAL)
            this._sv.setDirection(ccui.ScrollView.DIR_VERTICAL);
        else if (dir == GC.HORIZONTAL)
            this._sv.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
    },
    
	onExit:function(argument) {
		this._super();
	}
});