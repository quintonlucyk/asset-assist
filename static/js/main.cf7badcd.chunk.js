(this["webpackJsonpasset-assist"]=this["webpackJsonpasset-assist"]||[]).push([[0],{68:function(e,t,n){},70:function(e,t,n){},74:function(e,t,n){},78:function(e,t,n){"use strict";n.r(t);var a=n(6),r=n(0),i=n.n(r),c=n(9),s=n.n(c),o=(n(68),n(35)),l=n(120),d=n(117),h=n(119),j=n(118),u=n(41),b=n(11),x=n(42),p=function(){return Object(a.jsx)("div",{children:"QuintonContent"})},O=n(51),g=n.n(O),f=n(107),m=n(111),v=n(112),S=n(113),w=n(114),y=n(115),F=n(116);n(70);var C=r.memo((function(e){var t=e.data,n=e.isLoading,i=e.isError,c=r.useState([]),s=Object(o.a)(c,2),l=s[0],d=s[1];return r.useEffect((function(){var e,n=[];null===t||void 0===t||null===(e=t.prices)||void 0===e||e.forEach((function(e,t,a){if("DIVIDEND"===e.type){var r=null;t>0&&a[t-1].date===e.date?r=-1:t<a.length-1&&a[t-1].date===e.date&&(r=1),null!==r&&e.date&&e.amount&&a[t+r].low&&a[t+r].high&&n.push((i=g()(1e3*e.date).format("MMM DD YYYY"),c="$ "+e.amount.toFixed(4),s="$ "+a[t+r].low.toFixed(4),o=(e.amount/a[t+r].low*100).toFixed(4)+" %",l="$ "+a[t+r].high.toFixed(4),d=(e.amount/a[t+r].high*100).toFixed(4)+" %",{date:i,dividend:c,lowShare:s,highYield:o,highShare:l,lowYield:d}))}var i,c,s,o,l,d})),d(n)}),[t]),n?Object(a.jsx)("div",{className:"center",children:Object(a.jsx)(f.a,{})}):i?Object(a.jsx)("div",{className:"center",children:"Sorry, we have experienced an error..."}):t?Object(a.jsx)(a.Fragment,{children:Object(a.jsx)(m.a,{className:"tableContainer",children:Object(a.jsxs)(v.a,{children:[Object(a.jsx)(S.a,{children:Object(a.jsxs)(w.a,{children:[Object(a.jsx)(y.a,{children:"Date "}),Object(a.jsx)(y.a,{align:"right",children:"Dividend"}),Object(a.jsx)(y.a,{align:"right",children:"Low Share"}),Object(a.jsx)(y.a,{align:"right",children:"High Yield"}),Object(a.jsx)(y.a,{align:"right",children:"High Share"}),Object(a.jsx)(y.a,{align:"right",children:"Low Yield"})]})}),Object(a.jsx)(F.a,{children:l.map((function(e){return Object(a.jsxs)(w.a,{children:[Object(a.jsx)(y.a,{component:"th",scope:"row",children:e.date}),Object(a.jsx)(y.a,{align:"right",children:e.dividend}),Object(a.jsx)(y.a,{align:"right",children:e.lowShare}),Object(a.jsx)(y.a,{align:"right",children:e.highYield}),Object(a.jsx)(y.a,{align:"right",children:e.highShare}),Object(a.jsx)(y.a,{align:"right",children:e.lowYield})]},e.date)}))})]})})}):Object(a.jsx)("div",{className:"center",children:"No data available..."})})),D=(n(74),n(45)),E=n.n(D),Y=n(55),N=function(){var e=Object(Y.a)(E.a.mark((function e(t,n){var a,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a="faca135c25msh4c9b9b997208cb6p1a1c39jsnf48b0d5bc9ad",n){e.next=3;break}return e.abrupt("return",{});case 3:e.prev=3,e.next=6;break;case 6:return e.next=8,fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v3/get-historical-data?symbol=".concat(n,"&region=US"),{method:"GET",headers:{"x-rapidapi-key":a,"x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com"}});case 8:return r=e.sent,e.next=11,r.json();case 11:return e.abrupt("return",e.sent);case 14:return e.prev=14,e.t0=e.catch(3),e.abrupt("return",e.t0);case 17:return e.prev=17,e.finish(17);case 19:case"end":return e.stop()}}),e,null,[[3,14,17,19]])})));return function(t,n){return e.apply(this,arguments)}}(),k=new x.a;function L(){var e=i.a.useState(""),t=Object(o.a)(e,2),n=t[0],r=t[1],c=i.a.useState(""),s=Object(o.a)(c,2),O=s[0],g=s[1],f=Object(x.c)(["historicalData",O],N,{enabled:!!O}),m=f.data,v=f.isLoading,S=f.isError;i.a.useEffect((function(){console.log("data",JSON.stringify(m))}),[m]);var w=function(e){r(e.currentTarget.value)},y=function(e){e.preventDefault(),g(n)};return Object(a.jsx)(x.b,{queryCache:k,children:Object(a.jsx)(u.a,{children:Object(a.jsx)(b.a,{path:"/",render:function(e){var t=e.location;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)(l.a,{value:"/ellen"===t.pathname?1:0,indicatorColor:"primary",textColor:"primary",centered:!0,children:[Object(a.jsx)(d.a,{label:"Quinton",component:u.b,to:"/"}),Object(a.jsx)(d.a,{label:"Ellen",component:u.b,to:"/ellen"})]}),Object(a.jsx)("div",{className:"symbolInput",children:Object(a.jsxs)("form",{noValidate:!0,autoComplete:"off",onSubmit:y,children:[Object(a.jsx)(h.a,{onChange:w,name:"symbolInput",placeholder:"Symbol"}),Object(a.jsx)(j.a,{type:"submit",children:"Search"})]})}),Object(a.jsxs)(b.c,{children:[Object(a.jsx)(b.a,{path:"/ellen",render:function(){return Object(a.jsx)(C,{data:m,isLoading:v,isError:S})}}),Object(a.jsx)(b.a,{path:"/",render:function(){return Object(a.jsx)(p,{})}})]})]})}})})})}var I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,121)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),i(e),c(e)}))};s.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(L,{})}),document.getElementById("root")),I()}},[[78,1,2]]]);
//# sourceMappingURL=main.cf7badcd.chunk.js.map