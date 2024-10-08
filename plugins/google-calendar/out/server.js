"use strict";const D=e=>({plugin:e}),f="account-tokens",h="connected-calendars",C="default-calendar-id",b=D(e=>{const S="get-events",w="calendars-sync",I="upsert-item-from-event",A="process-events-webhook",k="cleanup-events",O=`flow-${e.pluginSlug}-events-webhook-2024-05-26-1`,j=[w],B=[S,w,I,A,k],y=async()=>{const t=await e.store.getPluginItem(f);if(!t)throw new e.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Google account first."}});return t.value},v=async t=>{const n=(t.accountsTokens??await y())[t.account];if(!n)throw new e.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Google account first."}});if(e.dayjs().isAfter(n.expires_at)){const r=await fetch("https://google-calendar-api-flow-dev.vercel.app/api/auth/refresh?refresh_token="+n.refresh_token);if(!r.ok){const s=e.dayjs().utc(!0).startOf("day").toDate();throw await e.prisma.task.findFirst({where:{date:{gte:s},pluginDatas:{some:{originalId:"not-authenticated",pluginSlug:e.pluginSlug}}}})||await e.prisma.task.create({data:{title:'<a href="/settings/plugin/google-calendar">Reconnect</a> your Google Calendar account. There was an issue with the connection.',pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:"not-authenticated",min:{},full:{}}},day:{connectOrCreate:{where:{date:s},create:{date:s,tasksOrder:[]}}}}}),await e.pgBoss.send(k,{}),new e.GraphQLError("Could not refresh token.",{extensions:{code:"COULD_NOT_REFRESH_TOKEN",userFriendlyMessage:"Could not connect to Google Calendar. Please try connecting your account(s) again."}})}const a=await r.json(),d={...a,refresh_token:n.refresh_token,expires_at:e.dayjs().add((a.expires_in??10)-10,"seconds").toISOString()};return await e.store.setSecretItem(f,{...t.accountsTokens,[t.account]:d}),d}return n},p=async t=>{const u=await e.store.getPluginItem(h).then(n=>(n==null?void 0:n.value.map(r=>r.calendarId))??[]);return await e.pgBoss.send(w,{calendarIds:u??[],days:t.days??7}),{data:"Job sent to refresh events."}},T=t=>{var d,s,l,o,c,i;const u=!!((d=t.event.start)!=null&&d.date),n=(s=t.event.start)!=null&&s.date?e.dayjs(t.event.start.date).startOf("day"):(l=t.event.start)!=null&&l.dateTime?e.dayjs(t.event.start.dateTime):e.dayjs(),r=(o=t.event.end)!=null&&o.date?e.dayjs(t.event.end.date).endOf("day"):(c=t.event.end)!=null&&c.dateTime?e.dayjs(t.event.end.dateTime):n.add(((i=t.originalItem)==null?void 0:i.durationInMinutes)??5,"minutes"),a=r.isBefore(e.dayjs());return{isAllDay:u,scheduledStart:n,scheduledEnd:r,isOver:a}},_=async t=>{var m,E;const u=await e.getUsersTimezone()??"Etc/GMT-0",{isAllDay:n,scheduledStart:r,scheduledEnd:a,isOver:d}=await T(t),s=r.tz(u).utc(!0).toISOString(),l=t.event.status!=="cancelled"||a.isBefore(e.dayjs()),o={title:t.event.summary??"No title",color:t.event.calendarColor?e.getNearestItemColor(t.event.calendarColor):null,isAllDay:!!((m=t.event.start)!=null&&m.date),scheduledAt:r.toISOString(),durationInMinutes:n?null:Math.abs(e.dayjs(r).diff(a,"minute")),isRelevant:l,inboxPoints:t.event.status==="tentative"?10:null},c={eventType:t.event.eventType,status:t.event.status,htmlLink:t.event.htmlLink,numOfAttendees:((E=t.event.attendees)==null?void 0:E.length)??0,conferenceData:t.event.conferenceData,hexBackgroundColor:t.event.calendarColor},i={...t.event,...c},g={title:o.title,completedAt:d?a.toISOString():null,status:t.event.status==="cancelled"?"CANCELED":d?"DONE":"TODO",day:{connectOrCreate:{where:{date:s},create:{date:s,tasksOrder:t.taskId?[t.taskId]:[]}}}};return{itemInfo:{commonBetweenUpdateAndCreate:o,min:c,full:i,isRelevant:l,scheduledStart:r,scheduledEnd:a},taskInfo:{commonBetweenUpdateAndCreate:g,min:c,full:i}}};return{onRequest:async t=>{var u,n;if(t.path==="/auth")return Response.redirect(`https://google-calendar-api-flow-dev.vercel.app/api/auth?api_endpoint=${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth/callback`);if(t.path==="/auth/callback"&&t.request.method==="POST"){const r=await e.store.getPluginItem(f),a=t.body,d={...a,refresh_token:a.refresh_token??((u=r==null?void 0:r.value)==null?void 0:u[a.email].refresh_token),expires_at:e.dayjs().add((a.expires_in??10)-10,"seconds").toISOString()};return"expires_in"in d&&delete d.expires_in,await e.store.setSecretItem(f,{...(r==null?void 0:r.value)??{},[d.email]:d}),new Response}else if(t.path==="/events/webhook"&&t.request.method==="POST"){const r=t.headers["x-goog-resource-uri"],a=(n=r.match(/\/calendars\/(.*)\/events/))==null?void 0:n[1];if(!a)return console.log("❌ Could not find calendarId in x-goog-resource-uri header",r),new Response;const d=decodeURIComponent(a);return await e.pgBoss.send(A,{calendarId:d}),new Response}},operations:{calendars:async()=>{const t=await y(),u=[];for(const n of Object.keys(t)){const r=await v({account:n,accountsTokens:t}).catch(s=>({error:s}));if("error"in r){u.push({account:n,authError:r.error.extensions.userFriendlyMessage??r.error.message});continue}const a=await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList",{headers:{Authorization:`Bearer ${r.access_token}`}}).then(s=>s.json()).then(s=>s.items),d=await e.store.getPluginItem(h).then(s=>{var l;return new Set(((l=s==null?void 0:s.value)==null?void 0:l.map(o=>o.calendarId))??[])});u.push({account:n,calendars:(a==null?void 0:a.map(s=>({...s,connected:d.has(s.id??"")})))??[]})}return{data:u}},connectCalendars:async t=>{const u=await y();let n=await e.store.getPluginItem(C).then(d=>d==null?void 0:d.value);const r=await e.store.getPluginItem(h).then(d=>{var s;return new Map(((s=d==null?void 0:d.value)==null?void 0:s.map(l=>[l.calendarId,l]))??[])}),a=[];for(const d of Object.keys(u)){const s=await v({account:d,accountsTokens:u}),l=await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList",{headers:{Authorization:`Bearer ${s.access_token}`}}).then(o=>o.json()).then(o=>o.items??[]);for(const o of t.calendarIds){if(r.has(o)||!l.some(g=>g.id===o))continue;await e.pgBoss.send(S,{calendarId:o,days:7});const c=`${e.serverOrigin}/api/plugin/${e.pluginSlug}/events/webhook`;let i=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${o}/events/watch`,{method:"POST",headers:{Authorization:`Bearer ${s.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({id:O,type:"web_hook",address:c})}).then(async g=>g.ok?g.json():(console.log("❌ Failed to set up webhook for calendar",o,c,g.status,await g.text()),null));i&&(console.log("✔ Set up webhook for calendar",o,c),n||(n={account:d,id:o}),r.set(o,{account:d,calendarId:o,lastSyncedAt:e.dayjs().toISOString(),channelId:i.id??O,resourceId:i.resourceId,expiresAt:e.dayjs(i.expiration??0).toISOString(),default:(n==null?void 0:n.id)===o}))}for(const o of l){if(!o.id||t.calendarIds.includes(o.id))continue;const c=r.get(o.id);if(!c)continue;const i=await fetch("https://www.googleapis.com/calendar/v3/channels/stop",{method:"POST",headers:{Authorization:`Bearer ${s.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({resource:{id:c.channelId,resourceId:c.resourceId},id:c.channelId,resourceId:c.resourceId})});if(!i.ok){console.log("❌ Failed to remove webhook for calendar",o.id,c.channelId,c.resourceId,i.status,await i.text());continue}console.log("✔ Removed webhook for calendar",o.id),r.delete(o.id)}a.push({account:d,calendars:l.map(o=>({...o,connected:r.has(o.id??"")}))??[]})}return await e.store.setItem(h,Array.from(r.values())),n&&await e.store.setItem(C,n),await e.pgBoss.schedule(w,"0 3 */3 * *",{calendarIds:t.calendarIds}),console.log("✔ Scheduled calendars sync job"),{operationName:"calendars",data:a}},disconnectAccount:async t=>{const u=await y(),n=u[t.accountId];if(!n)return{data:"Account not connected."};const r=await e.store.getPluginItem(h).then(a=>(a==null?void 0:a.value)??[]);for(const a of r.filter(d=>d.account===t.accountId)){const d=await fetch("https://www.googleapis.com/calendar/v3/channels/stop",{method:"POST",headers:{Authorization:`Bearer ${n.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({resource:{id:a.channelId,resourceId:a.resourceId},id:a.channelId,resourceId:a.resourceId})});if(!d.ok){console.log("❌ Failed to remove webhook for calendar",a.calendarId,a.channelId,a.resourceId,d.status,await d.text());continue}console.log("✔ Removed webhook for calendar",a.calendarId)}return await e.store.setItem(h,r.filter(a=>a.account!==t.accountId)),await e.store.setItem(f,Object.fromEntries(Object.entries(u).filter(([a])=>a!==t.accountId))),{data:"Account disconnected."}},refreshEvents:p},handlePgBossWork:t=>[t(I,{batchSize:5},async u=>{var n,r,a;for(const d of u){const s=d.data,l=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:s.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{where:{originalId:s.id,pluginSlug:e.pluginSlug},select:{id:!0}},tasks:{select:{id:!0,pluginDatas:{select:{id:!0},take:1,orderBy:{createdAt:"asc"}}},take:1,orderBy:{createdAt:"asc"}}}});if(!l&&s.status==="cancelled")continue;if(!l&&["outOfOffice","workingLocation"].includes(s.eventType??"default"))continue;if(!s.summary||s.summary.trim()==="")if(l)s.summary=l.title;else continue;const o=l==null?void 0:l.tasks[0],{itemInfo:c,taskInfo:i}=await _({event:s,taskId:o==null?void 0:o.id,originalItem:l});if(l?await e.prisma.item.update({where:{id:l.id},data:{...c.commonBetweenUpdateAndCreate,pluginDatas:{update:{where:{id:(n=l.pluginDatas[0])==null?void 0:n.id},data:{min:c.min,full:c.full}}},tasks:e.dayjs(l.scheduledAt).isAfter(e.dayjs().endOf("day"))&&!c.isRelevant?{delete:{id:o==null?void 0:o.id}}:{upsert:{where:{id:o==null?void 0:o.id},update:{...i.commonBetweenUpdateAndCreate,pluginDatas:{update:{where:{id:(r=o==null?void 0:o.pluginDatas[0])==null?void 0:r.id},data:{min:i.min,full:i.full}}}},create:{...i.commonBetweenUpdateAndCreate,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:s.id,min:i.min,full:i.full}}}}}}}):await e.prisma.item.create({data:{...c.commonBetweenUpdateAndCreate,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:s.id,min:c.min,full:c.full}},tasks:{create:{...i.commonBetweenUpdateAndCreate,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:s.id,min:i.min,full:i.full}}}}}}),console.log("✔ Upserted item from event",s.summary,(a=c.scheduledStart)==null?void 0:a.toISOString()),!c.isRelevant)return;const g=e.dayjs(c.scheduledEnd).add(1,"second");if(g.isBefore(e.dayjs()))return;const m=e.dayjs().add(1,"month");if(g.isAfter(m))return;await e.pgBoss.send(I,{...s},{startAfter:g.toDate(),singletonKey:s.id,singletonMinutes:1}),console.log("Scheduled event to be updated after",g.toISOString())}}),t(S,async u=>{var a,d;const n=u.data,r=await y();for(const s of Object.keys(r)){const l=await v({account:s,accountsTokens:r}),o=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${n.calendarId}`,{headers:{Authorization:`Bearer ${l.access_token}`}}).then(g=>g.json()),c=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${n.calendarId}/events?timeMin=${encodeURIComponent(e.dayjs().startOf("day").toISOString())}&timeMax=${encodeURIComponent(e.dayjs().add(n.days??7,"day").toISOString())}&singleEvents=true&orderBy=startTime`,{headers:{Authorization:`Bearer ${l.access_token}`}}).then(g=>g.json());console.log(((a=c.items)==null?void 0:a.length)??0,((d=c.items)==null?void 0:d.length)===1?"event":"events","to process from initial sync of calendar",n.calendarId);const i=e.dayjs().add(1,"month");for(const g of c.items??[]){const{scheduledStart:m}=T({event:g,originalItem:null});m.isAfter(i)||await e.pgBoss.send(I,{...g,calendarColor:o.backgroundColor??null},{singletonKey:g.id,singletonMinutes:1})}}}),t(A,async u=>{var o,c;const n=u.data,r=await e.store.getPluginItem(h).then(i=>(i==null?void 0:i.value)??[]),a=r.find(i=>i.calendarId===n.calendarId);if(!a){console.log("❌ Could not find calendar to process",n.calendarId);return}const d=await v({account:a.account}),s=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${n.calendarId}`,{headers:{Authorization:`Bearer ${d.access_token}`}}).then(i=>i.json()),l=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${n.calendarId}/events?updatedMin=${encodeURIComponent(e.dayjs(a.lastSyncedAt).toISOString())}&singleEvents=true&orderBy=updated`,{headers:{Authorization:`Bearer ${d.access_token}`}}).then(i=>i.json());console.log(((o=l.items)==null?void 0:o.length)??0,((c=l.items)==null?void 0:c.length)===1?"event":"events","to process from webhook of calendar",n.calendarId);for(const i of l.items??[])await e.pgBoss.send(I,{...i,calendarColor:s.backgroundColor??null},{singletonKey:i.id,singletonMinutes:1});await e.store.setItem(h,[...r.filter(i=>i.calendarId!==n.calendarId),{...a,lastSyncedAt:e.dayjs().toISOString()}])}),t(w,async u=>{const n=u.data;for(const r of n.calendarIds)await e.pgBoss.send(S,{calendarId:r,days:n.days??7})}),t(k,async()=>{const u=await e.getUsersTimezone(),n=e.dayjs().tz(u??void 0).endOf("day").add(1,"week");await e.prisma.task.deleteMany({where:{date:{gte:n.toDate()},pluginDatas:{some:{pluginSlug:e.pluginSlug}}}}),await e.prisma.item.deleteMany({where:{scheduledAt:{gte:n.toDate()},pluginDatas:{some:{pluginSlug:e.pluginSlug}}}})})],onUninstall:async()=>{await e.pgBoss.send(k,{}),await e.store.deleteItem(h),await e.store.deleteItem(f),await Promise.all(j.map(t=>e.pgBoss.unschedule(t))),await Promise.all(B.map(t=>e.pgBoss.cancel(t)))},onCreateCalendarItem:async({item:t})=>{var o;const u=await e.store.getPluginItem(C).then(c=>c==null?void 0:c.value);if(!u)return;const n=await v({account:u.account}),r=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${u.id}`,{headers:{Authorization:`Bearer ${n.access_token}`}}).then(c=>c.json());console.log("📅 Creating Google calendar event from Flow item",t.id);let a=await fetch(`https://www.googleapis.com/calendar/v3/calendars/${u.id}/events`,{method:"POST",headers:{Authorization:`Bearer ${n.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({summary:t.title,start:{dateTime:e.dayjs(t.scheduledAt).toISOString()},end:{dateTime:e.dayjs(t.scheduledAt).add(t.durationInMinutes??30,"minute").toISOString()}})}).then(c=>c.json());if(!a)return;console.log("✔ Created event in Google Calendar",u.id,a.id),a={...a,calendarColor:r.backgroundColor??null};const d=(o=t.tasks[0])==null?void 0:o.id,{itemInfo:s,taskInfo:l}=await _({event:a,taskId:d,originalItem:t});await e.prisma.item.update({where:{id:t.id},data:{...s.commonBetweenUpdateAndCreate,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:a.id,min:s.min,full:s.full}}}}),await e.prisma.task.update({where:{id:d},data:{...l.commonBetweenUpdateAndCreate,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:a.id,min:l.min,full:l.full}}}})},onRefreshCalendarItems:async()=>{await p({days:7})}}});module.exports=b;
