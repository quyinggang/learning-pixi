import{d as w,v as Y}from"./index-19f7f59e.js";import{M as b}from"./MeshGeometry-8e968a44.js";const d=class l extends b{constructor(...t){super({});let h=t[0]??{};typeof h=="number"&&(w(Y,"PlaneGeometry constructor changed please use { width, height, verticesX, verticesY } instead"),h={width:h,height:t[1],verticesX:t[2],verticesY:t[3]}),this.build(h)}build(t){t={...l.defaultOptions,...t},this.verticesX=this.verticesX??t.verticesX,this.verticesY=this.verticesY??t.verticesY,this.width=this.width??t.width,this.height=this.height??t.height;const h=this.verticesX*this.verticesY,o=[],n=[],a=[],r=this.verticesX-1,c=this.verticesY-1,f=this.width/r,X=this.height/c;for(let e=0;e<h;e++){const s=e%this.verticesX,i=e/this.verticesX|0;o.push(s*f,i*X),n.push(s/r,i/c)}const p=r*c;for(let e=0;e<p;e++){const s=e%r,i=e/r|0,y=i*this.verticesX+s,v=i*this.verticesX+s+1,u=(i+1)*this.verticesX+s,m=(i+1)*this.verticesX+s+1;a.push(y,v,u,v,m,u)}this.buffers[0].data=new Float32Array(o),this.buffers[1].data=new Float32Array(n),this.indexBuffer.data=new Uint32Array(a),this.buffers[0].update(),this.buffers[1].update(),this.indexBuffer.update()}};d.defaultOptions={width:100,height:100,verticesX:10,verticesY:10};let G=d;export{G as P};