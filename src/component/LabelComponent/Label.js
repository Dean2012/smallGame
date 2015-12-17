/**
 * 多字体文本
 * 注意：this.updateX()，更新x坐标
 * eg:
 * '世界，+1234567890'，将分为两段：中文使用 汉仪粗圆简，数字使用 Arial；
 * Created by pj on 2014/12/23.
 */
var Label = cc.Node.extend({

    content : null,
    w : 0,
    h : 0,
    lw : 0,
    oldX:0,
    defParams:null,
    defStr:' ',
    spacing:2,
    
    /**
     * params:可选参数，与每段字体对应，eg:[{color:'#ffffff',size:30}]
     *        后段不设，将使用defParams
     * defParams：[中文，字母]
     */
    ctor:function(str,params,anchorX,defParams,spacing)
    {
        this._super();
        this.anchorX = anchorX || this.anchorX;
        this.spacing = spacing || this.spacing;

        this.defParams = [];
        if(defParams)
            this.setParams(defParams);
        else
            this.setParams([{color:MyColor.WHITE,size:30}]);

        this.update(str,params);
    },

    setParams: function (params)
    {
        if(params)
        {
            if(params[0])
                this.defParams[0] = params[0];

            if(params[1])
                this.defParams[1] = params[1];
            else
                this.defParams[1] = params[0];
        }
    },
    
    update:function(str,params)
    {
    	this.defStr = str || this.defStr;
        this.setParams(params);

        if(this.content)
            this.removeChild(this.content,true);

        this.content = new cc.Sprite();
        this.addChild(this.content);
        var idxParam = 0;
        var text = '';
        var font = GC.FONT;
        var bcn = false;
        var bWrap = false;
        var len = this.defStr.length;
        var lw = 0;
        var lh = parseInt(this.defParams[0].size)+this.spacing;
        this.w = 0;
        this.h = 0;
        for(var i=0; i< len; ++i)
        {
            var code = this.defStr.charCodeAt(i);
            var bn = (code==10);
            if(code>=0x4e00 && code<=0x9fa5)
            {
                if(bcn && !bn)
                    text += this.defStr[i];
                else {
                    bcn = true;

                    if(params)
                    	var param = params[idxParam];

                    var lbl = this.addLabel(text,font,param,lw,this.h);

                    if(lbl)
                        lw += lbl.width;

                    if(text)
                        ++idxParam;

                    if(bn) {
                    	bWrap = true;
                        if(this.w < lw)
                            this.w = lw;
                        this.h += lh;
                        lw = 0;
                        text = '';
                    }
                    else
                        text = this.defStr[i];

                    font = GC.FONT_HYCYJ;
                }
            }
            else {
                if(bcn || bn) {
                    bcn = false;

                    if(params)
                    	param = params[idxParam];
                    lbl = this.addLabel(text,font,param,lw,this.h);

                    if(lbl)
                        lw += lbl.width;

                    if(bn) {
                    	bWrap = true;
                    	if(this.w < lw)
                            this.w = lw;
                        this.h += lh;
                        //Logger.tip('LabelFonts:..!cn',this.h,lbl.height,this.spacing);
                        lw = 0;
                        text = '';
                    }
                    else
                        text = this.defStr[i];

                    font = GC.FONT;
                    ++idxParam;
                }
                else {
                    text += this.defStr[i];
                }
            }
        }
        if(params)
        	param = params[idxParam];

        lbl = this.addLabel(text,font,param,lw,this.h);

        if(lbl) {
            lw += lbl.width;
            if(this.w < lw)
                this.w = lw;
            this.h += lh;
        }
        this.h -= this.spacing;

        if(bWrap)
        	this.content.y += this.h/2;

        this.updateX();
    },

    addLabel: function (text,font,param,w,h)
    {
        if(!text)
            return null;
        
        if(param == null)
        {
        	if(font == GC.FONT_HYCYJ)
        		param = this.defParams[0];
        	else
        		param = this.defParams[1];
        }

        var lbl = new cc.LabelTTF(text, font, param.size);
        lbl.anchorX = 0;
        lbl.anchorY = 0.5;
        lbl.setFontName(font);
        
        if(!param.color)
            lbl.setColor(cc.color(MyColor.WHITE));
        else {
            if(typeof(param.color) == 'object')
                lbl.setColor(param.color);
            else
                lbl.setColor(cc.color(param.color));
        }

        lbl.x = w;
        lbl.y = -h;
        this.content.addChild(lbl);
        return lbl;
    },

    setString:function(newStr) 
    {
        this.update(newStr);
    },

    setPos:function(x, y) 
    {
        var _x = x || 0;
        var _y = y || 0;

        this.updateX(_x);
        this.y = _y;
    },

    updateX:function(x)
    {
    	this.x = x || this.oldX;
        this.oldX = this.x;
    	this.x -= this.getWidth()*this.anchorX;
        //cc.log('LabelFonts:: this.getWidth', this.getWidth(), this.anchorX,this.x);
    },

    getWidth:function()
    {
        return this.w;
    },

    getHeight:function()
    {
        return this.h;
    }
});