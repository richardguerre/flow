type PreDBTransform<T extends Object> = (data: T) => {
  id: string;
  name: string;
  url?: string;
  extension?: Record<string, string>;
};
