#ifdef GL_ES
precision mediump float;
#endif

varying vec4 v_fragmentColor;
varying vec2 v_texCoord;

vec4 blur(vec2);

void main(void)
{
    vec4 col = blur(v_texCoord); //* v_fragmentColor.rgb;
    gl_FragColor = vec4(col) * v_fragmentColor;
}

vec4 blur(vec2 p)
{
    vec4 col = vec4(0);

    float r = 3.0;
    float sampleStep = r / 5.0;

    float count = 0.0;

    for(float x = -r; x < r; x += sampleStep)
    {
        for(float y = -r; y < r; y += sampleStep)
        {
            float weight = (r - abs(x)) * (r - abs(y));
            col += texture2D(CC_Texture0, p + vec2(x * 0.01, y * 0.01)) * weight;
            count += weight;
        }
    }

    return col / count;
}
