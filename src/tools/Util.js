/**
 * 常用工具方法
 */ 

var Util = Util || {};

/**去除首尾空白*/
Util.trim=function(s){
	return s.replace(/(^\s*)|(\s*$)/g, "");
};

/**根据时间戳（秒）获得 "2015-4-25 12:30:21" */
Util.getTimeString = function(s)
{
	var time = new Date(parseInt(s)*1000);
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var seconds = time.getSeconds();	
	var timeString = year+'-'+month+'-'+day+' '+hour+':'+minute+':'+seconds;
	return timeString;
}

/**替换字符串中的参数，eg:Util.replaceStrParam("参数{0}，参数{1}",['一','二']);*/
Util.replaceStrParam=function(s,params)
{
	var i = 0;
	function test($1){
		$1=params[i++];
		return $1;
	}
	var reg=new RegExp("{\\d}","g");
	return s.replace(reg,test);
};

/**去除所有空格*/
Util.removeAllSpace = function(str){
	return str.replace(/\s+/g, "");
}

/**去除#*/
Util.trimJing = function(s)
{
    if(s[0] == '#')
        s = s.substring(1);
    return s;
};

/**根据字符长度设定自动换行*/
Util.textAutoWrap = function(str,charNum)
{
	var arr = str.split("");
	for( var j = arr.length - 1 ; j >= 0 ; j-- ){
		if( arr[j] == "\n" ){
			arr.splice(j, 1);
		}
	}
	var curWidth = 0;
	for( var i = 0  ; i < arr.length ; i++){
		var code = arr[i].charCodeAt(0);
		if(code>=0x4e00 && code<=0x9fa5){	//所有中文占两个字符
			curWidth += 2;
		}else{
			curWidth += 1;
		}
		if( curWidth >= charNum ){
			curWidth = 0;
			arr[i] = arr[i] + "\n";
		}
	}
	return arr.join("");
}

/**根据字符长度切割字符串*/
Util.textCut = function(str,charNum)
{
	var arr = str.split("");
	for( var j = arr.length - 1 ; j >= 0 ; j-- ){
		if( arr[j] == "\n" ){
			arr.splice(j, 1);
		}
	}
	var curWidth = 0;
	var str = '';
	var strArr = [];
	for( var i = 0  ; i < arr.length ; i++){
		var code = arr[i].charCodeAt(0);
		if(code>=0x4e00 && code<=0x9fa5){	//所有中文占两个字符
			curWidth += 2;
		}else{
			curWidth += 1;
		}
		str += arr[i];
		if( curWidth >= charNum ){
			curWidth = 0;
			strArr.push(str);
			str = '';
		}
	}
	if(str.length>0) strArr.push(str);
	return strArr;
}

//改变大于10000数字的显示
Util.getStrMillion = function(pNum) {
	var num = 0;
	if (pNum > 10000) {
		var bNum = parseInt(pNum/10000);
		var sNum = parseInt(((pNum/10000) - bNum)*10);
		num = sNum == 0 ? bNum + VoManager.getLocalizedString(31) : bNum + "." + sNum + VoManager.getLocalizedString(31);
	}
	else 
		num = pNum + "";
	return num;
}

Util.pushToLocalStorage = function(localStorageKey,value){
	var str = sys.localStorage.getItem(localStorageKey);
	if(str){
		var arr = str.split(':');
		arr.push(value);
		arr = arr.join(':');
		sys.localStorage.setItem(localStorageKey, arr);
	}else{
		sys.localStorage.setItem(localStorageKey, value);
	}
};

Util.shiftLocalStorage = function(localStorageKey) {
    var str = sys.localStorage.getItem(localStorageKey);
    if(str){
        var arr = str.split(':');
        var back = arr.shift();
        arr = arr.join(':');
        sys.localStorage.setItem(localStorageKey, arr);
        return back;
    }
};

Util.minute = 60;
Util.hour = 60*60;
Util.day = 60*60*24;

Util.getTimeText = function(time) {
	var _res = "";
	// 如果-1当成现在
	if (time == -1) {
		_res = VoManager.getLocalizedString(13007);
		return _res;
	};

	var _time = time < 0 ? -time : time;

	if (_time < Util.hour) {
		_time = parseInt(_time/Util.minute);
		_res = _time + VoManager.getLocalizedString(13003) + VoManager.getLocalizedString(13004);
	}
	else if (_time >= Util.hour && _time < Util.day) {
		_time = parseInt(_time/Util.hour);
		_res = _time + VoManager.getLocalizedString(13005) + VoManager.getLocalizedString(13004);
	}
	else {
		var time = new Date();
		var newTime = time.getTime() - _time*1000;
		var day = new Date(newTime);
		_res = day.getMonth() + VoManager.getLocalizedString(13006) + day.getDate() + VoManager.getLocalizedString(15);
	}
	return _res;
}

Util.getTimeNum = function(time) {
	var _res = "";
	var _time = time < 0 ? -time : time;

	if (_time >= Util.hour) {
		_res += parseInt(_time / Util.hour) + ":";
		_time = parseInt(_time % Util.hour);
	}

	if (_time > Util.minute && _time < Util.hour) {
		_res += parseInt(_time / Util.minute) + ":";
		_time = parseInt(_time % Util.minute);
	}
	else
		_res += "00:";

	if (_time <= Util.minute)
		_res += parseInt(_time);
	else
		_res += "00:";

	return _res;
}

Util.getTouXian = function(gold) {
	var list = VoManager.getSysItem("honor");
	var lastT = "";
	for (var i = 0; i < list.length; i++) {
		if (gold > list[i][0]) {
			lastT = list[i][1];
		}
		else
			break;
	};
	return lastT;
}

Util.getRandomNum = function(_max, _min) {
	var max = _max ? _max : 1;
	var min = _min ? _min : 0;
	var r = Math.random();
	var num = min + r*max;
	return parseInt(num);
}