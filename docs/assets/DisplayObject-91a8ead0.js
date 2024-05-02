import{G as x,a as v,S as y,A as C}from"./index-0d465778.js";import{G as b}from"./gm-0ebf93b7.js";import{G as o}from"./Graphics-c5fef545.js";import{A as T}from"./Assets-c56c4a23.js";import{T as _}from"./Text-0f7af38b.js";import{r as A,o as G,a as B,c as M}from"./index-6e22933c.js";import"./AbstractText-0d48ff72.js";import"./TextStyle-b7e5389e.js";const F={__name:"DisplayObject",setup(R){const i=A(null),s=()=>{const e=new o;return e.circle(30,30,10),e.fill("green"),e},c=()=>{const e=new o;return e.ellipse(80,30,10,20),e.stroke({color:"red",width:3}),e},a=()=>{const e=new o;return e.moveTo(140,18),e.lineTo(200,18),e.stroke({color:"green",width:1}),e.moveTo(140,28),e.lineTo(200,28),e.stroke({color:"red",width:2}),e.moveTo(140,38),e.lineTo(200,38),e.stroke({color:"yellow",width:3}),e},l=()=>{const e=`
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
  `,t=new o;return t.svg(e),t.position.set(220,0),t.scale.set(.15),t},p=()=>{const e=new x().rect(-50,-50,100,100).circle(80,80,50).circle(80,-80,50).circle(-80,80,50).circle(-80,-80,50),t=new o;return t.path(e),t.stroke({color:"green",width:3}),t.position.set(60,100),t.scale.set(.2),t},d=()=>{const e=new v;return e.rect(150,90,30,30),e.stroke("red"),new o(e)},h=async()=>{const e=await T.load(b),t=new y(e);return t.width=80,t.height=45,t.position.set(30,150),t},w=()=>{const e=new _({text:"Hello Pixi!",style:{fontFamily:"Arial",fontSize:24,fill:"green",align:"center"}});return e.position.set(140,150),e},g=async(e,t)=>{const n=new C;return await n.init({width:e,height:t,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),n},m=async e=>{const{element:t,boundingRect:n}=e,r=await g(n.width,n.height);t.appendChild(r.canvas);const u=[s(),c(),a(),l(),p(),d(),w()],f=[h()];r.stage.addChild(...u),Promise.all(f).then(k=>{r.stage.addChild(...k)})};return G(()=>{const e=i.value,t=e.getBoundingClientRect();m({element:e,boundingRect:t})}),(e,t)=>(B(),M("div",{ref_key:"boxElementRef",ref:i,class:"box"},null,512))}};export{F as default};
