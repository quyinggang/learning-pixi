import{a as S,G as y,T as p,R as g}from"./TexturePool-18db19ce.js";import{d as P,v as T}from"./index-df899187.js";import{F as b}from"./Filter-7a0a1521.js";const m={5:[.153388,.221461,.250301],7:[.071303,.131514,.189879,.214607],9:[.028532,.067234,.124009,.179044,.20236],11:[.0093,.028002,.065984,.121703,.175713,.198596],13:[.002406,.009255,.027867,.065666,.121117,.174868,.197641],15:[489e-6,.002403,.009246,.02784,.065602,.120999,.174697,.197448]},z=["in vec2 vBlurTexCoords[%size%];","uniform sampler2D uTexture;","out vec4 finalColor;","void main(void)","{","    finalColor = vec4(0.0);","    %blur%","}"].join(`
`);function O(o){const t=m[o],e=t.length;let r=z,u="";const l="finalColor += texture(uTexture, vBlurTexCoords[%index%]) * %value%;";let i;for(let n=0;n<o;n++){let a=l.replace("%index%",n.toString());i=n,n>=e&&(i=o-n-1),a=a.replace("%value%",t[i].toString()),u+=a,u+=`
`}return r=r.replace("%blur%",u),r=r.replace("%size%",o.toString()),r}const C=`
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
    }`;function B(o,t){const e=Math.ceil(o/2);let r=C,u="",l;t?l="vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);":l="vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";for(let i=0;i<o;i++){let n=l.replace("%index%",i.toString());n=n.replace("%sampleIndex%",`${i-(e-1)}.0`),u+=n,u+=`
`}return r=r.replace("%blur%",u),r=r.replace("%size%",o.toString()),r=r.replace("%dimension%",t?"z":"w"),r}function q(o,t){const e=B(t,o),r=O(t);return S.from({vertex:e,fragment:r,name:`blur-${o?"horizontal":"vertical"}-pass-filter`})}var _=`

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
}`;function w(o,t){const e=m[t],r=e.length,u=[],l=[],i=[];for(let s=0;s<t;s++){u[s]=`@location(${s}) offset${s}: vec2<f32>,`,o?l[s]=`filteredCord + vec2(${s-r+1} * strength, 0.0),`:l[s]=`filteredCord + vec2(0.0, ${s-r+1} * strength),`;const v=s<r?s:t-s-1,F=e[v].toString();i[s]=`finalColor += textureSample(uTexture, uSampler, offset${s}) * ${F};`}const n=u.join(`
`),a=l.join(`
`),f=i.join(`
`),h=_.replace("%blur-struct%",n).replace("%blur-vertex-out%",a).replace("%blur-fragment-in%",n).replace("%blur-sampling%",f);return y.from({vertex:{source:h,entryPoint:"mainVertex"},fragment:{source:h,entryPoint:"mainFragment"}})}const d=class x extends b{constructor(t){t={...x.defaultOptions,...t};const e=q(t.horizontal,t.kernelSize),r=w(t.horizontal,t.kernelSize);super({glProgram:e,gpuProgram:r,resources:{blurUniforms:{uStrength:{value:0,type:"f32"}}},...t}),this.horizontal=t.horizontal,this._quality=0,this.quality=t.quality,this.blur=t.strength,this._uniforms=this.resources.blurUniforms.uniforms}apply(t,e,r,u){if(this._uniforms.uStrength=this.strength/this.passes,this.passes===1)t.applyFilter(this,e,r,u);else{const l=p.getSameSizeTexture(e);let i=e,n=l;this._state.blend=!1;for(let a=0;a<this.passes-1;a++){t.applyFilter(this,i,n,t.renderer.type===g.WEBGPU);const f=n;n=i,i=f}this._state.blend=!0,t.applyFilter(this,i,r,u),p.returnTexture(l)}}get blur(){return this.strength}set blur(t){this.padding=1+Math.abs(t)*2,this.strength=t}get quality(){return this._quality}set quality(t){this._quality=t,this.passes=t}};d.defaultOptions={strength:8,quality:4,kernelSize:5};let c=d;class G extends b{constructor(...t){let e=t[0]??{};typeof e=="number"&&(P(T,"BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"),e={strength:e},t[1]&&(e.quality=t[1]),t[2]&&(e.resolution=t[2]),t[3]&&(e.kernelSize=t[3])),e={...c.defaultOptions,...e};const{strength:r,quality:u,...l}=e;super({...l,compatibleRenderers:g.BOTH,resources:{}}),this._repeatEdgePixels=!1,this.blurXFilter=new c({horizontal:!1,...e}),this.blurYFilter=new c({horizontal:!0,...e}),this.quality=u,this.blur=r,this.repeatEdgePixels=!1}apply(t,e,r,u){const l=Math.abs(this.blurXFilter.strength),i=Math.abs(this.blurYFilter.strength);if(l&&i){const n=p.getSameSizeTexture(e);this.blurXFilter.apply(t,e,n,!0),this.blurYFilter.apply(t,n,r,u),p.returnTexture(n)}else i?this.blurYFilter.apply(t,e,r,u):this.blurXFilter.apply(t,e,r,u)}updatePadding(){this._repeatEdgePixels?this.padding=0:this.padding=Math.max(Math.abs(this.blurXFilter.blur),Math.abs(this.blurYFilter.blur))*2}get blur(){return this.blurXFilter.blur}set blur(t){this.blurXFilter.blur=this.blurYFilter.blur=t,this.updatePadding()}get quality(){return this.blurXFilter.quality}set quality(t){this.blurXFilter.quality=this.blurYFilter.quality=t}get blurX(){return this.blurXFilter.blur}set blurX(t){this.blurXFilter.blur=t,this.updatePadding()}get blurY(){return this.blurYFilter.blur}set blurY(t){this.blurYFilter.blur=t,this.updatePadding()}get blendMode(){return this.blurYFilter.blendMode}set blendMode(t){this.blurYFilter.blendMode=t}get repeatEdgePixels(){return this._repeatEdgePixels}set repeatEdgePixels(t){this._repeatEdgePixels=t,this.updatePadding()}}G.defaultOptions={strength:8,quality:4,kernelSize:5};export{G as B};
