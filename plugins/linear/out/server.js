"use strict";const O=i=>({plugin:i}),h="account-tokens",g="synced-views",N=O(i=>{const S="process-webhook",_="connect-account",k="sync-all-views",f="sync-view",v="sync-user-issues",d="upsert-item-from-issue",u=async(e,s)=>{const n=await(await fetch("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s.token}`},body:JSON.stringify({query:e,variables:s.variables})})).json();if(n.errors)throw console.log(n.errors),new i.GraphQLError(`Linear API error: ${n.errors[0].message}`);return n.data},l=async()=>{const e=await i.store.getPluginItem(h);if(!e)throw new i.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return e.value},m=async()=>{const e=await l().catch(()=>null);if(!e)return console.log("not connected"),{data:{connected:!1,views:[]}};const s=await i.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]),t=[];for(const[n,a]of Object.entries(e)){const r=await u(`
          query ViewsQuery {
            customViews {
              edges {
                node {
                  id
                  name
                  icon
                  color
                }
              }
            }
          }
        `,{token:a.access_token}).catch(()=>null);t.push(...(r==null?void 0:r.customViews.edges.map(o=>({id:o.node.id,name:o.node.name,icon:o.node.icon,color:o.node.color,account:n,synced:s.some(w=>w.id===o.node.id)})))??[])}return{data:{connected:!0,views:t}}},E=e=>e.type==="Issue"&&e.action==="update"?!0:e.type==="Comment";return{onRequest:async e=>{if(e.path==="/auth")return Response.redirect(`https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${i.serverOrigin}/api/plugin/${i.pluginSlug}/auth/callback`);if(e.path==="/auth/callback"){const s=await i.store.getPluginItem(h),t=e.body,n=await u(`
            query {
              viewer {
                id
                email
                organization {
                  id
                  name
                }
              }
            }
          `,{token:t.access_token}),a={...t,created_at:new Date().toISOString(),expires_at:i.dayjs().add((t.expires_in??10)-10,"seconds").toISOString(),email:n.viewer.email,userId:n.viewer.id,organizationId:n.viewer.organization.id,organizationName:n.viewer.organization.name};return"expires_in"in a&&delete a.expires_in,await i.store.setSecretItem(h,{...(s==null?void 0:s.value)??{},[a.email]:a}),await i.pgBoss.send(_,{token:t.access_token}),new Response}else if(e.path==="/events/webhook"&&e.request.method==="POST"){const s=e.body;return E(s)?(await i.pgBoss.send(S,{event:s}),new Response):(console.log("👌 The webhook event is not relevant to this plugin"),new Response)}return new Response},operations:{accounts:async()=>{const e=await l().catch(()=>null);return e?{data:Object.entries(e).map(([s,t])=>({connectedAt:t.created_at,email:s,expiresAt:t.expires_at}))}:{data:[]}},views:m,addViewToSync:async e=>{if(!e.viewId||!e.account)throw new i.GraphQLError("Missing an input",{extensions:{code:"ADD_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const s=await l(),t=await u(`
            query GetView($viewId: String!) {
              customView(id: $viewId) {
                issues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
            }
            ${I}
          `,{token:s[e.account].access_token,variables:{viewId:e.viewId}});for(const{node:r}of t.customView.issues.edges)await i.pgBoss.send(d,{issue:r,viewId:e.viewId});const n=await i.store.getPluginItem(g).then(r=>(r==null?void 0:r.value)??{views:[]});return await i.store.setItem(g,{...n,views:[...n.views,{id:e.viewId,account:e.account}]}),{operationName:"views",data:(await m()).data}},removeViewToSync:async e=>{if(!e.viewId)throw new i.GraphQLError("Missing an input",{extensions:{code:"REMOVE_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` is required."}});const s=await i.store.getPluginItem(g).then(n=>(n==null?void 0:n.value)??{views:[]});return await i.store.setItem(g,{...s,views:s.views.filter(n=>n.id!==e.viewId)}),{operationName:"views",data:(await m()).data}},syncUserIssues:async()=>{const e=await l().catch(()=>null);if(!e)return console.log("❌ Could not sync user issues as no tokens are found"),{data:"Could not sync user issues as no tokens are found"};for(const s of Object.keys(e))await i.pgBoss.send(v,{token:e[s].access_token});return{data:!0}},syncView:async e=>{if(!e.viewId||!e.account)throw new i.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const s=await l();return await i.pgBoss.send(f,{viewId:e.viewId,token:s[e.account].access_token}),{data:!0}},syncAllViews:async()=>(await i.pgBoss.send(k,{}),{data:!0})},onCreateTask:async({task:e})=>{var t,n;const s=(n=(t=e.item)==null?void 0:t.pluginDatas)==null?void 0:n.find(a=>a.pluginSlug===i.pluginSlug);if(s!=null&&s.originalId)return{pluginData:{originalId:s.originalId,min:s.min,full:s.full}}},handlebars:{helpers:{"issue-exists":function(...e){if(e.length===0)return"";const s=e.at(-1);return!("pluginDatas"in this)||!this.pluginDatas.find(n=>n.pluginSlug===i.pluginSlug)?"":s==null?void 0:s.fn(this)},"issue-link":function(){if(!("pluginDatas"in this))return"";const e=this.pluginDatas.find(t=>t.pluginSlug===i.pluginSlug);if(!e)return"";const s=e.min;return s.url??`https://linear.app/issue/${s.identifier}`},"issue-id":function(){if(!("pluginDatas"in this))return"";const e=this.pluginDatas.find(t=>t.pluginSlug===i.pluginSlug);return e?e.min.identifier:""}}},handlePgBossWork:e=>[e(_,async s=>{const{token:t}=s.data;if(!(await u(`
            mutation CreateWebhook($url: String!) {
              webhookCreate(
                input: { url: $url, allPublicTeams: true, resourceTypes: ["Comment", "Issue"] }
              ) {
                success
                webhook {
                  id
                  enabled
                }
              }
            }
          `,{token:t,variables:{url:`${i.serverOrigin}/api/plugin/${i.pluginSlug}/events/webhook`}})).webhookCreate.success)throw new i.GraphQLError("Failed to create a webhook.",{extensions:{code:"ADD_VIEW_TO_SYNC_FAILED_CREATE_WEBHOOK",userFriendlyMessage:"Failed to connect to Linear. Please try again or contact the Flow team for help."}});await i.pgBoss.send(v,{token:t})}),e(v,async s=>{const{token:t}=s.data,n=await u(`
            query GetUserAssignedIssues {
              viewer {
                assignedIssues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
            }
            ${I}
          `,{token:t});for(const{node:o}of n.viewer.assignedIssues.edges)await i.pgBoss.send(d,{issue:o,viewId:"my-issues"});const a=await u(`
            query GetUserCreatedIssues {
              viewer {
                createdIssues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
            }
            ${I}
          `,{token:t});for(const{node:o}of a.viewer.createdIssues.edges)await i.pgBoss.send(d,{issue:o,viewId:"my-issues"});const r=await u(`
            query GetUserSubscribedIssues {
              issues(
                filter: {
                  subscribers: { isMe: { eq: true } }
                  state: { type: { nin: ["triage", "backlog", "completed", "canceled"] } }
                }
              ) {
                edges {
                  node {
                    ...LinearIssue
                  }
                }
              }
            }
            ${I}
          `,{token:t});for(const{node:o}of r.issues.edges)await i.pgBoss.send(d,{issue:o,viewId:"my-issues"})}),e(k,async()=>{const s=await l().catch(()=>null);if(!s)return;const t=await i.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]);for(const n of t)await i.pgBoss.send(f,{viewId:n.id,token:s[n.account].access_token})}),e(f,async s=>{const{viewId:t,token:n}=s.data,a=await u(`
            query GetView($viewId: String!) {
              customView(id: $viewId) {
                issues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
            }
            ${I}
          `,{token:n,variables:{viewId:t}});for(const{node:r}of a.customView.issues.edges)await i.pgBoss.send(d,{issue:r,viewId:t})}),e(d,{batchSize:5},async s=>{var t;for(const n of s){const{issue:a,viewId:r}=n.data,o=await i.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:a.id,pluginSlug:i.pluginSlug}}},include:{pluginDatas:{where:{originalId:a.id,pluginSlug:i.pluginSlug},select:{id:!0,min:!0,full:!0}}}}),w=a.state.type!=="canceled"&&a.state.type!=="completed";if(!o&&!w){console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");return}const c=o==null?void 0:o.pluginDatas[0],b={title:a.title,isRelevant:w,inboxPoints:10},p={...(c==null?void 0:c.min)??{},id:a.id,identifier:a.identifier,state:a.state,url:a.url,priority:a.priority,views:Array.from(new Set((c==null?void 0:c.min.views)??[]).add(r))},C={...(c==null?void 0:c.full)??{},...a,...p};o?await i.prisma.item.update({where:{id:o.id},data:{...b,pluginDatas:{update:{where:{id:(t=o.pluginDatas[0])==null?void 0:t.id},data:{min:p,full:C}}}}}).catch(y=>console.error(y)):await i.prisma.item.create({data:{...b,pluginDatas:{create:{pluginSlug:i.pluginSlug,originalId:a.id,min:p,full:C}}}}).catch(y=>console.error(y)),console.log("✔ Upserted item from Linear issue",a.id)}}),e(S,async s=>{const{event:t}=s.data;console.log("Processing webhook event",t.type,t.action,t.data.id);let n=null;if(t.type==="Issue"?n=t.data.id:t.type==="Comment"&&(n=t.data.issue.id),!n){console.log("❌ Could not find Linear issue ID in req.body");return}const a=await l();if(!a){console.log("❌ Could not process webhook event as no tokens are found");return}const r=Object.values(a).find(w=>w.organizationId===t.organizationId);if(!r){console.log("❌ Could not process webhook event as no token is found for the organization of the event");return}const o=await u(`
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${I}
          `,{token:r.access_token,variables:{issueId:n}});await i.pgBoss.send(d,{issue:o.issue,viewId:"my-issues"})})]}}),T=`
  fragment LinearComment on Comment {
    id
    body
    url
    updatedAt
    user {
      id
      isMe
      name
      displayName
      avatarUrl
    }
    botActor {
      id
      name
      avatarUrl
    }
  }
`,I=`
  fragment LinearIssue on Issue {
    id
    identifier
    title
    url
    state {
      id
      name
      type
      color
    }
    priority
    description
    comments(last: 10) {
      edges {
        node {
          ...LinearComment
        }
      }
    }
  }
  ${T}
`;module.exports=N;
