/**********************
 *  HandleCache.js
 *  处理内存问题
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var HandleCache = HandleCache || {};

// 加载资源
HandleCache.loadResrouce = function(modulRes) {
	if (!modulRes) {
		D_log.tip("loadResrouce res 不存在");
		return ;
	}

	for (var key in modulRes) {
		D_log.tip(key, modulRes[key]);
		var texture = cc.textureCache.getTextureForKey(modulRes[key]);//cc.textureCache
		if (!texture)
			texture = cc.textureCache.addImage(modulRes[key]);
	}
//	cc.textureCache.getCachedTextureInfo();
}

// 卸载资源
HandleCache.unloadResrouce = function(modulRes) {
	if (!modulRes) {
		D_log.tip("unloadResrouce res 不存在");
		return ;
	}

	for (var key in modulRes) {
		D_log.tip(key, modulRes[key]);
		var texture = cc.textureCache.getTextureForKey(modulRes[key]);//cc.textureCache
		if (texture)
			cc.textureCache.removeTextureForKey(modulRes[key]);
	}
}
