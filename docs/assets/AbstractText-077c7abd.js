import{C as l,B as _,O as y,d as c,v as x}from"./index-e61fb7a8.js";class f extends l{constructor(t,s){const{text:e,resolution:i,style:h,anchor:d,width:r,height:o,roundPixels:a,...u}=t;super({...u}),this.batched=!0,this.resolution=null,this._didTextUpdate=!0,this._roundPixels=0,this._bounds=new _,this._boundsDirty=!0,this._styleClass=s,this.text=e??"",this.style=h,this.resolution=i??null,this.allowChildren=!1,this._anchor=new y({_onUpdate:()=>{this.onViewUpdate()}}),d&&(this.anchor=d),this.roundPixels=a??!1,r&&(this.width=r),o&&(this.height=o)}get anchor(){return this._anchor}set anchor(t){typeof t=="number"?this._anchor.set(t):this._anchor.copyFrom(t)}get roundPixels(){return!!this._roundPixels}set roundPixels(t){this._roundPixels=t?1:0}set text(t){t=t.toString(),this._text!==t&&(this._text=t,this.onViewUpdate())}get text(){return this._text}get style(){return this._style}set style(t){var s;t=t||{},(s=this._style)==null||s.off("update",this.onViewUpdate,this),t instanceof this._styleClass?this._style=t:this._style=new this._styleClass(t),this._style.on("update",this.onViewUpdate,this),this.onViewUpdate()}get bounds(){return this._boundsDirty&&(this._updateBounds(),this._boundsDirty=!1),this._bounds}get width(){return Math.abs(this.scale.x)*this.bounds.width}set width(t){this._setWidth(t,this.bounds.width)}get height(){return Math.abs(this.scale.y)*this.bounds.height}set height(t){this._setHeight(t,this.bounds.height)}getSize(t){return t||(t={}),t.width=Math.abs(this.scale.x)*this.bounds.width,t.height=Math.abs(this.scale.y)*this.bounds.height,t}setSize(t,s){let e,i;typeof t!="object"?(e=t,i=s??t):(e=t.width,i=t.height??t.width),e!==void 0&&this._setWidth(e,this.bounds.width),i!==void 0&&this._setHeight(i,this.bounds.height)}addBounds(t){const s=this.bounds;t.addFrame(s.minX,s.minY,s.maxX,s.maxY)}containsPoint(t){const s=this.bounds.maxX,e=this.bounds.maxY,i=-s*this.anchor.x;let h=0;return t.x>=i&&t.x<=i+s&&(h=-e*this.anchor.y,t.y>=h&&t.y<=h+e)}onViewUpdate(){this._didChangeId+=1<<12,this._boundsDirty=!0,!this.didViewUpdate&&(this.didViewUpdate=!0,this._didTextUpdate=!0,this.renderGroup&&this.renderGroup.onChildViewUpdate(this))}_getKey(){return`${this.text}:${this._style.styleKey}`}destroy(t=!1){super.destroy(t),this.owner=null,this._bounds=null,this._anchor=null,(typeof t=="boolean"?t:t!=null&&t.style)&&this._style.destroy(t),this._style=null,this._text=null}}function w(n,t){let s=n[0]??{};return(typeof s=="string"||n[1])&&(c(x,`use new ${t}({ text: "hi!", style }) instead`),s={text:s,style:n[1]}),s}export{f as A,w as e};
