"use strict";const C=(e,f)=>({slug:e,plugin:f}),y="account-tokens",w="connected-calendars",A=C("google-calendar",e=>{const f=`${e.pluginSlug}-get-events`,I=`${e.pluginSlug}-calendars-sync`,S=`${e.pluginSlug}-upsert-item-from-event`,k=`${e.pluginSlug}-process-events-webhook`,_=`flow-${e.pluginSlug}-events-webhook`,m=async()=>{const o=await e.store.getPluginItem(y);if(!o)throw new Error("NOT_AUTHENTICATED: You are not authenticated and will need to connect your Google account first.");return o.value},p=async o=>{const t=(o.accountsTokens??await m())[o.account];if(!t)throw new Error("NOT_AUTHENTICATED: You are not authenticated and will need to connect your Google account first.");if(e.dayjs().isAfter(t.expires_at)){const r=await fetch("https://google-calendar-api-flow-dev.vercel.app/api/auth/refresh?refresh_token="+t.refresh_token);if(!r.ok)throw new Error("COULD_NOT_REFRESH_TOKEN: Could not refresh token.");const a=await r.json(),c={...a,refresh_token:t.refresh_token,expires_at:e.dayjs().add((a.expires_in??10)-10,"seconds").toISOString()};return await e.store.setSecretItem(y,{...o.accountsTokens,[o.account]:c}),c}return t};return{onRequest:async(o,i)=>{var t,r;if(o.path==="/auth")return i.redirect(`https://google-calendar-api-flow-dev.vercel.app/api/auth?api_endpoint=${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth/callback`);if(o.path==="/auth/callback"&&o.method==="POST"){const a=await e.store.getPluginItem(y),c={...o.body,refresh_token:o.body.refresh_token??((t=a==null?void 0:a.value)==null?void 0:t[o.body.email].refresh_token),expires_at:e.dayjs().add((o.body.expires_in??10)-10,"seconds").toISOString()};return"expires_in"in c&&delete c.expires_in,await e.store.setSecretItem(y,{...(a==null?void 0:a.value)??{},[c.email]:c}),i.status(200).send()}else if(o.path==="/events/webhook"&&o.method==="POST"){const a=o.headers["x-goog-resource-uri"],c=(r=a.match(/\/calendars\/(.*)\/events/))==null?void 0:r[1];if(!c)return console.log("❌ Could not find calendarId in x-goog-resource-uri header",a),i.status(200).send();const s=decodeURIComponent(c);return await e.pgBoss.send(k,{calendarId:s}),i.status(200).send()}},operations:{calendars:async()=>{const o=await m(),i=[];for(const t of Object.keys(o)){const r=await p({account:t,accountsTokens:o}),a=await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList",{headers:{Authorization:`Bearer ${r.access_token}`}}).then(s=>s.json()).then(s=>s.items),c=await e.store.getPluginItem(w).then(s=>{var n;return new Set(((n=s==null?void 0:s.value)==null?void 0:n.map(u=>u.calendarId))??[])});i.push({account:t,calendars:(a==null?void 0:a.map(s=>({...s,connected:c.has(s.id??"")})))??[]})}return{data:i}},connectCalendars:async o=>{const i=await m(),t=await e.store.getPluginItem(w).then(a=>{var c;return new Map(((c=a==null?void 0:a.value)==null?void 0:c.map(s=>[s.calendarId,s]))??[])}),r=[];for(const a of Object.keys(i)){const c=await p({account:a,accountsTokens:i}),s=await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList",{headers:{Authorization:`Bearer ${c.access_token}`}}).then(n=>n.json()).then(n=>n.items);for(const n of o.calendarIds){if(t.has(n)||!(s!=null&&s.some(g=>g.id===n)))continue;await e.pgBoss.send(f,{calendarId:n,days:7});const u=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${n}/events/watch`,{method:"POST",headers:{Authorization:`Bearer ${c.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({id:_,type:"web_hook",address:`${e.serverOrigin}/api/plugin/${e.pluginSlug}/events/webhook`})}).then(g=>g.json());console.log("✔ Set up webhook for calendar",n),t.set(n,{account:a,calendarId:n,lastSyncedAt:e.dayjs().toISOString(),channelId:u.id??_,resourceId:u.resourceId,expiresAt:e.dayjs(u.expiration??0).toISOString()})}for(const n of s??[]){if(!n.id||o.calendarIds.includes(n.id))continue;const u=t.get(n.id);u&&(await fetch("https://www.googleapis.com/calendar/v3/channels/stop",{method:"POST",headers:{Authorization:`Bearer ${c.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({id:u.channelId,resourceId:u.resourceId})}),console.log("✔ Removed webhook for calendar",n.id),t.delete(n.id))}r.push({account:a,calendars:(s==null?void 0:s.map(n=>({...n,connected:t.has(n.id??"")})))??[]})}return await e.store.setItem(w,Array.from(t.values())),await e.pgBoss.schedule(I,"0 0 */3 * *",{calendarIds:o.calendarIds}),console.log("✔ Scheduled calendars sync job"),{operationName:"calendars",data:r}},refreshEvents:async o=>{const i=await e.store.getPluginItem(w).then(t=>(t==null?void 0:t.value.map(r=>r.calendarId))??[]);return await e.pgBoss.send(I,{calendarIds:i??[],days:o.days??7}),{data:"Job sent to refresh events."}}},handlePgBossWork:o=>[o(S,{batchSize:5},async i=>{var t,r,a,c,s,n,u,g;for(const l of i){const d=l.data,h=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:d.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{where:{originalId:d.id,pluginSlug:e.pluginSlug},select:{id:!0}}}});if(d.status==="cancelled"&&h){try{await e.prisma.itemPluginData.delete({where:{id:(t=h.pluginDatas[0])==null?void 0:t.id}}),await e.prisma.item.delete({where:{id:h.id}})}catch(O){console.log("Error deleting item and it's dependencies:",O)}console.log("✔ Deleted item from event",h.title,h.scheduledAt);continue}const T={title:d.summary??"No title",color:d.calendarColor?e.getNearestItemColor(d.calendarColor):null,isAllDay:!!((r=d.start)!=null&&r.date),scheduledAt:((a=d.start)==null?void 0:a.dateTime)??null,durationInMinutes:e.dayjs((c=d.end)==null?void 0:c.dateTime).diff((s=d.start)==null?void 0:s.dateTime,"minute"),isRelevant:!0},v={status:d.status,htmlLink:d.htmlLink,numOfAttendees:((n=d.attendees)==null?void 0:n.length)??0},E={...v,description:d.description,attendees:d.attendees,eventType:d.eventType,organizer:d.organizer,hangoutLink:d.hangoutLink,conferenceData:d.conferenceData,backgroundColor:d.calendarColor};h?await e.prisma.item.update({where:{id:h.id},data:{...T,pluginDatas:{update:{where:{id:(u=h.pluginDatas[0])==null?void 0:u.id},data:{min:v,full:E}}}}}):await e.prisma.item.create({data:{...T,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:d.id,min:v,full:E}}}}),console.log("✔ Upserted item from event",d.summary,(g=d.start)==null?void 0:g.dateTime)}}),o(f,async i=>{var a,c;const t=i.data,r=await m();for(const s of Object.keys(r)){const n=await p({account:s,accountsTokens:r}),u=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${t.calendarId}`,{headers:{Authorization:`Bearer ${n.access_token}`}}).then(l=>l.json()),g=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${t.calendarId}/events?timeMin=${encodeURIComponent(e.dayjs().startOf("day").toISOString())}&timeMax=${encodeURIComponent(e.dayjs().add(t.days??7,"day").toISOString())}&singleEvents=true&orderBy=startTime`,{headers:{Authorization:`Bearer ${n.access_token}`}}).then(l=>l.json());console.log(((a=g.items)==null?void 0:a.length)??0,((c=g.items)==null?void 0:c.length)===1?"event":"events","to process from initial sync of calendar",t.calendarId);for(const l of g.items??[])await e.pgBoss.send(S,{...l,calendarColor:u.backgroundColor??null})}}),o(k,async i=>{var u,g;const t=i.data,r=await e.store.getPluginItem(w).then(l=>(l==null?void 0:l.value)??[]),a=r.find(l=>l.calendarId===t.calendarId);if(!a){console.log("❌ Could not find calendar to process",t.calendarId);return}const c=await p({account:a.account}),s=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${t.calendarId}`,{headers:{Authorization:`Bearer ${c.access_token}`}}).then(l=>l.json()),n=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${t.calendarId}/events?updatedMin=${encodeURIComponent(e.dayjs(a.lastSyncedAt).toISOString())}&singleEvents=true&orderBy=updated`,{headers:{Authorization:`Bearer ${c.access_token}`}}).then(l=>l.json());console.log(((u=n.items)==null?void 0:u.length)??0,((g=n.items)==null?void 0:g.length)===1?"event":"events","to process from webhook of calendar",t.calendarId);for(const l of n.items??[])await e.pgBoss.send(S,{...l,calendarColor:s.backgroundColor??null});await e.store.setItem(w,[...r.filter(l=>l.calendarId!==t.calendarId),{...a,lastSyncedAt:e.dayjs().toISOString()}])}),o(I,async i=>{const t=i.data;for(const r of t.calendarIds)await e.pgBoss.send(f,{calendarId:r,days:t.days??7})})]}});module.exports=A;
