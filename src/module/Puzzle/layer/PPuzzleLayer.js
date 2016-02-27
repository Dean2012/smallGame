/**********************
 *  PPuzzleLayer.js
 *  拼图放的层
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var PPuzzleLayer = D_Layer.extend({

    _posList : null,
    _curSpr : null,

    ctor:function() {
        this._super();

    },

    onEnter:function() {
        this._super();

        this._posList = [
            cc.p(cc.winSize.width * 0.2, cc.winSize.height*0.2),
            cc.p(cc.winSize.width * 0.5, cc.winSize.height*0.2),
            cc.p(cc.winSize.width * 0.8, cc.winSize.height*0.2),
            cc.p(cc.winSize.width * 0.2, cc.winSize.height*0.5),
            cc.p(cc.winSize.width * 0.8, cc.winSize.height*0.5),
            cc.p(cc.winSize.width * 0.5, cc.winSize.height*0.5),
            cc.p(cc.winSize.width * 0.5, cc.winSize.height*0.8),
            cc.p(cc.winSize.width * 0.2, cc.winSize.height*0.8),
            cc.p(cc.winSize.width * 0.8, cc.winSize.height*0.8)
        ];

        for (var i = 0; i < 9; i++) {
            var spr = new cc.Sprite("res/Puzzle/test_0"+(i+1)+".png");
            spr.setScale(0.5);
            this.addChild(spr, 10, i+1);
            spr.setPosition(this._posList[i]);

            //D_BlurSprite.create(spr, 100);
            //var properties = cc.Properties.createNonRefCounted("res/2d_effects.material#sample");
            //var mat1 = cc.Material.createWithProperties(properties);

            //rtResult.setNormalizedPosition(cc.p(0.2, 0.5));
            //spr.setGLProgramState(mat1.getTechniqueByName("blur").getPassByIndex(0).getGLProgramState());
        }

        //var testspr = this.getChildByTag(1);
        //
        //var properties = cc.Properties.createNonRefCounted("res/2d_effects.material#sample");
        //var mat1 = cc.Material.createWithProperties(properties);
        //
        //testspr.setGLProgramState(mat1.getTechniqueByName("blur").getPassByIndex(0).getGLProgramState());

        //this.createBlurBg();
        //return;
    },

    onExit:function() {
        this._super();
    },

    checkTouchBegan:function(Touch, event) {
        for (var i = 0; i < 9; i++) {
            if (!this.getChildByTag(i+1))
                break;

            var spr = this.getChildByTag(i+1);
            var rect = spr.getBoundingBox();

            if (cc.rectContainsPoint(rect, Touch.getLocation())) {
                this._curSpr = spr;
                this._curSpr.setLocalZOrder(100);
                this._curTag = i;
                this._curSpr.runAction(cc.spawn(
                    cc.MoveTo(0.2, cc.p(cc.winSize.width*0.5, cc.winSize.height*0.5)),
                    cc.ScaleTo(0.2, 1.2)
                ))
                return true;
            }
        }
        return false;
    },

    checkTouchEnded:function() {
        if (this._curSpr == null)
            return true;

        D_log.tip(this._curTag, this._posList[this._curTag].x , this._posList[this._curTag].y);
        this._curSpr.runAction(
            cc.sequence(
                cc.spawn(cc.MoveTo(0.2, this._posList[this._curTag]), cc.ScaleTo(0.2, 0.5)),
                cc.callFunc(this.removeCurSpr, this)
            )
        );
    },

    showLayer : function() {
        for (var i = 1; i <= 9; i++) {
            if (this.getChildByTag(i) && !this.getChildByTag(i).isVisible())
                this.getChildByTag(i).setVisible(true);
        }
    },

    disappearLayer : function() {
        for (var i = 1; i <= 9; i++) {
            if (this.getChildByTag(i) && this.getChildByTag(i).isVisible() && (i-1) != this._curTag)
                this.getChildByTag(i).setVisible(false);
        }
    },

    createBlurBg : function() {
        return ;
        var rtResult = new cc.RenderTexture(cc.winSize.width,cc.winSize.height);
        this.addChild(rtResult, 100);
        rtResult.begin();
        cc.director.getRunningScene().visit();
        rtResult.end();

        rtResult.setPosition(cc.p(cc.winSize.width*0.5, cc.winSize.height*0.5));

        cc.log(111111111);
        //var properties = cc.Properties.createNonRefCounted("res/2d_effects.material#sample");
        cc.log(222222222);
        //var mat1 = cc.Material.createWithProperties(properties);
        cc.log(333333333);

        //rtResult.setNormalizedPosition(cc.p(0.2, 0.5));
        //rtResult.setGLProgramState(mat1.getTechniqueByName("blur").getPassByIndex(0).getGLProgramState());
        cc.log(444444444);
    },

    removeCurSpr:function() {
        if (this._curSpr)
            this._curSpr.setLocalZOrder(1);
        this._curTag = 0;
        this._curSpr = null;
    }

});