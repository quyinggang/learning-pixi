import{T as p}from"./TexturePool-cca4082f.js";import{a as d,G as b,R as S}from"./Shader-62100aa5.js";import{F as T}from"./Filter-c83bd7ed.js";const m={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},P=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);function y(i){const t=m[i],u=t.length;let e=P,l="";const s="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let n;for(let r=0;r<i;r++){let a=s.replace("%index%",r.toString());n=r,r>=u&&(n=i-r-1),a=a.replace("%value%",t[n].toString()),l+=a,l+=`
`}return e=e.replace("%blur%",l),e=e.replace("%size%",i.toString()),e}const F=`
    in vec2 aPosition;

    uniform float uStrength;

    out vec2 vBlurTexCoords[%size%];

    uniform vec4 uInputSize;
    uniform vec4 uOutputFrame;
    uniform vec4 uOutputTexture;

    vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

    vec2 filterTextureCoord( void )
    {
        return aPosition * (uOutputFrame.zw * uInputSize.zw);
    }

    void main(void)
    {
        gl_Position = filterVertexPosition();

        float pixelStrength = uInputSize.%dimension% * uStrength;

        vec2 textureCoord = filterTextureCoord();
        %blur%
    }`;function z(i,t){const u=Math.ceil(i/2);let e=F,l="",s;t?s="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":s="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let n=0;n<i;n++){let r=s.replace("%index%",n.toString());r=r.replace("%sampleIndex%",`${n-(u-1)}.0`),l+=r,l+=`
`}return e=e.replace("%blur%",l),e=e.replace("%size%",i.toString()),e=e.replace("%dimension%",t?"z":"w"),e}function O(i,t){const u=z(t,i),e=y(t);return d.from({vertex:u,fragment:e,name:`blur-${i?"horizontal":"vertical"}-pass-filter`})}var C=`

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

struct BlurUniforms {
  uStrength:f32,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler : sampler;

@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;


struct VSOutput {
    @builtin(position) position: vec4<f32>,
    %blur-struct%
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}


@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {

  let filteredCord = filterTextureCoord(aPosition);

  let strength = gfu.uInputSize.w * blurUniforms.uStrength;

  return VSOutput(
   filterVertexPosition(aPosition),
    %blur-vertex-out%
  );
}

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  %blur-fragment-in%
) -> @location(0) vec4<f32> {

    var   finalColor = vec4(0.0);

    %blur-sampling%

    return finalColor;
}`;function B(i,t){const u=m[t],e=u.length,l=[],s=[],n=[];for(let o=0;o<t;o++){l[o]=`@location(${o}) offset${o}: vec2<f32>,`,i?s[o]=`filteredCord + vec2(${o-e+1} * strength, 0.0),`:s[o]=`filteredCord + vec2(0.0, ${o-e+1} * strength),`;const v=o<e?o:t-o-1,h=u[v].toString();n[o]=`finalColor += textureSample(uTexture, uSampler, offset${o}) * ${h};`}const r=l.join(`
`),a=s.join(`
`),f=n.join(`
`),c=C.replace("%blur-struct%",r).replace("%blur-vertex-out%",a).replace("%blur-fragment-in%",r).replace("%blur-sampling%",f);return b.from({vertex:{source:c,entryPoint:"mainVertex"},fragment:{source:c,entryPoint:"mainFragment"}})}const g=class x extends T{constructor(t){t={...x.defaultOptions,...t};const u=O(t.horizontal,t.kernelSize),e=B(t.horizontal,t.kernelSize);super({glProgram:u,gpuProgram:e,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...t}),this.horizontal=t.horizontal,this._quality=0,this.quality=t.quality,this.blur=t.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(t,u,e,l){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)t.applyFilter(this,u,e,l);else{const s=p.getSameSizeTexture(u);let n=u,r=s;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){t.applyFilter(this,n,r,t.renderer.type===S.WEBGPU);const f=r;r=n,n=f}this._state.blend=!0,t.applyFilter(this,n,e,l),p.returnTexture(s)}}get blur(){return this.strength}set blur(t){this.padding=1+Math.abs(t)*2,this.strength=t}get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}};g.defaultOptions={strength:8,quality:4,kernelSize:5};let w=g;export{w as B};
