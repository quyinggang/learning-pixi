import{A as g,S as r,T as w}from"./index-719e27ca.js";import{G as f}from"./gm-0ebf93b7.js";import{A as d}from"./Assets-705850aa.js";import{r as y,o as _,a as b,c as v}from"./index-951d4c83.js";const C=""+new URL("gm-8dde0536.mp4",import.meta.url).href,E={__name:"TextureSource",setup(R){const c=y(null),u=async(t,e)=>{const o=new g;return await o.init({width:t,height:e,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),o},h=async()=>{const t=await d.load(f),e=new r(t);return e.width=320,e.height=180,e},p=async()=>{const t=await d.load({src:C,data:{loop:!0}}),e=new r(t);return e.width=320,e.height=180,e},m=()=>{const t=document.createElement("canvas"),e=t.getContext("2d");t.width=320,t.height=180,e.beginPath(),e.rect(0,0,320,180),e.strokeStyle="red",e.stroke(),e.beginPath(),e.rect(80,45,160,90),e.fillStyle="green",e.fill();const o=w.from({resource:t}),n=new r(o);return n.width=320,n.height=180,n},x=async t=>{const{element:e,boundingRect:o}=t,n=await u(o.width,o.height);e.appendChild(n.canvas);const i=n.screen,a={x:i.width*.5,y:i.height*.5};h().then(s=>{s.position.set(a.x-160,a.y*.5-90),n.stage.addChild(s)}),p().then(s=>{s.position.set(a.x-160,a.y-90),n.stage.addChild(s)});const l=m();l.position.set(a.x-160,a.y+100),n.stage.addChild(l)};return _(()=>{const t=c.value,e=t.getBoundingClientRect();x({element:t,boundingRect:e})}),(t,e)=>(b(),v("div",{ref_key:"boxElementRef",ref:c,class:"box"},null,512))}};export{E as default};
