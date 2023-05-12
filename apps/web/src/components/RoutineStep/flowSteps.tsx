type ToExport = {
  [stepSlug: string]: {
    component: () => React.ReactNode;
  };
};

const toExport: ToExport = {};

export default toExport;
