(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[351],{8569:function(e,t,r){Promise.resolve().then(r.bind(r,4010))},8030:function(e,t,r){"use strict";r.d(t,{Z:function(){return c}});var s=r(2265);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let l=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),a=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ")};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var n={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,s.forwardRef)((e,t)=>{let{color:r="currentColor",size:l=24,strokeWidth:i=2,absoluteStrokeWidth:c,className:o="",children:d,iconNode:u,...h}=e;return(0,s.createElement)("svg",{ref:t,...n,width:l,height:l,stroke:r,strokeWidth:c?24*Number(i)/Number(l):i,className:a("lucide",o),...h},[...u.map(e=>{let[t,r]=e;return(0,s.createElement)(t,r)}),...Array.isArray(d)?d:[d]])}),c=(e,t)=>{let r=(0,s.forwardRef)((r,n)=>{let{className:c,...o}=r;return(0,s.createElement)(i,{ref:n,iconNode:t,className:a("lucide-".concat(l(e)),c),...o})});return r.displayName="".concat(e),r}},7164:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]])},9768:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=(0,r(8030).Z)("FileDown",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]])},4010:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var s=r(7437),l=r(2265),a=r(9768),n=r(7164);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let i=(0,r(8030).Z)("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);function c(){let[e,t]=(0,l.useState)([]),[r,c]=(0,l.useState)(!0);return(0,l.useEffect)(()=>{(async function(){try{let e=await fetch("/api/documents?type=stage");if(e.ok){let r=await e.json();t(r)}else t([])}catch(e){console.error("Error:",e),t([])}finally{c(!1)}})()},[]),(0,s.jsxs)("div",{className:"pb-24",children:[(0,s.jsxs)("div",{className:"bg-gradient-to-br from-club-blue to-club-blue-dark py-20 px-4 mb-16 rounded-b-[3rem] shadow-xl text-center",children:[(0,s.jsx)("h1",{className:"text-4xl md:text-6xl font-extrabold text-white mb-6",children:"Stages"}),(0,s.jsx)("p",{className:"text-xl text-blue-100 max-w-2xl mx-auto font-light",children:"D\xe9couvrez nos stages de perfectionnement organis\xe9s pendant les vacances scolaires."})]}),(0,s.jsx)("div",{className:"max-w-5xl mx-auto px-4 sm:px-6",children:r?(0,s.jsx)("div",{className:"flex justify-center py-12",children:(0,s.jsx)("div",{className:"w-10 h-10 border-4 border-slate-200 border-t-club-blue rounded-full animate-spin"})}):e.length>0?(0,s.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-8 mb-16",children:e.map((e,t)=>(0,s.jsxs)("div",{className:"bg-white rounded-[2rem] p-6 shadow-md border border-slate-100 animate-fade-in-up stagger-".concat(t%5+1),children:[(0,s.jsx)("h3",{className:"text-xl font-bold text-slate-900 mb-4",children:e.title}),(0,s.jsx)("div",{className:"aspect-[3/4] w-full bg-slate-100 rounded-xl mb-6 overflow-hidden border border-slate-200",children:e.file_url?(0,s.jsx)("img",{src:e.file_url,alt:e.title,className:"w-full h-full object-cover"}):(0,s.jsx)("div",{className:"w-full h-full flex items-center justify-center",children:(0,s.jsx)(a.Z,{size:48,className:"text-slate-300"})})}),(0,s.jsxs)("a",{href:e.file_url||"#",target:"_blank",rel:"noopener noreferrer",className:"flex items-center justify-center gap-2 w-full py-4 bg-club-blue hover:bg-club-blue-light text-white font-bold rounded-xl transition-all",children:[(0,s.jsx)(n.Z,{size:20}),"T\xe9l\xe9charger la fiche"]})]},e.id))}):(0,s.jsxs)("div",{className:"text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm",children:[(0,s.jsx)("div",{className:"w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4",children:(0,s.jsx)(i,{size:32,className:"text-slate-400"})}),(0,s.jsx)("h3",{className:"text-xl font-bold text-slate-900 mb-2",children:"Les fiches de stage seront bient\xf4t disponibles."}),(0,s.jsx)("p",{className:"text-slate-500",children:"Les fiches d'inscription pour les prochains stages seront publi\xe9es ici \xe0 l'approche des vacances scolaires."})]})})]})}}},function(e){e.O(0,[971,23,560],function(){return e(e.s=8569)}),_N_E=e.O()}]);