import{A as p}from"./index-19f7f59e.js";import{G as g}from"./gm-0ebf93b7.js";import{M as h}from"./MeshGeometry-8e968a44.js";import{M as y}from"./Mesh-8e5fa2de.js";import{A as w}from"./Assets-16998ece.js";import{S as T,a as b}from"./Shader-62100aa5.js";import{r as M,o as U,a as D,c as _}from"./index-2ed5649e.js";import"./State-93d76a17.js";const P=""+new URL("gmlei-04357529.png",import.meta.url).href,B={__name:"CustomShader",setup(V){const n=M(null),m=async(e,t)=>{const r=new p;return await r.init({width:e,height:t,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),r},u=async()=>{const e=`
      attribute vec2 aPosition;
      attribute vec2 aUV;
      varying vec2 vUV;

			uniform mat3 uProjectionMatrix;
			uniform mat3 uWorldTransformMatrix;
			uniform mat3 uTransformMatrix;

			void main() {
        vUV = aUV;
			  mat3 mvp = uProjectionMatrix * uWorldTransformMatrix * uTransformMatrix;
			  gl_Position = vec4((mvp * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
			}

  `,t=`
      varying vec2 vUV;

      uniform sampler2D uTexture1;
      uniform sampler2D uTexture2;
      uniform float uTime;

      float random2D(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // 二维值噪声
      float valueNoise (vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random2D(i);
        float b = random2D(i + vec2(1.0, 0.0));
        float c = random2D(i + vec2(0.0, 1.0));
        float d = random2D(i + vec2(1.0, 1.0));

        vec2 u = f*f*(3.0-2.0*f);

        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
      }


			void main() {
        vec4 texture1 = texture2D(uTexture1, vUV);
        vec4 texture2 = texture2D(uTexture2, vUV);
        float time = abs(sin(uTime));
        float progress = step(time, valueNoise(vUV * 10.0));
        gl_FragColor = mix(texture1, texture2, progress);
			}
  `,r=await w.load([g,P]),o=Object.values(r);return new T({glProgram:new b({vertex:e,fragment:t}),resources:{uTexture1:o[0].source,uTexture2:o[1].source,timeUniforms:{uTime:{type:"f32",value:0}}}})},l=async e=>{const{element:t,boundingRect:r}=e,o=await m(r.width,r.height);t.appendChild(o.canvas);const i=o.screen,s={x:i.width*.5,y:i.height*.5},f=await u(),v=new h({positions:[-1,-1,1,-1,1,1,-1,1]}),a=new y({geometry:v,shader:f});a.width=320,a.height=180,a.position.set(s.x,s.y);let c=0;const d=1/60,x=a.shader.resources.timeUniforms;o.ticker.add(()=>{c+=d,x.uniforms.uTime=c}),o.stage.addChild(a)};return U(()=>{const e=n.value,t=e.getBoundingClientRect();l({element:e,boundingRect:t})}),(e,t)=>(D(),_("div",{ref_key:"boxElementRef",ref:n,class:"box"},null,512))}};export{B as default};
