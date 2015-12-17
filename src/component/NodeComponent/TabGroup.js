/**
 *      var tab = new TabGroup(buttons,callback);// 1.子button数组 ，2.点击回调函数 ，3.normal图片 ，4. choose图片，5.子按钮间隔 ，6. 是否是横向
 *	    this.addChild(tab);
 * 
 */

var TabGroup = cc.Node.extend({
    nodes:null,
    buttons:null,
    ctor: function (_nodes,_callback,_normal,_choose,_gap,_isHorizontal) {
        this._super();
        this.setName("tabGroup");
        this.nodes = _nodes;
        this.callback = _callback;

        this.isHorizontal = _isHorizontal;
        if(null == this.isHorizontal) this.isHorizontal = false;

        this.gap = _gap;
        if(null == this.gap) this.gap = -20;

        this._common = _normal;
        if(null == this._common) this._common = res.commonTabNormal;

        this._choose = _choose;
        if(null == this._choose) this._choose = res.commonTabChoose;
        
        this.init();
    },
    init:function(){
    	if(this.nodes == null)  return;
    	var length = this.nodes.length;

        var listener = cc.EventListener.create({
        	event: cc.EventListener.TOUCH_ONE_BY_ONE,
        	swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞掉事件，不再向下传递。
            isClicked:false,
        	onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件处理回调函数
        		var target = event.getCurrentTarget().bg;  // 获取事件所绑定的 target, 通常是cc.Node及其子类
        		var locationInNode = target.convertToNodeSpace(touch.getLocation());
        		var s = target.getContentSize();
        		var rect = cc.rect(0,0, s.width, s.height);
        		if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
        			target.setScale(0.95);
                    isClicked = true;
        			return true;
        		}
        		return false;
        	},
        	onTouchEnded: function (touch, event) {         // 实现onTouchEnded事件处理回调函数
        		var target = event.getCurrentTarget().bg;
        		target.setScale(1.0);

                var locationInNode = target.convertToNodeSpace(touch.getLocation());
                var s = target.getContentSize();
                var rect = cc.rect(0,0, s.width, s.height);
                if (isClicked) {
                    if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                        isClicked = false;
                        var name = target.getName();
                        this.changeState(name);
                        if(null != this.callback){
                            this.callback(name);
                        }
                        // NoticeManager.sendNotice(NoticeName.BTN_CLICK);
                        return true;
                    }
                };
            }.bind(this)
        });
        this.buttons =[];
        for(var i = 0; i < length ; i++ )
        {
        	if(null == this.nodes[i].name) 
        	{
        		this.nodes[i].name = i;
        	}
        	if(null == this.nodes[i].x) this.nodes[i].x=0;
        	if(null == this.nodes[i].y) this.nodes[i].y=0;
        	if(null == this.nodes[i].tx) this.nodes[i].tx=0;
        	if(null == this.nodes[i].ty) this.nodes[i].ty=0;
        	if(null == this.nodes[i].common) this.nodes[i].common = this._common;
        	if(null == this.nodes[i].choose) this.nodes[i].choose = this._choose;
        	
        	this.buttons[i] = new TabButtonBase(this.nodes[i]);
              if(true == this.isHorizontal){
            	  this.buttons[i].x = this.nodes[i].x ;
                  this.buttons[i].y = this.nodes[i].y + i*(this.gap + this.buttons[i].getHeight());

              }else{
            	  this.buttons[i].x = this.nodes[i].x + i*(this.gap + this.buttons[i].getWidth());
            	  this.buttons[i].y = this.nodes[i].y;
              }
              this.buttons[i].setName('tabButtonBase'+i);
              this.addChild(this.buttons[i],5);

              cc.eventManager.addListener(listener.clone(), this.buttons[i]);
              this.itemWidth = this.buttons[i].getWidth()*i + (i+1)*this.gap;
        }
        this.buttons[0].changeState(true);
        this.itemHeight = this.buttons[0].getHeight();
    },
    changeState:function(name){
    	var length = this.buttons.length;
    	for(var i = 0; i < length ; i++ )
    	{
//    		cc.log('name = '+name+'----------'+'this.buttons[i].name'+this.buttons[i].name);
    		if(name == this.buttons[i].name) {
//    			cc.log('切换   tab');
    			this.buttons[i].changeState(true);
    		}
    		else this.buttons[i].changeState(false);
    	}
    },
    getChildByNum:function(num) 
    {   
        if (!this.buttons[num])
            return ;
        return this.buttons[num];
    },
    setCallback:function(_func){
    	this.callback = _func;
    },
    setTabSrc:function(_common,_choose){
    	this._common = _common;
    	this._choose = _choose;
    },
    getWidth:function(){
    	return this.itemWidth;
    },
    getHeight:function(){
    	return this.itemHeight;
    }
});
