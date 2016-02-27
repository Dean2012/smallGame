/**********************
 *  ZombieModule.js
 *  切僵尸模块
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ZombieModule = BaseModule.extend({
    ctor:function() {
        this._moduleName = ClientName.ZOMBIE_SCENE;
        this._moduleRes = resZombie;

        this._super();
    }
});