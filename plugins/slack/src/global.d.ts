import React from "@types/react";

declare global {
  type React = typeof React;

  type GetRoutineStepInfoInput = {
    routineStepId: string;
  };
  type GetRoutineStepInfoOutput = {
    data: {
      renderedTemplate: string;
    };
  };
}
