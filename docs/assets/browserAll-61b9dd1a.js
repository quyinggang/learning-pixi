import{P as f,r as S,E as T,a as D,U,e as H,w as m,b as x,C as L}from"./index-19f7f59e.js";import{i as X}from"./isMobile-adf3d71d.js";import"./init-6065bcf4.js";import"./index-2ed5649e.js";import"./State-93d76a17.js";import"./colorToUniform-3c56dadf.js";import"./Shader-62100aa5.js";import"./CanvasPool-f94e9513.js";import"./TexturePool-cca4082f.js";import"./TextStyle-78f8ae7d.js";import"./BitmapFontManager-8012d17b.js";import"./Graphics-15f681b0.js";import"./batchSamplersUniformGroup-2c4143b6.js";import"./measureHtmlText-09a2031f.js";import"./MeshGeometry-8e968a44.js";import"./NineSliceGeometry-1f637023.js";import"./PlaneGeometry-ddf45470.js";class P{constructor(t){this.bubbles=!0,this.cancelBubble=!0,this.cancelable=!1,this.composed=!1,this.defaultPrevented=!1,this.eventPhase=P.prototype.NONE,this.propagationStopped=!1,this.propagationImmediatelyStopped=!1,this.layer=new f,this.page=new f,this.NONE=0,this.CAPTURING_PHASE=1,this.AT_TARGET=2,this.BUBBLING_PHASE=3,this.manager=t}get layerX(){return this.layer.x}get layerY(){return this.layer.y}get pageX(){return this.page.x}get pageY(){return this.page.y}get data(){return this}composedPath(){return this.manager&&(!this.path||this.path[this.path.length-1]!==this.target)&&(this.path=this.target?this.manager.propagationPath(this.target):[]),this.path}initEvent(t,e,i){throw new Error("initEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}initUIEvent(t,e,i,s,n){throw new Error("initUIEvent() is a legacy DOM API. It is not implemented in the Federated Events API.")}preventDefault(){this.nativeEvent instanceof Event&&this.nativeEvent.cancelable&&this.nativeEvent.preventDefault(),this.defaultPrevented=!0}stopImmediatePropagation(){this.propagationImmediatelyStopped=!0}stopPropagation(){this.propagationStopped=!0}}const Y=9,w=100,R=0,F=0,O=2,k=1,K=-1e3,$=-1e3,G=2;class B{constructor(t,e=X){this._mobileInfo=e,this.debug=!1,this._isActive=!1,this._isMobileAccessibility=!1,this._pool=[],this._renderId=0,this._children=[],this._androidUpdateCount=0,this._androidUpdateFrequency=500,this._hookDiv=null,(e.tablet||e.phone)&&this._createTouchHook();const i=document.createElement("div");i.style.width=`${w}px`,i.style.height=`${w}px`,i.style.position="absolute",i.style.top=`${R}px`,i.style.left=`${F}px`,i.style.zIndex=O.toString(),this._div=i,this._renderer=t,this._onKeyDown=this._onKeyDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),globalThis.addEventListener("keydown",this._onKeyDown,!1)}get isActive(){return this._isActive}get isMobileAccessibility(){return this._isMobileAccessibility}get hookDiv(){return this._hookDiv}_createTouchHook(){const t=document.createElement("button");t.style.width=`${k}px`,t.style.height=`${k}px`,t.style.position="absolute",t.style.top=`${K}px`,t.style.left=`${$}px`,t.style.zIndex=G.toString(),t.style.backgroundColor="#FF0000",t.title="select to enable accessibility for this content",t.addEventListener("focus",()=>{this._isMobileAccessibility=!0,this._activate(),this._destroyTouchHook()}),document.body.appendChild(t),this._hookDiv=t}_destroyTouchHook(){this._hookDiv&&(document.body.removeChild(this._hookDiv),this._hookDiv=null)}_activate(){var t;this._isActive||(this._isActive=!0,globalThis.document.addEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.add(this),(t=this._renderer.view.canvas.parentNode)==null||t.appendChild(this._div))}_deactivate(){var t;!this._isActive||this._isMobileAccessibility||(this._isActive=!1,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.addEventListener("keydown",this._onKeyDown,!1),this._renderer.runners.postrender.remove(this),(t=this._div.parentNode)==null||t.removeChild(this._div))}_updateAccessibleObjects(t){if(!t.visible||!t.accessibleChildren)return;t.accessible&&t.isInteractive()&&(t._accessibleActive||this._addChild(t),t._renderId=this._renderId);const e=t.children;if(e)for(let i=0;i<e.length;i++)this._updateAccessibleObjects(e[i])}init(t){this.debug=(t==null?void 0:t.debug)??this.debug,this._renderer.runners.postrender.remove(this)}postrender(){const t=performance.now();if(this._mobileInfo.android.device&&t<this._androidUpdateCount||(this._androidUpdateCount=t+this._androidUpdateFrequency,!this._renderer.renderingToScreen||!this._renderer.view.canvas))return;this._renderer.lastObjectRendered&&this._updateAccessibleObjects(this._renderer.lastObjectRendered);const{x:e,y:i,width:s,height:n}=this._renderer.view.canvas.getBoundingClientRect(),{width:o,height:r,resolution:d}=this._renderer,p=s/o*d,v=n/r*d;let a=this._div;a.style.left=`${e}px`,a.style.top=`${i}px`,a.style.width=`${o}px`,a.style.height=`${r}px`;for(let h=0;h<this._children.length;h++){const l=this._children[h];if(l._renderId!==this._renderId)l._accessibleActive=!1,S(this._children,h,1),this._div.removeChild(l._accessibleDiv),this._pool.push(l._accessibleDiv),l._accessibleDiv=null,h--;else{a=l._accessibleDiv;let c=l.hitArea;const E=l.worldTransform;l.hitArea?(a.style.left=`${(E.tx+c.x*E.a)*p}px`,a.style.top=`${(E.ty+c.y*E.d)*v}px`,a.style.width=`${c.width*E.a*p}px`,a.style.height=`${c.height*E.d*v}px`):(c=l.getBounds().rectangle,this._capHitArea(c),a.style.left=`${c.x*p}px`,a.style.top=`${c.y*v}px`,a.style.width=`${c.width*p}px`,a.style.height=`${c.height*v}px`,a.title!==l.accessibleTitle&&l.accessibleTitle!==null&&(a.title=l.accessibleTitle||""),a.getAttribute("aria-label")!==l.accessibleHint&&l.accessibleHint!==null&&a.setAttribute("aria-label",l.accessibleHint||"")),(l.accessibleTitle!==a.title||l.tabIndex!==a.tabIndex)&&(a.title=l.accessibleTitle||"",a.tabIndex=l.tabIndex,this.debug&&this._updateDebugHTML(a))}}this._renderId++}_updateDebugHTML(t){t.innerHTML=`type: ${t.type}</br> title : ${t.title}</br> tabIndex: ${t.tabIndex}`}_capHitArea(t){t.x<0&&(t.width+=t.x,t.x=0),t.y<0&&(t.height+=t.y,t.y=0);const{width:e,height:i}=this._renderer;t.x+t.width>e&&(t.width=e-t.x),t.y+t.height>i&&(t.height=i-t.y)}_addChild(t){let e=this._pool.pop();e||(e=document.createElement("button"),e.style.width=`${w}px`,e.style.height=`${w}px`,e.style.backgroundColor=this.debug?"rgba(255,255,255,0.5)":"transparent",e.style.position="absolute",e.style.zIndex=O.toString(),e.style.borderStyle="none",navigator.userAgent.toLowerCase().includes("chrome")?e.setAttribute("aria-live","off"):e.setAttribute("aria-live","polite"),navigator.userAgent.match(/rv:.*Gecko\//)?e.setAttribute("aria-relevant","additions"):e.setAttribute("aria-relevant","text"),e.addEventListener("click",this._onClick.bind(this)),e.addEventListener("focus",this._onFocus.bind(this)),e.addEventListener("focusout",this._onFocusOut.bind(this))),e.style.pointerEvents=t.accessiblePointerEvents,e.type=t.accessibleType,t.accessibleTitle&&t.accessibleTitle!==null?e.title=t.accessibleTitle:(!t.accessibleHint||t.accessibleHint===null)&&(e.title=`container ${t.tabIndex}`),t.accessibleHint&&t.accessibleHint!==null&&e.setAttribute("aria-label",t.accessibleHint),this.debug&&this._updateDebugHTML(e),t._accessibleActive=!0,t._accessibleDiv=e,e.container=t,this._children.push(t),this._div.appendChild(t._accessibleDiv),t._accessibleDiv.tabIndex=t.tabIndex}_dispatchEvent(t,e){const{container:i}=t.target,s=this._renderer.events.rootBoundary,n=Object.assign(new P(s),{target:i});s.rootTarget=this._renderer.lastObjectRendered,e.forEach(o=>s.dispatchEvent(n,o))}_onClick(t){this._dispatchEvent(t,["click","pointertap","tap"])}_onFocus(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","assertive"),this._dispatchEvent(t,["mouseover"])}_onFocusOut(t){t.target.getAttribute("aria-live")||t.target.setAttribute("aria-live","polite"),this._dispatchEvent(t,["mouseout"])}_onKeyDown(t){t.keyCode===Y&&this._activate()}_onMouseMove(t){t.movementX===0&&t.movementY===0||this._deactivate()}destroy(){this._destroyTouchHook(),this._div=null,globalThis.document.removeEventListener("mousemove",this._onMouseMove,!0),globalThis.removeEventListener("keydown",this._onKeyDown),this._pool=null,this._children=null,this._renderer=null}}B.extension={type:[T.WebGLSystem,T.WebGPUSystem],name:"accessibility"};const j={accessible:!1,accessibleTitle:null,accessibleHint:null,tabIndex:0,_accessibleActive:!1,_accessibleDiv:null,accessibleType:"button",accessiblePointerEvents:"auto",accessibleChildren:!0,_renderId:-1};class N{constructor(){this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}init(t){this.removeTickerListener(),this.events=t,this.interactionFrequency=10,this._deltaTime=0,this._didMove=!1,this._tickerAdded=!1,this._pauseUpdate=!0}get pauseUpdate(){return this._pauseUpdate}set pauseUpdate(t){this._pauseUpdate=t}addTickerListener(){this._tickerAdded||!this.domElement||(D.system.add(this._tickerUpdate,this,U.INTERACTION),this._tickerAdded=!0)}removeTickerListener(){this._tickerAdded&&(D.system.remove(this._tickerUpdate,this),this._tickerAdded=!1)}pointerMoved(){this._didMove=!0}_update(){if(!this.domElement||this._pauseUpdate)return;if(this._didMove){this._didMove=!1;return}const t=this.events._rootPointerEvent;this.events.supportsTouchEvents&&t.pointerType==="touch"||globalThis.document.dispatchEvent(new PointerEvent("pointermove",{clientX:t.clientX,clientY:t.clientY}))}_tickerUpdate(t){this._deltaTime+=t.deltaTime,!(this._deltaTime<this.interactionFrequency)&&(this._deltaTime=0,this._update())}}const y=new N;class M extends P{constructor(){super(...arguments),this.client=new f,this.movement=new f,this.offset=new f,this.global=new f,this.screen=new f}get clientX(){return this.client.x}get clientY(){return this.client.y}get x(){return this.clientX}get y(){return this.clientY}get movementX(){return this.movement.x}get movementY(){return this.movement.y}get offsetX(){return this.offset.x}get offsetY(){return this.offset.y}get globalX(){return this.global.x}get globalY(){return this.global.y}get screenX(){return this.screen.x}get screenY(){return this.screen.y}getLocalPosition(t,e,i){return t.worldTransform.applyInverse(i||this.global,e)}getModifierState(t){return"getModifierState"in this.nativeEvent&&this.nativeEvent.getModifierState(t)}initMouseEvent(t,e,i,s,n,o,r,d,p,v,a,h,l,c,E){throw new Error("Method not implemented.")}}class g extends M{constructor(){super(...arguments),this.width=0,this.height=0,this.isPrimary=!1}getCoalescedEvents(){return this.type==="pointermove"||this.type==="mousemove"||this.type==="touchmove"?[this]:[]}getPredictedEvents(){throw new Error("getPredictedEvents is not supported!")}}class _ extends M{constructor(){super(...arguments),this.DOM_DELTA_PIXEL=0,this.DOM_DELTA_LINE=1,this.DOM_DELTA_PAGE=2}}_.DOM_DELTA_PIXEL=0;_.DOM_DELTA_LINE=1;_.DOM_DELTA_PAGE=2;const W=2048,z=new f,b=new f;class Z{constructor(t){this.dispatch=new H,this.moveOnAll=!1,this.enableGlobalMoveEvents=!0,this.mappingState={trackingData:{}},this.eventPool=new Map,this._allInteractiveElements=[],this._hitElements=[],this._isPointerMoveEvent=!1,this.rootTarget=t,this.hitPruneFn=this.hitPruneFn.bind(this),this.hitTestFn=this.hitTestFn.bind(this),this.mapPointerDown=this.mapPointerDown.bind(this),this.mapPointerMove=this.mapPointerMove.bind(this),this.mapPointerOut=this.mapPointerOut.bind(this),this.mapPointerOver=this.mapPointerOver.bind(this),this.mapPointerUp=this.mapPointerUp.bind(this),this.mapPointerUpOutside=this.mapPointerUpOutside.bind(this),this.mapWheel=this.mapWheel.bind(this),this.mappingTable={},this.addEventMapping("pointerdown",this.mapPointerDown),this.addEventMapping("pointermove",this.mapPointerMove),this.addEventMapping("pointerout",this.mapPointerOut),this.addEventMapping("pointerleave",this.mapPointerOut),this.addEventMapping("pointerover",this.mapPointerOver),this.addEventMapping("pointerup",this.mapPointerUp),this.addEventMapping("pointerupoutside",this.mapPointerUpOutside),this.addEventMapping("wheel",this.mapWheel)}addEventMapping(t,e){this.mappingTable[t]||(this.mappingTable[t]=[]),this.mappingTable[t].push({fn:e,priority:0}),this.mappingTable[t].sort((i,s)=>i.priority-s.priority)}dispatchEvent(t,e){t.propagationStopped=!1,t.propagationImmediatelyStopped=!1,this.propagate(t,e),this.dispatch.emit(e||t.type,t)}mapEvent(t){if(!this.rootTarget)return;const e=this.mappingTable[t.type];if(e)for(let i=0,s=e.length;i<s;i++)e[i].fn(t);else m(`[EventBoundary]: Event mapping not defined for ${t.type}`)}hitTest(t,e){y.pauseUpdate=!0;const s=this._isPointerMoveEvent&&this.enableGlobalMoveEvents?"hitTestMoveRecursive":"hitTestRecursive",n=this[s](this.rootTarget,this.rootTarget.eventMode,z.set(t,e),this.hitTestFn,this.hitPruneFn);return n&&n[0]}propagate(t,e){if(!t.target)return;const i=t.composedPath();t.eventPhase=t.CAPTURING_PHASE;for(let s=0,n=i.length-1;s<n;s++)if(t.currentTarget=i[s],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return;if(t.eventPhase=t.AT_TARGET,t.currentTarget=t.target,this.notifyTarget(t,e),!(t.propagationStopped||t.propagationImmediatelyStopped)){t.eventPhase=t.BUBBLING_PHASE;for(let s=i.length-2;s>=0;s--)if(t.currentTarget=i[s],this.notifyTarget(t,e),t.propagationStopped||t.propagationImmediatelyStopped)return}}all(t,e,i=this._allInteractiveElements){if(i.length===0)return;t.eventPhase=t.BUBBLING_PHASE;const s=Array.isArray(e)?e:[e];for(let n=i.length-1;n>=0;n--)s.forEach(o=>{t.currentTarget=i[n],this.notifyTarget(t,o)})}propagationPath(t){const e=[t];for(let i=0;i<W&&t!==this.rootTarget&&t.parent;i++){if(!t.parent)throw new Error("Cannot find propagation path to disconnected target");e.push(t.parent),t=t.parent}return e.reverse(),e}hitTestMoveRecursive(t,e,i,s,n,o=!1){let r=!1;if(this._interactivePrune(t))return null;if((t.eventMode==="dynamic"||e==="dynamic")&&(y.pauseUpdate=!1),t.interactiveChildren&&t.children){const v=t.children;for(let a=v.length-1;a>=0;a--){const h=v[a],l=this.hitTestMoveRecursive(h,this._isInteractive(e)?e:h.eventMode,i,s,n,o||n(t,i));if(l){if(l.length>0&&!l[l.length-1].parent)continue;const c=t.isInteractive();(l.length>0||c)&&(c&&this._allInteractiveElements.push(t),l.push(t)),this._hitElements.length===0&&(this._hitElements=l),r=!0}}}const d=this._isInteractive(e),p=t.isInteractive();return p&&p&&this._allInteractiveElements.push(t),o||this._hitElements.length>0?null:r?this._hitElements:d&&!n(t,i)&&s(t,i)?p?[t]:[]:null}hitTestRecursive(t,e,i,s,n){if(this._interactivePrune(t)||n(t,i))return null;if((t.eventMode==="dynamic"||e==="dynamic")&&(y.pauseUpdate=!1),t.interactiveChildren&&t.children){const d=t.children,p=i;for(let v=d.length-1;v>=0;v--){const a=d[v],h=this.hitTestRecursive(a,this._isInteractive(e)?e:a.eventMode,p,s,n);if(h){if(h.length>0&&!h[h.length-1].parent)continue;const l=t.isInteractive();return(h.length>0||l)&&h.push(t),h}}}const o=this._isInteractive(e),r=t.isInteractive();return o&&s(t,i)?r?[t]:[]:null}_isInteractive(t){return t==="static"||t==="dynamic"}_interactivePrune(t){return!t||!t.visible||!t.renderable||t.eventMode==="none"||t.eventMode==="passive"&&!t.interactiveChildren}hitPruneFn(t,e){if(t.hitArea&&(t.worldTransform.applyInverse(e,b),!t.hitArea.contains(b.x,b.y)))return!0;if(t.effects&&t.effects.length)for(let i=0;i<t.effects.length;i++){const s=t.effects[i];if(s.containsPoint&&!s.containsPoint(e,this.hitTestFn))return!0}return!1}hitTestFn(t,e){return t.hitArea?!0:t!=null&&t.containsPoint?(t.worldTransform.applyInverse(e,b),t.containsPoint(b)):!1}notifyTarget(t,e){var n,o;e=e??t.type;const i=`on${e}`;(o=(n=t.currentTarget)[i])==null||o.call(n,t);const s=t.eventPhase===t.CAPTURING_PHASE||t.eventPhase===t.AT_TARGET?`${e}capture`:e;this._notifyListeners(t,s),t.eventPhase===t.AT_TARGET&&this._notifyListeners(t,e)}mapPointerDown(t){if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}const e=this.createPointerEvent(t);if(this.dispatchEvent(e,"pointerdown"),e.pointerType==="touch")this.dispatchEvent(e,"touchstart");else if(e.pointerType==="mouse"||e.pointerType==="pen"){const s=e.button===2;this.dispatchEvent(e,s?"rightdown":"mousedown")}const i=this.trackingData(t.pointerId);i.pressTargetsByButton[t.button]=e.composedPath(),this.freeEvent(e)}mapPointerMove(t){var d,p;if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}this._allInteractiveElements.length=0,this._hitElements.length=0,this._isPointerMoveEvent=!0;const e=this.createPointerEvent(t);this._isPointerMoveEvent=!1;const i=e.pointerType==="mouse"||e.pointerType==="pen",s=this.trackingData(t.pointerId),n=this.findMountedTarget(s.overTargets);if(((d=s.overTargets)==null?void 0:d.length)>0&&n!==e.target){const v=t.type==="mousemove"?"mouseout":"pointerout",a=this.createPointerEvent(t,v,n);if(this.dispatchEvent(a,"pointerout"),i&&this.dispatchEvent(a,"mouseout"),!e.composedPath().includes(n)){const h=this.createPointerEvent(t,"pointerleave",n);for(h.eventPhase=h.AT_TARGET;h.target&&!e.composedPath().includes(h.target);)h.currentTarget=h.target,this.notifyTarget(h),i&&this.notifyTarget(h,"mouseleave"),h.target=h.target.parent;this.freeEvent(h)}this.freeEvent(a)}if(n!==e.target){const v=t.type==="mousemove"?"mouseover":"pointerover",a=this.clonePointerEvent(e,v);this.dispatchEvent(a,"pointerover"),i&&this.dispatchEvent(a,"mouseover");let h=n==null?void 0:n.parent;for(;h&&h!==this.rootTarget.parent&&h!==e.target;)h=h.parent;if(!h||h===this.rootTarget.parent){const c=this.clonePointerEvent(e,"pointerenter");for(c.eventPhase=c.AT_TARGET;c.target&&c.target!==n&&c.target!==this.rootTarget.parent;)c.currentTarget=c.target,this.notifyTarget(c),i&&this.notifyTarget(c,"mouseenter"),c.target=c.target.parent;this.freeEvent(c)}this.freeEvent(a)}const o=[],r=this.enableGlobalMoveEvents??!0;this.moveOnAll?o.push("pointermove"):this.dispatchEvent(e,"pointermove"),r&&o.push("globalpointermove"),e.pointerType==="touch"&&(this.moveOnAll?o.splice(1,0,"touchmove"):this.dispatchEvent(e,"touchmove"),r&&o.push("globaltouchmove")),i&&(this.moveOnAll?o.splice(1,0,"mousemove"):this.dispatchEvent(e,"mousemove"),r&&o.push("globalmousemove"),this.cursor=(p=e.target)==null?void 0:p.cursor),o.length>0&&this.all(e,o),this._allInteractiveElements.length=0,this._hitElements.length=0,s.overTargets=e.composedPath(),this.freeEvent(e)}mapPointerOver(t){var o;if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}const e=this.trackingData(t.pointerId),i=this.createPointerEvent(t),s=i.pointerType==="mouse"||i.pointerType==="pen";this.dispatchEvent(i,"pointerover"),s&&this.dispatchEvent(i,"mouseover"),i.pointerType==="mouse"&&(this.cursor=(o=i.target)==null?void 0:o.cursor);const n=this.clonePointerEvent(i,"pointerenter");for(n.eventPhase=n.AT_TARGET;n.target&&n.target!==this.rootTarget.parent;)n.currentTarget=n.target,this.notifyTarget(n),s&&this.notifyTarget(n,"mouseenter"),n.target=n.target.parent;e.overTargets=i.composedPath(),this.freeEvent(i),this.freeEvent(n)}mapPointerOut(t){if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}const e=this.trackingData(t.pointerId);if(e.overTargets){const i=t.pointerType==="mouse"||t.pointerType==="pen",s=this.findMountedTarget(e.overTargets),n=this.createPointerEvent(t,"pointerout",s);this.dispatchEvent(n),i&&this.dispatchEvent(n,"mouseout");const o=this.createPointerEvent(t,"pointerleave",s);for(o.eventPhase=o.AT_TARGET;o.target&&o.target!==this.rootTarget.parent;)o.currentTarget=o.target,this.notifyTarget(o),i&&this.notifyTarget(o,"mouseleave"),o.target=o.target.parent;e.overTargets=null,this.freeEvent(n),this.freeEvent(o)}this.cursor=null}mapPointerUp(t){if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}const e=performance.now(),i=this.createPointerEvent(t);if(this.dispatchEvent(i,"pointerup"),i.pointerType==="touch")this.dispatchEvent(i,"touchend");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const r=i.button===2;this.dispatchEvent(i,r?"rightup":"mouseup")}const s=this.trackingData(t.pointerId),n=this.findMountedTarget(s.pressTargetsByButton[t.button]);let o=n;if(n&&!i.composedPath().includes(n)){let r=n;for(;r&&!i.composedPath().includes(r);){if(i.currentTarget=r,this.notifyTarget(i,"pointerupoutside"),i.pointerType==="touch")this.notifyTarget(i,"touchendoutside");else if(i.pointerType==="mouse"||i.pointerType==="pen"){const d=i.button===2;this.notifyTarget(i,d?"rightupoutside":"mouseupoutside")}r=r.parent}delete s.pressTargetsByButton[t.button],o=r}if(o){const r=this.clonePointerEvent(i,"click");r.target=o,r.path=null,s.clicksByButton[t.button]||(s.clicksByButton[t.button]={clickCount:0,target:r.target,timeStamp:e});const d=s.clicksByButton[t.button];if(d.target===r.target&&e-d.timeStamp<200?++d.clickCount:d.clickCount=1,d.target=r.target,d.timeStamp=e,r.detail=d.clickCount,r.pointerType==="mouse"){const p=r.button===2;this.dispatchEvent(r,p?"rightclick":"click")}else r.pointerType==="touch"&&this.dispatchEvent(r,"tap");this.dispatchEvent(r,"pointertap"),this.freeEvent(r)}this.freeEvent(i)}mapPointerUpOutside(t){if(!(t instanceof g)){m("EventBoundary cannot map a non-pointer event as a pointer event");return}const e=this.trackingData(t.pointerId),i=this.findMountedTarget(e.pressTargetsByButton[t.button]),s=this.createPointerEvent(t);if(i){let n=i;for(;n;)s.currentTarget=n,this.notifyTarget(s,"pointerupoutside"),s.pointerType==="touch"?this.notifyTarget(s,"touchendoutside"):(s.pointerType==="mouse"||s.pointerType==="pen")&&this.notifyTarget(s,s.button===2?"rightupoutside":"mouseupoutside"),n=n.parent;delete e.pressTargetsByButton[t.button]}this.freeEvent(s)}mapWheel(t){if(!(t instanceof _)){m("EventBoundary cannot map a non-wheel event as a wheel event");return}const e=this.createWheelEvent(t);this.dispatchEvent(e),this.freeEvent(e)}findMountedTarget(t){if(!t)return null;let e=t[0];for(let i=1;i<t.length&&t[i].parent===e;i++)e=t[i];return e}createPointerEvent(t,e,i){const s=this.allocateEvent(g);return this.copyPointerData(t,s),this.copyMouseData(t,s),this.copyData(t,s),s.nativeEvent=t.nativeEvent,s.originalEvent=t,s.target=i??this.hitTest(s.global.x,s.global.y)??this._hitElements[0],typeof e=="string"&&(s.type=e),s}createWheelEvent(t){const e=this.allocateEvent(_);return this.copyWheelData(t,e),this.copyMouseData(t,e),this.copyData(t,e),e.nativeEvent=t.nativeEvent,e.originalEvent=t,e.target=this.hitTest(e.global.x,e.global.y),e}clonePointerEvent(t,e){const i=this.allocateEvent(g);return i.nativeEvent=t.nativeEvent,i.originalEvent=t.originalEvent,this.copyPointerData(t,i),this.copyMouseData(t,i),this.copyData(t,i),i.target=t.target,i.path=t.composedPath().slice(),i.type=e??i.type,i}copyWheelData(t,e){e.deltaMode=t.deltaMode,e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ}copyPointerData(t,e){t instanceof g&&e instanceof g&&(e.pointerId=t.pointerId,e.width=t.width,e.height=t.height,e.isPrimary=t.isPrimary,e.pointerType=t.pointerType,e.pressure=t.pressure,e.tangentialPressure=t.tangentialPressure,e.tiltX=t.tiltX,e.tiltY=t.tiltY,e.twist=t.twist)}copyMouseData(t,e){t instanceof M&&e instanceof M&&(e.altKey=t.altKey,e.button=t.button,e.buttons=t.buttons,e.client.copyFrom(t.client),e.ctrlKey=t.ctrlKey,e.metaKey=t.metaKey,e.movement.copyFrom(t.movement),e.screen.copyFrom(t.screen),e.shiftKey=t.shiftKey,e.global.copyFrom(t.global))}copyData(t,e){e.isTrusted=t.isTrusted,e.srcElement=t.srcElement,e.timeStamp=performance.now(),e.type=t.type,e.detail=t.detail,e.view=t.view,e.which=t.which,e.layer.copyFrom(t.layer),e.page.copyFrom(t.page)}trackingData(t){return this.mappingState.trackingData[t]||(this.mappingState.trackingData[t]={pressTargetsByButton:{},clicksByButton:{},overTarget:null}),this.mappingState.trackingData[t]}allocateEvent(t){this.eventPool.has(t)||this.eventPool.set(t,[]);const e=this.eventPool.get(t).pop()||new t(this);return e.eventPhase=e.NONE,e.currentTarget=null,e.path=null,e.target=null,e}freeEvent(t){if(t.manager!==this)throw new Error("It is illegal to free an event not managed by this EventBoundary!");const e=t.constructor;this.eventPool.has(e)||this.eventPool.set(e,[]),this.eventPool.get(e).push(t)}_notifyListeners(t,e){const i=t.currentTarget._events[e];if(i&&t.currentTarget.isInteractive())if("fn"in i)i.once&&t.currentTarget.removeListener(e,i.fn,void 0,!0),i.fn.call(i.context,t);else for(let s=0,n=i.length;s<n&&!t.propagationImmediatelyStopped;s++)i[s].once&&t.currentTarget.removeListener(e,i[s].fn,void 0,!0),i[s].fn.call(i[s].context,t)}}const V=1,q={touchstart:"pointerdown",touchend:"pointerup",touchendoutside:"pointerupoutside",touchmove:"pointermove",touchcancel:"pointercancel"},I=class A{constructor(t){this.supportsTouchEvents="ontouchstart"in globalThis,this.supportsPointerEvents=!!globalThis.PointerEvent,this.domElement=null,this.resolution=1,this.renderer=t,this.rootBoundary=new Z(null),y.init(this),this.autoPreventDefault=!0,this._eventsAdded=!1,this._rootPointerEvent=new g(null),this._rootWheelEvent=new _(null),this.cursorStyles={default:"inherit",pointer:"pointer"},this.features=new Proxy({...A.defaultEventFeatures},{set:(e,i,s)=>(i==="globalMove"&&(this.rootBoundary.enableGlobalMoveEvents=s),e[i]=s,!0)}),this._onPointerDown=this._onPointerDown.bind(this),this._onPointerMove=this._onPointerMove.bind(this),this._onPointerUp=this._onPointerUp.bind(this),this._onPointerOverOut=this._onPointerOverOut.bind(this),this.onWheel=this.onWheel.bind(this)}static get defaultEventMode(){return this._defaultEventMode}init(t){const{canvas:e,resolution:i}=this.renderer;this.setTargetElement(e),this.resolution=i,A._defaultEventMode=t.eventMode??"passive",Object.assign(this.features,t.eventFeatures??{}),this.rootBoundary.enableGlobalMoveEvents=this.features.globalMove}resolutionChange(t){this.resolution=t}destroy(){this.setTargetElement(null),this.renderer=null,this._currentCursor=null}setCursor(t){t=t||"default";let e=!0;if(globalThis.OffscreenCanvas&&this.domElement instanceof OffscreenCanvas&&(e=!1),this._currentCursor===t)return;this._currentCursor=t;const i=this.cursorStyles[t];if(i)switch(typeof i){case"string":e&&(this.domElement.style.cursor=i);break;case"function":i(t);break;case"object":e&&Object.assign(this.domElement.style,i);break}else e&&typeof t=="string"&&!Object.prototype.hasOwnProperty.call(this.cursorStyles,t)&&(this.domElement.style.cursor=t)}get pointer(){return this._rootPointerEvent}_onPointerDown(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(t);this.autoPreventDefault&&e[0].isNormalized&&(t.cancelable||!("cancelable"in t))&&t.preventDefault();for(let i=0,s=e.length;i<s;i++){const n=e[i],o=this._bootstrapEvent(this._rootPointerEvent,n);this.rootBoundary.mapEvent(o)}this.setCursor(this.rootBoundary.cursor)}_onPointerMove(t){if(!this.features.move)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,y.pointerMoved();const e=this._normalizeToPointerData(t);for(let i=0,s=e.length;i<s;i++){const n=this._bootstrapEvent(this._rootPointerEvent,e[i]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}_onPointerUp(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;let e=t.target;t.composedPath&&t.composedPath().length>0&&(e=t.composedPath()[0]);const i=e!==this.domElement?"outside":"",s=this._normalizeToPointerData(t);for(let n=0,o=s.length;n<o;n++){const r=this._bootstrapEvent(this._rootPointerEvent,s[n]);r.type+=i,this.rootBoundary.mapEvent(r)}this.setCursor(this.rootBoundary.cursor)}_onPointerOverOut(t){if(!this.features.click)return;this.rootBoundary.rootTarget=this.renderer.lastObjectRendered;const e=this._normalizeToPointerData(t);for(let i=0,s=e.length;i<s;i++){const n=this._bootstrapEvent(this._rootPointerEvent,e[i]);this.rootBoundary.mapEvent(n)}this.setCursor(this.rootBoundary.cursor)}onWheel(t){if(!this.features.wheel)return;const e=this.normalizeWheelEvent(t);this.rootBoundary.rootTarget=this.renderer.lastObjectRendered,this.rootBoundary.mapEvent(e)}setTargetElement(t){this._removeEvents(),this.domElement=t,y.domElement=t,this._addEvents()}_addEvents(){if(this._eventsAdded||!this.domElement)return;y.addTickerListener();const t=this.domElement.style;t&&(globalThis.navigator.msPointerEnabled?(t.msContentZooming="none",t.msTouchAction="none"):this.supportsPointerEvents&&(t.touchAction="none")),this.supportsPointerEvents?(globalThis.document.addEventListener("pointermove",this._onPointerMove,!0),this.domElement.addEventListener("pointerdown",this._onPointerDown,!0),this.domElement.addEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.addEventListener("pointerover",this._onPointerOverOut,!0),globalThis.addEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.addEventListener("mousemove",this._onPointerMove,!0),this.domElement.addEventListener("mousedown",this._onPointerDown,!0),this.domElement.addEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.addEventListener("mouseover",this._onPointerOverOut,!0),globalThis.addEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.addEventListener("touchstart",this._onPointerDown,!0),this.domElement.addEventListener("touchend",this._onPointerUp,!0),this.domElement.addEventListener("touchmove",this._onPointerMove,!0))),this.domElement.addEventListener("wheel",this.onWheel,{passive:!0,capture:!0}),this._eventsAdded=!0}_removeEvents(){if(!this._eventsAdded||!this.domElement)return;y.removeTickerListener();const t=this.domElement.style;t&&(globalThis.navigator.msPointerEnabled?(t.msContentZooming="",t.msTouchAction=""):this.supportsPointerEvents&&(t.touchAction="")),this.supportsPointerEvents?(globalThis.document.removeEventListener("pointermove",this._onPointerMove,!0),this.domElement.removeEventListener("pointerdown",this._onPointerDown,!0),this.domElement.removeEventListener("pointerleave",this._onPointerOverOut,!0),this.domElement.removeEventListener("pointerover",this._onPointerOverOut,!0),globalThis.removeEventListener("pointerup",this._onPointerUp,!0)):(globalThis.document.removeEventListener("mousemove",this._onPointerMove,!0),this.domElement.removeEventListener("mousedown",this._onPointerDown,!0),this.domElement.removeEventListener("mouseout",this._onPointerOverOut,!0),this.domElement.removeEventListener("mouseover",this._onPointerOverOut,!0),globalThis.removeEventListener("mouseup",this._onPointerUp,!0),this.supportsTouchEvents&&(this.domElement.removeEventListener("touchstart",this._onPointerDown,!0),this.domElement.removeEventListener("touchend",this._onPointerUp,!0),this.domElement.removeEventListener("touchmove",this._onPointerMove,!0))),this.domElement.removeEventListener("wheel",this.onWheel,!0),this.domElement=null,this._eventsAdded=!1}mapPositionToPoint(t,e,i){const s=this.domElement.isConnected?this.domElement.getBoundingClientRect():{x:0,y:0,width:this.domElement.width,height:this.domElement.height,left:0,top:0},n=1/this.resolution;t.x=(e-s.left)*(this.domElement.width/s.width)*n,t.y=(i-s.top)*(this.domElement.height/s.height)*n}_normalizeToPointerData(t){const e=[];if(this.supportsTouchEvents&&t instanceof TouchEvent)for(let i=0,s=t.changedTouches.length;i<s;i++){const n=t.changedTouches[i];typeof n.button>"u"&&(n.button=0),typeof n.buttons>"u"&&(n.buttons=1),typeof n.isPrimary>"u"&&(n.isPrimary=t.touches.length===1&&t.type==="touchstart"),typeof n.width>"u"&&(n.width=n.radiusX||1),typeof n.height>"u"&&(n.height=n.radiusY||1),typeof n.tiltX>"u"&&(n.tiltX=0),typeof n.tiltY>"u"&&(n.tiltY=0),typeof n.pointerType>"u"&&(n.pointerType="touch"),typeof n.pointerId>"u"&&(n.pointerId=n.identifier||0),typeof n.pressure>"u"&&(n.pressure=n.force||.5),typeof n.twist>"u"&&(n.twist=0),typeof n.tangentialPressure>"u"&&(n.tangentialPressure=0),typeof n.layerX>"u"&&(n.layerX=n.offsetX=n.clientX),typeof n.layerY>"u"&&(n.layerY=n.offsetY=n.clientY),n.isNormalized=!0,n.type=t.type,e.push(n)}else if(!globalThis.MouseEvent||t instanceof MouseEvent&&(!this.supportsPointerEvents||!(t instanceof globalThis.PointerEvent))){const i=t;typeof i.isPrimary>"u"&&(i.isPrimary=!0),typeof i.width>"u"&&(i.width=1),typeof i.height>"u"&&(i.height=1),typeof i.tiltX>"u"&&(i.tiltX=0),typeof i.tiltY>"u"&&(i.tiltY=0),typeof i.pointerType>"u"&&(i.pointerType="mouse"),typeof i.pointerId>"u"&&(i.pointerId=V),typeof i.pressure>"u"&&(i.pressure=.5),typeof i.twist>"u"&&(i.twist=0),typeof i.tangentialPressure>"u"&&(i.tangentialPressure=0),i.isNormalized=!0,e.push(i)}else e.push(t);return e}normalizeWheelEvent(t){const e=this._rootWheelEvent;return this._transferMouseData(e,t),e.deltaX=t.deltaX,e.deltaY=t.deltaY,e.deltaZ=t.deltaZ,e.deltaMode=t.deltaMode,this.mapPositionToPoint(e.screen,t.clientX,t.clientY),e.global.copyFrom(e.screen),e.offset.copyFrom(e.screen),e.nativeEvent=t,e.type=t.type,e}_bootstrapEvent(t,e){return t.originalEvent=null,t.nativeEvent=e,t.pointerId=e.pointerId,t.width=e.width,t.height=e.height,t.isPrimary=e.isPrimary,t.pointerType=e.pointerType,t.pressure=e.pressure,t.tangentialPressure=e.tangentialPressure,t.tiltX=e.tiltX,t.tiltY=e.tiltY,t.twist=e.twist,this._transferMouseData(t,e),this.mapPositionToPoint(t.screen,e.clientX,e.clientY),t.global.copyFrom(t.screen),t.offset.copyFrom(t.screen),t.isTrusted=e.isTrusted,t.type==="pointerleave"&&(t.type="pointerout"),t.type.startsWith("mouse")&&(t.type=t.type.replace("mouse","pointer")),t.type.startsWith("touch")&&(t.type=q[t.type]||t.type),t}_transferMouseData(t,e){t.isTrusted=e.isTrusted,t.srcElement=e.srcElement,t.timeStamp=performance.now(),t.type=e.type,t.altKey=e.altKey,t.button=e.button,t.buttons=e.buttons,t.client.x=e.clientX,t.client.y=e.clientY,t.ctrlKey=e.ctrlKey,t.metaKey=e.metaKey,t.movement.x=e.movementX,t.movement.y=e.movementY,t.page.x=e.pageX,t.page.y=e.pageY,t.relatedTarget=null,t.shiftKey=e.shiftKey}};I.extension={name:"events",type:[T.WebGLSystem,T.CanvasSystem,T.WebGPUSystem],priority:-1};I.defaultEventFeatures={move:!0,globalMove:!0,click:!0,wheel:!0};let C=I;const J={onclick:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,get interactive(){return this.eventMode==="dynamic"||this.eventMode==="static"},set interactive(u){this.eventMode=u?"static":"passive"},_internalEventMode:void 0,get eventMode(){return this._internalEventMode??C.defaultEventMode},set eventMode(u){this._internalEventMode=u},isInteractive(){return this.eventMode==="static"||this.eventMode==="dynamic"},interactiveChildren:!0,hitArea:null,addEventListener(u,t,e){const i=typeof e=="boolean"&&e||typeof e=="object"&&e.capture,s=typeof e=="object"?e.signal:void 0,n=typeof e=="object"?e.once===!0:!1,o=typeof t=="function"?void 0:t;u=i?`${u}capture`:u;const r=typeof t=="function"?t:t.handleEvent,d=this;s&&s.addEventListener("abort",()=>{d.off(u,r,o)}),n?d.once(u,r,o):d.on(u,r,o)},removeEventListener(u,t,e){const i=typeof e=="boolean"&&e||typeof e=="object"&&e.capture,s=typeof t=="function"?void 0:t;u=i?`${u}capture`:u,t=typeof t=="function"?t:t.handleEvent,this.off(u,t,s)},dispatchEvent(u){if(!(u instanceof P))throw new Error("Container cannot propagate events outside of the Federated Events API");return u.defaultPrevented=!1,u.path=null,u.target=this,u.manager.dispatchEvent(u),!u.defaultPrevented}};x.add(B);L.mixin(j);x.add(C);L.mixin(J);
