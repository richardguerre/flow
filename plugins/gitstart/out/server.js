"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const E=t=>({plugin:t}),p="gitstart-session-token",R="gitstart-user-info",G=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],_=E(t=>{const l="gitstart-items",g=`${t.pluginSlug}-upsert-pr-as-item`,o=`${t.pluginSlug}-sync-items`,S=async(s,i,a)=>{const n=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({query:i,variables:a})})).json();if(n.errors)throw new t.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},m=async()=>{const s=await t.store.getPluginItem(p);if(!s)throw new t.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return s.value};return{onInstall:async()=>{await t.prisma.list.upsert({where:{slug:l},create:{slug:l,name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async s=>{s===p&&await t.pgBoss.send(o,{})},onCreateTask:async({task:s})=>{var u;const i=(u=s.item)==null?void 0:u.pluginDatas.find(c=>c.pluginSlug===t.pluginSlug);if(!(i!=null&&i.originalId))return;const a=await t.store.getPluginItem(R);if(!a)return;const{id:e}=I(a.value.id),n=await m(),r=i.full;if(r.type==="pull_request"){const{id:c}=I(i.originalId),d=await S(n,`
            mutation FlowOperationCreateTask($input: CreateTaskInput!) {
              createTask(input: $input) {
                pullRequest {
                  ...GitStartPullRequest
                }
                task {
                  ...GitStartTask
                }
              }
            }
            ${f}
            ${h}
          `,{input:{pullRequestInternalId:c,title:s.title,type:"CODE",status:"TO_DO",assigneeInternalId:e}}),T={...i.min,status:d.createTask.pullRequest.status},y={...i.full,...T};await t.prisma.itemPluginData.update({where:{id:i.id},data:{min:T,full:y,item:{update:{title:d.createTask.pullRequest.title}}}}).catch(P=>console.log(P));const k={type:d.createTask.task.type,ticketUrl:r.ticketUrl,status:d.createTask.task.status,githubPrUrl:r.url},w={...k,id:d.createTask.task.id,pullRequest:r};return{pluginData:{originalId:d.createTask.task.id,min:k,full:w}}}},operations:{sync:async()=>(await t.pgBoss.send(o,{}),{data:"Job sent to sync the GitStart items."})},handlePgBossWork:s=>[s(o,async()=>{console.log("sycing items");const i=await m(),a=await S(i,`
            query FlowOperationSyncPRsAndTasks {
              viewer {
                id
                actionablePullRequests {
                  ...GitStartPullRequest
                  ticket {
                    ...GitStartTicket
                  }
                  tasks(filter: { assignedTask: true }) {
                    ...GitStartTask
                  }
                }
              }
            }
            ${f}
            ${N}
            ${h}
          `);console.log(a),await t.store.setSecretItem(R,{id:a.viewer.id});for(const e of a.viewer.actionablePullRequests)await t.pgBoss.send(g,e)}),s(g,{batchSize:10},async i=>{for(const a of i){const e=a.data;console.log(`Upserting PR ${e.id}`);const n=G.includes(e.status),r=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:e.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),u={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${e.ticket.client.id}/ticket/${e.ticket.code}`,url:e.url,status:e.status},c={...u,id:e.id,ticket:e.ticket};r?await t.prisma.item.update({where:{id:r.id},data:{title:e.title,isRelevant:n,pluginDatas:{update:{where:{id:r.pluginDatas[0].id},data:{min:u,full:c}}}}}):n?await t.prisma.item.create({data:{title:e.title,isRelevant:n,inboxPoints:10,list:{connect:{slug:l}},pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:e.id,min:u,full:c}}}}):console.log(`PR ${e.id} is not relevant, skipping`),console.log(`Upserted PR ${e.id}`)}})]}}),I=t=>{const[l,g]=t.split("-"),o=parseInt(g);return Number.isNaN(o)?{type:l,id:g}:{type:l,id:o}},N=`
  fragment GitStartTicket on Ticket {
    id
    title
    # to construct the URL to the GitStart dashboard
    code
    client {
      id
    }
  }
`,f=`
  fragment GitStartPullRequest on PullRequest {
    id
    status
    title
    completedAt
    url
    number
  }
`,h=`
  fragment GitStartTask on Task {
    id
    type
    status
    title
  }
`;exports.TOKEN_STORE_KEY=p;exports.default=_;
