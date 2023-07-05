/*!
 * v-drag v3.0.9
 * by Nil Vila and contributors
 */
"use strict";function a(a,t){const o="x"===t?window.data.snapX:window.data.snapY;return Math.round(a/o)*o}function t(a,t,o="add"){a.forEach(a=>{document[o+"EventListener"](a,t,!1)})}function o(a,t,o){return`matrix(${a||"1, 0, 0, 1,"} ${t}, ${o})`}function n(a,t){a.dispatchEvent(new Event("v-drag-"+t))}function e(t,e){window.data.relativeX=window.data.mouseX*t,window.data.relativeY=window.data.mouseY*e,window.data.move.style.transform=o(window.data.matrix,window.data.matrixX+a(window.data.relativeX,"x"),window.data.matrixY+a(window.data.relativeY,"y")),n(window.data.move,"moving"),(window.getSelection?window.getSelection():document.selection).empty()}const d={x(){e(!0,!1)},y(){e(!1,!0)},all(){e(!0,!0)}};function i(){d[window.data.axis](window.data),window.data.posAnimation=requestAnimationFrame(i)}function s(){window.data.move.classList.add(window.data.class.move),window.data.posAnimation=requestAnimationFrame(i),t(["mousemove","touchmove"],s,"remove")}function w(a,t){let o=Number(window.getComputedStyle(window.data.move)[t].replace("px",""));if("none"!==a){const n=a.match(/[0-9.-]+/g);o+=Number(n[8-t.length])}return o}function l(a,t,o){window.data.move.style.transform=a,window.data.move.style.left=t,window.data.move.style.top=o}function r(a){a.preventDefault(),window.data.mouseX=(a.pageX||a.touches[0].pageX)-window.data.initialX,window.data.mouseY=(a.pageY||a.touches[0].pageY)-window.data.initialY}function c(a,e,d,i,c){c.preventDefault(),window.data.grab=a,window.data.move=e,window.data.axis=d,window.data.initialX=c.pageX||c.touches[0].pageX,window.data.initialY=c.pageY||c.touches[0].pageY,window.data.relativeX=0,window.data.relativeY=0,window.data.snapX=i.x,window.data.snapY=i.y;const u=window.getComputedStyle(window.data.move).transform;window.data.matrix="none"!==u&&u.match(/\d([^,]*,){4}/g);const m=w(u,"left"),v=w(u,"top");l(o(window.data.matrix,m,v),0,0),window.data.matrixX=m,window.data.matrixY=v,window.data.grab.classList.add(window.data.class.down),n(e,"down"),n(e,"start"),t(["mousemove","touchmove"],r),t(["mousemove","touchmove"],s)}function u(){window.data.grab&&window.data.move&&(cancelAnimationFrame(window.data.posAnimation),t(["mousemove","touchmove"],s,"remove"),l(window.data.matrix?o(window.data.matrix,0,0):"none",window.data.matrixX+a(window.data.relativeX,"x")+"px",window.data.matrixY+a(window.data.relativeY,"y")+"px"),window.data.grab.classList.remove(window.data.class.down),window.data.move.classList.remove(window.data.class.move),n(window.data.move,"end"),t(["mousemove","touchmove"],r,"remove"))}function m(a,t){const o="string"==typeof a?parseInt(a.replace(/px/g,""),10):a;return 0===o||Number.isNaN(o)||t&&void 0===o?1:o}function v(a){return!!["x","y","all"].includes(a)}function p(a,o){const e=o.value||{},d=e instanceof Object?e.handle:e,i=function(a){if("string"==typeof a){const t=a.split(",");return{x:m(t[0]),y:void 0!==m(t[1])?m(t[1]):m(t[0])}}return"number"==typeof a?{x:m(a),y:m(a)}:a instanceof Object&&(a.x||a.y)?{x:m(a.x)||1,y:m(a.y)||1}:Array.isArray(a)?{x:m(a[0])||1,y:void 0!==m(a[1])?m(a[1],!0):m(a[0],!0)}:{x:1,y:1}}(e.snap),s=[];let w;w=e instanceof Object&&e.axis&&v(e.axis)?e.axis:v(o.arg)?o.arg:"all",d instanceof HTMLElement?s.push(d):document.querySelectorAll(d).forEach(a=>{s.push(a)}),0!==s.length?(a.classList.add(window.data.class.usesHandle),s.forEach(t=>{t.classList.add(window.data.class.handle),t.onmousedown=o=>c(t,a,w,i,o),t.ontouchstart=o=>c(t,a,w,i,o)})):(a.onmousedown=t=>c(a,a,w,i,t),a.ontouchstart=t=>c(a,a,w,i,t)),a.classList.add(window.data.class.initial),n(a,"setup"),t(["mouseup","touchend"],u)}const f=(a,t)=>{p(a,t)},g=(a,t)=>{a.onmousedown=null,a.ontouchstart=null;const o="object"==typeof t.oldValue?t.oldValue.handle:t.oldValue;document.querySelectorAll(o).forEach(t=>{t.onmousedown=null,t.ontouchstart=null,t.classList.remove(window.data.class.handle),a.classList.remove(window.data.class.usesHandle)}),t.oldValue&&Object.keys(t.oldValue).forEach(t=>{n(a,"update-"+t)}),p(a,t)};var h={install(a,t){window.data={},window.data.class={initial:"drag-draggable",usesHandle:"drag-uses-handle",handle:"drag-handle",down:"drag-down",move:"drag-move"};let o=!0;if(t){if(t.eventClass){const a=t.eventClass;Object.keys(a).forEach(t=>{a[t]&&(window.data.class[t]=a[t])})}"boolean"==typeof t.removeTransition&&(o=t.removeTransition)}const n=document.createElement("style");n.innerHTML=`.${window.data.class.initial}{position:relative;}.${window.data.class.initial}:not(.${window.data.class.usesHandle}),.${window.data.class.handle}{cursor:move;cursor:grab;cursor:-webkit-grab;}.${window.data.class.handle}.${window.data.class.down},.${window.data.class.initial}:not(.${window.data.class.usesHandle}).${window.data.class.down}{z-index:999;cursor:grabbing;cursor:-webkit-grabbing;}`,n.innerHTML+=!0===o?`.${window.data.class.move}{transition:none;}`:"",document.body.appendChild(n),a.directive("drag",{mounted(a,t){f(a,t)},updated(a,t){g(a,t)},inserted(a,t){f(a,t)},update(a,t){g(a,t)}})}};module.exports=h;
