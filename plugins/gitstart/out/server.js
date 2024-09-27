"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const _=e=>({plugin:e}),y="gitstart-session-token",P="gitstart-user-info",O=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],h="gitstart-items",q=_(e=>{const T="upsert-pr-as-item",c="sync-items",d=async(a,i,s)=>{const n=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:i,variables:s})})).json();if(n.errors)throw new e.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},g=async a=>d(a.token,`
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
        ${R}
        ${E}
      `,{input:a.input}),f=async()=>{const a=await e.store.getPluginItem(y);if(!a)throw new e.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return a.value},N=async()=>{const a=await f();try{return await d(a,`
          query FlowOperationIsTokenValid {
            viewer {
              id
            }
          }
        `),!0}catch{return!1}};return{onInstall:async()=>{await e.prisma.list.upsert({where:{slug:h},create:{slug:h,name:"GitStart Tickets & PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async a=>{if(a===y){if(!await N())return;await e.pgBoss.send(c,{}),await e.pgBoss.schedule(c,"*/5 * * * *")}},onCreateTask:async({task:a,actionData:i})=>{var p;const s=i,t=(p=a.item)==null?void 0:p.pluginDatas.find(S=>S.pluginSlug===e.pluginSlug);if(!(t!=null&&t.originalId))return;const n=await e.store.getPluginItem(P);if(!n)return;const{id:o}=m(n.value.id),u=await f(),l=t.full;if(l.type==="pull_request"){const{id:S}=m(t.originalId),r=await d(u,`
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
            ${R}
            ${E}
          `,{input:{pullRequestInternalId:S,title:a.title,type:s.type,status:"TODO",assigneeInternalId:o}}),k=m(r.createTask.task.id).id;(s.status==="IN_PROGRESS"||s.status==="FINISHED")&&await g({token:u,input:{taskInternalId:k,status:"IN_PROGRESS"}}),s.status==="FINISHED"&&await g({token:u,input:{taskInternalId:k,status:"FINISHED"}}),s.status==="CANCELED"&&await g({token:u,input:{taskInternalId:k,status:"CANCELED"}});const w={...t.min,status:r.createTask.pullRequest.status},I={...t.full,...w};await e.prisma.itemPluginData.update({where:{id:t.id},data:{min:w,full:I,item:{update:{title:r.createTask.pullRequest.title}}}});const G={type:r.createTask.task.type,ticketUrl:l.ticketUrl,status:r.createTask.task.status,githubPrUrl:l.url},D={...G,id:r.createTask.task.id,pullRequest:l};return{pluginData:{originalId:r.createTask.task.id,min:G,full:D}}}},onUpdateTaskStatus:async({task:a,newStatus:i})=>{const s=a.pluginDatas.find(I=>I.pluginSlug===e.pluginSlug);if(!(s!=null&&s.originalId))return;const t=s.full,{id:n}=m(s.originalId),o=await f();let u;if(a.status===i)return;if(i==="DONE"){if(t.status==="TO_DO"&&(await g({token:o,input:{taskInternalId:n,status:"IN_PROGRESS"}})).updateTaskStatus.task.status!=="IN_PROGRESS")throw new e.GraphQLError(`GitStart task (id: ${t.id}) did not change status to In progress. Contact GitStart support for help.`);u=await g({token:o,input:{taskInternalId:n,status:"FINISHED"}})}else if(i==="CANCELED")u=await g({token:o,input:{taskInternalId:n,status:"CANCELED"}});else if(i==="TODO")throw new e.GraphQLError('GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.');if(!u)return;const l={...s.min,status:u.updateTaskStatus.task.status},p={...t,...l};if(await e.prisma.taskPluginData.update({where:{id:s.id},data:{min:l,full:p}}),!a.itemId)return;const S=await e.prisma.item.findUnique({where:{id:a.itemId},include:{pluginDatas:!0}});if(!S)return;const r=S.pluginDatas.find(I=>I.pluginSlug===e.pluginSlug);if(!r)return;const k={...r.min,status:u.updateTaskStatus.pullRequest.status},w={...r.full,...k};await e.prisma.itemPluginData.update({where:{id:r.id},data:{min:k,full:w}})},operations:{sync:async()=>(await e.pgBoss.send(c,{}),{data:"Job sent to sync the GitStart items."}),scheduleSync:async()=>(await e.pgBoss.schedule(c,"*/5 * * * *").catch(a=>new e.GraphQLError(a)),{data:"Schedule successfully set."})},handlePgBossWork:a=>[a(c,async()=>{const i=await f(),s=await d(i,`
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
            ${R}
            ${F}
            ${E}
          `);await e.store.setSecretItem(P,{id:s.viewer.id});for(const t of s.viewer.actionablePullRequests)await e.pgBoss.send(T,t)}),a(T,{batchSize:10},async i=>{for(const s of i){const t=s.data;console.log(`Upserting PR ${t.id}`);const n=O.includes(t.status),o=await e.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:t.id,pluginSlug:e.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),l={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${m(t.ticket.client.id).id}/ticket/${t.ticket.code}`,url:t.url,status:t.status},p={...l,id:t.id,title:t.title,ticket:t.ticket};o?await e.prisma.item.update({where:{id:o.id},data:{title:t.title,isRelevant:n,pluginDatas:{update:{where:{id:o.pluginDatas[0].id},data:{min:l,full:p}}}}}):n?await e.prisma.item.create({data:{title:t.title,isRelevant:n,inboxPoints:10,list:{connect:{slug:h}},pluginDatas:{create:{pluginSlug:e.pluginSlug,originalId:t.id,min:l,full:p}}}}):console.log(`PR ${t.id} is not relevant, skipping`),console.log(`Upserted PR ${t.id}`)}})]}}),m=e=>{const[T,c]=e.split("-"),d=parseInt(c);return Number.isNaN(d)?{type:T,id:c}:{type:T,id:d}},F=`
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
`,R=`
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
`;exports.GITSTART_LIST_SLUG=h;exports.TOKEN_STORE_KEY=y;exports.default=q;
