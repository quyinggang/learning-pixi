import{A as p}from"./index-71e254cb.js";import{G as d}from"./Graphics-5e1b203f.js";import{r as u,o as m,a as f,c as h}from"./index-cb412c0d.js";const b={__name:"Basic",setup(x){const o=u(null),r=async(e,t)=>{const n=new p;return await n.init({width:e,height:t,antialias:!0,resolution:window.devicePixelRatio||1,autoDensity:!0}),n},l=async e=>{const{element:t,boundingRect:n}=e,c=await r(n.width,n.height);t.appendChild(c.canvas);const a=c.screen,s={x:a.width*.5,y:a.height*.5},i=new d;i.circle(s.x,s.y,20),i.fill("red"),c.stage.addChild(i)};return m(()=>{const e=o.value,t=e.getBoundingClientRect();l({element:e,boundingRect:t})}),(e,t)=>(f(),h("div",{ref_key:"boxElementRef",ref:o,class:"box"},null,512))}};export{b as default};
