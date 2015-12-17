/**
 * 数据序列化和反序列化
 * 
 * @author Dean
 */

var DataEncode = DataEncode || {};

// var msg = Util.removeAllSpace(JSON.stringify(data));
// cc.log("发送数据1:"+msg);
// msg = MyEncodeUtf8Bytes(msg);
// cc.log("发送数据2:"+msg);
// cc.log("长度:"+msg.byteLength);

// code 序列化
function MyEncodeUtf8Bytes(s1)
{
	var abf = ArrayBuffer(1024*1024);
	var bufView = new Uint8Array(abf);

	var i = 0;
	var windex = 0;

	var s = escape(s1);
	while (i < s.length) {
		if(s.substring(i, i+2) == "%u") {       	 
			var tmp = Hex2Utf8Ex(Str2Hex(s.substring(i+2,i+6)))
			for (var j = 0; j < tmp.length/2; j++) {
				c = tmp.substring(j*2, j*2+2);
				bufView[windex] = parseInt(c, 16);
				windex++;
			}
			i += 6;
		}
		else if (s.substring(i, i+1) == "%") {
			var c = s.substring(i+1,i+3);  
			bufView[windex] = parseInt(c, 16);
			windex++;
			i += 3;
		}
		else {
			var c = s[i].charCodeAt(0)
			b = parseInt(c, 10);
			bufView[windex] = b;
			windex++;
			i++;
		}
	}

	var buf = ArrayBuffer(windex);
	var bufView2 = new Uint8Array(buf);

	for (var i = 0; i < windex; i++) {
		bufView2[i] = bufView[i];
	};
	
	return buf;
}

function Str2Hex(s)
{
  var c = "";
  var n;
  var ss = "0123456789ABCDEF";
  var digS = "";
  for(var i = 0; i < s.length; i ++)
  {
     c = s.charAt(i);
     n = ss.indexOf(c);
     digS += Dec2Dig(eval(n));
       
  }
  //return value;
  return digS;
}

function Dec2Dig(n1)
{
  var s = "";
  var n2 = 0;
  for(var i = 0; i < 4; i++)
  {
     n2 = Math.pow(2,3 - i);
     if(n1 >= n2)
     {
        s += '1';
        n1 = n1 - n2;
      }
     else
      s += '0';
      
  }
  return s;
  
}

function Dig2Dec(s)
{
      var retV = 0;
      if(s.length == 4)
      {
          for(var i = 0; i < 4; i ++)
          {
              retV += eval(s.charAt(i)) * Math.pow(2, 3 - i);
          }
          return retV;
      }
      return -1;
}

function Hex2Utf8(s)
  {
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            
            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
}

function Hex2Utf8Ex(s)
  {
     var retS = "";
     var tempS = "";
     var ss = "";
     if(s.length == 16)
     {
         tempS = "1110" + s.substring(0, 4);
         tempS += "10" +  s.substring(4, 10);
         tempS += "10" + s.substring(10,16);
         var sss = "0123456789ABCDEF";
         for(var i = 0; i < 3; i ++)
         {
            //retS += "%";
            ss = tempS.substring(i * 8, (eval(i)+1)*8);
            
            retS += sss.charAt(Dig2Dec(ss.substring(0,4)));
            retS += sss.charAt(Dig2Dec(ss.substring(4,8)));
         }
         return retS;
     }
     return "";
}


// string 的 字符串替换
String.prototype.setCharAt = function(pos,replace) 
{
    var tmpArr = this.split('');
    tmpArr[pos] = replace;
    return tmpArr.join('');
}

String.prototype.replaceAt = function (i, char) {
    return this.substr(0, i) + char + this.substr(i + char.length);
}

function makePackage( protoid, jsonstr ) {
    var packlen = jsonstr.length;
    var arr = new Array( packlen );
    for (var idx = 4 ; idx < packlen ; ++idx ) {
        arr[ idx ] = jsonstr.charCodeAt(idx) & 0xFF;
    }

    arr[0] = packlen & 0xFF;
    arr[1] = packlen >> 8;
    arr[2] = protoid & 0xFF;
    arr[3] = protoid >> 8;

    // You may create an ArrayBuffer from a standard array (of values) as follows:
    var uint8Array = new Uint8Array(arr);
    return uint8Array.buffer;
}

function Utf8ArrayToStr(array) {
	var out, i, len, c;
	var char2, char3;

	out = "";
	len = array.length;
	i = 0;
	while(i < len) {
		c = array[i++];
		switch(c >> 4)
		{ 
		case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
			// 0xxxxxxx
			out += String.fromCharCode(c);
			break;
		case 12: case 13:
			// 110x xxxx   10xx xxxx
			char2 = array[i++];
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx  10xx xxxx  10xx xxxx
			char2 = array[i++];
			char3 = array[i++];
			out += String.fromCharCode(((c & 0x0F) << 12) |
					((char2 & 0x3F) << 6) |
					((char3 & 0x3F) << 0));
			break;
		}
	}

	return out;
}