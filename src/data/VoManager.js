/**
 * 数据管理器
 * @author pj
 */ 
var VoManager = VoManager || {};

VoManager.loadXmls = null;

//本地玩家对象
VoManager.roleVo = null;
VoManager.baseVo = null;
VoManager.proxy = null;

VoManager.loadXmlInit = function()
{
	//增加配置表
	var xmls = ['language'];

	VoManager.loadXmls = new LoadXml(function()
	{
		D_log.tip('VoManager.loadXmlComplete');

		ClientManager.sendNotice(ClientName.MAIN_SCENE);
    });
	VoManager.loadXmls.commit(xmls);
};

/**获得本地化字符串 eg:VoManager.getLocalizedString(1);*/
VoManager.getLocalizedString = function(id)
{
	if(!id||id==NaN) {
		cc.log("id = "+id);
	}
	
	var conf = VoManager.loadXmls.getItemByType(id,0);
	if(conf == null)
	{
		D_log.warn('VoManager.getLocalizedString:....id=',id);
		return null;
	}
	return conf.name;
};

/**获得配置表的一项, eg:VoManager.getItem(50001);*/
VoManager.getItem = function(id)
{
	return VoManager.loadXmls.getItemConfig(id);
};

/**获得配置表所有项,eg:VoManager.getItems(LoadXmlType.BUILD);*/
VoManager.getItems = function(type,tip)
{
	return VoManager.loadXmls.getItemGroup(type,tip);
};

/**获得全局配置表的一项, eg:VoManager.getSysItem('initUser');*/
VoManager.getSysItem = function(id)
{
    return VoManager.loadXmls.sysOption[id];
};