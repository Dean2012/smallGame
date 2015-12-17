var LoadXml = cc.Class.extend({
		
	count:null,
	
	ctor:function (cbComplete) {
		this.cbComplete = cbComplete;
		this.dataBaseArray={};
		this.itemGroups = null;
		this.sysOption = {};
	},
	
	commit:function(xmls){
		
		
		this.xmls=xmls;
		// xmls = [null,null,"item"];
		var len = xmls.length;
		count = 0;
		for(var i=0;i < len;i++)
		{
			this.read(xmls[i],this,i);
		}
	},
	
	getItemConfig:function(id)
    {
        type = parseInt(id / 10000);
        return this.getItemByType(id,type);
	},
    getItemByType:function(id,type)
    {
        id = String(id);
        if(this.dataBaseArray[type])
        {
            for(var i in this.dataBaseArray[type])
            {

                if(this.dataBaseArray[type][i]['id'] == id)
                {
                    return this.dataBaseArray[type][i];
                }
            }
        }
        return null;
    },
	
	getItemGroup:function(type,tip){
		
		if(tip)
			TipManager.floatTip(TipType.FT_TXT,'LoadXml.getItemGroup...type='+type+'||'+this.dataBaseArray[type]);
		if(this.dataBaseArray[type]){
			return this.dataBaseArray[type];
		}
		return null;
	},
	
	read:function(name,obj,type){
		if(name)
		{
			cc.loader.loadTxt("res/xml/"+name + ".xml", function(err,data){
				
				obj.load(data,type);
				++count;
				if(count == obj.xmls.length)
				{
					cc.loader.loadTxt("res/xml/" + "sysoption.xml", function(er,da){
						obj.loadSysoption(da);
						if(obj.cbComplete)
						{
							obj.cbComplete();
						}
					});
				}
			});
		}
		else
		{
			++count;
		}
	},
	
	loadSysoption:function(data){
		data = Util.removeAllSpace(data);
		var alldata = data.split("</text>");
		var len = alldata.length;
// cc.log(alldata[0].split('">')[1]);//cs
		var nd = null;
		for(var i=0 ;i < len;i++)
		{
			nd = alldata[i].split('">');
// cc.log(nd[1]);
			if(nd[1])
			this.sysOption[nd[0].split('<textid="')[1]] = JSON.parse(nd[1]);
		}
	},
	
	load:function(bin,type){
		var langXML;
		var groupList;
		var curGroup;
// var type;
		var curGroupAttribute;
		var items;
		var curItem;
		var value;
		var itemObj;
		var curAttribute;
		var attributeName;
		var data=bin;
		langXML=bin;

		if(langXML)
		{
			groupList=langXML.split('?>');
			this.itemGroups=new Array();

// var list=groupList;

			for(var i in groupList){
				if (i==0)
				{
					continue;
				}
				curGroup=groupList[i];

// groupObj=new Object();
// this.itemGroups.push(groupObj);

				var attList=new Array();

				for(var i=0;i<curGroup.split('>').length;i++)
				{
					if(curGroup.split('>')[i].indexOf('group')!=-1)
					{
						var s=curGroup.split('>')[i].split(' ');

						for(var j=0;j<s.length;j++)
						{
							if(Util.trim(s[j]).indexOf('=')!=-1)
							{
								var obj=new Object();
								obj.name=Util.trim(s[j].split('=')[0]);
								obj.value=Util.trim(s[j].split('=')[1]).replace(/^\"|\"$/g,'');							
								attList.push(obj);
							}
						}
					}
				}


				items=new Array();

				var alldata=curGroup.split('/>');
				var itemList=new Array();

				for(var i=0;i<alldata.length;i++)
				{
					if(alldata[i].split('<item')[1])
						itemList.push(alldata[i].split('<item')[1]);

				}


				for(var k in itemList){

					curItem=itemList[k];

					// console.log(curItem);
					itemObj=new Object();
// itemObj.group=groupObj;

					var attrList=new Array();
					for(var i=0;i<curItem.split(' ').length;i++)
					{
						var s=Util.trim(curItem.split(' ')[i]);

						if(s.indexOf('=')!=-1)
						{
							var obj=new Object();
							obj.name=s.split('=')[0];
							obj.value=s.split('=')[1].replace(/(^\"|\"$)|(^\'|\'$)/g,'');
							attrList.push(obj);
						}
					}

					// var attrList=curItem.attributes;
					for(var l in attrList){
						
						curAttribute=attrList[l].value;
						attributeName=attrList[l].name;
						value=curAttribute;

//						 console.log(value+'--------');
// if(attributeName=="type"){
// itemObj.types = value.split(/\s*,\s*/);
// }
// else if(attributeName == "hideGroups"){
// itemObj.hideGroups = value.split(/\s*,\s*/);
// }
						if(value == "true"){
							itemObj[attributeName] = true;
						}
						else if(value == "false"){
							itemObj[attributeName] = false;
						}
						else if(typeof value!="undefined"&&(value.charAt(0)=="{" || value.charAt(0)=="[")){

// var str=JSON.stringify(value);
// cc.log(value);
							value = value.replace(/&quot;/g,'"');
// cc.log(value);
							var data=JSON.parse(value);
							itemObj[attributeName] =data;    				
						}
						else{
// if(value=="null"){
// value;
// }
							itemObj[attributeName]=value;
						}

					}
					// itemObj.children=curItem.childNodes;
					items.push(itemObj);
				}
// groupObj.items=items;
				this.dataBaseArray[type] = items;
			}  
		}

	}
	
		
});

