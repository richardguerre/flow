"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const y=t=>({plugin:t}),P="gitstart-session-token",G="gitstart-user-info",N=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],_=y(t=>{const d="gitstart-items",g=`${t.pluginSlug}-upsert-pr-as-item`,c=`${t.pluginSlug}-sync-items`,T=async(a,i,s)=>{const n=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:i,variables:s})})).json();if(n.errors)throw new t.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},f=async a=>T(a.token,`
        mutation FlowOperationUpdateTaskStatus($input: UpdateTaskStatusInput!) {
          updateTaskStatus(input: $input) {
            pullRequest {
              ...GitStartPullRequest
            }
            task {
              ...GitStartTask
            }
          }
        }
        ${h}
        ${E}
      `,{input:a.input}),I=async()=>{const a=await t.store.getPluginItem(P);if(!a)throw new t.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return a.value};return{onInstall:async()=>{await t.prisma.list.upsert({where:{slug:d},create:{slug:d,name:"GitStart Tickets & PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async a=>{a===P&&await t.pgBoss.send(c,{})},onCreateTask:async({task:a})=>{var u;const i=(u=a.item)==null?void 0:u.pluginDatas.find(l=>l.pluginSlug===t.pluginSlug);if(!(i!=null&&i.originalId))return;const s=await t.store.getPluginItem(G);if(!s)return;const{id:e}=w(s.value.id),n=await I(),r=i.full;if(r.type==="pull_request"){const{id:l}=w(i.originalId),o=await T(n,`
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
            ${h}
            ${E}
          `,{input:{pullRequestInternalId:l,title:a.title,type:"CODE",status:"IN_PROGRESS",assigneeInternalId:e}}),S={...i.min,status:o.createTask.pullRequest.status},p={...i.full,...S};await t.prisma.itemPluginData.update({where:{id:i.id},data:{min:S,full:p,item:{update:{title:o.createTask.pullRequest.title}}}});const k={type:o.createTask.task.type,ticketUrl:r.ticketUrl,status:o.createTask.task.status,githubPrUrl:r.url},R={...k,id:o.createTask.task.id,pullRequest:r};return{pluginData:{originalId:o.createTask.task.id,min:k,full:R}}}},onUpdateTaskStatus:async({task:a,newStatus:i})=>{const s=a.pluginDatas.find(m=>m.pluginSlug===t.pluginSlug);if(!(s!=null&&s.originalId))return;const e=s.full,{id:n}=w(s.originalId),r=await I();let u;if(a.status===i)return;if(i==="DONE"){if(e.status==="TO_DO"&&(await f({token:r,input:{taskInternalId:n,status:"IN_PROGRESS"}})).updateTaskStatus.task.status!=="IN_PROGRESS")throw new t.GraphQLError(`GitStart task (id: ${e.id}) did not change status to In progress. Contact GitStart support for help.`);u=await f({token:r,input:{taskInternalId:n,status:"FINISHED"}})}else if(i==="CANCELED")u=await f({token:r,input:{taskInternalId:n,status:"CANCELED"}});else if(i==="TODO")throw new t.GraphQLError('GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.');if(!u)return;const l={...s.min,status:u.updateTaskStatus.task.status},o={...e,...l};if(await t.prisma.taskPluginData.update({where:{id:s.id},data:{min:l,full:o}}),!a.itemId)return;const S=await t.prisma.item.findUnique({where:{id:a.itemId},include:{pluginDatas:!0}});if(!S)return;const p=S.pluginDatas.find(m=>m.pluginSlug===t.pluginSlug);if(!p)return;const k={...p.min,status:u.updateTaskStatus.pullRequest.status},R={...p.full,...k};await t.prisma.itemPluginData.update({where:{id:p.id},data:{min:k,full:R}})},operations:{sync:async()=>(await t.pgBoss.send(c,{}),{data:"Job sent to sync the GitStart items."})},handlePgBossWork:a=>[a(c,async()=>{const i=await I(),s=await T(i,`
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
            ${h}
            ${O}
            ${E}
          `);await t.store.setSecretItem(G,{id:s.viewer.id});for(const e of s.viewer.actionablePullRequests)await t.pgBoss.send(g,e)}),a(g,{batchSize:10},async i=>{for(const s of i){const e=s.data;console.log(`Upserting PR ${e.id}`);const n=N.includes(e.status),r=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:e.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),u={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${e.ticket.client.id}/ticket/${e.ticket.code}`,url:e.url,status:e.status},l={...u,id:e.id,ticket:e.ticket};r?await t.prisma.item.update({where:{id:r.id},data:{title:e.title,isRelevant:n,pluginDatas:{update:{where:{id:r.pluginDatas[0].id},data:{min:u,full:l}}}}}):n?await t.prisma.item.create({data:{title:e.title,isRelevant:n,inboxPoints:10,list:{connect:{slug:d}},pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:e.id,min:u,full:l}}}}):console.log(`PR ${e.id} is not relevant, skipping`),console.log(`Upserted PR ${e.id}`)}})]}}),w=t=>{const[d,g]=t.split("-"),c=parseInt(g);return Number.isNaN(c)?{type:d,id:g}:{type:d,id:c}},O=`
  fragment GitStartTicket on Ticket {
    id
    title
    # to construct the URL to the GitStart dashboard
    code
    status
    description
    descriptionType
    client {
      id
    }
  }
`,h=`
  fragment GitStartPullRequest on PullRequest {
    id
    status
    title
    completedAt
    url
    number
  }
`,E=`
  fragment GitStartTask on Task {
    id
    type
    status
    title
  }
`;exports.TOKEN_STORE_KEY=P;exports.default=_;
