/**
 * 网络通信管理器
 * 
 * @author Dean
 */
var NetManager = NetManager || {};

NetManager.socketConnect = null;

// 网络连接 网络重连
NetManager.init = function(IP,func)
{
    NetManager.closeSocket();
    var gcIP = IP || GC.IP;

    // 是否重连判断
    NetManager.socketConnect = new SocketConnect(gcIP,func);
};

NetManager.closeSocket = function()
{
	if(NetManager.socketConnect)
	{
		NetManager.socketConnect.close();
		NetManager.socketConnect = null;
	}
};

NetManager.reconnect = function()
{
	
};
/**
 * 推送消息 注意：需手动移除，避免内存泄漏！
*/
NetManager.addPushListener = function(code,func,bHide)
{
	cc.log('推送消息 监听:code='+code);
	if(NetManager.socketConnect)
		NetManager.socketConnect.addCallBack(code,func,true,bHide);
};

NetManager.removePushListener = function(code)
{
	cc.log('推送消息 移除:code='+code);
	NetManager.socketConnect.removeCallBack(code);
};

NetManager.resHeartBeat = function(func)
{
	if(NetManager.socketConnect)
	{
		var data = {'code':OpCode.REVHEARTBEAT,'data':null};
		NetManager.socketConnect.sendMsg(data,func,true);
	}
};

NetManager.tableEnter = function(func, sid ,token)
{
	cc.log('请求进入桌子');
	var data = {'sid':sid.toString(),'token':token.toString()};
	NetManager.socketConnect.sendMsg(OpCode.TABLE_NTER,data,func);
}; 

NetManager.bjlBet = function(func, tid, rn, bet)
{
	cc.log('百家乐请求押注');
	var data = {'tid':tid,'rn':rn ,'b':bet};
	NetManager.socketConnect.sendMsg(OpCode.TABLE_BAL_BET,data,func);
};  

NetManager.bjlCharge = function(func, tid, pos)
{
	cc.log('百家乐请求换座');
	var data = {'tid':tid,'pos':pos};
	NetManager.socketConnect.sendMsg(OpCode.TABLE_BAL_CHARGE,data,func);
}; 

NetManager.bjlRecord = function(func, tid)
{
	cc.log('百家乐请求录单');
	var data = {'tid':tid};
	NetManager.socketConnect.sendMsg(OpCode.TABLE_BAL_RECODE,data,func);
}; 

NetManager.bjlLeverTable = function(func, tid)
{
	cc.log('百家乐请求离开桌子');
	var data = {'tid':tid};
	NetManager.socketConnect.sendMsg(OpCode.TABLE_BAL_LEAVE,data,func);
}; 

NetManager.bjlChargeTable = function(func, tid)
{
	cc.log('百家乐请求换桌');
	var data = {'tid':tid};
	NetManager.socketConnect.sendMsg(OpCode.BAL_CHARGE_TABLE,data,func);
}; 

NetManager.chatSendMsg = function(func, tid , msg)
{
	cc.log('聊天信息请求');
	var data = {tid:'tid','msg':msg};
	NetManager.socketConnect.sendMsg(OpCode.CHAT_SEND_MSG,data,func);
}; 

NetManager.chatSendFace = function(func, tid , msg)
{
	cc.log('聊天表情请求');
	var data = {tid:'tid','msg':msg};
	NetManager.socketConnect.sendMsg(OpCode.CHAT_SEND_FACE,data,func);
}; 

NetManager.boxReceive = function(func)
{
	cc.log('宝箱在线奖励领取');
	var data = {};
	NetManager.socketConnect.sendMsg(OpCode.BOX_RECEIVE,data,func);
}; 

NetManager.mutualSendGift = function(func,tid,arr)
{
	cc.log('互动赠送礼物');
	var data = {'tid':tid,'karr':arr};
	NetManager.socketConnect.sendMsg(OpCode.MUTUAL_SEND_GIFT,data,func);
}; 