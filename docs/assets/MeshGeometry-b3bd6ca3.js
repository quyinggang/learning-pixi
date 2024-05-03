import{g as b,d as h,v as p,K as o,N as s}from"./index-0d465778.js";const a=class r extends b{constructor(...e){let t=e[0]??{};t instanceof Float32Array&&(h(p,"use new MeshGeometry({ positions, uvs, indices }) instead"),t={positions:t,uvs:e[1],indices:e[2]}),t={...r.defaultOptions,...t};const n=t.positions||new Float32Array([0,0,1,0,1,1,0,1]),f=t.uvs||new Float32Array([0,0,1,0,1,1,0,1]),u=t.indices||new Uint32Array([0,1,2,0,2,3]),i=t.shrinkBuffersToFit,d=new o({data:n,label:"attribute-mesh-positions",shrinkToFit:i,usage:s.VERTEX|s.COPY_DST}),l=new o({data:f,label:"attribute-mesh-uvs",shrinkToFit:i,usage:s.VERTEX|s.COPY_DST}),c=new o({data:u,label:"index-mesh-buffer",shrinkToFit:i,usage:s.INDEX|s.COPY_DST});super({attributes:{aPosition:{buffer:d,format:"float32x2",stride:2*4,offset:0},aUV:{buffer:l,format:"float32x2",stride:2*4,offset:0}},indexBuffer:c,topology:t.topology}),this.batchMode="auto"}get positions(){return this.attributes.aPosition.buffer.data}set positions(e){this.attributes.aPosition.buffer.data=e}get uvs(){return this.attributes.aUV.buffer.data}set uvs(e){this.attributes.aUV.buffer.data=e}get indices(){return this.indexBuffer.data}set indices(e){this.indexBuffer.data=e}};a.defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1};let y=a;export{y as M};