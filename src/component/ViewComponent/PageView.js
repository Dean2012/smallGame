/**********************
 *  PageView.js
 *  翻转页面View
 *
 * 	todo: vertical 有点问题
 * 
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/
var PageView = cc.Node.extend({

    _pageNum : 0,
	_pageList : [],
	_currentPage : null,
	_currentCount : null,

	_lastPage : null,
	_lastCount : null,

	_direction : null,
	_turn : null,

	ctor:function(pageNum) {
		this._super();

        this._currentCount = 0;
        this._pageNum = pageNum;
	},

	onEnter:function() {
		this._super();

		this._direction = GC.HORIZONTAL; // 默认横向移动
		this._turn = GC.POSITIVE; //正方向
		this._currentCount = 0;

		if (this._pageNum > 1)
			this.initTouch();

        this.createPage();
	},

    initTouch:function() {
        var _listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this)
        });
        cc.eventManager.addListener(_listener, this);
    },

    setDirection:function(direction) {
    	if (!direction)
    		return ;

    	this._direction = direction;
    },

    //positive and negative
    setTurn:function(turn) {
    	if (turn) 
    		return ;

    	this._turn = turn;
    },

    _beganX : 0,
    _beganY : 0,

    onTouchBegan:function(touch, event)
    {
    	this._beganX = touch.getLocation().x;
    	this._beganY = touch.getLocation().y;

        return true;
    },

    onTouchMoved:function(touch, event) 
    {
        var difX = this._beganX - touch.getLocation().x;

        this._currentPage.x = this._turn == GC.POSITIVE ? -difX : difX;
        if (this._leftPage)
            this._leftPage.x =  this._currentPage.x - cc.winSize.width*0.87;

        if (this._rightPage)
            this._rightPage.x = this._currentPage.x + cc.winSize.width*0.87;

        return true;
    },

    onTouchEnded:function(touch, event) 
    {
    	var endedX = touch.getLocation().x;
    	var endedY = touch.getLocation().y;

    	var difX = this._beganX - endedX;
    	var difY = this._beganY - endedY;

    	if (this._direction == GC.VERTICAL) 
        	this.countDif(difY);
    	else if (this._direction == GC.HORIZONTAL)
    		this.countDif(difX);

        return true;
    },

    countDif:function(dif) 
    {
        if (this._turn == GC.NEGATIVE)
            var difNum = dif >= 0 ? 1 : -1;
        else if (this._turn == GC.POSITIVE)
            var difNum = dif >= 0 ? -1 : 1;

    	if (dif < 100 && dif > -100) {
            this.movePage(difNum);
    		return ;
        }

        this.movePage(difNum);
    },

    movePage:function(dir) 
    {
        if (dir > 0) {
            var action1 = cc.moveTo(0.2, cc.p(cc.winSize.width*0.87, 0));
            var action2 = cc.moveTo(0.2, cc.p(0, 0));
            var action3 = cc.moveTo(0.2, cc.p(cc.winSize.width*1.35, 0));
        }
        else {
            var action1 = cc.moveTo(0.2, cc.p(-cc.winSize.width*0.87, 0));
            var action2 = cc.moveTo(0.2, cc.p(-cc.winSize.width*1.35, 0));
            var action3 = cc.moveTo(0.2, cc.p(0, 0));
        }

        if (!this._leftPage && dir > 0) {
            this._currentPage.runAction(action2);
            this._rightPage.runAction(action1);
            return;
        };

        if (!this._rightPage && dir < 0) {
            this._currentPage.runAction(action3);
            this._leftPage.runAction(action1);
            return ;
        };

        if (this._currentCount == 0 && dir == -1)
            this._currentCount = this._pageNum-1;
        else if (this._currentCount == (this._pageNum-1) && dir == 1 )
            this._currentCount = 0;
        else
            this._currentCount += dir;

        var cb = cc.callFunc(this.createPage.bind(this));
        this._currentPage.runAction(cc.Sequence.create(action1,cb));
        if (this._leftPage)
            this._leftPage.runAction(action2);
        if (this._rightPage)
            this._rightPage.runAction(action3);
    },

    createPage:function() 
    {
        if (this._currentPage) {
            this._currentPage.removeFromParent(true);
            this._currentPage = null;
        }

        if (this._leftPage) {
            this._leftPage.removeFromParent(true);
            this._leftPage = null;
        }

        if (this._rightPage) {
            this._rightPage.removeFromParent(true);
            this._rightPage = null;
        }

        this._currentPage = this.createSheet(this._currentCount);
        this.addChild(this._currentPage);
        this._currentPage.x = 0;

        if (this._pageNum < 2)
            return ;

        if (this._currentCount - 1 >= 0) {
            var leftNum = this._currentCount - 1;
            this._leftPage = this.createSheet(leftNum);
            this.addChild(this._leftPage);
            this._leftPage.x = -cc.winSize.width * 0.87;
        }

        if (this._currentCount + 1 <= this._pageNum - 1) {
            var rightNum = this._currentCount + 1;
            this._rightPage = this.createSheet(rightNum);
            this.addChild(this._rightPage);
            this._rightPage.x = cc.winSize.width * 0.87;
        }
    },

    createSheet:function(count) {
        if (count == 0) {
            var node = this.createFirstSheet();
        }
        else if (count == 1) {
            var node = this.createSecondSheet();
        }
        return node;
    },

    createFirstSheet:function() {
        var node = new cc.Node();

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat",
            "gameID":"10001","pic":resMain.game_baijiale});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.23;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat1",
            "gameID":"10001","pic":resMain.game_21dian});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.5;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat2",
            "gameID":"10001","pic":resMain.game_777});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.77;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        return node;
    },

    createSecondSheet:function() {
        var node = new cc.Node();

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat3",
            "gameID":"10001","pic":resMain.game_21dian});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.23;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat4",
            "gameID":"10001","pic":resMain.game_baijiale});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.5;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        var enterBtn1 = new D_EnterSG({"gameName":"Baccarat5",
            "gameID":"10001","pic":resMain.game_777});
        node.addChild(enterBtn1);
        enterBtn1.x = cc.winSize.width * 0.77;
        enterBtn1.y = cc.winSize.height * 0.5 + 40;

        return node;
    },

	onExit:function(argument) 
    {
		this._super();
	}
});