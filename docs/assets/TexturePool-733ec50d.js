import{$ as c,T as a,z as h}from"./index-0d465778.js";let x=0;class n{constructor(e){this._poolKeyHash=Object.create(null),this._texturePool={},this.textureOptions=e||{},this.enableFullScreen=!1}createTexture(e,r,o){const s=new c({...this.textureOptions,width:e,height:r,resolution:1,antialias:o,autoGarbageCollect:!0});return new a({source:s,label:`texturePool_${x++}`})}getOptimalTexture(e,r,o=1,s){let u=Math.ceil(e*o-1e-6),i=Math.ceil(r*o-1e-6);u=h(u),i=h(i);const l=(u<<17)+(i<<1)+(s?1:0);this._texturePool[l]||(this._texturePool[l]=[]);let t=this._texturePool[l].pop();return t||(t=this.createTexture(u,i,s)),t.source._resolution=o,t.source.width=u/o,t.source.height=i/o,t.source.pixelWidth=u,t.source.pixelHeight=i,t.frame.x=0,t.frame.y=0,t.frame.width=e,t.frame.height=r,t.updateUvs(),this._poolKeyHash[t.uid]=l,t}getSameSizeTexture(e,r=!1){const o=e.source;return this.getOptimalTexture(e.width,e.height,o._resolution,r)}returnTexture(e){const r=this._poolKeyHash[e.uid];this._texturePool[r].push(e)}clear(e){if(e=e!==!1,e)for(const r in this._texturePool){const o=this._texturePool[r];if(o)for(let s=0;s<o.length;s++)o[s].destroy(!0)}this._texturePool={}}}const f=new n;export{f as T};
