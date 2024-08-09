"use strict";const O=s=>({plugin:s}),p="account-tokens",g="synced-views",N=O(s=>{const _=`${s.pluginSlug}-process-webhook`,S=`${s.pluginSlug}-connect-account`,k=`${s.pluginSlug}-sync-all-views`,v=`${s.pluginSlug}-sync-view`,y=`${s.pluginSlug}-sync-user-issues`,d=`${s.pluginSlug}-upsert-item-from-issue`,c=async(e,a)=>{const n=await(await fetch("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.token}`},body:JSON.stringify({query:e,variables:a.variables})})).json();if(n.errors)throw console.log(n.errors),new s.GraphQLError(`Linear API error: ${n.errors[0].message}`);return n.data},l=async()=>{const e=await s.store.getPluginItem(p);if(!e)throw new s.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return e.value},m=async()=>{const e=await l().catch(()=>null);if(!e)return console.log("not connected"),{data:{connected:!1,views:[]}};const a=await s.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]),t=[];for(const[n,i]of Object.entries(e)){const r=await c(`
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
        `,{token:i.access_token}).catch(()=>null);t.push(...(r==null?void 0:r.customViews.edges.map(o=>({id:o.node.id,name:o.node.name,icon:o.node.icon,color:o.node.color,account:n,synced:a.some(w=>w.id===o.node.id)})))??[])}return{data:{connected:!0,views:t}}},C=e=>e.type==="Issue"&&e.action==="update"?!0:e.type==="Comment";return{onRequest:async e=>{if(e.path==="/auth")return Response.redirect(`https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${s.serverOrigin}/api/plugin/${s.pluginSlug}/auth/callback`);if(e.path==="/auth/callback"){const a=await s.store.getPluginItem(p),t=e.body,n=await c(`
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
          `,{token:t.access_token}),i={...t,created_at:new Date().toISOString(),expires_at:s.dayjs().add((t.expires_in??10)-10,"seconds").toISOString(),email:n.viewer.email,userId:n.viewer.id,organizationId:n.viewer.organization.id,organizationName:n.viewer.organization.name};return"expires_in"in i&&delete i.expires_in,await s.store.setSecretItem(p,{...(a==null?void 0:a.value)??{},[i.email]:i}),await s.pgBoss.send(S,{token:t.access_token}),new Response}else if(e.path==="/events/webhook"&&e.request.method==="POST"){const a=e.body;return C(a)?(await s.pgBoss.send(_,{event:a}),new Response):(console.log("👌 The webhook event is not relevant to this plugin"),new Response)}return new Response},operations:{accounts:async()=>{const e=await l().catch(()=>null);return e?{data:Object.entries(e).map(([a,t])=>({connectedAt:t.created_at,email:a,expiresAt:t.expires_at}))}:{data:[]}},views:m,addViewToSync:async e=>{if(!e.viewId||!e.account)throw new s.GraphQLError("Missing an input",{extensions:{code:"ADD_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const a=await l(),t=await c(`
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
          `,{token:a[e.account].access_token,variables:{viewId:e.viewId}});for(const{node:r}of t.customView.issues.edges)await s.pgBoss.send(d,{issue:r,viewId:e.viewId});const n=await s.store.getPluginItem(g).then(r=>(r==null?void 0:r.value)??{views:[]});return await s.store.setItem(g,{...n,views:[...n.views,{id:e.viewId,account:e.account}]}),{operationName:"views",data:(await m()).data}},removeViewToSync:async e=>{if(!e.viewId)throw new s.GraphQLError("Missing an input",{extensions:{code:"REMOVE_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` is required."}});const a=await s.store.getPluginItem(g).then(n=>(n==null?void 0:n.value)??{views:[]});return await s.store.setItem(g,{...a,views:a.views.filter(n=>n.id!==e.viewId)}),{operationName:"views",data:(await m()).data}},syncUserIssues:async()=>{const e=await l().catch(()=>null);if(!e)return console.log("❌ Could not sync user issues as no tokens are found"),{data:"Could not sync user issues as no tokens are found"};for(const a of Object.keys(e))await s.pgBoss.send(y,{token:e[a].access_token});return{data:!0}},syncView:async e=>{if(!e.viewId||!e.account)throw new s.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const a=await l();return await s.pgBoss.send(v,{viewId:e.viewId,token:a[e.account].access_token}),{data:!0}},syncAllViews:async()=>(await s.pgBoss.send(k,{}),{data:!0})},handlePgBossWork:e=>[e(S,async a=>{const{token:t}=a.data;if(!(await c(`
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
          `,{token:t,variables:{url:`${s.serverOrigin}/api/plugin/${s.pluginSlug}/events/webhook`}})).webhookCreate.success)throw new s.GraphQLError("Failed to create a webhook.",{extensions:{code:"ADD_VIEW_TO_SYNC_FAILED_CREATE_WEBHOOK",userFriendlyMessage:"Failed to connect to Linear. Please try again or contact the Flow team for help."}});await s.pgBoss.send(y,{token:t})}),e(y,async a=>{const{token:t}=a.data,n=await c(`
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
          `,{token:t});for(const{node:o}of n.viewer.assignedIssues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"});const i=await c(`
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
          `,{token:t});for(const{node:o}of i.viewer.createdIssues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"});const r=await c(`
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
          `,{token:t});for(const{node:o}of r.issues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"})}),e(k,async()=>{const a=await l().catch(()=>null);if(!a)return;const t=await s.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]);for(const n of t)await s.pgBoss.send(v,{viewId:n.id,token:a[n.account].access_token})}),e(v,async a=>{const{viewId:t,token:n}=a.data,i=await c(`
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
          `,{token:n,variables:{viewId:t}});for(const{node:r}of i.customView.issues.edges)await s.pgBoss.send(d,{issue:r,viewId:t})}),e(d,{batchSize:5},async a=>{var t;for(const n of a){const{issue:i,viewId:r}=n.data,o=await s.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:i.id,pluginSlug:s.pluginSlug}}},include:{pluginDatas:{where:{originalId:i.id,pluginSlug:s.pluginSlug},select:{id:!0,min:!0,full:!0}}}}),w=i.state.type!=="canceled"&&i.state.type!=="completed";if(!o&&!w){console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");return}const u=o==null?void 0:o.pluginDatas[0],b={title:i.title,isRelevant:w,inboxPoints:10},f={...(u==null?void 0:u.min)??{},id:i.id,state:i.state,url:i.url,priority:i.priority,views:Array.from(new Set((u==null?void 0:u.min.views)??[]).add(r))},E={...(u==null?void 0:u.full)??{},...i,...f};o?await s.prisma.item.update({where:{id:o.id},data:{...b,pluginDatas:{update:{where:{id:(t=o.pluginDatas[0])==null?void 0:t.id},data:{min:f,full:E}}}}}).catch(h=>console.error(h)):await s.prisma.item.create({data:{...b,pluginDatas:{create:{pluginSlug:s.pluginSlug,originalId:i.id,min:f,full:E}}}}).catch(h=>console.error(h)),console.log("✔ Upserted item from Linear issue",i.id)}}),e(_,async a=>{const{event:t}=a.data;console.log("Processing webhook event",t.type,t.action,t.data.id);let n=null;if(t.type==="Issue"?n=t.data.id:t.type==="Comment"&&(n=t.data.issue.id),!n){console.log("❌ Could not find Linear issue ID in req.body");return}const i=await l();if(!i){console.log("❌ Could not process webhook event as no tokens are found");return}const r=Object.values(i).find(w=>w.organizationId===t.organizationId);if(!r){console.log("❌ Could not process webhook event as no token is found for the organization of the event");return}const o=await c(`
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${I}
          `,{token:r.access_token,variables:{issueId:n}});await s.pgBoss.send(d,{issue:o.issue,viewId:"my-issues"})})]}}),T=`
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
