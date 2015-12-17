/**********************
 *  JsSend.js
 *  客户端通信模块 Js发给其他ios或者安卓
 *
 *  For GameFramework
 *  Created by Dean on 15/10/10
 **********************/

var JsSend = JsSend || {};

// eg : 从js发送到java
JsSend.SendData = function (data) {
    jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
        "umengpaycount", "(Ljava/lang/String;)V", data);
}

JsSend.LoginGame = function (data) {
	if (cc.sys.os == cc.sys.OS_IOS) {

    }
    else if (cc.sys.os == cc.sys.OS_ANDROID) {
    	jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", 
        	"LoginGame", "(Ljava/lang/String;)V", data);
    }
}