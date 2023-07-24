"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[323],{95477:function(e,t,r){var a=r(87462),n=r(45987),o=r(67294),i=r(86010),l=r(24344),c=r(93871),s=44,m=o.forwardRef((function(e,t){var r=e.classes,l=e.className,m=e.color,u=void 0===m?"primary":m,f=e.disableShrink,d=void 0!==f&&f,p=e.size,y=void 0===p?40:p,v=e.style,b=e.thickness,g=void 0===b?3.6:b,h=e.value,x=void 0===h?0:h,k=e.variant,S=void 0===k?"indeterminate":k,E=(0,n.Z)(e,["classes","className","color","disableShrink","size","style","thickness","value","variant"]),N={},w={},O={};if("determinate"===S||"static"===S){var D=2*Math.PI*((s-g)/2);N.strokeDasharray=D.toFixed(3),O["aria-valuenow"]=Math.round(x),N.strokeDashoffset="".concat(((100-x)/100*D).toFixed(3),"px"),w.transform="rotate(-90deg)"}return o.createElement("div",(0,a.Z)({className:(0,i.Z)(r.root,l,"inherit"!==u&&r["color".concat((0,c.Z)(u))],{determinate:r.determinate,indeterminate:r.indeterminate,static:r.static}[S]),style:(0,a.Z)({width:y,height:y},w,v),ref:t,role:"progressbar"},O,E),o.createElement("svg",{className:r.svg,viewBox:"".concat(22," ").concat(22," ").concat(s," ").concat(s)},o.createElement("circle",{className:(0,i.Z)(r.circle,d&&r.circleDisableShrink,{determinate:r.circleDeterminate,indeterminate:r.circleIndeterminate,static:r.circleStatic}[S]),style:N,cx:s,cy:s,r:(s-g)/2,fill:"none",strokeWidth:g})))}));t.Z=(0,l.Z)((function(e){return{root:{display:"inline-block"},static:{transition:e.transitions.create("transform")},indeterminate:{animation:"$circular-rotate 1.4s linear infinite"},determinate:{transition:e.transitions.create("transform")},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},svg:{display:"block"},circle:{stroke:"currentColor"},circleStatic:{transition:e.transitions.create("stroke-dashoffset")},circleIndeterminate:{animation:"$circular-dash 1.4s ease-in-out infinite",strokeDasharray:"80px, 200px",strokeDashoffset:"0px"},circleDeterminate:{transition:e.transitions.create("stroke-dashoffset")},"@keyframes circular-rotate":{"0%":{transformOrigin:"50% 50%"},"100%":{transform:"rotate(360deg)"}},"@keyframes circular-dash":{"0%":{strokeDasharray:"1px, 200px",strokeDashoffset:"0px"},"50%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-15px"},"100%":{strokeDasharray:"100px, 200px",strokeDashoffset:"-125px"}},circleDisableShrink:{animation:"none"}}}),{name:"MuiCircularProgress",flip:!1})(m)},3323:function(e,t,r){r.r(t),r.d(t,{default:function(){return v}});var a=r(95477),n=r(67294),o=r(72132),i=(r(27369),r(95998)),l=r(14309),c=r(79655),s=r(7901),m=r(31955);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function f(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?f(Object(r),!0).forEach((function(t){p(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function p(e,t,r){return(t=function(e){var t=function(e,t){if("object"!==u(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var a=r.call(e,"string");if("object"!==u(a))return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===u(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,a=new Array(t);r<t;r++)a[r]=e[r];return a}function v(e){var t=(0,i.v9)((function(e){return e.loginReducer})),r=t.data,u=(0,i.I0)(),f=(0,l.s0)(),v=(0,l.s0)();r.isLoggedIn?v("/"):(localStorage.clear(),sessionStorage.clear(),window.localStorage.clear(),localStorage.removeItem("wallet"),m.Z.remove("token"),m.Z.remove("fullName"),m.Z.remove("userId"));var b=(0,i.v9)((function(e){return e.signUpReducer})),g=b.isLoading;console.log("is loading user",g);var h,x,k=(h=(0,n.useState)({name:"",phoneNumber:"",referalCode:""}),x=2,function(e){if(Array.isArray(e))return e}(h)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var a,n,o,i,l=[],c=!0,s=!1;try{if(o=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;c=!1}else for(;!(c=(a=o.call(r)).done)&&(l.push(a.value),l.length!==t);c=!0);}catch(e){s=!0,n=e}finally{try{if(!c&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw n}}return l}}(h,x)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?y(e,t):void 0}}(h,x)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),S=k[0],E=k[1],N=function(e){var t=e.target,r=t.name,a=t.value;if("referalCode"===r){var n=a.replace(/\D/g,"").slice(0,10);E((function(e){return d(d({},e),{},p({},r,n))}))}else if("name"===r){var o=a.toLowerCase().slice(0,10);E((function(e){return d(d({},e),{},p({},r,o))}))}else E((function(e){return d(d({},e),{},p({},r,a))}))};return(0,n.useEffect)((function(){var e=new URLSearchParams(window.location.search).get("refer");console.log(e),e&&E((function(t){return d(d({},t),{},{referalCode:e})}))}),[]),n.createElement("div",null,n.createElement("div",{className:"col-12 col-sm-12 col-md-6 col-lg-4 mx-auto p-3 g-0"},n.createElement("div",{className:"card"},n.createElement("div",{className:"bg-light text-dark text-capitalize card-header"},"register"),n.createElement("div",{className:"card-body"},n.createElement("form",{onSubmit:function(e){e.preventDefault(),function(){var e={fullName:S.name,phone:S.phoneNumber};if(" "!=S.name[0])if(S.name.length<3)o.Am.error("name should be at least 3 characters");else{if(""!=S.referalCode){if(S.referalCode.length<10)return void o.Am.error("referal code must be at least 10 digits");e.referCode=S.referalCode}S.phoneNumber.length<10?o.Am.error("Phone number must be at least 10 digits"):u((0,s.vF)(e,f))}else o.Am.error("First letter of name cannot be empty")}()},style:{marginBottom:"1rem"}},n.createElement("div",{className:"vstack gap-4 minBreakpoint-xs"},n.createElement("div",{className:"d-flex flex-column align-items-start"},n.createElement("label",{className:"text-capitalize form-label"},"Name (as per Aadhaar card)"),n.createElement("input",{required:!0,name:"name",type:"text",className:"form-control",onChange:N,value:S.name})),n.createElement("div",{style:{marginTop:"1rem"},className:"d-flex flex-column align-items-start"},n.createElement("label",{className:"text-capitalize form-label"},"Phone Number"),n.createElement("input",{required:!0,name:"phoneNumber",type:"text",className:"form-control",onChange:function(e){var t=e.target.value.replace(/\D/g,"").slice(0,10);E((function(e){return d(d({},e),{},{phoneNumber:t})}))},value:S.phoneNumber})),n.createElement("div",{style:{marginTop:"1rem"},className:"d-flex flex-column align-items-start"},n.createElement("label",{className:"text-capitalize form-label"},"Refer Code (optional)"),n.createElement("input",{required:"",name:"referalCode",type:"text",className:"form-control",onChange:N,value:S.referalCode})),n.createElement("div",{style:{marginTop:"1rem"}},n.createElement("p",{style:{fontSize:"0.8rem",textAlign:"start"}},"By continuing, you agree to our"," ",n.createElement("a",{href:"/legal"},"Legal Terms")," and you are 18 years or older.")),n.createElement("button",{style:{fontSize:"0.8rem",width:"100%"},type:"submit",disabled:g,className:"text-capitalize btn btn-primary"},g?n.createElement(a.Z,{style:{width:"1.5rem",height:"1.5rem",verticalAlign:"middle",color:"#fff"}}):"Submit"))),n.createElement("p",{style:{fontSize:"0.8rem"}},"Already have an account? ",n.createElement(c.rU,{to:"/login"},"Login"))))))}}}]);
//# sourceMappingURL=323.e4cfc75961954742bd13.js.map