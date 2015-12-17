/**********************
 *  PagePoint.js
 *  PageView配套显示第几页的点
 *
 * 
 *  For GameFramework
 *  Created by Dean on 15/10/22
 **********************/
var PagePoint = cc.Node.extend({

    _pointList : [],

    _totalCount : 1,
    _currentCount : 0,
    _currentPoint : null,

	ctor:function(count) {
		this._super();

        if (count < 1)
            return ;

        this._totalCount = count || this._totalCount;
	},

	onEnter:function() {
		this._super();

        if (this._totalCount < 1)
            return ;

        this.createPoint();
	},

    createPoint:function() {

        for (var i = 0; i < this._totalCount; i++) {
            var tempSpr = new cc.Sprite(resMain.hallpage_11);
            this.addChild(tempSpr);
            var w = tempSpr.width * 1.5;
            tempSpr.x = -(this._totalCount - 1) * 0.5 * w + w * i;
            tempSpr.y = 0;

            this._pointList.push(tempSpr.x);
        };

        this.changePoint(this._currentCount);
    },

    changePoint:function(count) {
        if (this._pointList[count] == null) 
            return ;
        
        this._currentCount = count;
        if (this._currentPoint) 
            this._currentPoint.removeFromParent(true);

        var posX = this._pointList[this._currentCount];

        this._currentPoint = new cc.Sprite(resMain.hallpage_1);
        this.addChild(this._currentPoint);
        this._currentPoint.x = posX;
    },

	onExit:function(argument) 
    {
		this._super();
	}
});