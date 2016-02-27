/**********************
 *  SoundManager.js
 *  声音管理
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var SoundManager = SoundManager || {};

SoundManager.PATH = 'res/sound/';

SoundManager.playEffect = function(type)
{
    if(GC.EFFECT_ON=='0')
        return;
    cc.audioEngine.playEffect(SoundManager.PATH+type+'.mp3');
};

SoundManager.playMusic = function(type, loop)
{
	if(GC.MUSIC_ON=='0')
		return;
	cc.audioEngine.playMusic(SoundManager.PATH+type+'.mp3',loop);
};

SoundManager.stopMusic = function()
{
	//Logger.tip('SoundManager.stopMusic:.......=');
	cc.audioEngine.stopMusic();
};