"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const D=t=>({plugin:t}),G="gitstart-session-token",P="gitstart-user-info",_=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],w="gitstart-items",O=D(t=>{const T=`${t.pluginSlug}-upsert-pr-as-item`,c=`${t.pluginSlug}-sync-items`,p=async(a,n,s)=>{const i=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:n,variables:s})})).json();if(i.errors)throw new t.GraphQLError(`GitStart API error: ${i.errors[0].message}`);return i.data},g=async a=>p(a.token,`
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
      `,{input:a.input}),R=async()=>{const a=await t.store.getPluginItem(G);if(!a)throw new t.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return a.value};return{onInstall:async()=>{await t.prisma.list.upsert({where:{slug:w},create:{slug:w,name:"GitStart Tickets & PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async a=>{a===G&&(await t.pgBoss.send(c,{}),await t.pgBoss.schedule(c,"*/5 * * * *"))},onCreateTask:async({task:a,actionData:n})=>{var d;const s=n,e=(d=a.item)==null?void 0:d.pluginDatas.find(S=>S.pluginSlug===t.pluginSlug);if(!(e!=null&&e.originalId))return;const i=await t.store.getPluginItem(P);if(!i)return;const{id:o}=m(i.value.id),u=await R(),l=e.full;if(l.type==="pull_request"){const{id:S}=m(e.originalId),r=await p(u,`
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
          `,{input:{pullRequestInternalId:S,title:a.title,type:s.type,status:"TODO",assigneeInternalId:o}}),k=m(r.createTask.task.id).id;(s.status==="IN_PROGRESS"||s.status==="FINISHED")&&await g({token:u,input:{taskInternalId:k,status:"IN_PROGRESS"}}),s.status==="FINISHED"&&await g({token:u,input:{taskInternalId:k,status:"FINISHED"}}),s.status==="CANCELED"&&await g({token:u,input:{taskInternalId:k,status:"CANCELED"}});const f={...e.min,status:r.createTask.pullRequest.status},I={...e.full,...f};await t.prisma.itemPluginData.update({where:{id:e.id},data:{min:f,full:I,item:{update:{title:r.createTask.pullRequest.title}}}});const y={type:r.createTask.task.type,ticketUrl:l.ticketUrl,status:r.createTask.task.status,githubPrUrl:l.url},N={...y,id:r.createTask.task.id,pullRequest:l};return{pluginData:{originalId:r.createTask.task.id,min:y,full:N}}}},onUpdateTaskStatus:async({task:a,newStatus:n})=>{const s=a.pluginDatas.find(I=>I.pluginSlug===t.pluginSlug);if(!(s!=null&&s.originalId))return;const e=s.full,{id:i}=m(s.originalId),o=await R();let u;if(a.status===n)return;if(n==="DONE"){if(e.status==="TO_DO"&&(await g({token:o,input:{taskInternalId:i,status:"IN_PROGRESS"}})).updateTaskStatus.task.status!=="IN_PROGRESS")throw new t.GraphQLError(`GitStart task (id: ${e.id}) did not change status to In progress. Contact GitStart support for help.`);u=await g({token:o,input:{taskInternalId:i,status:"FINISHED"}})}else if(n==="CANCELED")u=await g({token:o,input:{taskInternalId:i,status:"CANCELED"}});else if(n==="TODO")throw new t.GraphQLError('GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.');if(!u)return;const l={...s.min,status:u.updateTaskStatus.task.status},d={...e,...l};if(await t.prisma.taskPluginData.update({where:{id:s.id},data:{min:l,full:d}}),!a.itemId)return;const S=await t.prisma.item.findUnique({where:{id:a.itemId},include:{pluginDatas:!0}});if(!S)return;const r=S.pluginDatas.find(I=>I.pluginSlug===t.pluginSlug);if(!r)return;const k={...r.min,status:u.updateTaskStatus.pullRequest.status},f={...r.full,...k};await t.prisma.itemPluginData.update({where:{id:r.id},data:{min:k,full:f}})},operations:{sync:async()=>(await t.pgBoss.send(c,{}),{data:"Job sent to sync the GitStart items."}),scheduleSync:async()=>(await t.pgBoss.schedule(c,"*/5 * * * *").catch(a=>new t.GraphQLError(a)),{data:"Schedule successfully set."})},handlePgBossWork:a=>[a(c,async()=>{const n=await R(),s=await p(n,`
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
            ${q}
            ${E}
          `);await t.store.setSecretItem(P,{id:s.viewer.id});for(const e of s.viewer.actionablePullRequests)await t.pgBoss.send(T,e)}),a(T,{batchSize:10},async n=>{for(const s of n){const e=s.data;console.log(`Upserting PR ${e.id}`);const i=_.includes(e.status),o=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:e.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),l={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${m(e.ticket.client.id).id}/ticket/${e.ticket.code}`,url:e.url,status:e.status},d={...l,id:e.id,title:e.title,ticket:e.ticket};o?await t.prisma.item.update({where:{id:o.id},data:{title:e.title,isRelevant:i,pluginDatas:{update:{where:{id:o.pluginDatas[0].id},data:{min:l,full:d}}}}}):i?await t.prisma.item.create({data:{title:e.title,isRelevant:i,inboxPoints:10,list:{connect:{slug:w}},pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:e.id,min:l,full:d}}}}):console.log(`PR ${e.id} is not relevant, skipping`),console.log(`Upserted PR ${e.id}`)}})]}}),m=t=>{const[T,c]=t.split("-"),p=parseInt(c);return Number.isNaN(p)?{type:T,id:c}:{type:T,id:p}},q=`
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
`;exports.GITSTART_LIST_SLUG=w;exports.TOKEN_STORE_KEY=G;exports.default=O;
