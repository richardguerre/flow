"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const D=e=>({plugin:e}),G="gitstart-session-token",y="gitstart-user-info",_=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],R="gitstart-items",O=D(e=>{const T=`${e.pluginSlug}-upsert-pr-as-item`,c=`${e.pluginSlug}-sync-items`,p=async(a,n,i)=>{const s=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:n,variables:i})})).json();if(s.errors)throw new e.GraphQLError(`GitStart API error: ${s.errors[0].message}`);return s.data},g=async a=>p(a.token,`
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
        ${E}
        ${h}
      `,{input:a.input}),w=async()=>{const a=await e.store.getPluginItem(G);if(!a)throw new e.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return a.value};return{onInstall:async()=>{await e.prisma.list.upsert({where:{slug:R},create:{slug:R,name:"GitStart Tickets & PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async a=>{a===G&&await e.pgBoss.send(c,{})},onCreateTask:async({task:a,actionData:n})=>{var d;const i=n,t=(d=a.item)==null?void 0:d.pluginDatas.find(S=>S.pluginSlug===e.pluginSlug);if(!(t!=null&&t.originalId))return;const s=await e.store.getPluginItem(y);if(!s)return;const{id:o}=m(s.value.id),u=await w(),l=t.full;if(l.type==="pull_request"){const{id:S}=m(t.originalId),r=await p(u,`
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
            ${E}
            ${h}
          `,{input:{pullRequestInternalId:S,title:a.title,type:i.type,status:"TODO",assigneeInternalId:o}}),k=m(r.createTask.task.id).id;(i.status==="IN_PROGRESS"||i.status==="FINISHED")&&await g({token:u,input:{taskInternalId:k,status:"IN_PROGRESS"}}),i.status==="FINISHED"&&await g({token:u,input:{taskInternalId:k,status:"FINISHED"}}),i.status==="CANCELED"&&await g({token:u,input:{taskInternalId:k,status:"CANCELED"}});const f={...t.min,status:r.createTask.pullRequest.status},I={...t.full,...f};await e.prisma.itemPluginData.update({where:{id:t.id},data:{min:f,full:I,item:{update:{title:r.createTask.pullRequest.title}}}});const P={type:r.createTask.task.type,ticketUrl:l.ticketUrl,status:r.createTask.task.status,githubPrUrl:l.url},N={...P,id:r.createTask.task.id,pullRequest:l};return{pluginData:{originalId:r.createTask.task.id,min:P,full:N}}}},onUpdateTaskStatus:async({task:a,newStatus:n})=>{const i=a.pluginDatas.find(I=>I.pluginSlug===e.pluginSlug);if(!(i!=null&&i.originalId))return;const t=i.full,{id:s}=m(i.originalId),o=await w();let u;if(a.status===n)return;if(n==="DONE"){if(t.status==="TO_DO"&&(await g({token:o,input:{taskInternalId:s,status:"IN_PROGRESS"}})).updateTaskStatus.task.status!=="IN_PROGRESS")throw new e.GraphQLError(`GitStart task (id: ${t.id}) did not change status to In progress. Contact GitStart support for help.`);u=await g({token:o,input:{taskInternalId:s,status:"FINISHED"}})}else if(n==="CANCELED")u=await g({token:o,input:{taskInternalId:s,status:"CANCELED"}});else if(n==="TODO")throw new e.GraphQLError('GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.');if(!u)return;const l={...i.min,status:u.updateTaskStatus.task.status},d={...t,...l};if(await e.prisma.taskPluginData.update({where:{id:i.id},data:{min:l,full:d}}),!a.itemId)return;const S=await e.prisma.item.findUnique({where:{id:a.itemId},include:{pluginDatas:!0}});if(!S)return;const r=S.pluginDatas.find(I=>I.pluginSlug===e.pluginSlug);if(!r)return;const k={...r.min,status:u.updateTaskStatus.pullRequest.status},f={...r.full,...k};await e.prisma.itemPluginData.update({where:{id:r.id},data:{min:k,full:f}})},operations:{sync:async()=>(await e.pgBoss.send(c,{}),{data:"Job sent to sync the GitStart items."})},handlePgBossWork:a=>[a(c,async()=>{const n=await w(),i=await p(n,`
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
            ${E}
            ${q}
            ${h}
          `);await e.store.setSecretItem(y,{id:i.viewer.id});for(const t of i.viewer.actionablePullRequests)await e.pgBoss.send(T,t)}),a(T,{batchSize:10},async n=>{for(const i of n){const t=i.data;console.log(`Upserting PR ${t.id}`);const s=_.includes(t.status),o=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:t.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),l={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${m(t.ticket.client.id).id}/ticket/${t.ticket.code}`,url:t.url,status:t.status},d={...l,id:t.id,title:t.title,ticket:t.ticket};o?await e.prisma.item.update({where:{id:o.id},data:{title:t.title,isRelevant:s,pluginDatas:{update:{where:{id:o.pluginDatas[0].id},data:{min:l,full:d}}}}}):s?await e.prisma.item.create({data:{title:t.title,isRelevant:s,inboxPoints:10,list:{connect:{slug:R}},pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:t.id,min:l,full:d}}}}):console.log(`PR ${t.id} is not relevant, skipping`),console.log(`Upserted PR ${t.id}`)}})]}}),m=e=>{const[T,c]=e.split("-"),p=parseInt(c);return Number.isNaN(p)?{type:T,id:c}:{type:T,id:p}},q=`
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
`,E=`
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
`;exports.GITSTART_LIST_SLUG=R;exports.TOKEN_STORE_KEY=G;exports.default=O;
