"use strict";const o=(e,a)=>({slug:e,plugin:a}),c=o("google-calendar",e=>{const a="tokens";return{onRequest:async(t,s)=>{if(t.path==="/auth")return s.redirect("https://google-calendar.vercel.com/api/auth");if(t.path==="/auth/callback"&&t.method==="POST"){const n=t.body;return await e.store.setSecretItem(a,n),s.status(200).send()}}}});module.exports=c;
