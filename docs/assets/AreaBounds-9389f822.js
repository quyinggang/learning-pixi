import{A as w,R as l,S as g}from"./index-88ee97f3.js";import{G as y}from"./gm-0ebf93b7.js";import{G as p}from"./Graphics-0a80cdea.js";import{T as A}from"./Text-4e9ef713.js";import{A as b}from"./Assets-46fe49a0.js";import{B as _}from"./BlurFilter-c15a49fe.js";import{r as B,o as R,a as k,c as v}from"./index-5e262852.js";import"./AbstractText-7dd4fa6a.js";import"./TextStyle-5dd06822.js";import"./TexturePool-dfa03c68.js";import"./Filter-48e95830.js";const H={__name:"AreaBounds",setup(G){const d=B(null),m=async(n,t)=>{const e=new w;return await e.init({width:n,height:t,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),e},h=n=>{const t=new p;t.circle(0,0,20),t.fill("green"),t.position.set(n.x,n.y);const e=t.getBounds(),{minX:i,minY:s,maxX:o,maxY:c}=e,r=new p;r.rect(0,0,o-i,c-s),r.stroke("red"),r.position.set(i,s);const a=new l(i-20,s-20,o-i+40,c-s+40);return t.boundsArea=a,[r,t]},u=n=>{const t=new p;t.circle(0,0,20),t.fill("green"),t.position.set(n.x,n.y),t.eventMode="static",t.cursor="pointer",t.on("click",()=>{alert("点击了圆形的hitArea")}),t.hitArea=new l(0,0,100,100);const e=new A({text:"修改了hitArea，请移动鼠标并点击查看",style:{fontSize:12,fill:"#fff"}});return e.position.set(t.x-e.width*.5,t.y-e.height-30),[e,t]},f=async n=>{const t=await b.load(y),e=new g(t);return e.width=320,e.height=180,e.position.set(n.x-e.width*.5,n.y),e.filterArea=new l(0,0,t.width,t.height*.5),e.filters=new _,e},x=async n=>{const{element:t,boundingRect:e}=n,i=await m(e.width,e.height);t.appendChild(i.canvas);const s=i.screen,o={x:s.width*.5,y:s.height*.5},c=u({x:o.x,y:o.y*.5}),r=h({x:o.x,y:o.y-30});f(o).then(a=>{i.stage.addChild(a)}),i.stage.addChild(...c,...r)};return R(()=>{const n=d.value,t=n.getBoundingClientRect();x({element:n,boundingRect:t})}),(n,t)=>(k(),v("div",{ref_key:"boxElementRef",ref:d,class:"box"},null,512))}};export{H as default};
