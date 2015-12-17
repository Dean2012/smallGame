/**********************
 *  BaseModule.js
 *  模块顶级类
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var BaseModule = cc.Class.extend({
    _moduleName : null,
    _moduleRes : null,
    // 初始化
    ctor:function(argument) {
        if (this._moduleName)
            ClientManager.addNotice(this._moduleName, this.showScene.bind(this));
        else
            D_component.tipMsgManager("场景注册失败！");
    },

    init:function(argument) {
        // body...
    },

    // 设置好名字可以直接回调切换场景
    showScene:function(data) {
        if (!this._moduleName) {
            D_log.tip("scene 不存在");
            D_component.tipMsgManager("scene 不存在！");
            return ;
        }
        D_log.tip("1", this._moduleName, this._moduleRes);

        var dt = data || null;
        var name = "new " + this._moduleName + "(" + dt + ")";
        var scene = eval(name);

        ModuleManager.lastModuleRes = ModuleManager.curModuleRes;
        ModuleManager.curModuleRes = this._moduleRes;

        this.replaceScene(scene);
    },

    // 手动切换场景
    replaceScene:function(scene) {
        if (!scene) {
            D_log.tip("scene 不存在");
            D_component.tipMsgManager("scene 不存在！");
            return ;
        }

//        加载资源
//        if (ModuleManager.curModuleRes)
//            HandleCache.loadResrouce(ModuleManager.curModuleRes);

//        卸载资源
//        if (ModuleManager.lastModuleRes)
//            HandleCache.unloadResrouce(ModuleManager.lastModuleRes);

        cc.director.runScene(scene);
    }
});