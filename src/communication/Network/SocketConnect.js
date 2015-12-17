/**
 * socket连接
 * @author Dean
 */ 

 String.prototype.replaceAt = function (i, char) {
    return this.substr(0, i) + char + this.substr(i + char.length);
}

String.prototype.setCharAt = function(pos,replace) 
{
    var tmpArr = this.split('');
    tmpArr[pos] = replace;
    return tmpArr.join('');
}

var SocketConnect = cc.Class.extend({

	cbConnect:null,
	layerReq:null,
	socket:null,
	mPacketListenerList:null,

	key:'91kkwl',
	keyBase:null,
	keyCommand:null,
	keyBoss:null,
	
	ctor:function (host,cbConnect)
	{
		// this.addLayerReq();
		this.sockCt = 0;
		this.cbConnect = cbConnect;

		this.host = host;

		cc.log("host " + host);
		this.socket = new WebSocket('ws://'+host);
		this.socket.binaryType = "arraybuffer";
		this.mPacketListenerList = {};
		this.socket.onopen = this.onOpen.bind(this);
		this.socket.onmessage = this.onMessage.bind(this);
		this.socket.onclose = this.onClose.bind(this);
		this.socket.onerror = this.onError.bind(this);
	},

	/**bManual:true 需要手动移除*/
	addCallBack:function(code,func,bManual)
	{
		this.mPacketListenerList[code] = [func,bManual];
	},

	removeCallBack:function(code)
	{
		delete this.mPacketListenerList[code];
	},

	sendMsg:function(code,data,func)
	{
		var sock = this.socket;
//		code = 1001;
//		var data = {"token":"meiosis","serverid":"50001","name":"aaaa"};
		var dataString = "0000" + JSON.stringify(data);
		
		var msg = makePackage(code,dataString);

		cc.log("发送数据：code = "+code+"   length = " + dataString.length+"   data = "+JSON.stringify(data));
		sock.send(msg);
		this.addCallBack(code,func,false);

		// Util.umengEvent(data.code);
	},
	onOpen:function()
	{
		// this.removeLayerReq();
		cc.log('与服务器连接成功:...this.socket.readyState='+this.socket.readyState);//1 OPEN
		if(this.cbConnect)
		{
			this.cbConnect();
			this.cbConnect = null;
		}

	},
	onMessage:function(msg)
	{
		var uint8Array = new Uint8Array(msg.data);  
		
		var packlen = uint8Array[0];
		packlen += uint8Array[1] << 8;
		
		var code = uint8Array[2];
		code += uint8Array[3] << 8;
		cc.log("package length = "+packlen);
		cc.log("code = "+code);
		
		var dataUint8Array = uint8Array.subarray(4, uint8Array.length);
		var dataString = Utf8ArrayToStr(dataUint8Array);
		var data = JSON.parse(dataString);
		// this.removeLayerReq();
//		cc.log("接收数据:"+dataString);
		var cbs = this.mPacketListenerList[code];
		if(cbs)
		{
			cc.log("接收数据:"+dataString);
			/**{"code":0,"data":{"tid":"0","type":1}}
			 * code是错误嘛   这里统一做处理
			 * data是返回的数据
			 * */	
			//错误码处理
			this.errorMsg(data.code);
			if(!cbs[1])
				this.removeCallBack(code);
			
			if(cbs[0])
			{			
				cbs[0](data.data);
			}
		}
	},
	errorMsg:function(error)
	{
		if(error!=0){
			D_component.tipMsgManager(VoManager.getLocalizedString(error));
		}
//		switch (error)
//		{
//			
//		}
	},

	onError:function(e)
	{
		//1.ip错误，会触发两次,最终调用onClose
		cc.log("连接错误:...this.socket.readyState=, e.type="+e.type);//this.socket.readyState=2,error
//		NetManager.socketConnect = null;
	},

	onClose:function()
	{
		//1.前端ip错误；2,前端close; 3.服务器主动断开
		cc.log("连接中断:...this.socket.readyState=");//2
		if(NetManager.socketConnect)
		{
			NetManager.socketConnect = null;
			this.socket.onclose = function(){};
			if(this.socket.readyState = WebSocket.OPEN)
				this.socket.close();
			if(this.socketCommand)
			{
				this.socketCommand.onclose = function(){};
				if(this.socketCommand.readyState = WebSocket.OPEN)
					this.socketCommand.close();
			}
			if(this.socketBoss)
			{
				this.socketBoss.onclose = function(){};
				if(this.socketBoss.readyState = WebSocket.OPEN)
					this.socketBoss.close();
			}
			this.exit();
		}
	},

	addLayerReq: function ()
	{
		cc.log("addLayerReq:...this.layerReq="+this.layerReq);
		// this.removeLayerReq();
		this.layerReq = new RequestingLayer();
	},

	removeLayerReq: function ()
	{
		if(this.layerReq)
		{
			cc.log("removeLayerReq:...this.layerReq="+this.layerReq);
			this.layerReq.remove();
			this.layerReq = null;
		}
	},

	close: function ()
	{
		this.socket.onclose = function(){};
		this.socket.close();
	},

	exit: function ()
	{
		this.cbConnect = null;
		// this.removeLayerReq();

		// NetManager.reconnect();
	}
});
