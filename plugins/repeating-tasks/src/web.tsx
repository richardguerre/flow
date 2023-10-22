import { definePlugin } from "@flowdev/plugin/web";
import cronParser from 'cron-parser';

export default definePlugin((opts) => {
  return {
    name: "Repeating tasks",
    settings: {
      "repeating-tasks": {
        type: "custom",
        render: () => {
          return <></>
        }
      }
    }
  }
})