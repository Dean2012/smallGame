/**********************
 *  MainScene.js
 *  主页面场景
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var MainScene = D_Scene.extend({
    list : [],
    ctor:function() {
        this._super();

        this._SceneName = "MainScene";
    },

    onEnter:function() {
        this._super();

        var json = ccs.load("res/MainScene.json");
        this.addChild(json.node);

        var lv = json.node.getChildByTag(1);
        if (!lv) return ;
                            
        for (var i = 1; i <= lv.getChildrenCount(); i++) {
            var btn = lv.getChildByTag(i);
            if (!btn) continue;

            btn.addTouchEventListener(this.cbFunc.bind(this), this);
        };


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
            this.enterNextScene(tag);
        }
        else if (ccui.Widget.TOUCH_CANCELED == type) {
            D_log.tip("TOUCH_CANCELED ");
        }
    },

    enterNextScene:function(tag) {
        if (!tag) return;

        switch(tag) {
            case 1:
                cc.log("enterNextScene");
                ClientManager.sendNotice(ClientName.GUESS_SCENE);
                break;
            case 2:
                break;

            default:
                break;
        }
    },

    onExit:function() {
        this._super();

    }

});