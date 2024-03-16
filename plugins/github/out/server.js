"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const te=e=>({plugin:e});function T(){return typeof navigator=="object"&&"userAgent"in navigator?navigator.userAgent:"<environment undetectable>"}function re(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var O={exports:{}},ne=L;function L(e,t,r,i){if(typeof r!="function")throw new Error("method for before hook must be a function");return i||(i={}),Array.isArray(t)?t.reverse().reduce(function(n,s){return L.bind(null,e,s,n,i)},r)():Promise.resolve().then(function(){return e.registry[t]?e.registry[t].reduce(function(n,s){return s.hook.bind(null,n,i)},r)():r(i)})}var ie=ae;function ae(e,t,r,i){var n=i;e.registry[r]||(e.registry[r]=[]),t==="before"&&(i=function(s,a){return Promise.resolve().then(n.bind(null,a)).then(s.bind(null,a))}),t==="after"&&(i=function(s,a){var o;return Promise.resolve().then(s.bind(null,a)).then(function(u){return o=u,n(o,a)}).then(function(){return o})}),t==="error"&&(i=function(s,a){return Promise.resolve().then(s.bind(null,a)).catch(function(o){return n(o,a)})}),e.registry[r].push({hook:i,orig:n})}var se=oe;function oe(e,t,r){if(e.registry[t]){var i=e.registry[t].map(function(n){return n.orig}).indexOf(r);i!==-1&&e.registry[t].splice(i,1)}}var B=ne,ce=ie,ue=se,q=Function.bind,N=q.bind(q);function V(e,t,r){var i=N(ue,null).apply(null,r?[t,r]:[t]);e.api={remove:i},e.remove=i,["before","error","after","wrap"].forEach(function(n){var s=r?[t,n,r]:[t,n];e[n]=e.api[n]=N(ce,null).apply(null,s)})}function le(){var e="h",t={registry:{}},r=B.bind(null,t,e);return V(r,t,e),r}function M(){var e={registry:{}},t=B.bind(null,e);return V(t,e),t}var U=!1;function b(){return U||(console.warn('[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'),U=!0),M()}b.Singular=le.bind();b.Collection=M.bind();O.exports=b;O.exports.Hook=b;O.exports.Singular=b.Singular;var fe=O.exports.Collection=b.Collection,de="9.0.4",he=`octokit-endpoint.js/${de} ${T()}`,pe={method:"GET",baseUrl:"https://api.github.com",headers:{accept:"application/vnd.github.v3+json","user-agent":he},mediaType:{format:""}};function ge(e){return e?Object.keys(e).reduce((t,r)=>(t[r.toLowerCase()]=e[r],t),{}):{}}function be(e){if(typeof e!="object"||e===null||Object.prototype.toString.call(e)!=="[object Object]")return!1;const t=Object.getPrototypeOf(e);if(t===null)return!0;const r=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof r=="function"&&r instanceof r&&Function.prototype.call(r)===Function.prototype.call(e)}function W(e,t){const r=Object.assign({},e);return Object.keys(t).forEach(i=>{be(t[i])?i in e?r[i]=W(e[i],t[i]):Object.assign(r,{[i]:t[i]}):Object.assign(r,{[i]:t[i]})}),r}function D(e){for(const t in e)e[t]===void 0&&delete e[t];return e}function A(e,t,r){var n;if(typeof t=="string"){let[s,a]=t.split(" ");r=Object.assign(a?{method:s,url:a}:{url:s},r)}else r=Object.assign({},t);r.headers=ge(r.headers),D(r),D(r.headers);const i=W(e||{},r);return r.url==="/graphql"&&(e&&((n=e.mediaType.previews)!=null&&n.length)&&(i.mediaType.previews=e.mediaType.previews.filter(s=>!i.mediaType.previews.includes(s)).concat(i.mediaType.previews)),i.mediaType.previews=(i.mediaType.previews||[]).map(s=>s.replace(/-preview/,""))),i}function ye(e,t){const r=/\?/.test(e)?"&":"?",i=Object.keys(t);return i.length===0?e:e+r+i.map(n=>n==="q"?"q="+t.q.split("+").map(encodeURIComponent).join("+"):`${n}=${encodeURIComponent(t[n])}`).join("&")}var me=/\{[^}]+\}/g;function we(e){return e.replace(/^\W+|\W+$/g,"").split(/,/)}function ve(e){const t=e.match(me);return t?t.map(we).reduce((r,i)=>r.concat(i),[]):[]}function P(e,t){const r={__proto__:null};for(const i of Object.keys(e))t.indexOf(i)===-1&&(r[i]=e[i]);return r}function z(e){return e.split(/(%[0-9A-Fa-f]{2})/g).map(function(t){return/%[0-9A-Fa-f]/.test(t)||(t=encodeURI(t).replace(/%5B/g,"[").replace(/%5D/g,"]")),t}).join("")}function p(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})}function y(e,t,r){return t=e==="+"||e==="#"?z(t):p(t),r?p(r)+"="+t:t}function h(e){return e!=null}function S(e){return e===";"||e==="&"||e==="?"}function Ee(e,t,r,i){var n=e[r],s=[];if(h(n)&&n!=="")if(typeof n=="string"||typeof n=="number"||typeof n=="boolean")n=n.toString(),i&&i!=="*"&&(n=n.substring(0,parseInt(i,10))),s.push(y(t,n,S(t)?r:""));else if(i==="*")Array.isArray(n)?n.filter(h).forEach(function(a){s.push(y(t,a,S(t)?r:""))}):Object.keys(n).forEach(function(a){h(n[a])&&s.push(y(t,n[a],a))});else{const a=[];Array.isArray(n)?n.filter(h).forEach(function(o){a.push(y(t,o))}):Object.keys(n).forEach(function(o){h(n[o])&&(a.push(p(o)),a.push(y(t,n[o].toString())))}),S(t)?s.push(p(r)+"="+a.join(",")):a.length!==0&&s.push(a.join(","))}else t===";"?h(n)&&s.push(p(r)):n===""&&(t==="&"||t==="?")?s.push(p(r)+"="):n===""&&s.push("");return s}function Te(e){return{expand:Oe.bind(null,e)}}function Oe(e,t){var r=["+","#",".","/",";","?","&"];return e=e.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g,function(i,n,s){if(n){let o="";const u=[];if(r.indexOf(n.charAt(0))!==-1&&(o=n.charAt(0),n=n.substr(1)),n.split(/,/g).forEach(function(f){var c=/([^:\*]*)(?::(\d+)|(\*))?/.exec(f);u.push(Ee(t,o,c[1],c[2]||c[3]))}),o&&o!=="+"){var a=",";return o==="?"?a="&":o!=="#"&&(a=o),(u.length!==0?o:"")+u.join(a)}else return u.join(",")}else return z(s)}),e==="/"?e:e.replace(/\/$/,"")}function K(e){var c;let t=e.method.toUpperCase(),r=(e.url||"/").replace(/:([a-z]\w+)/g,"{$1}"),i=Object.assign({},e.headers),n,s=P(e,["method","baseUrl","url","headers","request","mediaType"]);const a=ve(r);r=Te(r).expand(s),/^http/.test(r)||(r=e.baseUrl+r);const o=Object.keys(e).filter(l=>a.includes(l)).concat("baseUrl"),u=P(s,o);if(!/application\/octet-stream/i.test(i.accept)&&(e.mediaType.format&&(i.accept=i.accept.split(/,/).map(l=>l.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,`application/vnd$1$2.${e.mediaType.format}`)).join(",")),r.endsWith("/graphql")&&(c=e.mediaType.previews)!=null&&c.length)){const l=i.accept.match(/[\w-]+(?=-preview)/g)||[];i.accept=l.concat(e.mediaType.previews).map(d=>{const w=e.mediaType.format?`.${e.mediaType.format}`:"+json";return`application/vnd.github.${d}-preview${w}`}).join(",")}return["GET","HEAD"].includes(t)?r=ye(r,u):"data"in u?n=u.data:Object.keys(u).length&&(n=u),!i["content-type"]&&typeof n<"u"&&(i["content-type"]="application/json; charset=utf-8"),["PATCH","PUT"].includes(t)&&typeof n>"u"&&(n=""),Object.assign({method:t,url:r,headers:i},typeof n<"u"?{body:n}:null,e.request?{request:e.request}:null)}function Se(e,t,r){return K(A(e,t,r))}function X(e,t){const r=A(e,t),i=Se.bind(null,r);return Object.assign(i,{DEFAULTS:r,defaults:X.bind(null,r),merge:A.bind(null,r),parse:K})}var je=X(null,pe);class H extends Error{constructor(t){super(t),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="Deprecation"}}var $={exports:{}},Ae=Y;function Y(e,t){if(e&&t)return Y(e)(t);if(typeof e!="function")throw new TypeError("need wrapper function");return Object.keys(e).forEach(function(i){r[i]=e[i]}),r;function r(){for(var i=new Array(arguments.length),n=0;n<i.length;n++)i[n]=arguments[n];var s=e.apply(this,i),a=i[i.length-1];return typeof s=="function"&&s!==a&&Object.keys(a).forEach(function(o){s[o]=a[o]}),s}}var J=Ae;$.exports=J(v);$.exports.strict=J(Q);v.proto=v(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return v(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return Q(this)},configurable:!0})});function v(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function Q(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},r=e.name||"Function wrapped with `once`";return t.onceError=r+" shouldn't be called more than once",t.called=!1,t}var Ie=$.exports;const Z=re(Ie);var ke=Z(e=>console.warn(e)),_e=Z(e=>console.warn(e)),m=class extends Error{constructor(e,t,r){super(e),Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor),this.name="HttpError",this.status=t;let i;"headers"in r&&typeof r.headers<"u"&&(i=r.headers),"response"in r&&(this.response=r.response,i=r.response.headers);const n=Object.assign({},r.request);r.request.headers.authorization&&(n.headers=Object.assign({},r.request.headers,{authorization:r.request.headers.authorization.replace(/ .*$/," [REDACTED]")})),n.url=n.url.replace(/\bclient_secret=\w+/g,"client_secret=[REDACTED]").replace(/\baccess_token=\w+/g,"access_token=[REDACTED]"),this.request=n,Object.defineProperty(this,"code",{get(){return ke(new H("[@octokit/request-error] `error.code` is deprecated, use `error.status`.")),t}}),Object.defineProperty(this,"headers",{get(){return _e(new H("[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`.")),i||{}}})}},$e="8.2.0";function Re(e){if(typeof e!="object"||e===null||Object.prototype.toString.call(e)!=="[object Object]")return!1;const t=Object.getPrototypeOf(e);if(t===null)return!0;const r=Object.prototype.hasOwnProperty.call(t,"constructor")&&t.constructor;return typeof r=="function"&&r instanceof r&&Function.prototype.call(r)===Function.prototype.call(e)}function qe(e){return e.arrayBuffer()}function C(e){var o,u,f;const t=e.request&&e.request.log?e.request.log:console,r=((o=e.request)==null?void 0:o.parseSuccessResponseBody)!==!1;(Re(e.body)||Array.isArray(e.body))&&(e.body=JSON.stringify(e.body));let i={},n,s,{fetch:a}=globalThis;if((u=e.request)!=null&&u.fetch&&(a=e.request.fetch),!a)throw new Error("fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing");return a(e.url,{method:e.method,body:e.body,headers:e.headers,signal:(f=e.request)==null?void 0:f.signal,...e.body&&{duplex:"half"}}).then(async c=>{s=c.url,n=c.status;for(const l of c.headers)i[l[0]]=l[1];if("deprecation"in i){const l=i.link&&i.link.match(/<([^>]+)>; rel="deprecation"/),d=l&&l.pop();t.warn(`[@octokit/request] "${e.method} ${e.url}" is deprecated. It is scheduled to be removed on ${i.sunset}${d?`. See ${d}`:""}`)}if(!(n===204||n===205)){if(e.method==="HEAD"){if(n<400)return;throw new m(c.statusText,n,{response:{url:s,status:n,headers:i,data:void 0},request:e})}if(n===304)throw new m("Not modified",n,{response:{url:s,status:n,headers:i,data:await j(c)},request:e});if(n>=400){const l=await j(c);throw new m(Ne(l),n,{response:{url:s,status:n,headers:i,data:l},request:e})}return r?await j(c):c.body}}).then(c=>({status:n,url:s,headers:i,data:c})).catch(c=>{if(c instanceof m)throw c;if(c.name==="AbortError")throw c;let l=c.message;throw c.name==="TypeError"&&"cause"in c&&(c.cause instanceof Error?l=c.cause.message:typeof c.cause=="string"&&(l=c.cause)),new m(l,500,{request:e})})}async function j(e){const t=e.headers.get("content-type");return/application\/json/.test(t)?e.json().catch(()=>e.text()).catch(()=>""):!t||/^text\/|charset=utf-8$/.test(t)?e.text():qe(e)}function Ne(e){if(typeof e=="string")return e;let t;return"documentation_url"in e?t=` - ${e.documentation_url}`:t="","message"in e?Array.isArray(e.errors)?`${e.message}: ${e.errors.map(JSON.stringify).join(", ")}${t}`:`${e.message}${t}`:`Unknown error: ${JSON.stringify(e)}`}function I(e,t){const r=e.defaults(t);return Object.assign(function(n,s){const a=r.merge(n,s);if(!a.request||!a.request.hook)return C(r.parse(a));const o=(u,f)=>C(r.parse(r.merge(u,f)));return Object.assign(o,{endpoint:r,defaults:I.bind(null,r)}),a.request.hook(o,a)},{endpoint:r,defaults:I.bind(null,r)})}var k=I(je,{headers:{"user-agent":`octokit-request.js/${$e} ${T()}`}}),Ue="7.0.2";function De(e){return`Request failed due to following response errors:
`+e.errors.map(t=>` - ${t.message}`).join(`
`)}var Pe=class extends Error{constructor(e,t,r){super(De(r)),this.request=e,this.headers=t,this.response=r,this.name="GraphqlResponseError",this.errors=r.errors,this.data=r.data,Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)}},He=["method","baseUrl","url","headers","request","query","mediaType"],Ce=["query","method","url"],F=/\/api\/v3\/?$/;function Fe(e,t,r){if(r){if(typeof t=="string"&&"query"in r)return Promise.reject(new Error('[@octokit/graphql] "query" cannot be used as variable name'));for(const a in r)if(Ce.includes(a))return Promise.reject(new Error(`[@octokit/graphql] "${a}" cannot be used as variable name`))}const i=typeof t=="string"?Object.assign({query:t},r):t,n=Object.keys(i).reduce((a,o)=>He.includes(o)?(a[o]=i[o],a):(a.variables||(a.variables={}),a.variables[o]=i[o],a),{}),s=i.baseUrl||e.endpoint.DEFAULTS.baseUrl;return F.test(s)&&(n.url=s.replace(F,"/api/graphql")),e(n).then(a=>{if(a.data.errors){const o={};for(const u of Object.keys(a.headers))o[u]=a.headers[u];throw new Pe(n,o,a.data)}return a.data.data})}function R(e,t){const r=e.defaults(t);return Object.assign((n,s)=>Fe(r,n,s),{defaults:R.bind(null,r),endpoint:r.endpoint})}R(k,{headers:{"user-agent":`octokit-graphql.js/${Ue} ${T()}`},method:"POST",url:"/graphql"});function Ge(e){return R(e,{method:"POST",url:"/graphql"})}var xe=/^v1\./,Le=/^ghs_/,Be=/^ghu_/;async function Ve(e){const t=e.split(/\./).length===3,r=xe.test(e)||Le.test(e),i=Be.test(e);return{type:"token",token:e,tokenType:t?"app":r?"installation":i?"user-to-server":"oauth"}}function Me(e){return e.split(/\./).length===3?`bearer ${e}`:`token ${e}`}async function We(e,t,r,i){const n=t.endpoint.merge(r,i);return n.headers.authorization=Me(e),t(n)}var ze=function(t){if(!t)throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");if(typeof t!="string")throw new Error("[@octokit/auth-token] Token passed to createTokenAuth is not a string");return t=t.replace(/^(token|bearer) +/i,""),Object.assign(Ve.bind(null,t),{hook:We.bind(null,t)})},ee="5.1.0",G=()=>{},Ke=console.warn.bind(console),Xe=console.error.bind(console),x=`octokit-core.js/${ee} ${T()}`,g,Ye=(g=class{static defaults(t){return class extends this{constructor(...i){const n=i[0]||{};if(typeof t=="function"){super(t(n));return}super(Object.assign({},t,n,n.userAgent&&t.userAgent?{userAgent:`${n.userAgent} ${t.userAgent}`}:null))}}}static plugin(...t){var n;const r=this.plugins;return n=class extends this{},n.plugins=r.concat(t.filter(a=>!r.includes(a))),n}constructor(t={}){const r=new fe,i={baseUrl:k.endpoint.DEFAULTS.baseUrl,headers:{},request:Object.assign({},t.request,{hook:r.bind(null,"request")}),mediaType:{previews:[],format:""}};if(i.headers["user-agent"]=t.userAgent?`${t.userAgent} ${x}`:x,t.baseUrl&&(i.baseUrl=t.baseUrl),t.previews&&(i.mediaType.previews=t.previews),t.timeZone&&(i.headers["time-zone"]=t.timeZone),this.request=k.defaults(i),this.graphql=Ge(this.request).defaults(i),this.log=Object.assign({debug:G,info:G,warn:Ke,error:Xe},t.log),this.hook=r,t.authStrategy){const{authStrategy:s,...a}=t,o=s(Object.assign({request:this.request,log:this.log,octokit:this,octokitOptions:a},t.auth));r.wrap("request",o.hook),this.auth=o}else if(!t.auth)this.auth=async()=>({type:"unauthenticated"});else{const s=ze(t.auth);r.wrap("request",s.hook),this.auth=s}const n=this.constructor;for(let s=0;s<n.plugins.length;++s)Object.assign(this,n.plugins[s](this,t))}},g.VERSION=ee,g.plugins=[],g);const _="github-token",E="github-notifications",Je=te(e=>{const t=`${e.pluginSlug}-sync-notifications`,r="last-synced-notifications-at",i=async()=>{const s=await e.store.getPluginItem(_);if(!s)throw new e.GraphQLError("Missing token to access GitHub API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitHub token in the plugin settings."}});return s.value},n=async()=>{const s=await i();return new Ye({auth:s})};return{operations:{syncNotifications:async()=>(await e.pgBoss.send(t,{}),{data:"Job sent to sync the GitHub notifications."}),scheduleSyncNotifications:async()=>(await e.pgBoss.schedule(t,"*/5 * * * *").catch(s=>new e.GraphQLError(s)),{data:"Schedule successfully set."})},onInstall:async()=>{await e.prisma.list.upsert({where:{slug:E},create:{slug:E,name:"GitHub Notifications",description:"All your notifications from GitHub."},update:{name:"GitHub Notifications",description:"All your notifications from GitHub."}})},onStoreItemUpsert:async s=>{s===_&&(await e.pgBoss.send(t,{}),await e.pgBoss.schedule(t,"*/5 * * * *"))},handlePgBossWork:s=>[s(t,async()=>{const a=await e.store.getPluginItem(r),u=await(await n()).request("GET /notifications",{headers:{"X-GitHub-Api-Version":"2022-11-28"},all:!1,participating:!0,since:(a==null?void 0:a.value)??e.dayjs().subtract(1,"month").toISOString(),per_page:50}).catch(c=>{if(c.status===304)return null;throw new e.GraphQLError(c.message,{extensions:{code:"GITHUB_API_ERROR",userFriendlyMessage:"There was an error while fetching your GitHub notifications."}})}),f=(u==null?void 0:u.data.filter(c=>c.reason==="review_requested"))??[];for(const c of f){const l=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:c.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),d={type:c.subject.type,reason:c.reason,url:c.subject.url,title:c.subject.title,updatedAt:c.updated_at},w=c;l?await e.prisma.item.update({where:{id:l.id},data:{title:c.subject.title,isRelevant:c.unread,pluginDatas:{update:{where:{id:l.pluginDatas[0].id},data:{min:d,full:w}}}}}):c.unread&&await e.prisma.item.create({data:{title:c.subject.title,isRelevant:!0,inboxPoints:11,list:{connect:{slug:E}},pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:c.id,min:d,full:w}}}})}await e.store.setItem(r,new Date().toISOString())})],onCreateTask:async({task:s})=>{var o,u;const a=(u=(o=s.item)==null?void 0:o.pluginDatas)==null?void 0:u.find(f=>f.pluginSlug===e.pluginSlug);if(a!=null&&a.originalId)return{pluginData:{originalId:a.originalId,min:a.min,full:a.full}}}}});exports.GITHUB_NOTIFICATIONS_LIST_SLUG=E;exports.TOKEN_STORE_KEY=_;exports.default=Je;
