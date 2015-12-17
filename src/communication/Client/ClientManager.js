/**********************
 *  ClientManager.js
 *  客户端通信模块
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var ClientManager = ClientManager || {};

ClientManager.tbNotice = {};

/**bClear:true自动移除*/
ClientManager.addNotice = function(noticeName,cbFunc,bClear)
{
    if(!cbFunc) {
        D_component.tipMsgManager(TipType.FT_TXT, "cbFunc 不存在"); 
        return;
    }

    cbFunc.bClear = bClear;
    var cbFuncs = ClientManager.tbNotice[noticeName];
    if(!cbFuncs) {
        cbFuncs = [];
        ClientManager.tbNotice[noticeName] = cbFuncs;
    }
    if(-1==cbFuncs.indexOf(cbFunc))
        cbFuncs.push(cbFunc);
};

ClientManager.removeNotice = function(noticeName,cbFunc)
{
    if(null == cbFunc) {
        D_component.tipMsgManager(TipType.FT_TXT, "cbFunc 不存在"); 
        return;
    }

    var cbFuncs = ClientManager.tbNotice[noticeName];
    if(null == cbFuncs)
        return;

    for(var i in cbFuncs)
    {
        var func = cbFuncs[i];
        if(func == cbFunc)
        {
            cbFuncs.splice(i,1);
            break;
        }
    }
};

ClientManager.sendNotice = function(noticeName,locData)
{
    var cbFuncs = ClientManager.tbNotice[noticeName];
    if(null == cbFuncs)
        return;

    for(var idx=cbFuncs.length-1; idx>=0; --idx)
    {
        var func = cbFuncs[idx];
        func(locData);
        if(func.bClear)
        {
            cbFuncs.splice(idx,1);
            func.bClear = false;
        }
    }
};