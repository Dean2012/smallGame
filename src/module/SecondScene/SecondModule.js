/**********************
 *  SecondModule.js
 *  测试用第二个场景模块
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var SecondModule = BaseModule.extend({
    ctor:function() {
        this._moduleName = ClientName.SECOND_SCENE;
//        this._moduleRes = resSecond;

        this._super();
    }
});