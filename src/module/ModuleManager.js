/**********************
 *  ModuleManager.js
 *  模块管理类
 *  todo：现在注册一个新模块需要手动添加进这里，后期看看是否可以增加自动识别模块
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ModuleManager = ModuleManager || {};

ModuleManager.modules = [];

ModuleManager.curModuleRes = null;
ModuleManager.lastModuleRes = null;

ModuleManager.init = function()
{
    VoManager.loadXmlInit();

    // 注册模块
    var selfModule = [
        MainModule,
        SecondModule,
        GuessModule,
        ZombieModule,
        PuzzleModule
    ];

    // 加载所有模块类
    for(var i in selfModule)
    {
        var module = new selfModule[i]();
        ModuleManager.modules.push(module);
    }

    // // 注册资源
    // var resources = [];
    // // 加载所有资源
    // for (i in res)
    // {
    //     resources.push(res[i]);
    // }
};

