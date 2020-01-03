!function(t){var r={};function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=r,e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,r){if(1&r&&(t=e(t)),8&r)return t;if(4&r&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&r&&"string"!=typeof t)for(var i in t)e.d(n,i,function(r){return t[r]}.bind(null,i));return n},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},e.p="",e(e.s=1)}([function(t,r){t.exports=fabric},function(t,r,e){"use strict";e.r(r);var n=e(0),i=function(t){return t[n.fabric.util.getRandomInt(0,t.length-1)]},o={maxTrianglesPerPoint:4,fill:!0,colors:["#3B1D59","#994CE6","#663299","#6E37A6","#552A80"],canvas:{width:1200,height:1024,backgroundColor:"transparent"},grid:{edgeDistance:64},start:[0,0]};function a(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var e=[],n=!0,i=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return e}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function u(t){return function(t){if(Array.isArray(t)){for(var r=0,e=new Array(t.length);r<t.length;r++)e[r]=t[r];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function c(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,r){var e=r.get(t);if(!e)throw new TypeError("attempted to get private field on non-instance");return e.get?e.get.call(t):e.value}function l(t,r,e){var n=r.get(t);if(!n)throw new TypeError("attempted to set private field on non-instance");if(n.set)n.set.call(t,e);else{if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=e}return e}var s={},p={name:"defaultGrid",size:32},y=function(){function t(r,e,n){!function(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}(this,t),h.set(this,{writable:!0,value:!1}),v.set(this,{writable:!0,value:[]}),d.set(this,{writable:!0,value:{}}),this.name=n.name,this.x=r,this.y=e,l(this,d,n),l(this,v,new Array(r).fill().map((function(){return new Array(e).fill().map((function(){return[]}))})))}var r,e,i;return r=t,i=[{key:"getCrossingHypotenuse",value:function(t,r){var e,n,i,o,u=a(t,2),c=u[0],f=u[1],l=a(r,2),s=l[0],p=l[1];return f===p?f%2==0?c<s?(e=c+1,i=f-1,n=s,o=p+1):(e=c,i=f+1,n=s+1,o=p-1):c<s?(e=c,i=f-1,n=s-1,o=p+1):(e=c-1,i=f+1,n=s,o=p-1):f%2==0?f<p?(e=c+1,i=f+1,n=s,o=p-1):(e=c,i=f-1,n=s+1,o=p+1):f<p?(e=c,i=f+1,n=s-1,o=p-1):(e=c-1,i=f-1,n=s,o=p+1),[[e,i],[n,o]]}},{key:"isHypotenuse",value:function(t,r){var e=a(t,2),n=e[0],i=e[1],o=a(r,2),u=o[0],c=o[1];return n===u&&i===c+2||n===u&&c===i+2||i===c&&n===u+1||i===c&&u===n+1}},{key:"createConfig",value:function(t){var r=Object.assign({},o.canvas,t.canvas||{}),e=Object.assign({},o.grid,t.grid||{});return e.x&&e.y||(e.x=Math.round(r.width/Math.sqrt(2*Math.pow(e.edgeDistance,2))),e.y=Math.round(r.height/e.edgeDistance)-1),e}},{key:"createInstance",value:function(r,e,n){var i=new t(r,e,Object.assign({},p,n));return s[name]=i,i}},{key:"getInstance",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"defaultGrid";if(!s[t])throw'No such Grid as "'.concat(t,'"');return s[t]}}],(e=[{key:"all",value:regeneratorRuntime.mark((function t(){var r,e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=0;case 2:if(!(r<this.y)){t.next=14;break}e=0;case 5:if(!(e<this.x)){t.next=11;break}return t.next=8,this.coordsOf(e,r);case 8:e++,t.next=5;break;case 11:r++,t.next=2;break;case 14:case"end":return t.stop()}}),t,this)}))},{key:"values",value:regeneratorRuntime.mark((function t(){var r,e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=0;case 2:if(!(r<this.y)){t.next=14;break}e=0;case 5:if(!(e<this.x)){t.next=11;break}return t.next=8,{x:e,y:r,value:f(this,v)[e][r]};case 8:e++,t.next=5;break;case 11:r++,t.next=2;break;case 14:case"end":return t.stop()}}),t,this)}))},{key:"contentOf",value:function(t,r){return f(this,v)[t][r]}},{key:"coordsOf",value:function(t,r){var e=f(this,d).size,n=Math.sqrt(2*Math.pow(e,2));return{x:n+t*n-.5*n*(r%2),y:n/2+r*(n/2),__coords:[t,r]}}},{key:"findPointingTo",value:function(t,r){var e=this.values(),n=[],i=!0,o=!1,a=void 0;try{for(var u,c=e[Symbol.iterator]();!(i=(u=c.next()).done);i=!0){var f=u.value;f.value.length>0&&f.value.find((function(e){return e[2]===t&&e[3]===r}))&&n.push([f.x,f.y])}}catch(t){o=!0,a=t}finally{try{i||null==c.return||c.return()}finally{if(o)throw a}}return n}},{key:"addTo",value:function(t,r,e){0===f(this,v)[t][r].length&&(f(this,v)[t][r]=[]),f(this,v)[t][r].push(e)}},{key:"getLeastOccupied",value:function(){var t=this.values(),r=[],e=!0,n=!1,i=void 0;try{for(var o,a=t[Symbol.iterator]();!(e=(o=a.next()).done);e=!0){var u=o.value;1===u.value.length&&r.push([u.x,u.y])}}catch(t){n=!0,i=t}finally{try{e||null==a.return||a.return()}finally{if(n)throw i}}return r}},{key:"getSurroundingPoints",value:function(r,e){var n=this,i=[];e-2>=0&&i.push([r,e-2]),r+1<this.x&&i.push([r+1,e]),e+2<this.y&&i.push([r,e+2]),r-1>=0&&i.push([r-1,e]),e%2==0?(e-1>=0&&r+1<this.x&&i.push([r+1,e-1]),e+1<this.y&&r+1<this.x&&i.push([r+1,e+1]),e+1<this.y&&i.push([r,e+1]),e-1>=0&&i.push([r,e-1])):(e-1>=0&&i.push([r,e-1]),e+1<this.y&&i.push([r,e+1]),e+1<this.y&&r-1>=0&&i.push([r-1,e+1]),e-1>=0&&r-1>=0&&i.push([r-1,e-1]));var o=i.filter((function(t){return n.contentOf.apply(n,u(t)).length<4})).filter((function(i){var o=r,u=e,c=a(i,2),f=c[0],l=c[1];if(t.isHypotenuse([o,u],[f,l])){var s=a(t.getCrossingHypotenuse([o,u],[f,l]),2),p=a(s[0],2),y=p[0],h=p[1],v=a(s[1],2),d=v[0],g=v[1];return!n.arePointsConnected([y,h],[d,g])}return!0}));return f(this,h)&&console.log("found surrounding points for ".concat(r,", ").concat(e),o),o}},{key:"arePointsConnected",value:function(t,r){var e=a(t,2),n=e[0],i=e[1],o=a(r,2),u=o[0],c=o[1],f=this.findPointingTo(n,i),l=this.findPointingTo(u,c);return!!f.find((function(t){return t[0]===u&&t[1]===c}))||!!l.find((function(t){return t[0]===n&&t[1]===i}))}},{key:"isTriangle",value:function(t,r,e){var n=this.contentOf.apply(this,u(t)),i=this.contentOf.apply(this,u(r)),o=this.contentOf.apply(this,u(e)),a=n.filter((function(t){return t[2]===r[0]&&t[3]===r[1]||t[2]===e[0]&&t[3]===e[1]})).reduce((function(t,r){return t[r[0]]?(t[r[0]].push([r[2],r[3]]),t):Object.assign({},t,function(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}({},r[0],[[r[2],r[3]]]))}),{}),c=Object.keys(a).reduce((function(t,r){var e=[].concat(u(i),u(o)).filter((function(t){return t[0]===r})).map((function(t){return[t[2],t[3]]}));return t[r]=[].concat(u(t[r]),u(e)),t}),a);return Object.values(c).reduce((function(n,i){return n||!(i.length<3)&&i.reduce((function(n,i){return n?t.join(",")===i.join(",")||r.join(",")===i.join(",")||e.join(",")===i.join(","):n}),!0)}),!1)}},{key:"debug",value:function(t){l(this,h,!0);var r=this.all(),e=!0,i=!1,o=void 0;try{for(var a,u=r[Symbol.iterator]();!(e=(a=u.next()).done);e=!0){var c=a.value,f=new n.fabric.Text(c.__coords.join(","),{left:c.x+2,top:c.y+2,fontFamily:"sans-serif",fontSize:8});t.add(f),t.add(new n.fabric.Circle({top:c.y-1,left:c.x-1,radius:1,fill:"rebeccapurple"}))}}catch(t){i=!0,o=t}finally{try{e||null==u.return||u.return()}finally{if(i)throw o}}}}])&&c(r.prototype,e),i&&c(r,i),t}(),h=new WeakMap,v=new WeakMap,d=new WeakMap;function g(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var e=[],n=!0,i=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return e}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function b(t){return function(t){if(Array.isArray(t)){for(var r=0,e=new Array(t.length);r<t.length;r++)e[r]=t[r];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var m=function t(r,e,n,o){var a=[r,e],u=Math.round(1e6*Math.random()).toString(32),c=b(i(n.getSurroundingPoints(r,e)));n.addTo.apply(n,a.concat([[u,"s1"].concat(b(c))]));try{var f=b(i(function(t,r,e){var n=r.getSurroundingPoints.apply(r,b(t)).filter((function(n){return w(n,e,t,r)}));if(0===n.length)throw"No point avail";return n}(c,n,a)));return n.addTo.apply(n,b(c).concat([[u,"s2"].concat(b(f))])),n.addTo.apply(n,b(f).concat([[u,"s3"].concat(a)])),[a,c,f]}catch(r){var l=i(n.getLeastOccupied());return t.apply(void 0,b(l).concat([n,o]))}},w=function(t,r,e,n){var i=g(t,2),o=i[0],a=i[1];if(function(t,r,e){var n=g(t,2),i=n[0],o=n[1],a=g(r,2),u=a[0],c=a[1];if(i===u&&o===c)return!0;var f,l,s=(l=e,[(f=r)[0]-l[0],f[1]-l[1]]);if(1===s[0]&&-1===s[1]&&u!=i)return!0;if(1===s[0]&&1===s[1]){if(i<u-1)return!0;if(o<c-1&&i<u)return!0}if(-1===s[0]&&1===s[1]){if(o<c-2)return!0;if(i>u+1)return!0;if(i>u&&o<c-1)return!0}if(-1===s[0]&&-1===s[1]){if(i>u+1)return!0;if(i>u&&o>c)return!0}if(0===s[0]&&-2===s[1]&&o>c+1)return!0;if(0===s[0]&&2===s[1]&&o<c-1)return!0;if(c%2==0){if(0===s[0]&&1===s[1]){if(i<=u-1&&o<=c-1)return!0;if(o<c-2)return!0}if(0===s[0]&&-1===s[1]){if(o>c&&i<u)return!0;if(o>c+2)return!0}if(-1===s[0]&&0===s[1]){if(i>u+1)return!0;if(o<c-1||o>c+1)return!0}if(1===s[0]&&0===s[1]&&i<u)return!0}else{if(0===s[0]&&1===s[1]){if(i>u&&o<=c-1)return!0;if(o<c-2)return!0}if(0===s[0]&&-1===s[1]){if(o>c+2)return!0;if(i>=u+1&&o>=c+1)return!0}if(-1===s[0]&&0===s[1]){if(i>=u+1)return!0;if(o<c-1||o>c+1)return!0}if(1===s[0]&&0===s[1]){if(i<u-1)return!0;if(o<c-1||o>c+1)return!0}}return!1}([o,a],r,e))return!1;if(n.isTriangle(r,e,[o,a]))return!1;if(y.isHypotenuse([o,a],r)){var u=g(r,2),c=u[0],f=u[1],l=g(y.getCrossingHypotenuse([o,a],[c,f]),2),s=g(l[0],2),p=s[0],h=s[1],v=g(l[1],2),d=v[0],b=v[1];return!n.arePointsConnected([p,h],[d,b])}if(y.isHypotenuse([o,a],e)){var m=g(e,2),w=m[0],O=m[1],j=g(y.getCrossingHypotenuse([o,a],[w,O]),2),x=g(j[0],2),k=x[0],P=x[1],S=g(j[1],2),A=S[0],T=S[1];return!n.arePointsConnected([k,P],[A,T])}return!0},O=function(t,r,e){return{left:Math.min(t.x,r.x,e.x),top:Math.min(t.y,r.y,e.y)}};function j(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable}))),e.push.apply(e,n)}return e}function x(t){for(var r=1;r<arguments.length;r++){var e=null!=arguments[r]?arguments[r]:{};r%2?j(Object(e),!0).forEach((function(r){k(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):j(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}))}return t}function k(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function P(t){return function(t){if(Array.isArray(t)){for(var r=0,e=new Array(t.length);r<t.length;r++)e[r]=t[r];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function S(t,r){return function(t){if(Array.isArray(t))return t}(t)||function(t,r){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var e=[],n=!0,i=!1,o=void 0;try{for(var a,u=t[Symbol.iterator]();!(n=(a=u.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(t){i=!0,o=t}finally{try{n||null==u.return||u.return()}finally{if(i)throw o}}return e}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function A(t,r,e,n,i,o,a){try{var u=t[o](a),c=u.value}catch(t){return void e(t)}u.done?r(c):Promise.resolve(c).then(n,i)}var T=function(){for(var t=arguments.length,r=new Array(t),e=0;e<t;e++)r[e]=arguments[e];return r.reduce((function(t,r){return t.push(r),t}),[])},M=function(t){return i(t)},C=function(t,r,e,i,o){return new Promise(function(){var a,u=(a=regeneratorRuntime.mark((function a(u,c){var f,l,s,p,y,h,v,d,g,b,w,j;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:f=m(t,r,i,o),l=S(f,3),s=l[0],p=l[1],y=l[2],h=i.coordsOf.apply(i,P(s)),v=i.coordsOf.apply(i,P(p)),d=i.coordsOf.apply(i,P(y)),(g=x({},O(h,v,d),{stroke:"purple",fill:"transparent",selectable:!1,objectCaching:!1})).fill?(b=M(e.colors),g.fill=b,g.stroke="transparent",g.shadow=new n.fabric.Shadow({color:b,blur:.25,offsetX:0,offsetY:0})):(g.fill="transparent",g.stroke=M(e.colors)),w=T(h,v,d),j=new n.fabric.Polygon(w,g),o.add(j),u([s,p,y]);case 10:case"end":return a.stop()}}),a)})),function(){var t=this,r=arguments;return new Promise((function(e,n){var i=a.apply(t,r);function o(t){A(i,e,n,o,u,"next",t)}function u(t){A(i,e,n,o,u,"throw",t)}o(void 0)}))});return function(t,r){return u.apply(this,arguments)}}())},E=function(t){return t.includes("center")},I=function(t){var r=t.start,e=t.grid,n=[0,0];return"string"==typeof r&&(r.includes("top")?n[1]=0:r.includes("bottom")&&(n[1]=e.y-1),(r.includes("top")||r.includes("bottom"))&&E(r)&&(n[0]=Math.floor(e.x/2)),r.includes("left")?n[0]=0:r.includes("right")&&(n[0]=e.x-1),(r.includes("left")||r.includes("right")&&E(r))&&(n[1]=Math.floor(e.y/2)),"center center"===n&&(n[0]=Math.floor(e.x/2),n[1]=Math.floor(e.y/2))),n};function R(t){return function(t){if(Array.isArray(t)){for(var r=0,e=new Array(t.length);r<t.length;r++)e[r]=t[r];return e}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function _(t,r,e,n,i,o,a){try{var u=t[o](a),c=u.value}catch(t){return void e(t)}u.done?r(c):Promise.resolve(c).then(n,i)}function D(t){return function(){var r=this,e=arguments;return new Promise((function(n,i){var o=t.apply(r,e);function a(t){_(o,n,i,a,u,"next",t)}function u(t){_(o,n,i,a,u,"throw",t)}a(void 0)}))}}r.default=function(t){return H.apply(this,arguments)};function H(){return(H=D(regeneratorRuntime.mark((function t(r){var e,a,u,c,f,l,s;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object.assign({},o,r,{canvas:Object.assign({},o.canvas,r.canvas||{}),grid:y.createConfig(r)}),a=document.createElement("canvas"),u=new n.fabric.Canvas(a,e.canvas),c=y.createInstance(e.grid.x,e.grid.y,{size:e.grid.edgeDistance}),e.debug&&(console.log({config:e}),c.debug(u)),f=I(e),l=function(t){return t[0]!==f[0]&&t[1]!==f[1]},s=function(){var t=D(regeneratorRuntime.mark((function t(r){var n,o,a,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=i(r.filter((function(t){return c.contentOf.apply(c,R(t)).length<4}))))||(n=i(c.getSurroundingPoints.apply(c,R(i(r.filter(l)))).filter(l))),t.prev=2,t.next=5,C.apply(void 0,R(n).concat([e,c,u]));case 5:return o=t.sent,t.abrupt("return",o);case 9:return t.prev=9,t.t0=t.catch(2),a=i(c.getSurroundingPoints.apply(c,R(i(f))).filter(l).filter((function(t){return t[0]!==f[0]&&t[1]!==f[0]}))),t.next=14,C.apply(void 0,R(a).concat([e,c,u]));case 14:return f=t.sent,t.abrupt("return",f);case 16:case"end":return t.stop()}}),t,null,[[2,9]])})));return function(r){return t.apply(this,arguments)}}(),t.next=10,Array(6).fill(0).reduce((function(t,r){return t.then((function(t){return s(t)}))}),C.apply(void 0,R(f).concat([e,c,u])));case 10:return t.abrupt("return",u.toSVG());case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}]);