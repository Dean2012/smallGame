/**********************
 *  InitScene.js
 *  游戏初始场景 进行加载文件及其他预加载任务
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var InitScene = cc.Scene.extend({
    ctor:function() {
        this._super();

        this._SceneName = "InitScene";
    },

    onEnter:function() {
        this._super();

        //var FPSLabel = new cc.LabelTTF("000000", "Arial", 50);
        //this.addChild(FPSLabel);
        //FPSLabel.x = cc.winSize.width * 0.5;
        //FPSLabel.y = cc.winSize.height * 0.5;

        var tempThis = this;
        cc.loader.loadJs(["src/resource/jsFiles.js"], function (err)
        {
            cc.log("InitScene:...loadJs src/resource/jsFiles");
            cc.loader.loadJs(jsFiles, function (err)
            {
                cc.log("InitScene:...loadJs jsFiles");

                ModuleManager.init();
                // 想去的第一个场景
                ClientManager.sendNotice(ClientName.MAIN_SCENE);
            });
        });

//        assetsmanager

    },

    onExit:function() {
        this._super();

    }

});