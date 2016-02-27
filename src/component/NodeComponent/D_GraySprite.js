/**********************
 *  D_GraySprite.js
 *  灰色精灵
 *
 *  For GameFramework
 *  Created by Dean on 15/8/15.
 **********************/

//精灵变灰函数
cc.Sprite.createGraySprite = function(filename) {
    //得到纹理
    var texture = cc.textureCache.getTextureForKey(filename);
    if (!texture) {
        texture = cc.textureCache.addImage(filename);
    }

    //判断运行的平台是不是浏览器
    var isHtml5 = (typeof document !== 'undefined');

    if (isHtml5) {
        var canvas = document.createElement('canvas');
        var image = texture.getHtmlElementObj();

        //将图片的高宽赋值给画布
        canvas.width = image.width;
        canvas.height = image.height;

        //获得二维渲染上下文
        if(canvas.getContext) {
            //为了安全起见，先判断浏览器是否支持canvas
            var context = canvas.getContext("2d");
            context.drawImage(image, 0, 0);//将得到的image图像绘制在canvas对象中
            var canvasData = context.getImageData(0, 0, canvas.width, canvas.height);//返回ImageData对象

            // 填充灰色【读取像素值和实现灰度计算】
            for (var x = 0; x < canvasData.width; x++) {
                for (var y = 0; y < canvasData.height; y++) {
                    // Index of the pixel in the array
                    var idx = (x + y * canvasData.width) * 4;
                    var r = canvasData.data[idx + 0];
                    var g = canvasData.data[idx + 1];
                    var b = canvasData.data[idx + 2];
                    // 灰度的计算
                    var gray = .299 * r + .587 * g + .114 * b;
                    // assign gray scale value
                    canvasData.data[idx + 0] = gray; // Red channel
                    canvasData.data[idx + 1] = gray; // Green channel
                    canvasData.data[idx + 2] = gray; // Blue channel
                    //canvasData.data[idx + 3] = 255; // Alpha channel
                    // 新增黑色边框
                    if (x < 8 || y < 8 || x > (canvasData.width - 8) || y > (canvasData.height - 8)) {
                        canvasData.data[idx + 0] = 0;
                        canvasData.data[idx + 1] = 0;
                        canvasData.data[idx + 2] = 0;
                    }
                }
            }
            context.putImageData(canvasData, 0, 0);
            // 处理完成的数据重新载入到canvas二维对象中
            var tempTexture = new cc.Texture2D();
            tempTexture.initWithElement(canvas);
            tempTexture.handleLoadedTexture();

            return new cc.Sprite(tempTexture);
        }
    }

    //使用shader方式实现图片变灰（适用于app和浏览器不支持canvas的情况）
    if(!cc.GLProgram.createWithByteArrays) {
        cc.GLProgram.createWithByteArrays = function(vert, frag) {
            var shader = new cc.GLProgram();
            shader.initWithVertexShaderByteArray(vert, frag);
            shader.link();
            shader.updateUniforms();
            setTimeout(function(){
                shader.link();
                shader.updateUniforms();
            }, 0);
            return shader;
        }
    }

    var SHADER_POSITION_GRAY_FRAG =
        "varying vec4 v_fragmentColor;\n"+
        "varying vec2 v_texCoord;\n"+
        (isHtml5? "uniform sampler2D CC_Texture0;\n":"")+
        "void main()\n"+
        "{\n"+
        "    vec4 v_orColor = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);\n"+
        "    float gray = dot(v_orColor.rgb, vec3(0.299, 0.587, 0.114));\n"+
        "    gl_FragColor = vec4(gray, gray, gray, v_orColor.a);\n"+
        "}\n";

    var SHADER_POSITION_GRAY_VERT =
        "attribute vec4 a_position;\n"+
        "attribute vec2 a_texCoord;\n"+
        "attribute vec4 a_color;\n"+
        "\n"+
        "varying vec4 v_fragmentColor;\n"+
        "varying vec2 v_texCoord;\n"+
        "\n"+
        "void main()\n"+
        "{\n"+
        "gl_Position = "+ (isHtml5?"(CC_PMatrix * CC_MVMatrix)":"CC_PMatrix") + " * a_position;\n"+
        "v_fragmentColor = a_color;\n"+
        "v_texCoord = a_texCoord;\n"+
        "}";


    var sprite = new cc.Sprite(texture);
    var shader = cc.GLProgram.createWithByteArrays(SHADER_POSITION_GRAY_VERT, SHADER_POSITION_GRAY_FRAG);
    shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
    shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR);
    shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
    sprite.setShaderProgram(shader);

    return sprite;
}