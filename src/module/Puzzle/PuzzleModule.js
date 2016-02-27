/**********************
 *  PuzzleModule.js
 *  切僵尸模块
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var PuzzleModule = BaseModule.extend({
    ctor:function() {
        this._moduleName = ClientName.PUZZLE_SCENE;
        this._moduleRes = resPuzzle;

        this._super();
    }
});