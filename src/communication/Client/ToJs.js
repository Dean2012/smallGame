/**********************
 *  ToJs.js
 *  客户端通信模块 从其他平台接手数据 
 *  必须要全局函数
 *
 *  For GameFramework
 *  Created by Dean on 15/10/10
 **********************/

// 从安卓或者IOS获得登陆信息 登录信息回调
function cbLogin(data) 
{

    // 获取数据转化
    if (cc.sys.os == cc.sys.OS_IOS) {

    }
    else if (cc.sys.os == cc.sys.OS_ANDROID) {

    }

    // todo: 处理数据

    // 数据初始化
    VoManager.baseVoInit(data);
    VoManager.loadXmlInit();
    if (GC.CS == 0) 
        VoManager.initProxy();
}
