"use strict";const O=s=>({plugin:s}),h="account-tokens",g="synced-views",N=O(s=>{const S=`${s.pluginSlug}-process-webhook`,_=`${s.pluginSlug}-connect-account`,k=`${s.pluginSlug}-sync-all-views`,v=`${s.pluginSlug}-sync-view`,f=`${s.pluginSlug}-sync-user-issues`,d=`${s.pluginSlug}-upsert-item-from-issue`,u=async(e,n)=>{const t=await(await fetch("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.token}`},body:JSON.stringify({query:e,variables:n.variables})})).json();if(t.errors)throw console.log(t.errors),new s.GraphQLError(`Linear API error: ${t.errors[0].message}`);return t.data},l=async()=>{const e=await s.store.getPluginItem(h);if(!e)throw new s.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return e.value},m=async()=>{const e=await l().catch(()=>null);if(!e)return console.log("not connected"),{data:{connected:!1,views:[]}};const n=await s.store.getPluginItem(g).then(t=>(t==null?void 0:t.value.views)??[]),i=[];for(const[t,a]of Object.entries(e)){const r=await u(`
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
        `,{token:a.access_token}).catch(()=>null);i.push(...(r==null?void 0:r.customViews.edges.map(o=>({id:o.node.id,name:o.node.name,icon:o.node.icon,color:o.node.color,account:t,synced:n.some(w=>w.id===o.node.id)})))??[])}return{data:{connected:!0,views:i}}},E=e=>e.type==="Issue"&&e.action==="update"?!0:e.type==="Comment";return{onRequest:async e=>{if(e.path==="/auth")return Response.redirect(`https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${s.serverOrigin}/api/plugin/${s.pluginSlug}/auth/callback`);if(e.path==="/auth/callback"){const n=await s.store.getPluginItem(h),i=e.body,t=await u(`
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
          `,{token:i.access_token}),a={...i,created_at:new Date().toISOString(),expires_at:s.dayjs().add((i.expires_in??10)-10,"seconds").toISOString(),email:t.viewer.email,userId:t.viewer.id,organizationId:t.viewer.organization.id,organizationName:t.viewer.organization.name};return"expires_in"in a&&delete a.expires_in,await s.store.setSecretItem(h,{...(n==null?void 0:n.value)??{},[a.email]:a}),await s.pgBoss.send(_,{token:i.access_token}),new Response}else if(e.path==="/events/webhook"&&e.request.method==="POST"){const n=e.body;return E(n)?(await s.pgBoss.send(S,{event:n}),new Response):(console.log("👌 The webhook event is not relevant to this plugin"),new Response)}return new Response},operations:{accounts:async()=>{const e=await l().catch(()=>null);return e?{data:Object.entries(e).map(([n,i])=>({connectedAt:i.created_at,email:n,expiresAt:i.expires_at}))}:{data:[]}},views:m,addViewToSync:async e=>{if(!e.viewId||!e.account)throw new s.GraphQLError("Missing an input",{extensions:{code:"ADD_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const n=await l(),i=await u(`
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
          `,{token:n[e.account].access_token,variables:{viewId:e.viewId}});for(const{node:r}of i.customView.issues.edges)await s.pgBoss.send(d,{issue:r,viewId:e.viewId});const t=await s.store.getPluginItem(g).then(r=>(r==null?void 0:r.value)??{views:[]});return await s.store.setItem(g,{...t,views:[...t.views,{id:e.viewId,account:e.account}]}),{operationName:"views",data:(await m()).data}},removeViewToSync:async e=>{if(!e.viewId)throw new s.GraphQLError("Missing an input",{extensions:{code:"REMOVE_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` is required."}});const n=await s.store.getPluginItem(g).then(t=>(t==null?void 0:t.value)??{views:[]});return await s.store.setItem(g,{...n,views:n.views.filter(t=>t.id!==e.viewId)}),{operationName:"views",data:(await m()).data}},syncUserIssues:async()=>{const e=await l().catch(()=>null);if(!e)return console.log("❌ Could not sync user issues as no tokens are found"),{data:"Could not sync user issues as no tokens are found"};for(const n of Object.keys(e))await s.pgBoss.send(f,{token:e[n].access_token});return{data:!0}},syncView:async e=>{if(!e.viewId||!e.account)throw new s.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const n=await l();return await s.pgBoss.send(v,{viewId:e.viewId,token:n[e.account].access_token}),{data:!0}},syncAllViews:async()=>(await s.pgBoss.send(k,{}),{data:!0})},onCreateTask:async({task:e})=>{var i,t;const n=(t=(i=e.item)==null?void 0:i.pluginDatas)==null?void 0:t.find(a=>a.pluginSlug===s.pluginSlug);if(n!=null&&n.originalId)return{pluginData:{originalId:n.originalId,min:n.min,full:n.full}}},handlebars:{helpers:{"issue-link":function(){if(!("pluginDatas"in this))return"";const e=this.pluginDatas.find(i=>i.pluginSlug==="linear");if(!e)return"";const n=e.min;return n.url??`https://linear.app/issue/${n.identifier}`},"issue-id":function(){if(!("pluginDatas"in this))return"";const e=this.pluginDatas.find(i=>i.pluginSlug==="linear");return e?e.min.identifier:""}}},handlePgBossWork:e=>[e(_,async n=>{const{token:i}=n.data;if(!(await u(`
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
          `,{token:i,variables:{url:`${s.serverOrigin}/api/plugin/${s.pluginSlug}/events/webhook`}})).webhookCreate.success)throw new s.GraphQLError("Failed to create a webhook.",{extensions:{code:"ADD_VIEW_TO_SYNC_FAILED_CREATE_WEBHOOK",userFriendlyMessage:"Failed to connect to Linear. Please try again or contact the Flow team for help."}});await s.pgBoss.send(f,{token:i})}),e(f,async n=>{const{token:i}=n.data,t=await u(`
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
          `,{token:i});for(const{node:o}of t.viewer.assignedIssues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"});const a=await u(`
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
          `,{token:i});for(const{node:o}of a.viewer.createdIssues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"});const r=await u(`
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
          `,{token:i});for(const{node:o}of r.issues.edges)await s.pgBoss.send(d,{issue:o,viewId:"my-issues"})}),e(k,async()=>{const n=await l().catch(()=>null);if(!n)return;const i=await s.store.getPluginItem(g).then(t=>(t==null?void 0:t.value.views)??[]);for(const t of i)await s.pgBoss.send(v,{viewId:t.id,token:n[t.account].access_token})}),e(v,async n=>{const{viewId:i,token:t}=n.data,a=await u(`
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
          `,{token:t,variables:{viewId:i}});for(const{node:r}of a.customView.issues.edges)await s.pgBoss.send(d,{issue:r,viewId:i})}),e(d,{batchSize:5},async n=>{var i;for(const t of n){const{issue:a,viewId:r}=t.data,o=await s.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:a.id,pluginSlug:s.pluginSlug}}},include:{pluginDatas:{where:{originalId:a.id,pluginSlug:s.pluginSlug},select:{id:!0,min:!0,full:!0}}}}),w=a.state.type!=="canceled"&&a.state.type!=="completed";if(!o&&!w){console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");return}const c=o==null?void 0:o.pluginDatas[0],b={title:a.title,isRelevant:w,inboxPoints:10},y={...(c==null?void 0:c.min)??{},id:a.id,identifier:a.identifier,state:a.state,url:a.url,priority:a.priority,views:Array.from(new Set((c==null?void 0:c.min.views)??[]).add(r))},C={...(c==null?void 0:c.full)??{},...a,...y};o?await s.prisma.item.update({where:{id:o.id},data:{...b,pluginDatas:{update:{where:{id:(i=o.pluginDatas[0])==null?void 0:i.id},data:{min:y,full:C}}}}}).catch(p=>console.error(p)):await s.prisma.item.create({data:{...b,pluginDatas:{create:{pluginSlug:s.pluginSlug,originalId:a.id,min:y,full:C}}}}).catch(p=>console.error(p)),console.log("✔ Upserted item from Linear issue",a.id)}}),e(S,async n=>{const{event:i}=n.data;console.log("Processing webhook event",i.type,i.action,i.data.id);let t=null;if(i.type==="Issue"?t=i.data.id:i.type==="Comment"&&(t=i.data.issue.id),!t){console.log("❌ Could not find Linear issue ID in req.body");return}const a=await l();if(!a){console.log("❌ Could not process webhook event as no tokens are found");return}const r=Object.values(a).find(w=>w.organizationId===i.organizationId);if(!r){console.log("❌ Could not process webhook event as no token is found for the organization of the event");return}const o=await u(`
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${I}
          `,{token:r.access_token,variables:{issueId:t}});await s.pgBoss.send(d,{issue:o.issue,viewId:"my-issues"})})]}}),T=`
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
