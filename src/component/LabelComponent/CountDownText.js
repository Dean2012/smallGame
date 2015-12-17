/**
 * 倒计时
 * 设置x坐标：this.updateX();
 * Created by pj on 2015/1/4.
 */
var CountDownType = CountDownType || {};
CountDownType.TIMES = [86400,3600,60,1];
/**hh:mm:ss hh 不会为00，会超过24*/
CountDownType.NUM = 0;
/**时分秒 时不会为00，会超过24*/
CountDownType.CN = 1;
/**天/时/分/秒*/
CountDownType.CN_SHORT = 2;
/**mm:ss mm&ss会为00*/
CountDownType.NUM_SHORT = 3;
/**hh:mm:ss hh 不会为00，会超过24*/
CountDownType.NUM_LONG = 4;

var CountDownText = cc.Node.extend({

    lblTime:null,

    sec:0,
    type:0,
    cns:null,
    oldTime:null,
    cbComplete:null,//完成回调
    listenHide:null,
    listenShow:null,

    /**attr:{ensize:27,size:25,color:cc.color('#ff0000')}*/
    ctor: function (sec,type,attr,anchorX)
    {
        this._super();
        this.type = type || this.type;
        this.listenHide = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: cc.game.EVENT_HIDE,
            callback: this.gameHide.bind(this)
        });
        this.listenShow = cc.EventListener.create({
            event: cc.EventListener.CUSTOM,
            eventName: cc.game.EVENT_SHOW,
            callback: this.gameShow.bind(this)
        });
//        cc.eventManager.addListener(this.listenHide, 1);
//      cc.eventManager.addListener(this.listenShow, 1);
        cc.eventManager.addListener(this.listenHide, this);
        cc.eventManager.addListener(this.listenShow, this);

        this.cns = [VoManager.getLocalizedString(14),VoManager.getLocalizedString(15),VoManager.getLocalizedString(16),VoManager.getLocalizedString(17)];

        this.anchorX = anchorX || this.anchorX;
        //Logger.tip('countDownText:',this.anchorX,this.anchorY);
        this.initLabel(attr);
        this.initTime(sec,type);
    },
    initTime: function (sec,type)
    {
        if(sec==null)
            return;

        this.unscheduleAllCallbacks();

        sec = (sec>0) ? sec : 0;
        this.type = type || this.type;
        this.sec = sec;
        switch (this.type)
        {
            case CountDownType.NUM:
                //this.sec = sec%CountDownType.TIMES[0];
                this.schedule(this.updateNum.bind(this),1);
                this.updateNum();
                break;

            case CountDownType.CN:
                this.schedule(this.updateCn.bind(this),1);
                this.updateCn();
                break;

            case CountDownType.CN_SHORT:
                this.schedule(this.updateCnShort.bind(this),1);
                this.updateCnShort();
                break;
                
            case CountDownType.NUM_SHORT:
            	this.schedule(this.updateNumShort.bind(this),1);
            	this.updateNumShort();
            	break;
            	
            case CountDownType.NUM_LONG:
            	this.schedule(this.updateNumLong.bind(this),1);
            	this.updateNumLong();
            	break;	
        }

        this.updateX();
    },
    initLabel: function (attr)
    {
        if(attr)
        {
            var size = attr.size || 25;
            var color = attr.color || cc.color(MyColor.WHITE);
        }
        else
        {
            size = 25;
            color = cc.color(MyColor.WHITE);
            attr = {size:size,color:color};
        }
        if(!this.lblTime)
        {
        	var ensize = attr.ensize || size;
        	this.lblTime = new Label('0',null,0.5,[{color:color,size:size}]);
        }

        this.addChild(this.lblTime);
    },
    updateNum: function ()
    {
        var times = CountDownType.TIMES;
        var len = times.length;
        var sec = this.sec;
        var res = '';
        for(var i=1; i<len; ++i)
        {
        	var num = sec/times[i];
            num = Math.floor(num);
            sec -= num*times[i];
            if(num>0){
	            num = (num<=9)? '0'+num : num;
	            res += num+':';
            }
        }
        res = res.substr(0,res.length-1);
        this.lblTime.update(res);
        //Logger.tip(res,this.sec);
        this.reduce();
    },
    updateNumLong: function ()
    {
    	var times = CountDownType.TIMES;
    	var len = times.length;
    	var sec = this.sec;
    	var res = '';
    	for(var i=1; i<len; ++i)
    	{
    		var num = sec/times[i];
    		num = Math.floor(num);
    		sec -= num*times[i];
			num = (num<=9)? '0'+num : num;
			res += num+':';
    	}
    	res = res.substr(0,res.length-1);
    	this.lblTime.update(res);
    	this.reduce();
    },
    updateCn: function ()
    {
        var times = CountDownType.TIMES;
        var len = times.length;
        var sec = this.sec;
        var res = '';
        for(var i=1; i<len; ++i)
        {
            var num = sec/times[i];
            num = Math.floor(num);
            if(num <= 0)
                continue;
            sec -= num*times[i];
            num = (num<=9)? '0'+num : num;
            res += num+this.cns[i];
        }
        this.lblTime.update(res);

        this.reduce();
    },
    updateCnShort: function ()
    {
        var times = CountDownType.TIMES;
        var len = times.length;
        var res = '';
        for(var i=0; i<len; ++i)
        {
            var num = this.sec/times[i];
            num = Math.floor(num);
            if(num > 0)
            {
                num = (num<=9)? '0'+num : num;
                res = num+this.cns[i];
                break;
            }
        }
        this.lblTime.update(res);

        this.reduce();
    },
    updateNumShort: function ()
    {
    	var times = CountDownType.TIMES;
    	var len = times.length;
    	var sec = this.sec;
    	var res = '';
    	for(var i=2; i<len; ++i)
    	{
    		var num = sec/times[i];
    		num = Math.floor(num);
    		sec -= num*times[i];
//    		num = (num<=9)? '0'+num : num;
    		res += num+':';
    	}
    	res = res.substr(0,res.length-1);
    	this.lblTime.update(res);

    	this.reduce();
    },
    reduce: function ()
    {
        --this.sec;
        if(this.sec >= 0)
            return;

       this.complete();
    },
    complete: function ()
    {
        this.unscheduleAllCallbacks();
        if(this.cbComplete)
            this.cbComplete();
    },
    gameHide: function ()
    {
        this.oldTime = new Date();
        cc.log('进入后台 this.oldTime=',this.oldTime);
    },
    gameShow: function ()
    {
        var gap = new Date() - this.oldTime;
        if(gap < 0)
        	gap = 1000;
        this.sec -= gap/1000;
        cc.log('恢复显示 gap=',gap);
    },
    updateX:function(x)
    {
        this.x = x || this.x;
        this.x -= this.getWidth()*this.anchorX;
    },
    getWidth:function()
    {
        return this.lblTime.getWidth();
    }
});