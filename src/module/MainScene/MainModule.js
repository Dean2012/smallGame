/**********************
 *  MainModule.js
 *  主页面模块类
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var MainModule = BaseModule.extend({
    ctor:function() {
        this._moduleName = ClientName.MAIN_SCENE;//"MainScene";
        this._moduleRes = resMain;

        this._super();
    }
});