"use strict";const E=t=>({plugin:t}),h="account-tokens",u="lists",k=E(t=>{const v=`${t.pluginSlug}-process-webhook`,y=`${t.pluginSlug}-sync-all-views`,w=`${t.pluginSlug}-sync-view`,g=`${t.pluginSlug}-upsert-item-from-issue`,d=async(e,n)=>{const a=await(await fetch("https://api.linear.app/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n.token}`},body:JSON.stringify({query:e,variables:n.variables})})).json();if(a.errors)throw new t.GraphQLError(`GitStart API error: ${a.errors[0].message}`);return a.data},c=async()=>{const e=await t.store.getPluginItem(h);if(!e)throw new t.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return e.value},m=async e=>{const n=await t.store.getPluginItem(u);if(!n)return{data:[]};if(!await c())return{data:[]};const a=await t.prisma.list.findMany({where:{id:{in:Object.keys(n.value).map(parseInt)}}});return{data:Object.entries(n.value).map(([s,r])=>{const o=a.find(l=>l.id===parseInt(s));return{id:(o==null?void 0:o.id)??parseInt(s),name:(o==null?void 0:o.name)??"Unknown or deleted list",description:(o==null?void 0:o.description)??"This list may have been deleted or was left unamed",slug:(o==null?void 0:o.slug)??null,linkedView:{id:r.view.id,name:r.view.name,color:r.view.color,icon:r.view.icon,account:r.account}}})}},_=e=>e.type==="Issue"&&e.action==="update"?!0:e.type==="Comment";return{onRequest:async e=>{if(e.path==="/auth")return Response.redirect(`http://localhost:4321/api/auth?api_endpoint=${t.serverOrigin}/api/plugin/${t.pluginSlug}/auth/callback`);if(e.path==="/auth/callback"){const n=await t.store.getPluginItem(h),i=e.body,a=await d(`
            query {
              viewer {
                email
                organization {
                  id
                  name
                }
              }
            }
          `,{token:i.access_token}),s={...i,expires_at:t.dayjs().add((i.expires_in??10)-10,"seconds").toISOString(),email:a.viewer.email,organizationId:a.viewer.organization.id,organizationName:a.viewer.organization.name};return"expires_in"in s&&delete s.expires_in,await t.store.setSecretItem(h,{...(n==null?void 0:n.value)??{},[s.email]:s}),new Response}else if(e.path==="/events/webhook"&&e.request.method==="POST"){const n=e.body;return _(n)?(await t.pgBoss.send(v,{event:n}),new Response):(console.log("❌ Could not find Linear issue ID in req.body"),new Response)}return new Response},operations:{accounts:async()=>{const e=await c();return e?{data:Object.entries(e).map(([n,i])=>({email:n,expiresAt:i.expires_at}))}:{data:[]}},lists:m,views:async()=>{const e=await c();if(!e)return{data:[]};const n=[];for(const[i,a]of Object.entries(e)){const s=await d(`
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
            `,{token:a.access_token}).catch(()=>null);n.push(...(s==null?void 0:s.customViews.edges.map(r=>({id:r.node.id,name:r.node.name,icon:r.node.icon,color:r.node.color,account:i})))??[])}return{data:n}},createList:async e=>{if(!e.account||!e.viewId||!e.listName)throw new t.GraphQLError("Missing an input",{extensions:{code:"CREATE_LIST_MISSING_INPUT",userFriendlyMessage:"Missing an input. Either `account`, `viewId` or `listName`"}});const n=await c(),i=await t.store.getPluginItem(u);if(!Object.values((i==null?void 0:i.value)??{}).find(o=>o.view.id===e.viewId))throw new t.GraphQLError("List with this view already exists.",{extensions:{code:"CREATE_LIST_ALREADY_EXISTS",userFriendlyMessage:"A list with this view already exists."}});const a=await d(`
            query ViewQuery($viewId: String!) {
              customView(id: $viewId) {
                id
                name
                color
                icon
              }
            }
          `,{token:n[e.account].access_token,variables:{viewId:e.viewId}});if(!a.customView)throw new t.GraphQLError("No view exists with that id.",{extensions:{code:"CREATE_LIST_NO_VIEW_EXISTS",userFriendlyMessage:"The selected view doesn't seem to exist in Linear. Make sure the view exists in your Linear and refresh the page."}});const s=await t.prisma.list.create({data:{name:e.listName,slug:e.listName.toLowerCase().replace(/\s/g,"-").replace(/['#?]/g," ").slice(0,50),description:"List created from Linear plugin."}}),r=await t.store.setItem(u,{...(i==null?void 0:i.value)??{},[s.id]:{account:e.account,view:{id:e.viewId,color:a.customView.color,icon:a.customView.icon,name:a.customView.name}}});if(Object.keys(r.value).length===1&&!(await d(`
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
            `,{token:n[e.account].access_token,variables:{url:`${t.serverOrigin}/api/plugin/${t.pluginSlug}/events/webhook`}})).webhookCreate.success)throw new t.GraphQLError("Failed to create a webhook.",{extensions:{code:"CREATE_LIST_FAILED_WEBHOOK",userFriendlyMessage:"Failed to connect to Linear. Please try again or contact the Flow team for help."}});return{operationName:"lists",data:await m()}},deleteList:async e=>{if(!e.listId)throw new t.GraphQLError("Missing an input",{extensions:{code:"DELETE_LIST_MISSING_INPUT",userFriendlyMessage:"Missing an input. `listId` is required."}});const n=await t.store.getPluginItem(u);if(!(n!=null&&n.value[e.listId]))throw new t.GraphQLError("List with this id doesn't exist.",{extensions:{code:"DELETE_LIST_DOESNT_EXIST",userFriendlyMessage:"A list with this id doesn't exist."}});await t.prisma.list.delete({where:{id:e.listId}});const{[e.listId]:i,...a}=n.value;return await t.store.setItem(u,a),{operationName:"lists",data:await m()}},syncView:async e=>{if(!e.listId||!e.viewId||!e.account)throw new t.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `listId`, `viewId` and `account` are required."}});const n=await c();if(!n)throw new t.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Linear account(s) first."}});return await t.pgBoss.send(w,{listId:e.listId,viewId:e.viewId,token:n[e.account].access_token}),{data:!0}},syncAllViews:async()=>(await t.pgBoss.send(y,{}),{data:!0})},handlePgBossWork:e=>[e(y,async()=>{const n=await t.store.getPluginItem(u);if(!n)return;const i=await c();if(i)for(const[a,{view:s,account:r}]of Object.entries(n.value))await t.pgBoss.send(w,{listId:parseInt(a),viewId:s.id,token:i[r].access_token})}),e(w,async n=>{const{viewId:i,listId:a,token:s}=n.data,r=await d(`
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
            ${S}
          `,{token:s,variables:{viewId:i}});for(const{node:o}of r.customView.issues.edges)await t.pgBoss.send(g,{issue:o,listId:a})}),e(g,{batchSize:5},async n=>{var i;for(const a of n){const{issue:s,listId:r}=a.data,o=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:s.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{where:{originalId:s.id,pluginSlug:t.pluginSlug},select:{id:!0}}}});if(!o&&!r){console.log("❌ Could not upsert issue as it's unknown which list it belongs to");return}const l=s.state.type!=="canceled"&&s.state.type!=="completed";if(!o&&!l){console.log("❌ Issue not upserted as it's not relevant and it's not in the database.");return}const f={title:s.title,isRelevant:l,inboxPoints:10,list:{connect:{id:r}}},I={id:s.id,title:s.title,state:s.state},p={...s,...I};o?await t.prisma.item.update({where:{id:o.id},data:{...f,pluginDatas:{update:{where:{id:(i=o.pluginDatas[0])==null?void 0:i.id},data:{min:I,full:p}}}}}):await t.prisma.item.create({data:{...f,pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:s.id,min:I,full:p}}}}),console.log("✔ Upserted item from Linear issue",s.id)}}),e(v,async n=>{const{event:i}=n.data;console.log("Processing webhook event",i.type,i.action,i.data.id);let a=null;if(i.type==="Issue"?a=i.data.id:i.type==="Comment"&&(a=i.data.issue.id),!a){console.log("❌ Could not find Linear issue ID in req.body");return}const s=await c();if(!s){console.log("❌ Could not process webhook event as no tokens are found");return}const r=Object.values(s).find(l=>l.organizationId===i.organizationId);if(!r){console.log("❌ Could not process webhook event as no token is found for the organization of the event");return}const o=await d(`
            query GetIssue($issueId: String!) {
              issue(id: $issueId) {
                ...LinearIssue
              }
            }
            ${S}
          `,{token:r.access_token,variables:{issueId:a}});await t.pgBoss.send(g,{issue:o.issue})})]}}),L=`
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
`,S=`
  fragment LinearIssue on Issue {
    id
    title
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
  ${L}
`;module.exports=k;
