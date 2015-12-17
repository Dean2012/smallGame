/**********************
 *  ColorfulLabel.js
 *  彩色字体
 *  一段文字显示多种颜色
 *
 *  arg [{text:"",color:"",size:"",font:""},..]
 *  
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ColorfulLabel = cc.Node.extend({

    _content:null,
    _width:0,
    _height:0,
    _temp_width:0,

    _labelList:[],

    _default_size : 16,
    _default_text : "text",

    ctor:function(arg) {
        this._super();

        if (arg.length <= 0) {
            return ;
        };

        this._content = arg;
        this._temp_width = 0;
        this._labelList = [];

        for (var i = 0; i < this._content.length; i++) {
            var _each_content = this._content[i];
            if (!_each_content.text) 
                continue;

            this.addLabel(_each_content);
        };
    },

    addLabel:function(argument) {
        var _text = argument["text"] || this._default_text;
        var _color = argument["color"] || MyColor.WHITE;
        var _size = argument["size"] || this._default_size;
        var _font = argument["font"] || "Arial";

        var _label = new Label(_text, null, 0, [{color:_color,size:_size}]);
        this.addChild(_label);
        _label.setPos(this._temp_width + 10, 0);
        this._labelList.push(_label);

        this._temp_width += (_label.getWidth() + 10);
        this._height = this._height > _label.getHeight() ? this._height : _label.getWidth();
    },

    // [""，""] 
    setString:function(content) {
        this._temp_width = 0;

        for (var i = 0; i < content.length; i++) {
            var _each_content = content[i];
            if (!_each_content) 
                continue;

            this.updateLabel(_each_content, i);
        };
    },

    updateLabel:function(argument, count) {
        if (!this._labelList[count])
            return ;

        var _text = argument || this._default_text;
        var _label = this._labelList[count];
        _label.setString(_text);
        _label.setPos(this._temp_width, 0);

        this._temp_width += _label.getWidth();
    },

    getWidth:function() {
        this._width = this._temp_width == 0 ? this._width : this._temp_width;
        return this._width;
    },

    getHeight:function() {
        return this._height;
    },

    onExit:function() {
        this._super();

    }
});