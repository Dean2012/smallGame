/**
 * 短连接
 * @author Dean
 */ 

var ShortConnection = ShortConnection || {};

ShortConnection.statue = 0;
ShortConnection.url = "http://192.168.1.86:21111";
ShortConnection.cbFunc = null;

ShortConnection.cookie = null;
ShortConnection.getSB = false;

// Post 改服务器信息 Get 静态请求
ShortConnection.streamXHREventsToLabel = function(xhr, cb) {
    // events
    ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
        xhr["on" + eventname] = function () {
            // cc.log("Event : " + eventname);
        }
    });

    // event
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            cc.log("success code = " + xhr.status);
            // 登陆成功
            if (cb) {
                if (xhr.getResponseHeader("set-cookie"))
                    ShortConnection.cookie = xhr.getResponseHeader("set-cookie");

                typeof cb === 'function' && cb(xhr.responseText);
            }
        }
        else {
            // 登陆失败
            cc.log("fail code = " + xhr.status);
            ShortConnection.statue = RunningStatue.stop;
        }

        if (xhr.status == 403) {
            // 重新登录
            ShortConnection.LoginGame(cbLogin, GC.TOKEN);
        };
    }
}

ShortConnection.clearCookie = function() 
{
    ShortConnection.cookie = null;
}

ShortConnection.httpRequest = function(url, type)
{
    // 如果在运行阶段 不能重复调用
    if (ShortConnection.statue == RunningStatue.running) {
        cc.log("ShortConnection.httpRequest is running");
        return null;
    }

    // 测试 说明没有网络连接
    if (GC.CS == 1) {
        ShortConnection.cbFunc = cb;
        // todo : 手动补完 data数据格式和内容
        ShortConnection.getData();
        return ;
    };

    // 赋值运行状态
    ShortConnection.statue = RunningStatue.running;

    var _xhr = cc.loader.getXMLHttpRequest();
    var _cb = ShortConnection.getData;

    ShortConnection.streamXHREventsToLabel(_xhr, _cb);

    var _type = type || "POST"; //"POST" "GET"
    if (_type == "POST") 
        _xhr.open(_type, url);
    else
        _xhr.open(_type, url, true);

    // set cookie
    if (ShortConnection.cookie != null) 
        _xhr.setRequestHeader("Cookie", ShortConnection.cookie);

    // _xhr.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
    _xhr.timeout = 5000;
    return _xhr;
}

ShortConnection.getData = function(data) 
{
    cc.log("ShortConnection getData = " + data);
    // 恢复停止状态
    ShortConnection.statue = RunningStatue.stop;

    if (!data) {
        ShortConnection.cbFunc();
        return ;
    }
    
    var myData = JSON.parse(data);

    // todo : 检测错误码
    cc.log("ShortConnection err = " + myData.code);
    if (myData.code != 0) {
        if (myData.err)
            D_component.tipMsgManager(myData.err);

        ShortConnection.cbFunc(myData);
        return ;
    }

    // 获取小包
    if (ShortConnection.getSB) {
        ShortConnection.getSB = false;
        var proxy = VoManager.getProxy();
        proxy.OnlySmallBag();
        return;
    };

    if (ShortConnection.cbFunc && typeof ShortConnection.cbFunc == 'function') {
        ShortConnection.cbFunc(myData);
    };
}

// 登陆请求
ShortConnection.LoginGame = function(cb, token)
{
    var _args = "agency_token="+token;
    var _url = ShortConnection.url + "/api/user/login";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send(_args);
}

// 获取服务器列表
ShortConnection.GetServerList = function(cb, type)
{
    var _url = ShortConnection.url + "/api/server/serverlist?type=" + type;
    var _xhr = ShortConnection.httpRequest(_url, "GET", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}

// 大包请求
ShortConnection.HeartBeat = function(cb)
{
    var _url = ShortConnection.url + "/api/heartbeat/brief";
    var _xhr = ShortConnection.httpRequest(_url, "GET", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}

// 小包请求
ShortConnection.HBDetail = function(cb, arg)
{
    var _url = ShortConnection.url + "/api/heartbeat/detail?"+arg;
    var _xhr = ShortConnection.httpRequest(_url, "GET", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}

// 请求邮件
ShortConnection.getMail = function(cb, type, mb, num) 
{
    var _num = num == null ? 50 : num;

    var _str = "?t={0}&mb={1}&num={2}";
    var _arg = Util.replaceStrParam(_str, [type,mb,num]);
    var _url = ShortConnection.url + "/api/user/mailbox"+_arg;
    var _xhr = ShortConnection.httpRequest(_url, "GET", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}

// 打开邮件
ShortConnection.openMail = function(cb, id) 
{
    var _arg = "id="+id;
    var _url = ShortConnection.url + "/api/user/openmail";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    // 回调时调用小包
    ShortConnection.getSB = true;
    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send(_arg);
}

// 改性别
ShortConnection.changeSex = function(cb, gender) 
{
    var _arg = "gender="+parseInt(gender);
    var _url = ShortConnection.url + "/api/user/changegender";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    // 回调时调用小包
    ShortConnection.getSB = true;
    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send(_arg);
}

// 改头像
ShortConnection.changeIcon = function(cb, icon) 
{
    var _arg = "icon="+parseInt(icon);
    var _url = ShortConnection.url + "/api/user/changeicon";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    // 回调时调用小包
    ShortConnection.getSB = true;
    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send(_arg);
}

// 改名字
ShortConnection.changeName = function(cb, nick) 
{
    var _arg = "nick="+nick;
    var _url = ShortConnection.url + "/api/user/changenick";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    // 回调时调用小包
    ShortConnection.getSB = true;
    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send(_arg);
}

// 领取救济金
ShortConnection.takecarity = function(cb) 
{
    var _url = ShortConnection.url + "/api/user/takecarity";
    var _xhr = ShortConnection.httpRequest(_url, "POST", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}

// 获取签到信息
ShortConnection.getDailyInfo = function(cb) 
{
    var _url = ShortConnection.url + "/api/daily/info";
    var _xhr = ShortConnection.httpRequest(_url, "GET", cb);

    if (_xhr == null) return;
    if (cb) ShortConnection.cbFunc = cb;
    _xhr.send();
}