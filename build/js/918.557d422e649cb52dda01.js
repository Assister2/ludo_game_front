(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[918],{84040:function(e,t,a){"use strict";a.d(t,{L:function(){return n}});var n="https://www.gotiking.com/"},79918:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return M}});var n=a(67294),r=a(54817),i=a(45697),l=a.n(i),o=a(87462),c=a(45987),s=a(86010),m=a(24344),u=a(93871),p=a(79895),d=n.forwardRef((function(e,t){var a=e.classes,r=e.className,i=e.color,l=void 0===i?"primary":i,m=e.position,d=void 0===m?"fixed":m,g=(0,c.Z)(e,["classes","className","color","position"]);return n.createElement(p.Z,(0,o.Z)({square:!0,component:"header",elevation:4,className:(0,s.Z)(a.root,a["position".concat((0,u.Z)(d))],a["color".concat((0,u.Z)(l))],r,"fixed"===d&&"mui-fixed"),ref:t},g))})),g=(0,m.Z)((function(e){var t="light"===e.palette.type?e.palette.grey[100]:e.palette.grey[900];return{root:{display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",zIndex:e.zIndex.appBar,flexShrink:0},positionFixed:{position:"fixed",top:0,left:"auto",right:0,"@media print":{position:"absolute"}},positionAbsolute:{position:"absolute",top:0,left:"auto",right:0},positionSticky:{position:"sticky",top:0,left:"auto",right:0},positionStatic:{position:"static"},positionRelative:{position:"relative"},colorDefault:{backgroundColor:t,color:e.palette.getContrastText(t)},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},colorInherit:{color:"inherit"},colorTransparent:{backgroundColor:"transparent",color:"inherit"}}}),{name:"MuiAppBar"})(d),f=a(4942),h=n.forwardRef((function(e,t){var a=e.classes,r=e.className,i=e.component,l=void 0===i?"div":i,m=e.disableGutters,u=void 0!==m&&m,p=e.variant,d=void 0===p?"regular":p,g=(0,c.Z)(e,["classes","className","component","disableGutters","variant"]);return n.createElement(l,(0,o.Z)({className:(0,s.Z)(a.root,a[d],r,!u&&a.gutters),ref:t},g))})),x=(0,m.Z)((function(e){return{root:{position:"relative",display:"flex",alignItems:"center"},gutters:(0,f.Z)({paddingLeft:e.spacing(2),paddingRight:e.spacing(2)},e.breakpoints.up("sm"),{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}),regular:e.mixins.toolbar,dense:{minHeight:48}}}),{name:"MuiToolbar"})(h),v={WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box"},y=function(e){return(0,o.Z)({color:e.palette.text.primary},e.typography.body2,{backgroundColor:e.palette.background.default,"@media print":{backgroundColor:e.palette.common.white}})};var E=(0,m.Z)((function(e){return{"@global":{html:v,"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:(0,o.Z)({margin:0},y(e),{"&::backdrop":{backgroundColor:e.palette.background.default}})}}}),{name:"MuiCssBaseline"})((function(e){var t=e.children,a=void 0===t?null:t;return e.classes,n.createElement(n.Fragment,null,a)}));function b(e,t){var a=t.disableHysteresis,n=void 0!==a&&a,r=t.threshold,i=void 0===r?100:r,l=t.target,o=e.current;return l&&(e.current=void 0!==l.pageYOffset?l.pageYOffset:l.scrollTop),!(!n&&void 0!==o&&e.current<o)&&e.current>i}var w="undefined"!=typeof window?window:null;var k=a(25543),N=a(84040),C=a(95998),j=a(79655),z=a(63750),L=a(31955),S=a(14309),I=a(44954),Z=a(36392),O=a(72519),T=a(83239);function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,i,l,o=[],c=!0,s=!1;try{if(i=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;c=!1}else for(;!(c=(n=i.call(a)).done)&&(o.push(n.value),o.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{if(!c&&null!=a.return&&(l=a.return(),Object(l)!==l))return}finally{if(s)throw r}}return o}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return U(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return U(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function B(e){var t=(0,C.I0)(),a=(0,S.s0)(),i=A((0,n.useState)(!1),2),l=i[0],o=i[1],c=(0,C.v9)((function(e){return e.loginReducer})).data,s=(0,C.v9)((function(e){return e.user})).data,m=A((0,n.useState)({}),2),u=m[0],p=m[1],d=(0,n.useRef)(null),g=L.Z.get("userId");(0,n.useEffect)((function(){if(null==s||!s._id)if(c.isLoggedIn&&L.Z.get("token")){var e=window.location.pathname;if("/login"===e||"/register"===e)return window.location.href="/",null;t((0,Z.DD)()),t((0,I.DI)())}else{var a=window.location.pathname;if("/login"!==a&&"/register"!==a&&"/"!==a)return window.location.href="/login",null}}),[c.isLoggedIn]),(0,n.useEffect)((function(){if(console.log("working"),!g||null!=s&&s.isBlocked)return t((0,O.ls)()),void a("/login");if(d.current=(0,T.zp)(),g&&d.current){d.current.connect();var e=setInterval((function(){(0,T.AL)(d.current)&&d.current.emit("getUserWallet",JSON.stringify({type:"getUserWallet",payload:{userId:g}}))}),3e3);return d.current.on("getUserWallet",(function(e){var n=JSON.parse(e);if(n.error);else if(null!==n.data||void 0!==n.data){var r;null!=n&&null!==(r=n.data)&&void 0!==r&&r.isBlocked&&(L.Z.remove("token"),L.Z.remove("fullName"),L.Z.remove("userId"),(0,T.lt)(d.current),t((0,O.ls)()),a("/login")),p(n.data),t({type:"GET_WALLET_REQUEST1",payload:n.data})}})),function(){clearInterval(e),(0,T.AL)(d.current)&&(0,T.lt)(d.current)}}}),[g]);return n.createElement("div",null,n.createElement("div",{className:"partials"},n.createElement(r.Z,{PaperProps:{style:{width:"100vw",minHeight:"50vh"}},anchor:"bottom",open:l,onClose:function(){return o(!1)}})),c.isLoggedIn?n.createElement(j.rU,{className:"text-decoration-none text-white ",to:"/wallet"},n.createElement("div",{className:"py-1 bg-white border px-2 text-dark d-flex align-items-center rounded-2"},n.createElement(z.U0o,{className:"me-2",color:"green"}),n.createElement("strong",{className:"ml-2"},u.wallet))):n.createElement("button",{onClick:function(){return o(!0)},type:"button",className:"btn btn-outline-primary d-flex align-items-center justify-content-center"},n.createElement("img",{style:{marginRight:"4px"},src:"".concat(N.L,"svgs/info.svg"),alt:"info"}),n.createElement("p",{className:"m-0 p-0"},"Guide")))}var R=a(53854);function P(e){var t=e.f_open,a=e.handleClose,i=(0,C.v9)((function(e){return e.loginReducer})).data,l=(L.Z.get("isLoggedIn"),L.Z.get("fullName"));return n.createElement(r.Z,{PaperProps:{style:{width:"90vw",maxWidth:"450px"}},anchor:"left",open:t,onClose:a},n.createElement("div",null,n.createElement("div",{style:{padding:"1rem"},className:"bg-dark offcanvas-header"},n.createElement("div",{className:"text-white fw-bold offcanvas-title h5"},"Goti King"),n.createElement("button",{onClick:a,type:"button",className:"btn-close btn-close-white","aria-label":"Close"})),n.createElement("div",{className:"d-flex flex-column align-items-stretch justify-content-start p-0 offcanvas-body"},n.createElement("div",{className:"d-flex align-items-center justify-content-between p-4"},n.createElement("div",{className:"fs-1 fw-bold text-start d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-2 minBreakpoint-xs"},n.createElement("div",{className:"m-0 me-1 d-flex align-items-center justify-content-start"},n.createElement("p",{className:"m-0"},"Hey, ",i.isLoggedIn?l:""),n.createElement("p",{className:"text-truncate m-0 me-2",style:{maxWidth:"125px"}}," "),n.createElement("img",{src:"https://ludo3.s3.ap-south-1.amazonaws.com/hello.a512d06e9ef9c85276f6.webp",alt:"hello icon",width:"36px"}))))),n.createElement("div",{className:" d-flex flex-column align-items-stretch justify-content-start"},i.isLoggedIn?n.createElement(n.Fragment,null,n.createElement(j.rU,{className:"text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/".concat(i.isLoggedIn?"play":"login"),onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{src:"https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp",height:"36px",alt:"play"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"play"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/wallet",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement(z.hG7,null),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"wallet"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/history",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement(z.NbQ,null),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"History"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/profile",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement(R.AYC,null),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"Profile"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/referal",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement(z.jbI,null),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"Refer & Earn"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/support",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{src:"https://ludo3.s3.ap-south-1.amazonaws.com/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp",height:"36px",alt:"support icon"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"support"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none  bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/legal",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{style:{width:"2rem"},src:"https://ludo3.s3.ap-south-1.amazonaws.com/legal.svg",height:"36px",alt:"support icon"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"legal terms"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"}))):n.createElement(n.Fragment,null,n.createElement(j.rU,{className:"text-start text-decoration-none bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/".concat(i.isLoggedIn?"play":"login"),onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{src:"https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp",height:"36px",alt:"play"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"play"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/register",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{src:"https://ludoplayers.com/static/media/play.2f22f88bac8acca85f6a.webp",height:"36px",alt:"play"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"register"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none bg-white p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/support",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{src:"https://ludoplayers.com/static/media/liveChatOffcanvas.4db8ac024d1cc6d424a3.webp",height:"36px",alt:"support icon"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"support"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})),n.createElement(j.rU,{className:"text-start text-decoration-none  bg-light p-4 text-dark fs-2 text-capitalize d-flex align-items-center justify-content-between",to:"/legal",onClick:function(){return a()}},n.createElement("div",{className:"d-flex align-items-center justify-content-start"},n.createElement("div",{className:"hstack gap-3 minBreakpoint-xs"},n.createElement("img",{style:{width:"2rem"},src:"".concat(N.L,"svgs/legal.svg"),height:"36px",alt:"support icon"}),n.createElement("p",{className:"p-0 m-0 text-capitalize"},"legal terms"))),n.createElement("img",{style:{width:"1.4rem"},src:"".concat(N.L,"svgs/arrow.svg"),height:"36px",alt:"arrow"})))))))}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var n,r,i,l,o=[],c=!0,s=!1;try{if(i=(a=a.call(e)).next,0===t){if(Object(a)!==a)return;c=!1}else for(;!(c=(n=i.call(a)).done)&&(o.push(n.value),o.length!==t);c=!0);}catch(e){s=!0,r=e}finally{try{if(!c&&null!=a.return&&(l=a.return(),Object(l)!==l))return}finally{if(s)throw r}}return o}}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return W(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return W(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function W(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}function F(e){var t=e.children,a=e.window,r=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getTrigger,a=void 0===t?b:t,r=e.target,i=void 0===r?w:r,l=(0,c.Z)(e,["getTrigger","target"]),s=n.useRef(),m=n.useState((function(){return a(s,l)})),u=m[0],p=m[1];return n.useEffect((function(){var e=function(){p(a(s,(0,o.Z)({target:i},l)))};return e(),i.addEventListener("scroll",e),function(){i.removeEventListener("scroll",e)}}),[i,a,JSON.stringify(l)]),u}({target:a?a():void 0});return n.createElement(k.Z,{appear:!1,direction:"down",in:!r},t)}function M(e){var t,a=_((0,n.useState)(!1),2),i=a[0],l=a[1],o=_((0,n.useState)(!1),2),c=o[0],s=o[1],m=_((0,n.useState)(!1),2),u=m[0],p=m[1],d=function(){return l(!1)},f=(0,S.oQ)(null===(t=window)||void 0===t?void 0:t.location),h=(0,C.v9)((function(e){return e.loginReducer})).data;return console.log("checkkguide",h),(0,n.useEffect)((function(){p(["/"].includes(window.location.pathname))}),[f]),n.createElement(n.Fragment,null,n.createElement("div",{className:"partials"},n.createElement(P,{f_open:c,handleClose:function(){return s(!1)}})),n.createElement(E,null),n.createElement(F,e,n.createElement(g,{position:"sticky",style:{background:"white",borderBottom:"1px solid lightgray"},elevation:0},u&&n.createElement("div",{className:"bg-danger py-2 text-white w-100"},"Commission: 3% ◉ Referral: 2% For All Games"),n.createElement(x,{style:{padding:"4px"}},n.createElement("button",{onClick:function(){return s(!0)},type:"button",className:"bg-white border-0 btn btn-light"},n.createElement("img",{src:"".concat(N.L,"svgs/ham.svg"),alt:"Menu"})),n.createElement("div",null,n.createElement(r.Z,{PaperProps:{style:{width:"100vw",minHeight:"50vh"}},anchor:"bottom",open:i,onClose:d},n.createElement("div",null,n.createElement("div",{style:{padding:"1rem"},className:"bg-dark offcanvas-header"},n.createElement("div",{className:"text-white fw-bold offcanvas-title h5"},"How To Play Games & Earn?"),n.createElement("button",{onClick:d,type:"button",className:"btn-close","aria-label":"Close"})))))," ",n.createElement(j.rU,{className:"text-decoration-none text-white fw-semibold fs-4",to:"/"},n.createElement("span",{className:"text-white"},n.createElement("img",{src:"https://ludo3.s3.ap-south-1.amazonaws.com/logo.webp",alt:"logo",height:"40",width:"40"}))),n.createElement("div",{style:{marginLeft:"auto",marginRight:"10px"}},null!=h&&h.isLoggedIn?n.createElement(B,null):n.createElement("button",{onClick:function(){l(!0)},type:"button",className:"d-flex align-items-center btn btn-outline-primary btn-md"},n.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",width:"1em",height:"1em",fill:"currentColor",className:"me-1"},n.createElement("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),n.createElement("path",{d:"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"})),n.createElement("span",{className:"text-capitalize"},"guide")))))))}F.propTypes={children:l().element.isRequired,window:l().func}},92703:function(e,t,a){"use strict";var n=a(50414);function r(){}function i(){}i.resetWarningCache=r,e.exports=function(){function e(e,t,a,r,i,l){if(l!==n){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var a={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:r};return a.PropTypes=a,a}},45697:function(e,t,a){e.exports=a(92703)()},50414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"}}]);