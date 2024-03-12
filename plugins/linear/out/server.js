"use strict";const p=t=>({plugin:t}),I="account-tokens",d="lists",E=p(t=>{const _=`${t.pluginSlug}-process-webhook`,h=`${t.pluginSlug}-sync-all-views`,l=`${t.pluginSlug}-sync-view`,v=`${t.pluginSlug}-upsert-item-from-issue`,u=async(e,i)=>{const n=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i.token}`},body:JSON.stringify({query:e,variables:i.variables})})).json();if(n.errors)throw new t.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},c=async()=>{const e=await t.store.getPluginItem(I);if(!e)throw new t.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Google account first."}});return e.value},w=async e=>{const i=await t.store.getPluginItem(d);if(!i)return{data:[]};if(!await c())return{data:[]};const n=await t.prisma.list.findMany({where:{id:{in:Object.keys(i.value).map(parseInt)}}});return{data:Object.entries(i.value).map(([s,r])=>{const o=n.find(g=>g.id===parseInt(s));return{id:(o==null?void 0:o.id)??parseInt(s),name:(o==null?void 0:o.name)??"Unknown or deleted list",description:(o==null?void 0:o.description)??"This list may have been deleted or was left unamed",slug:(o==null?void 0:o.slug)??null,linkedView:{id:r.view.id,name:r.view.name,color:r.view.color,icon:r.view.icon,account:r.account}}})}};return{onRequest:async e=>{if(e.path==="/auth")return Response.redirect(`https://linear-api-flow-dev.vercel.app/api/auth?api_endpoint=${t.serverOrigin}/api/plugin/${t.pluginSlug}/auth/callback`);if(e.path==="/auth/callback"){const i=await t.store.getPluginItem(I),a=e.body,n={...a,expires_at:t.dayjs().add((a.expires_in??10)-10,"seconds").toISOString()};return"expires_in"in n&&delete n.expires_in,await t.store.setSecretItem(I,{...(i==null?void 0:i.value)??{},[n.email]:n}),new Response}else if(e.path==="/events/webhook"&&e.request.method==="POST"){const i=e.body;return i.id?(await t.pgBoss.send(_,{linearIssue:i}),new Response):(console.log("❌ Could not find Linear issue ID in req.body"),new Response)}return new Response},operations:{accounts:async()=>{const e=await c();return e?{data:Object.entries(e.value).map(([i,a])=>({email:i,expiresAt:a.expires_at}))}:{data:[]}},lists:w,views:async()=>{const e=await c();if(!e)return{data:[]};const i=[];for(const[a,n]of Object.entries(e)){const s=await u(`
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
            `,{token:n.access_token}).catch(()=>null);i.push(...(s==null?void 0:s.customViews.edges.map(r=>({id:r.node.id,name:r.node.name,icon:r.node.icon,color:r.node.color,account:a})))??[])}return{data:i}},createList:async e=>{if(!e.account||!e.viewId||!e.listName)throw new t.GraphQLError("Missing an input",{extensions:{code:"CREATE_LIST_MISSING_INPUT",userFriendlyMessage:"Missing an input. Either `account`, `viewId` or `listName`"}});const i=await c(),a=await t.store.getPluginItem(d);if(!Object.values((a==null?void 0:a.value)??{}).find(r=>r.view.id===e.viewId))throw new t.GraphQLError("List with this view already exists.",{extensions:{code:"CREATE_LIST_ALREADY_EXISTS",userFriendlyMessage:"A list with this view already exists."}});const n=await u(`
            query ViewQuery($viewId: String!) {
              customView(id: $viewId) {
                id
                name
                color
                icon
              }
            }
          `,{token:i[e.account].access_token,variables:{viewId:e.viewId}});if(!n.customView)throw new t.GraphQLError("No view exists with that id.",{extensions:{code:"CREATE_LIST_NO_VIEW_EXISTS",userFriendlyMessage:"The selected view doesn't seem to exist in Linear. Make sure the view exists in your Linear and refresh the page."}});const s=await t.prisma.list.create({data:{name:e.listName,slug:e.listName.toLowerCase().replace(/\s/g,"-").replace(/['#?]/g," ").slice(0,50),description:"List created from Linear plugin."}});return await t.store.setItem(d,{...(a==null?void 0:a.value)??{},[s.id]:{account:e.account,view:{id:e.viewId,color:n.customView.color,icon:n.customView.icon,name:n.customView.name}}}),{operationName:"lists",data:await w()}},deleteList:async e=>{if(!e.listId)throw new t.GraphQLError("Missing an input",{extensions:{code:"DELETE_LIST_MISSING_INPUT",userFriendlyMessage:"Missing an input. `listId` is required."}});const i=await t.store.getPluginItem(d);if(!(i!=null&&i.value[e.listId]))throw new t.GraphQLError("List with this id doesn't exist.",{extensions:{code:"DELETE_LIST_DOESNT_EXIST",userFriendlyMessage:"A list with this id doesn't exist."}});await t.prisma.list.delete({where:{id:e.listId}});const{[e.listId]:a,...n}=i.value;return await t.store.setItem(d,n),{operationName:"lists",data:await w()}},syncView:async e=>{if(!e.listId||!e.viewId||!e.account)throw new t.GraphQLError("Missing an input",{extensions:{code:"SYNC_VIEW_MISSING_INPUT",userFriendlyMessage:"Missing an input. `listId`, `viewId` and `account` are required."}});const i=await c();if(!i)throw new t.GraphQLError("User not authenticated.",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You are not authenticated and will need to connect your Google account first."}});return await t.pgBoss.send(l,{listId:e.listId,viewId:e.viewId,token:i[e.account].access_token}),{operationName:"syncView",data:!0}},syncAllViews:async()=>(await t.pgBoss.send(h,{}),{data:!0})},handlePgBossWork:e=>[e(h,async()=>{const i=await t.store.getPluginItem(d);if(!i)return;const a=await c();if(a)for(const[n,{view:s,account:r}]of Object.entries(i.value))await t.pgBoss.send(l,{listId:parseInt(n),viewId:s.id,token:a[r].access_token})}),e(l,async i=>{const{viewId:a,listId:n,token:s}=i.data,r=await u(`
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
            ${L}
          `,{token:s,variables:{viewId:a}});for(const{node:o}of r.customView.issues.edges)await t.pgBoss.send(v,{issue:o,listId:n})}),e(v,{batchSize:5},async i=>{var a;for(const n of i){const{issue:s,listId:r}=n.data,o=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:s.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{where:{originalId:s.id,pluginSlug:t.pluginSlug},select:{id:!0}}}}),g=!0,S={title:s.title,isRelevant:g,inboxPoints:10,list:{connect:{id:r}}},m={id:s.id,title:s.title,state:s.state},y={...s,...m};o?await t.prisma.item.update({where:{id:o.id},data:{...S,pluginDatas:{update:{where:{id:(a=o.pluginDatas[0])==null?void 0:a.id},data:{min:m,full:y}}}}}):await t.prisma.item.create({data:{...S,pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:s.id,min:m,full:y}}}}),console.log("✔ Upserted item from Linear issue",s.id)}})]}}),f=`
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
`,L=`
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
  ${f}
`;module.exports=E;
