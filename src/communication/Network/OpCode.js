/**
 * 网络通信协议
 * @author pj
 */ 
var OpCode = OpCode || {};

OpCode.SENDHEARTBEAT         = 19001;// #服务器向客户端发送心跳（客户端需要监听）
OpCode.REVHEARTBEAT          = 19002;// #服务接收客户端回复的心跳

//OpCode.GAMEE_NTER          = 1001;// 进入小游戏
OpCode.TABLE_NTER          			= 1001;// 百家乐进桌
OpCode.TABLE_BAL_BET        		= 1002;// 百家乐押注
OpCode.TABLE_BAL_CHARGE       		= 1003;// 百家乐换座位
OpCode.TABLE_BAL_RECODE      		= 1004;// 百家乐录单
OpCode.TABLE_BAL_LEAVE      		= 1005;// 百家乐离开桌子
OpCode.BAL_CHARGE_TABLE      		= 1006;// 百家乐换桌子

OpCode.TABLE_BAL_OTHER	    		= 10001;// 百家乐牌局广播
OpCode.TABLE_BAL_END    			= 10002;// 百家乐结束广播
OpCode.TABLE_BAL_START    			= 10003;// 百家乐开局广播
OpCode.TABLE_BAL_OTHER_ENTER		= 10004;// 百家乐玩家进入牌桌广播
OpCode.TABLE_BAL_OTHER_CHARGE		= 10005;// 百家乐玩家位置变更广播


OpCode.CHAT_SEND_MSG				= 1101;// 聊天信息发送请求
OpCode.CHAT_SEND_FACE				= 1102;// 聊天表情发送请求
OpCode.CHAT_RECEIVE					= 10006;// 聊天接受广播


OpCode.BOX_RECEIVE					= 1201;// 聊天信息发送请求

OpCode.MUTUAL_SEND_GIFT				= 1301;// 互动赠送礼物