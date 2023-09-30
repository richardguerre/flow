"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const _=t=>({plugin:t}),y="gitstart-session-token",P="gitstart-user-info",O=["PLANNED","IN_PROGRESS","INTERNAL_REVIEW","CLIENT_REVIEW"],h="gitstart-items",q=_(t=>{const T=`${t.pluginSlug}-upsert-pr-as-item`,c=`${t.pluginSlug}-sync-items`,d=async(a,s,i)=>{const n=await(await fetch("https://gateway.gitstart.dev/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`},body:JSON.stringify({query:s,variables:i})})).json();if(n.errors)throw new t.GraphQLError(`GitStart API error: ${n.errors[0].message}`);return n.data},g=async a=>d(a.token,`
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
      `,{input:a.input}),f=async()=>{const a=await t.store.getPluginItem(y);if(!a)throw new t.GraphQLError("Missing session token to access GitStart API",{extensions:{code:"NOT_AUTHENTICATED",userFriendlyMessage:"You need to add your GitStart session token in the plugin settings."}});return a.value},N=async()=>{const a=await f();try{return await d(a,`
          query FlowOperationIsTokenValid {
            viewer {
              id
            }
          }
        `),!0}catch{return!1}};return{onInstall:async()=>{await t.prisma.list.upsert({where:{slug:h},create:{slug:h,name:"GitStart Tickets & PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."},update:{name:"GitStart PRs",description:"All the PRs you have access to in your GitStart dashboard. List created from the GitStart plugin."}})},onStoreItemUpsert:async a=>{if(a===y){if(!await N())return;await t.pgBoss.send(c,{}),await t.pgBoss.schedule(c,"*/5 * * * *")}},onCreateTask:async({task:a,actionData:s})=>{var p;const i=s,e=(p=a.item)==null?void 0:p.pluginDatas.find(S=>S.pluginSlug===t.pluginSlug);if(!(e!=null&&e.originalId))return;const n=await t.store.getPluginItem(P);if(!n)return;const{id:o}=m(n.value.id),u=await f(),l=e.full;if(l.type==="pull_request"){const{id:S}=m(e.originalId),r=await d(u,`
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
          `,{input:{pullRequestInternalId:S,title:a.title,type:i.type,status:"TODO",assigneeInternalId:o}}),k=m(r.createTask.task.id).id;(i.status==="IN_PROGRESS"||i.status==="FINISHED")&&await g({token:u,input:{taskInternalId:k,status:"IN_PROGRESS"}}),i.status==="FINISHED"&&await g({token:u,input:{taskInternalId:k,status:"FINISHED"}}),i.status==="CANCELED"&&await g({token:u,input:{taskInternalId:k,status:"CANCELED"}});const w={...e.min,status:r.createTask.pullRequest.status},I={...e.full,...w};await t.prisma.itemPluginData.update({where:{id:e.id},data:{min:w,full:I,item:{update:{title:r.createTask.pullRequest.title}}}});const G={type:r.createTask.task.type,ticketUrl:l.ticketUrl,status:r.createTask.task.status,githubPrUrl:l.url},D={...G,id:r.createTask.task.id,pullRequest:l};return{pluginData:{originalId:r.createTask.task.id,min:G,full:D}}}},onUpdateTaskStatus:async({task:a,newStatus:s})=>{const i=a.pluginDatas.find(I=>I.pluginSlug===t.pluginSlug);if(!(i!=null&&i.originalId))return;const e=i.full,{id:n}=m(i.originalId),o=await f();let u;if(a.status===s)return;if(s==="DONE"){if(e.status==="TO_DO"&&(await g({token:o,input:{taskInternalId:n,status:"IN_PROGRESS"}})).updateTaskStatus.task.status!=="IN_PROGRESS")throw new t.GraphQLError(`GitStart task (id: ${e.id}) did not change status to In progress. Contact GitStart support for help.`);u=await g({token:o,input:{taskInternalId:n,status:"FINISHED"}})}else if(s==="CANCELED")u=await g({token:o,input:{taskInternalId:n,status:"CANCELED"}});else if(s==="TODO")throw new t.GraphQLError('GitStart tasks cannot be set back to "To do" from "In progress". If needed, you can cancel the task and create a new one.');if(!u)return;const l={...i.min,status:u.updateTaskStatus.task.status},p={...e,...l};if(await t.prisma.taskPluginData.update({where:{id:i.id},data:{min:l,full:p}}),!a.itemId)return;const S=await t.prisma.item.findUnique({where:{id:a.itemId},include:{pluginDatas:!0}});if(!S)return;const r=S.pluginDatas.find(I=>I.pluginSlug===t.pluginSlug);if(!r)return;const k={...r.min,status:u.updateTaskStatus.pullRequest.status},w={...r.full,...k};await t.prisma.itemPluginData.update({where:{id:r.id},data:{min:k,full:w}})},operations:{sync:async()=>(await t.pgBoss.send(c,{}),{data:"Job sent to sync the GitStart items."}),scheduleSync:async()=>(await t.pgBoss.schedule(c,"*/5 * * * *").catch(a=>new t.GraphQLError(a)),{data:"Schedule successfully set."})},handlePgBossWork:a=>[a(c,async()=>{const s=await f(),i=await d(s,`
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
          `);await t.store.setSecretItem(P,{id:i.viewer.id});for(const e of i.viewer.actionablePullRequests)await t.pgBoss.send(T,e)}),a(T,{batchSize:10},async s=>{for(const i of s){const e=i.data;console.log(`Upserting PR ${e.id}`);const n=O.includes(e.status),o=await t.prisma.item.findFirst({where:{pluginDatas:{some:{originalId:e.id,pluginSlug:t.pluginSlug}}},include:{pluginDatas:{select:{id:!0}}}}),l={type:"pull_request",ticketUrl:`https://developers.gitstart.com/client/${m(e.ticket.client.id).id}/ticket/${e.ticket.code}`,url:e.url,status:e.status},p={...l,id:e.id,title:e.title,ticket:e.ticket};o?await t.prisma.item.update({where:{id:o.id},data:{title:e.title,isRelevant:n,pluginDatas:{update:{where:{id:o.pluginDatas[0].id},data:{min:l,full:p}}}}}):n?await t.prisma.item.create({data:{title:e.title,isRelevant:n,inboxPoints:10,list:{connect:{slug:h}},pluginDatas:{create:{pluginSlug:t.pluginSlug,originalId:e.id,min:l,full:p}}}}):console.log(`PR ${e.id} is not relevant, skipping`),console.log(`Upserted PR ${e.id}`)}})]}}),m=t=>{const[T,c]=t.split("-"),d=parseInt(c);return Number.isNaN(d)?{type:T,id:c}:{type:T,id:d}},F=`
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
