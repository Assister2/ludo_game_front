"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[726],{95477:function(e,t,a){var r=a(87462),n=a(45987),i=a(67294),o=a(86010),s=a(24344),c=a(93871),l=44,m=i.forwardRef((function(e,t){var a=e.classes,s=e.className,m=e.color,u=void 0===m?"primary":m,d=e.disableShrink,f=void 0!==d&&d,p=e.size,h=void 0===p?40:p,g=e.style,y=e.thickness,v=void 0===y?3.6:y,b=e.value,k=void 0===b?0:b,x=e.variant,E=void 0===x?"indeterminate":x,w=(0,n.Z)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),N={},D={},S={};if("determinate"===E||"static"===E){var A=2*Math.PI*((l-v)/2);N.strokeDasharray=A.toFixed(3),S["aria-valuenow"]=Math.round(k),N.strokeDashoffset="".concat(((100-k)/100*A).toFixed(3),"px"),D.transform="rotate(-90deg)"}return i.createElement("div",(0,r.Z)({className:(0,o.Z)(a.root,s,"inherit"!==u&&a["color".concat((0,c.Z)(u))],{determinate:a.determinate,indeterminate:a.indeterminate,static:a.static}[E]),style:(0,r.Z)({width:h,height:h},D,g),ref:t,role:"progressbar"},S,w),i.createElement("svg",{className:a.svg,viewBox:"".concat(22," ").concat(22," ").concat(l," ").concat(l)},i.createElement("circle",{className:(0,o.Z)(a.circle,f&&a.circleDisableShrink,{determinate:a.circleDeterminate,indeterminate:a.circleIndeterminate,static:a.circleStatic}[E]),style:N,cx:l,cy:l,r:(l-v)/2,fill:"none",strokeWidth:v})))}));t.Z=(0,s.Z)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},determinate:{transition:e.transitions.create("transform")},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},circleDeterminate:{transition:e.transitions.create("stroke-dashoffset")},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(m)},84040:function(e,t,a){a.d(t,{L:function(){return r}});var r="https://www.gotiking.com/"},65726:function(e,t,a){a.r(t),a.d(t,{default:function(){return f}});var r=a(95477),n=a(72132),i=(a(55202),a(31955),a(51794),a(67294)),o=a(63750),s=a(95998),c=a(79655),l=a(84040),m=(a(83239),a(44954));function u(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var r,n,i,o,s=[],c=!0,l=!1;try{if(i=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;c=!1}else for(;!(c=(r=i.call(a)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,n=e}finally{try{if(!c&&null!=a.return&&(o=a.return(),Object(o)!==o))return}finally{if(l)throw n}}return s}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return d(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return d(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function f(){var e=(0,s.I0)(),t=(0,s.v9)((function(e){return e.wallet})),a=(0,s.v9)((function(e){return e.wallet})).isLoading;console.log("socket2buy",t.data);var d=u((0,i.useState)(""),2),f=d[0],p=d[1];return i.createElement(i.Fragment,null,i.createElement("div",{className:"col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0"},i.createElement("div",{className:"mb-3 d-flex align-items-center justify-content-between"},i.createElement("div",{className:"d-flex align-items-center justify-content-start"},i.createElement(c.rU,{to:"/wallet"},i.createElement("button",{className:"btn btn-primary border"},i.createElement(o.i1r,null),"Back"))),i.createElement("button",{type:"button",className:"btn btn-outline-primary d-flex align-items-center justify-content-center"},i.createElement("img",{style:{marginRight:"4px"},src:"".concat(l.L,"svgs/info.svg"),alt:"info"}),i.createElement("p",{className:"m-0 p-0"},"Guide"))),i.createElement("div",{className:"mb-3 shadow card"},i.createElement("div",{className:"bg-light text-dark text-capitalize card-header"},"Buy Chips"),i.createElement("div",{className:"card-body"},i.createElement("label",{for:"amount",className:"form-label w-100 text-start"},"Enter Amount"),i.createElement("div",{className:"input-group mb-4"},i.createElement("span",{className:"input-group-text bg-light text-dark"},"₹"),i.createElement("input",{onChange:function(e){return p(e.target.value)},value:f,className:"form-control",type:"number",placeholder:"Amount"})),i.createElement("div",{className:"d-grid"},i.createElement("button",{className:"btn btn-primary",onClick:function(){f<=0?n.Am.error("amount should be greater than 0"):f>2e4?n.Am.error("Maximum amount limit is 20000"):(e((0,m.Y2)({amount:Number(f),createdAt:new Date})),p(""))}},a?i.createElement(r.Z,{style:{width:"1.5rem",height:"1.5rem",verticalAlign:"middle"},color:"white"}):"Pay")))),i.createElement("div",null,i.createElement("p",{className:"text-capitalize text-secondary"},"payments secured by"),i.createElement("div",{className:"d-flex justify-content-center align-items-center"},i.createElement("div",{className:"hstack gap-2 minBreakpoint-xs"},i.createElement("img",{src:"https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/gpay.svg",alt:"gpay logo",width:"48"}),i.createElement("img",{src:"https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/paytm.svg",alt:"paytm logo",width:"48"}),i.createElement("img",{src:"https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/phonepe.svg",alt:"phone logo",width:"48"}),i.createElement("img",{src:"https://ludo-players.s3.ap-south-1.amazonaws.com/cdn/lp/icons/logos/upi.svg",alt:"upi logo",width:"48"}))))))}}}]);