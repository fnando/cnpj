!function(r,e){for(var t in e)r[t]=e[t]}(exports,function(r){var e={};function t(n){if(e[n])return e[n].exports;var u=e[n]={i:n,l:!1,exports:{}};return r[n].call(u.exports,u,u.exports,t),u.l=!0,u.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var u in r)t.d(n,u,function(e){return r[e]}.bind(null,u));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=0)}([function(r,e,t){"use strict";e.__esModule=!0;var n=["00000000000000","11111111111111","22222222222222","33333333333333","44444444444444","55555555555555","66666666666666","77777777777777","88888888888888","99999999999999"],u=/[-\/.]/g,o=/[^\d]/g;function i(r){var e=2,t=r.split("").reduce((function(r,e){return[parseInt(e,10)].concat(r)}),[]).reduce((function(r,t){return r+=t*e,e=9===e?2:e+1,r}),0)%11;return t<2?0:11-t}function f(r){return c(r).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,"$1.$2.$3/$4-$5")}function c(r,e){void 0===e&&(e=!1);var t=e?u:o;return(r||"").toString().replace(t,"")}e.verifierDigit=i,e.format=f,e.strip=c,e.isValid=function(r,e){void 0===e&&(e=!1);var t=c(r,e);if(!t)return!1;if(14!==t.length)return!1;if(n.includes(t))return!1;var u=t.substr(0,12);return u+=i(u),(u+=i(u)).substr(-2)===t.substr(-2)},e.generate=function(r){void 0===r&&(r=!1);for(var e="",t=0;t<12;t+=1)e+=Math.floor(9*Math.random());return e+=i(e),e+=i(e),r?f(e):e}}]));
//# sourceMappingURL=index.js.map