/**********************
 *  D_EnterSG.js
 *  小游戏的入口
 *
 *  arg : {"gameName":""}
 * 
 *  Created by Dean on 15/8/15.
 **********************/

var D_EnterSG = cc.Node.extend({

    _data_button : null,
    _data_child : null,

    _button : null,
    
    _gameName : null,
    _gameID : null,

    ctor:function(arg) 
    {
        this._super();

        this._arg = arg;
    },

    onEnter:function() 
    {
        this._super();

        if (this._arg)
            this.initData(this._arg);
        else
            D_log.tip("进入小游戏 数据错误");
    },

    initData:function() 
    {
        this._gameName = this._arg["gameName"] || null;
        this._gameID = this._arg["gameID"] || null;
        this._pic = this._arg["pic"] || resMain.game_baijiale;

        if (!this._gameName || !this._gameID) {
            D_log.tip("进入未知小游戏");
            return ;
        };

        D_log.tip(this._gameName + " IN");

        var _listener = EventComponent.registerCustomEvent(this._gameName,this.btnFunc.bind(this));
        cc.eventManager.addListener(_listener, this);
        
        this.initButton(this._pic);
    },

    initButton:function(pic) 
    {
        var button = new D_Button(pic);
        this.addChild(button);
        button.setButtonTouch({"msg":this._gameName});
        button.setScaleNum(0.96);
        // button.setButonText({"text":"进入百家乐","size":20});
    },

    btnFunc:function() 
    {
        ShortConnection.GetServerList(this.getData.bind(this), "bjl");
    },

    getData:function(data)
    {
        cc.log("getData " + data);
        if (!data)
            return ;
        
        var _gameName = this._gameName;
        var _gameID = this._gameID;
        var _gameData = data;

        if (SaveData.checkJsList(_gameName)) {
            GameEnterManager.gameEnter(_gameName, _gameData);
            return ;
        }

        // 真实环境
        this.loadJs(_gameName, _gameData);
    },

    loadJs:function(gameName, _gameData) 
    {
        var tempThis = this;
        var path = "src/smallGame/" + gameName + "/" + gameName + "JsFiles.js";
        cc.loader.loadJs([path], function() { 
            var jsFilesPath = eval(gameName + "JsFiles");
            cc.loader.loadJs(jsFilesPath, function() { 
                GameEnterManager.gameEnter(gameName, _gameData);
            }); 
        }); 
    },

    onExit:function() 
    {
        this._super();
    }
});