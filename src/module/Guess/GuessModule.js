/**********************
 *  GuessModule.js
 *  主页面模块类
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var GuessModule = BaseModule.extend({
    ctor:function() {
        this._moduleName = ClientName.GUESS_SCENE;
        this._moduleRes = resGuess;

        this._super();
    }
});