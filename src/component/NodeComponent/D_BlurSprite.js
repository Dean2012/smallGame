/**********************
 *  D_BlurSprite.js
 *  高斯模糊
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

var D_BlurSprite = D_BlurSprite || {};


D_BlurSprite.create = function (sprite,_blurSize)
{
    if(sprite)
    {
        var shader = new cc.GLProgram("res/example_Blur.vsh", "res/example_Simple.fsh");
        shader.retain();
        shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
        shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
        shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
        shader.link();
        shader.updateUniforms();
    }
    //为节点与子节点添加滤镜
    D_BlurSprite.blurAllChild(sprite, shader);

    //本例中无需设置的参数
//        var substract = shader.getUniformLocationForName("substract");
//        gl.uniform4f( substract, 0,0,0,0);

    shader.use();
    shader.setUniformsForBuiltins();
    var blurSize = shader.getUniformLocationForName("blurSize");
    //这个函数由于jsb实现有问题，原本只能实现整数传递，现在在fsh中加入0.0001的参数调整，范围为0-10000
    gl.uniform2f(blurSize, _blurSize,_blurSize);
}

D_BlurSprite.blurAllChild = function (sprite,shader)
{
    sprite.shaderProgram = shader;
    for(var i=0 ; i<sprite.getChildrenCount() ; i++)
    {
        D_BlurSprite.blurAllChild(sprite.children,shader);
    }
}