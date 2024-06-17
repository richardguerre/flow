"use strict";const C=e=>({plugin:e}),h="account-tokens",g="synced-views",N=C(e=>{const p=`${e.pluginSlug}-process-webhook`,_=`${e.pluginSlug}-connect-account`,S=`${e.pluginSlug}-sync-all-views`,I=`${e.pluginSlug}-sync-view`,v=`${e.pluginSlug}-sync-user-issues`,d=`${e.pluginSlug}-upsert-item-from-issue`,u=async(s,a)=>{const n=await(await fetch("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.token}`},body:JSON.stringify({query:s,variables:a.variables})})).json();if(n.errors)throw new e.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},l=async()=>{const s=await e.store.getPluginItem(h);if(!s)throw new e.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return s.value},m=async()=>{const s=await l().catch(()=>null);if(!s)return console.log("not connected"),{data:{connected:!1,views:[]}};const a=await e.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]),t=[];for(const[n,i]of Object.entries(s)){const o=await u(`
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
        `,{token:i.access_token}).catch(()=>null);t.push(...(o==null?void 0:o.customViews.edges.map(r=>({id:r.node.id,name:r.node.name,icon:r.node.icon,color:r.node.color,account:n,synced:a.some(w=>w.id===r.node.id)})))??[])}return{data:{connected:!0,views:t}}},E=s=>s.type==="Issue"&&s.action==="update"?!0:s.type==="Comment";return{onRequest:async s=>{if(s.path==="/auth")return Response.redirect(`https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${e.serverOrigin}/api/plugin/${e.pluginSlug}/auth/callback`);if(s.path==="/auth/callback"){const a=await e.store.getPluginItem(h),t=s.body,n=await u(`
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
          `,{token:t.access_token}),i={...t,expires_at:e.dayjs().add((t.expires_in??10)-10,"seconds").toISOString(),email:n.viewer.email,userId:n.viewer.id,organizationId:n.viewer.organization.id,organizationName:n.viewer.organization.name};return"expires_in"in i&&delete i.expires_in,await e.store.setSecretItem(h,{...(a==null?void 0:a.value)??{},[i.email]:i}),await e.pgBoss.send(_,{token:t.access_token}),new Response}else if(s.path==="/events/webhook"&&s.request.method==="POST"){const a=s.body;return E(a)?(await e.pgBoss.send(p,{event:a}),new Response):(console.log("👌 The webhook event is not relevant to this plugin"),new Response)}return new Response},operations:{accounts:async()=>{const s=await l().catch(()=>null);return s?{data:Object.entries(s).map(([a,t])=>({email:a,expiresAt:t.expires_at}))}:{data:[]}},views:m,addViewToSync:async s=>{if(!s.viewId||!s.account)throw new e.GraphQLError("Missing an input",{extensions:{code:"ADD_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const a=await l(),t=await u(`
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
            ${f}
          `,{token:a[s.account].access_token,variables:{viewId:s.viewId}});for(const{node:o}of t.customView.issues.edges)await e.pgBoss.send(d,{issue:o,viewId:s.viewId});const n=await e.store.getPluginItem(g).then(o=>(o==null?void 0:o.value)??{views:[]});return await e.store.setItem(g,{...n,views:[...n.views,{id:s.viewId,account:s.account}]}),{operationName:"views",data:(await m()).data}},removeViewToSync:async s=>{if(!s.viewId)throw new e.GraphQLError("Missing an input",{extensions:{code:"REMOVE_VIEW_TO_SYNC_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` is required."}});const a=await e.store.getPluginItem(g).then(n=>(n==null?void 0:n.value)??{views:[]});return await e.store.setItem(g,{...a,views:a.views.filter(n=>n.id!==s.viewId)}),{operationName:"views",data:(await m()).data}},syncUserIssues:async()=>(await e.pgBoss.send(v,{}),{data:!0}),syncView:async s=>{if(!s.viewId||!s.account)throw new e.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `viewId` and `account` are required."}});const a=await l();return await e.pgBoss.send(I,{viewId:s.viewId,token:a[s.account].access_token}),{data:!0}},syncAllViews:async()=>(await e.pgBoss.send(S,{}),{data:!0})},handlePgBossWork:s=>[s(_,async a=>{const{token:t}=a.data;if(!(await u(`
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
          `,{token:t,variables:{url:`${e.serverOrigin}/api/plugin/${e.pluginSlug}/events/webhook`}})).webhookCreate.success)throw new e.GraphQLError("Failed to create a webhook.",{extensions:{code:"ADD_VIEW_TO_SYNC_FAILED_CREATE_WEBHOOK",userFriendlyMessage:"Failed to connect to Linear. Please try again or contact the Flow team for help."}});await e.pgBoss.send(v,{token:t})}),s(v,async a=>{const{token:t}=a.data,n=await u(`
            query GetUserIssues {
              viewer {
                assignedIssues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
                createdIssues {
                  edges {
                    node {
                      ...LinearIssue
                    }
                  }
                }
              }
              issues(
                filter: {
                  subscribers: { isMe: true }
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
          `,{token:t});for(const{node:i}of n.viewer.assignedIssues.edges)await e.pgBoss.send(d,{issue:i,viewId:"my-issues"});for(const{node:i}of n.viewer.createdIssues.edges)await e.pgBoss.send(d,{issue:i,viewId:"my-issues"});for(const{node:i}of n.issues.edges)await e.pgBoss.send(d,{issue:i,viewId:"my-issues"})}),s(S,async()=>{const a=await l().catch(()=>null);if(!a)return;const t=await e.store.getPluginItem(g).then(n=>(n==null?void 0:n.value.views)??[]);for(const n of t)await e.pgBoss.send(I,{viewId:n.id,token:a[n.account].access_token})}),s(I,async a=>{const{viewId:t,token:n}=a.data,i=await u(`
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
            ${f}
          `,{token:n,variables:{viewId:t}});for(const{node:o}of i.customView.issues.edges)await e.pgBoss.send(d,{issue:o})}),s(d,{batchSize:5},async a=>{var t;for(const n of a){const{issue:i,viewId:o}=n.data,r=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:i.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{where:{originalId:i.id,pluginSlug:e.pluginSlug},select:{id:!0,min:!0,full:!0}}}}),w=i.state.type!=="canceled"&&i.state.type!=="completed";if(!r&&!w){console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");return}const c=r==null?void 0:r.pluginDatas[0],k={title:i.title,isRelevant:w,inboxPoints:10},y={...(c==null?void 0:c.min)??{},id:i.id,state:i.state,url:i.url,views:Array.from(new Set((c==null?void 0:c.min.views)??[]).add(o))},b={...(c==null?void 0:c.full)??{},...i,...y};r?await e.prisma.item.update({where:{id:r.id},data:{...k,pluginDatas:{update:{where:{id:(t=r.pluginDatas[0])==null?void 0:t.id},data:{min:y,full:b}}}}}):await e.prisma.item.create({data:{...k,pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:i.id,min:y,full:b}}}}),console.log("✔ Upserted item from Linear issue",i.id)}}),s(p,async a=>{const{event:t}=a.data;console.log("Processing webhook event",t.type,t.action,t.data.id);let n=null;if(t.type==="Issue"?n=t.data.id:t.type==="Comment"&&(n=t.data.issue.id),!n){console.log("❌ Could not find Linear issue ID in req.body");return}const i=await l();if(!i){console.log("❌ Could not process webhook event as no tokens are found");return}const o=Object.values(i).find(w=>w.organizationId===t.organizationId);if(!o){console.log("❌ Could not process webhook event as no token is found for the organization of the event");return}const r=await u(`
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${f}
          `,{token:o.access_token,variables:{issueId:n}});await e.pgBoss.send(d,{issue:r.issue})})]}}),O=`
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
`,f=`
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
    description
    comments {
      edges {
        node {
          ...LinearComment
          children {
            edges {
              node {
                ...LinearComment
              }
            }
          }
        }
      }
    }
  }
  ${O}
`;module.exports=N;
