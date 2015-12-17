/**********************
 *  D_log.js
 *  日志输出封装
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var D_log = D_log || {};

// 报警级别 0 提示 1 警告 2 报错
D_log.level = 0;

D_log.parse = function(title, arg) 
{
	if(arg.length == 0)
		return ;

	var msg = '['+title+']';
	for (var idx in arg)
		msg += arg[idx] + ',';

	cc.log(msg);

	delete msg;
}	

D_log.tip = function() 
{
 	if (D_log.level > 0)
 		return ;

 	D_log.parse('__tip__',arguments);
}

D_log.warm = function()
{
	if (D_log.level == 1)
		return ;

	D_log.parse('__warm__',arguments);
}

D_log.error = function()
{
	if (D_log.level == 2)
		return;

	D_log.parse('__error__',arguments);
}

