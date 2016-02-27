/**********************
 *  PDataLayer.js
 *  数据层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var PDataLayer = D_Layer.extend({
    _picBtn : null,
    _puzzleBtn : null,

    _curTag : null,
    ctor:function(selectedTag) {
        this._super();

        this._curTag = selectedTag ? selectedTag : 1;
    },

    onEnter:function() {
        this._super();

        var json = ccs.load("res/PDataLayer.json");
        this.addChild(json.node);

        this._picBtn = json.node.getChildByTag(1);
        this._picBtn.addTouchEventListener(this.cbFunc.bind(this), this);
        this._puzzleBtn = json.node.getChildByTag(2);
        this._puzzleBtn.addTouchEventListener(this.cbFunc.bind(this), this);

        this.showBtn();
    },

    onExit:function() {
        this._super();

    },

    showBtn:function(tag) {
        if (tag)
            this._curTag = tag;

        if (this._curTag == PIC_TAG) {
            this._picBtn.setColor(cc.color(MyColor.RED));
            this._puzzleBtn.setColor(cc.color(MyColor.GRAY));
        }
        else if (this._curTag == PUZZLE_TAG) {
            this._puzzleBtn.setColor(cc.color(MyColor.RED));
            this._picBtn.setColor(cc.color(MyColor.GRAY));
        }
        else {

        }
    },

    cbFunc:function(render, type) {
        // D_log.tip("button cbFunc " + type + " " + render);

        // ccui.Widget.TOUCH_BEGAN = 0;
        // ccui.Widget.TOUCH_MOVED = 1;
        // ccui.Widget.TOUCH_ENDED = 2;
        // ccui.Widget.TOUCH_CANCELED = 3;
        var tag = render.getTag();

        if (ccui.Widget.TOUCH_BEGAN == type) {
            D_log.tip("TOUCH_BEGAN ");
        }
        else if (ccui.Widget.TOUCH_MOVED == type) {
            D_log.tip("TOUCH_MOVED ");
        }
        else if (ccui.Widget.TOUCH_ENDED == type) {
            D_log.tip("TOUCH_ENDED tag = " + tag);
            this._curTag = tag;
            this.getParent().showLayer(tag);
            this.showBtn();
        }
        else if (ccui.Widget.TOUCH_CANCELED == type) {
            D_log.tip("TOUCH_CANCELED ");
        }
    },

});