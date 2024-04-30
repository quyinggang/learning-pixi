import{G as y,a as _,S as v,A as T}from"./index-719e27ca.js";import{G as b}from"./gm-0ebf93b7.js";import{G as o}from"./Graphics-2c1868be.js";import{A as C}from"./Assets-705850aa.js";import{A,e as M}from"./AbstractText-5638f47d.js";import{T as B,C as G}from"./TextStyle-a535a656.js";import{r as R,o as S,a as P,c as E}from"./index-951d4c83.js";class L extends A{constructor(...n){const s=M(n,"Text");super(s,B),this.renderPipeId="text"}_updateBounds(){const n=this._bounds,s=this._style.padding,i=this._anchor,l=G.measureText(this._text,this._style),{width:c,height:a}=l;n.minX=-i._x*c-s,n.maxX=n.minX+c,n.minY=-i._y*a-s,n.maxY=n.minY+a}}const z={__name:"DisplayObject",setup(d){const n=R(null),s=()=>{const e=new o;return e.circle(30,30,10),e.fill("green"),e},i=()=>{const e=new o;return e.ellipse(80,30,10,20),e.stroke({color:"red",width:3}),e},l=()=>{const e=new o;return e.moveTo(140,18),e.lineTo(200,18),e.stroke({color:"green",width:1}),e.moveTo(140,28),e.lineTo(200,28),e.stroke({color:"red",width:2}),e.moveTo(140,38),e.lineTo(200,38),e.stroke({color:"yellow",width:3}),e},c=()=>{const e=`
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
      stroke-width="3" fill="none" />
      <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
      stroke-width="3" fill="none" />
      <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
      fill="none" />
      <path d="M 100 350 q 150 -300 300 0" stroke="blue"
      stroke-width="5" fill="none" />
      <!-- Mark relevant points -->
      <g stroke="black" stroke-width="3" fill="red">
        <circle id="pointA" cx="100" cy="350" r="3" />
        <circle id="pointB" cx="250" cy="50" r="3" />
        <circle id="pointC" cx="400" cy="350" r="3" />
      </g>
    </svg>
  `,t=new o;return t.svg(e),t.position.set(220,0),t.scale.set(.15),t},a=()=>{const e=new y().rect(-50,-50,100,100).circle(80,80,50).circle(80,-80,50).circle(-80,80,50).circle(-80,-80,50),t=new o;return t.path(e),t.stroke({color:"green",width:3}),t.position.set(60,100),t.scale.set(.2),t},h=()=>{const e=new _;return e.rect(150,90,30,30),e.stroke("red"),new o(e)},m=async()=>{const e=await C.load(b),t=new v(e);return t.width=80,t.height=45,t.position.set(30,150),t},u=()=>{const e=new L({text:"Hello Pixi!",style:{fontFamily:"Arial",fontSize:24,fill:"green",align:"center"}});return e.position.set(140,150),e},w=async(e,t)=>{const r=new T;return await r.init({width:e,height:t,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),r},g=async e=>{const{element:t,boundingRect:r}=e,p=await w(r.width,r.height);t.appendChild(p.canvas);const x=[s(),i(),l(),c(),a(),h(),u()],f=[m()];p.stage.addChild(...x),Promise.all(f).then(k=>{p.stage.addChild(...k)})};return S(()=>{const e=n.value,t=e.getBoundingClientRect();g({element:e,boundingRect:t})}),(e,t)=>(P(),E("div",{ref_key:"boxElementRef",ref:n,class:"box"},null,512))}};export{z as default};
