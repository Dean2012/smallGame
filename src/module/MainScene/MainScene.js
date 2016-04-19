/**********************
 *  MainScene.js
 *  主页面场景
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var MainScene = D_Scene.extend({
    list : [],
    ctor:function() {
        this._super();

        this._SceneName = "MainScene";
    },

    onEnter:function() {
        this._super();
        //test
        ClientManager.sendNotice(ClientName.PUZZLE_SCENE);
        return;

        var json = ccs.load("res/MainScene.json");
        this.addChild(json.node);

        var lv = json.node.getChildByTag(1);
        if (!lv) return ;
                            
        for (var i = 1; i <= lv.getChildrenCount(); i++) {
            var btn = lv.getChildByTag(i);
            if (!btn) continue;

            btn.addTouchEventListener(this.cbFunc.bind(this), this);
        };

//        var url = "http://123.59.45.169:8000/Uploads//Editor/image/2015-05-21/555da893bb13f.jpg";
                               
        //ShortConnection.getPic(imageName, this.loadPic.bind(this));

//        cc.log("123");
//        cc.loader.loadImg(url,function(res,tex){
//            cc.log("success " + res + tex);
//        });
//        cc.textureCache.addImage(url, function(texture) {
//            cc.log("aaa");
//            if(texture) {
//                // Use texture
//                cc.log("bbb");
//            }
//        },this);
    },

    cbFunc:function(render, type) {
        // D_log.tip("button cbFunc " + type + " " + render);

        // ccui.Widget.TOUCH_BEGAN = 0;
        // ccui.Widget.TOUCH_MOVED = 1;
        // ccui.Widget.TOUCH_ENDED = 2;
        // ccui.Widget.TOUCH_CANCELED = 3;
        var tag = render.getTag();
            
        if (ccui.Widget.TOUCH_BEGAN == type) {
            D_log.tip("TOUCH_BEGAN ");
        }
        else if (ccui.Widget.TOUCH_MOVED == type) {
            D_log.tip("TOUCH_MOVED ");
        }
        else if (ccui.Widget.TOUCH_ENDED == type) {
            D_log.tip("TOUCH_ENDED tag = " + tag);
            this.enterNextScene(tag);
        }
        else if (ccui.Widget.TOUCH_CANCELED == type) {
            D_log.tip("TOUCH_CANCELED ");
        }
    },

    enterNextScene:function(tag) {
        if (!tag) return;

        cc.log("enterNextScene");
        switch(tag) {
            case 1:
                ClientManager.sendNotice(ClientName.GUESS_SCENE);
                break;
            case 2:
                ClientManager.sendNotice(ClientName.ZOMBIE_SCENE);
                break;
            case 3:
                ClientManager.sendNotice(ClientName.PUZZLE_SCENE);

            default:
                break;
        }
    },

    loadPic:function(data) {
        cc.log("getpic");
    },
//    void storeELayer::imgHttpRequest(CCNode* pNode, void* data)
//{
//    CCHttpResponse *response = (CCHttpResponse*)data;
//    if (!response)
//        return;
//    if (!response->isSucceed())
//        return;
//    std::vector<char> *buffer = response->getResponseData();
//    char* buf = (char*)malloc(buffer->size());
//    std::copy(buffer->begin(), buffer->end(), buf);
//    if (buf == NULL)
//        return;
//    if (buffer->size() <= 0)
//    {
//        free(buf);
//        buf = NULL;
//        return;
//    }
//
//    util::crateDir(CCString::createWithFormat("%shop",util::getAppSystmPath().c_str())->getCString());
//
//    FILE *fp = fopen(CCString::createWithFormat("%shop/shopItem.png",util::getAppSystmPath().c_str())->getCString(),"wb+");
//    if(fp == NULL)
//        return;
//    if (buf == NULL)
//        return;
//    if (buffer->size() <= 0)
//        return;
//    fwrite(buf,1,buffer->size(),fp);
//    fclose(fp);
//
//    CCImage* pImage = new CCImage();
//    pImage->initWithImageData((unsigned char*)buffer->data(),buffer->size());
//
//    CCTexture2D* pTextrue = new CCTexture2D();
//
//    if(pTextrue->initWithImage(pImage))
//    {
//        CCMenuItem* parent = array[curPic];
//        if (!parent) return;
//
//        CCSprite* pNoticeImg  = CCSprite::createWithTexture(pTextrue);
//        parent->addChild(pNoticeImg, 100);
//        pNoticeImg->setPosition(ccp(parent->getContentSize().width*0.5, parent->getContentSize().height*0.45));
//
//        curPic++;
//    }
//    pImage->release();
//}

    onExit:function() {
        this._super();

    }

});